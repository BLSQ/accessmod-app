import { gql } from "@apollo/client";
import Button from "components/Button";
import Pagination from "components/Pagination";
import SearchInput from "components/SearchInput";
import Time from "components/Time";
import useCacheKey from "hooks/useCacheKey";
import { CustomApolloClient } from "libs/apollo";
import { stopPropagation } from "libs/events";
import {
  ProjectDatasetsTableQueryVariables,
  ProjectDatasetsTable_ProjectFragment,
  useDeleteDatasetMutation,
  useProjectDatasetsTableQuery,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useCallback, useState } from "react";
import DatasetFormDialog from "../DatasetFormDialog";
import User from "../User";

const PROJECT_DATASETS_QUERY = gql`
  query ProjectDatasetsTable(
    $page: Int = 1
    $perPage: Int = 5
    $projectId: String!
    $term: String
  ) {
    accessmodFilesets(
      projectId: $projectId
      page: $page
      perPage: $perPage
      term: $term
    ) {
      items {
        ...DatasetFormDialog_dataset
        id
        name
        role {
          name
          id
          format
        }
        owner {
          id
          firstName
          lastName
          email
          avatar {
            initials
            color
          }
        }
        files {
          __typename # We should just expose a count
        }
        createdAt
      }
      pageNumber
      totalPages
      totalItems
    }
  }
  ${DatasetFormDialog.fragments.dataset}
`;

type Props = {
  project: ProjectDatasetsTable_ProjectFragment;
  perPage?: number;
  searchable?: boolean;
};

const DELETE_DATASET_MUTATION = gql`
  mutation DeleteDataset($input: DeleteAccessmodFilesetInput) {
    deleteAccessmodFileset(input: $input) {
      success
    }
  }
`;

const ProjectDatasetsTable = (props: Props) => {
  const { project, perPage = 5, searchable } = props;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [pagination, setPagination] = useState({ page: 1, perPage });
  const [deleteDataset] = useDeleteDatasetMutation();
  const { data, previousData, loading, refetch } = useProjectDatasetsTableQuery(
    {
      variables: { projectId: project.id, term: searchTerm, ...pagination },
    }
  );
  useCacheKey(["filesets"], () => refetch());

  const onSearch = useCallback((term?: string) => {
    setPagination((pagination) => ({ ...pagination, page: 1 }));
    setSearchTerm(term);
  }, []);

  const onDeleteDataset = async (dataset: { id: string; name: string }) => {
    if (
      window.confirm(
        t("Are you sure you want to delete {{name}}", { name: dataset.name })
      )
    )
      await deleteDataset({ variables: { input: { id: dataset.id } } });
    refetch();
  };

  const rows = (data || previousData)?.accessmodFilesets.items ?? [];
  const totalItems = (data || previousData)?.accessmodFilesets.totalItems ?? 0;
  const totalPages = (data || previousData)?.accessmodFilesets.totalPages ?? 0;

  return (
    <>
      {searchable && (
        <SearchInput
          className="mb-4 w-56"
          placeholder="Search for a dataset..."
          loading={loading}
          onChange={(term) => onSearch(term ?? undefined)}
        />
      )}
      <div className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="who">
            <thead>
              <tr>
                <th scope="column" className="whitespace-nowrap">
                  {t("Dataset Name")}
                </th>
                <th scope="column">{t("Role")}</th>
                <th scope="column">{t("Owner")}</th>
                <th scope="column">{t("Created")} At</th>
                <th scope="column" className="whitespace-nowrap">
                  {t("# Files")}
                </th>
                <th scope="column">
                  <span className="sr-only">{t("Delete")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="group">
                  <td className="min-w-fit">{row.name}</td>
                  <td>{row.role?.name ?? <i>{t("Unknown")}</i>}</td>
                  <td>
                    <User small user={row.owner} />
                  </td>
                  <td>
                    <Time datetime={row.createdAt} />
                  </td>
                  <td>{row.files.length ?? 0}</td>
                  <td className="text-right" onClick={stopPropagation}>
                    <div className="invisible flex items-center justify-end gap-1 group-hover:visible">
                      <Button
                        variant="white"
                        size="sm"
                        onClick={() => onDeleteDataset(row)}
                      >
                        {t("Delete")}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 border-t border-gray-200">
          <Pagination
            className="px-2"
            loading={loading}
            onChange={(page) => setPagination({ ...pagination, page })}
            page={pagination.page}
            perPage={pagination.perPage}
            countItems={rows.length}
            totalItems={totalItems}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};

ProjectDatasetsTable.fragments = {
  project: gql`
    fragment ProjectDatasetsTable_project on AccessmodProject {
      id
      owner {
        ...User_user
      }
    }
    ${User.fragments.user}
  `,
};

ProjectDatasetsTable.prefetch = async (
  client: CustomApolloClient,
  variables: ProjectDatasetsTableQueryVariables
) => {
  await client.query({
    query: PROJECT_DATASETS_QUERY,
    variables,
  });
};

export default ProjectDatasetsTable;
