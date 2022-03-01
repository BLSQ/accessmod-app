import { gql, useMutation } from "@apollo/client";
import Button from "components/Button";
import Pagination from "components/Pagination";
import useCacheKey from "hooks/useCacheKey";
import { getLabelFromAnalysisType } from "libs/analysis";
import { CustomApolloClient } from "libs/apollo";
import {
  AccessmodAnalysisStatus,
  ProjectAnalysisTable_ProjectFragment,
  useDeleteAnalysisMutation,
  useProjectAnalysisTableQuery,
} from "libs/graphql";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import AnalysisStatus from "./analysis/AnalysisStatus";

type Props = {
  project: ProjectAnalysisTable_ProjectFragment;
  cacheKey?: string; // Used to refetch query without loosing internal state completely (if we used the `key`)
};

const DELETE_ANALYSIS_MUTATION = gql`
  mutation DeleteAnalysis($input: DeleteAccessmodAnalysisInput) {
    deleteAccessmodAnalysis(input: $input) {
      success
    }
  }
`;

const ProjectAnalysisTable = (props: Props) => {
  const { project } = props;
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [deleteAnalysis] = useDeleteAnalysisMutation();
  const { data, previousData, loading, refetch } = useProjectAnalysisTableQuery(
    {
      variables: { projectId: project.id, ...pagination },
    }
  );
  useCacheKey(["analysis"], () => refetch());

  const onDeleteAnalysis = async (analysis: { id: string; name: string }) => {
    if (
      window.confirm(
        t("Are you sure you want to delete {{name}}", { name: analysis.name })
      )
    )
      await deleteAnalysis({ variables: { input: { id: analysis.id } } });
    refetch();
  };

  const rows = (data || previousData)?.analysis.items ?? [];
  const totalItems = (data || previousData)?.analysis.totalItems ?? 0;
  const totalPages = (data || previousData)?.analysis.totalPages ?? 0;

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg w-full">
      <div className="overflow-x-auto rounded-md">
        <table className="who">
          <thead>
            <tr>
              <th scope="column" className="whitespace-nowrap">
                {t("Analysis")}
              </th>
              <th scope="column">{t("Type")}</th>
              <th scope="column">{t("Status")}</th>
              <th scope="column">
                <span className="sr-only">{t("Actions")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="group">
                <td className="min-w-fit">
                  <Link
                    href={{
                      pathname: routes.project_analysis,
                      query: { projectId: project.id, analysisId: row.id },
                    }}
                  >
                    <a>{row.name}</a>
                  </Link>
                </td>
                <td>{getLabelFromAnalysisType(row.type)}</td>
                <td>
                  <AnalysisStatus analysis={row} />
                </td>
                <td className="">
                  <div className="invisible group-hover:visible flex justify-end gap-1">
                    <Button
                      size="sm"
                      variant="white"
                      onClick={() => onDeleteAnalysis(row)}
                    >
                      {t("Delete")}
                    </Button>
                    {[
                      AccessmodAnalysisStatus.Ready,
                      AccessmodAnalysisStatus.Draft,
                      AccessmodAnalysisStatus.Queued,
                    ].includes(row.status) && (
                      <Link
                        href={`/projects/${encodeURIComponent(
                          project.id
                        )}/analysis/${encodeURIComponent(row.id)}/edit`}
                      >
                        <a>
                          <Button size="sm">{t("Edit")}</Button>
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
    query: gql`
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
            type
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
    `,
    variables: {
      projectId,
      page: 1,
      perPage: 10,
    },
  });
};

export default ProjectAnalysisTable;
