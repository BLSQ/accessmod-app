import { gql } from "@apollo/client";
import Button from "components/Button";
import Pagination from "components/Pagination";
import useCacheKey from "hooks/useCacheKey";
import { getAnalysisTypeFromTypename } from "libs/analysis";
import { CustomApolloClient } from "libs/apollo";
import {
  AccessmodAnalysisStatus,
  ProjectAnalysisTable_ProjectFragment,
  useProjectAnalysisTableQuery,
} from "libs/graphql";
import Link from "next/link";
import { useState } from "react";
import AnalysisStatus from "./analysis/AnalysisStatus";

const PROJECT_ANALYSIS_QUERY = gql`
  query ProjectAnalysisTable(
    $page: Int = 1
    $perPage: Int = 10
    $projectId: String!
  ) {
    analysis: accessmodAnalyses(
      projectId: $projectId
      page: $page
      perPage: $perPage
    ) {
      items {
        __typename
        id
        name
        status
        ...AnalysisStatus_analysis
      }
      pageNumber
      totalPages
      totalItems
    }
  }
  ${AnalysisStatus.fragments.analysis}
`;

type Props = {
  project: ProjectAnalysisTable_ProjectFragment;
  cacheKey?: string; // Used to refetch query without loosing internal state completely (if we used the `key`)
};

const ProjectAnalysisTable = (props: Props) => {
  const { project } = props;
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const { data, previousData, loading, refetch } = useProjectAnalysisTableQuery(
    {
      variables: { projectId: project.id, ...pagination },
    }
  );
  useCacheKey(["analysis"], () => refetch());

  const rows = (data || previousData)?.analysis.items ?? [];
  const totalItems = (data || previousData)?.analysis.totalItems ?? 0;
  const totalPages = (data || previousData)?.analysis.totalPages ?? 0;
  console.log(rows);

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg w-full">
      <div className="overflow-x-auto rounded-md">
        <table className="who">
          <thead>
            <tr>
              <th scope="column" className="whitespace-nowrap">
                Analysis
              </th>
              <th scope="column">Type</th>
              <th scope="column">Status</th>
              <th scope="column">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="group">
                <td className="min-w-fit">{row.name}</td>
                <td>{getAnalysisTypeFromTypename(row.__typename)}</td>
                <td>
                  <AnalysisStatus analysis={row} />
                </td>
                <td className="">
                  <div className="invisible group-hover:visible">
                    {[
                      AccessmodAnalysisStatus.Ready,
                      AccessmodAnalysisStatus.Pending,
                      AccessmodAnalysisStatus.Queued,
                    ].includes(row.status) && (
                      <Link
                        href={`/projects/${encodeURIComponent(
                          project.id
                        )}/analysis/${encodeURIComponent(row.id)}/edit`}
                      >
                        <a>
                          <Button size="sm">Edit</Button>
                        </a>
                      </Link>
                    )}
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

ProjectAnalysisTable.fragments = {
  project: gql`
    fragment ProjectAnalysisTable_project on AccessmodProject {
      id
    }
  `,
};

ProjectAnalysisTable.prefetch = async (
  client: CustomApolloClient,
  projectId: String
) => {
  await client.query({
    query: PROJECT_ANALYSIS_QUERY,
    variables: {
      projectId,
      page: 1,
      perPage: 10,
    },
  });
};

export default ProjectAnalysisTable;