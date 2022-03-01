import { gql } from "@apollo/client";
import Button from "components/Button";
import Pagination from "components/Pagination";
import Time from "components/Time";
import useCacheKey from "hooks/useCacheKey";
import { CustomApolloClient } from "libs/apollo";
import {
  DatasetFormDialog_DatasetFragment,
  ProjectDatasetsTable_ProjectFragment,
  useDeleteDatasetMutation,
  useProjectDatasetsTableQuery,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import DatasetFormDialog from "./DatasetFormDialog";

const PROJECT_DATASETS_QUERY = gql`
  query ProjectDatasetsTable(
    $page: Int = 1
    $perPage: Int = 10
    $projectId: String!
  ) {
    accessmodFilesets(projectId: $projectId, page: $page, perPage: $perPage) {
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
  cacheKey?: string; // Used to refetch query without loosing internal state completely (if we used the `key`)
};

const DELETE_DATASET_MUTATION = gql`
  mutation DeleteDataset($input: DeleteAccessmodFilesetInput) {
    deleteAccessmodFileset(input: $input) {
      success
    }
  }
`;

const ProjectDatasetsTable = (props: Props) => {
  const { project } = props;
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [editedDataset, setEditedDataset] = useState<
    undefined | DatasetFormDialog_DatasetFragment
  >();
  const [deleteDataset] = useDeleteDatasetMutation();
  const { data, previousData, loading, refetch } = useProjectDatasetsTableQuery(
    {
      variables: { projectId: project.id, ...pagination },
    }
  );

  useCacheKey(["filesets"], () => refetch());

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
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg w-full">
        <div className="overflow-x-auto rounded-md">
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
                    {[row.owner.firstName, row.owner.lastName]
                      .filter(Boolean)
                      .join(" ") || row.owner.email}
                  </td>
                  <td>
                    <Time datetime={row.createdAt} />
                  </td>
                  <td>{row.files.length ?? 0}</td>
                  <td className="text-right">
                    <div className="invisible group-hover:visible flex justify-end items-center gap-1">
                      <Button
                        variant="white"
                        size="sm"
                        onClick={() => onDeleteDataset(row)}
                      >
                        {t("Delete")}
                      </Button>
                      <Button size="sm" onClick={() => setEditedDataset(row)}>
                        {t("Add Files")}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3">
          <Pagination
            loading={loading}
            onChange={(page) => setPagination({ ...pagination, page })}
            page={pagination.page}
            perPage={pagination.perPage}
            totalItems={totalItems}
            totalPages={totalPages}
          />
        </div>
      </div>
      {editedDataset && (
        <DatasetFormDialog
          dataset={editedDataset}
          project={project}
          open={Boolean(editedDataset)}
          onClose={() => setEditedDataset(undefined)}
        />
      )}
    </>
  );
};

ProjectDatasetsTable.fragments = {
  project: gql`
    fragment ProjectDatasetsTable_project on AccessmodProject {
      id
      ...DatasetFormDialog_project
    }
    ${DatasetFormDialog.fragments.project}
  `,
};

ProjectDatasetsTable.prefetch = async (
  client: CustomApolloClient,
  projectId: string
) => {
  await client.query({
    query: PROJECT_DATASETS_QUERY,
    variables: {
      projectId,
      page: 1,
      perPage: 10,
    },
  });
};

export default ProjectDatasetsTable;
