import { gql } from "@apollo/client";
import Button from "components/Button";
import Pagination from "components/Pagination";
import Time from "components/Time";
import useCacheKey from "hooks/useCacheKey";
import { CustomApolloClient } from "libs/apollo";
import {
  ProjectDatasetsTable_ProjectFragment,
  useProjectDatasetsTableQuery,
} from "libs/graphql";
import { useState } from "react";

const PROJECT_DATASETS_QUERY = gql`
  query ProjectDatasetsTable(
    $page: Int = 1
    $perPage: Int = 10
    $projectId: String!
  ) {
    accessmodFilesets(projectId: $projectId, page: $page, perPage: $perPage) {
      items {
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
`;

type Props = {
  project: ProjectDatasetsTable_ProjectFragment;
  cacheKey?: string; // Used to refetch query without loosing internal state completely (if we used the `key`)
};

const ProjectDatasetsTable = (props: Props) => {
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const { data, previousData, loading, refetch } = useProjectDatasetsTableQuery(
    {
      variables: { projectId: props.project.id, ...pagination },
    }
  );
  useCacheKey(["filesets"], () => refetch());

  const rows = (data || previousData)?.accessmodFilesets.items ?? [];
  const totalItems = (data || previousData)?.accessmodFilesets.totalItems ?? 0;
  const totalPages = (data || previousData)?.accessmodFilesets.totalPages ?? 0;

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg w-full">
      <div className="overflow-x-auto rounded-md">
        <table className="who">
          <thead>
            <tr>
              <th scope="column" className="whitespace-nowrap">
                Dataset Name
              </th>
              <th scope="column">Role</th>
              <th scope="column">Owner</th>
              <th scope="column">Created At</th>
              <th scope="column" className="whitespace-nowrap">
                # Files
              </th>
              <th scope="column">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="group">
                <td className="min-w-fit">{row.name}</td>
                <td>{row.role?.name ?? <i>Unknown</i>}</td>
                <td>
                  {[row.owner.firstName, row.owner.lastName]
                    .filter(Boolean)
                    .join(" ") || row.owner.email}
                </td>
                <td>
                  <Time datetime={row.createdAt} />
                </td>
                <td>{row.files.length ?? 0}</td>
                <td className="">
                  <div className="invisible group-hover:visible">
                    <Button>Add files</Button>
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
  );
};

ProjectDatasetsTable.fragments = {
  project: gql`
    fragment ProjectDatasetsTable_project on AccessmodProject {
      id
    }
  `,
};

ProjectDatasetsTable.prefetch = async (
  client: CustomApolloClient,
  projectId: String
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
