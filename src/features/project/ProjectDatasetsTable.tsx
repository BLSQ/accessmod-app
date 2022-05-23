import { gql } from "@apollo/client";
import Button from "components/Button";
import Pagination from "components/Pagination";
import SearchInput from "components/SearchInput";
import Time from "components/Time";
import DatasetStatusBadge from "features/dataset/DatasetStatusBadge";
import DeleteDatasetTrigger from "features/dataset/DeleteDatasetTrigger";
import Team from "features/team/Team";
import useCacheKey from "hooks/useCacheKey";
import { CustomApolloClient } from "libs/apollo";
import {
  ProjectDatasetsTableQueryVariables,
  ProjectDatasetsTable_ProjectFragment,
  useProjectDatasetsTableQuery,
} from "libs/graphql";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { MouseEvent, useCallback, useState } from "react";
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
      mode: USER_INPUT
    ) {
      items {
        ...DatasetStatusBadge_dataset
        ...DeleteDatasetTrigger_dataset
        id
        name
        role {
          name
          id
          format
        }
        author {
          __typename
          ...User_user
        }
        status
        createdAt
      }
      pageNumber
      totalPages
      totalItems
    }
  }
  ${DeleteDatasetTrigger.fragments.dataset}
  ${DatasetStatusBadge.fragments.dataset}
  ${User.fragments.user}
  ${Team.fragments.team}
`;

type Props = {
  project: ProjectDatasetsTable_ProjectFragment;
  perPage?: number;
  searchable?: boolean;
};

const ProjectDatasetsTable = (props: Props) => {
  const { project, perPage = 5, searchable } = props;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [pagination, setPagination] = useState({ page: 1, perPage });
  const router = useRouter();
  const { data, previousData, loading, refetch } = useProjectDatasetsTableQuery(
    {
      variables: { projectId: project.id, term: searchTerm, ...pagination },
    }
  );
  useCacheKey(["filesets"], () => refetch());
  useCacheKey(["projects", project.id], () => refetch());

  const onSearch = useCallback((term?: string) => {
    setPagination((pagination) => ({ ...pagination, page: 1 }));
    setSearchTerm(term);
  }, []);

  const rows = (data || previousData)?.accessmodFilesets.items ?? [];
  const totalItems = (data || previousData)?.accessmodFilesets.totalItems ?? 0;
  const totalPages = (data || previousData)?.accessmodFilesets.totalPages ?? 0;

  const onRowClick = (event: MouseEvent<Element>, row: { id: string }) => {
    // If the user clicked on a button or a anchor, let's this element handles the click and forget about it.
    if (
      event.target instanceof HTMLButtonElement ||
      event.target instanceof HTMLAnchorElement
    ) {
      return;
    }
    router.push({
      pathname: routes.project_dataset,
      query: { projectId: project.id, datasetId: row.id },
    });
  };

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
                <th scope="column">{t("Class")}</th>
                <th scope="column">{t("Author")}</th>
                <th scope="column">{t("Created")} At</th>
                <th scope="column" className="whitespace-nowrap">
                  {t("Status")}
                </th>
                <th scope="column">
                  <span className="sr-only">{t("Delete")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer"
                  onClick={(event) => onRowClick(event, row)}
                >
                  <td className="min-w-fit">{row.name}</td>
                  <td>{row.role?.name ?? <i>{t("Unknown")}</i>}</td>
                  <td>
                    <User small user={row.author} />
                  </td>
                  <td>
                    <Time datetime={row.createdAt} />
                  </td>
                  <td>
                    <DatasetStatusBadge dataset={row} />
                  </td>
                  <td>
                    <DeleteDatasetTrigger project={project} dataset={row}>
                      {({ onClick }) => (
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="white" size="sm" onClick={onClick}>
                            {t("Delete")}
                          </Button>
                        </div>
                      )}
                    </DeleteDatasetTrigger>
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
      ...DeleteDatasetTrigger_project
      id
    }
    ${DeleteDatasetTrigger.fragments.project}
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
