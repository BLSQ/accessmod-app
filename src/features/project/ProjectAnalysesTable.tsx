import { gql } from "@apollo/client";
import Button from "components/Button";
import Pagination from "components/Pagination";
import Time from "components/Time";
import useCacheKey from "hooks/useCacheKey";
import { getLabelFromAnalysisType } from "libs/analysis";
import { CustomApolloClient } from "libs/apollo";
import {
  AccessmodAnalysisStatus,
  ProjectAnalysesTableQueryVariables,
  ProjectAnalysesTable_ProjectFragment,
  useDeleteAnalysisMutation,
  useProjectAnalysesTableQuery,
} from "libs/graphql";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import AnalysisStatus from "../analysis/AnalysisStatus";
import User from "features/User";

type Props = {
  project: ProjectAnalysesTable_ProjectFragment;
  perPage?: number;
};

const DELETE_ANALYSIS_MUTATION = gql`
  mutation DeleteAnalysis($input: DeleteAccessmodAnalysisInput) {
    deleteAccessmodAnalysis(input: $input) {
      success
    }
  }
`;

const ProjectAnalysesTable = (props: Props) => {
  const { project, perPage = 5 } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({ page: 1, perPage });
  const [deleteAnalysis] = useDeleteAnalysisMutation();
  const { data, previousData, loading, refetch } = useProjectAnalysesTableQuery(
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

  const rows = (data || previousData)?.analyses.items ?? [];
  const totalItems = (data || previousData)?.analyses.totalItems ?? 0;
  const totalPages = (data || previousData)?.analyses.totalPages ?? 0;

  const onRowClick = (event: MouseEvent<Element>, row: { id: string }) => {
    // If the user clicked on a button or a anchor, let's this element handles the click and forget about it.
    if (
      event.target instanceof HTMLButtonElement ||
      event.target instanceof HTMLAnchorElement
    ) {
      return;
    }
    router.push({
      pathname: routes.project_analysis,
      query: { projectId: project.id, analysisId: row.id },
    });
  };

  return (
    <div className="overflow-x-hidden">
      <div className="overflow-x-auto">
        <table className="who">
          <thead>
            <tr>
              <th scope="column" className="whitespace-nowrap">
                {t("Analysis")}
              </th>
              <th scope="column">{t("Type")}</th>
              <th scope="column">{t("Author")}</th>
              <th scope="column">{t("Created")}</th>
              <th scope="column">{t("Status")}</th>
              <th scope="column">
                <span className="sr-only">{t("Actions")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="group cursor-pointer"
                onClick={(event) => onRowClick(event, row)}
              >
                <td className="min-w-fit">{row.name}</td>
                <td>{getLabelFromAnalysisType(row.type)}</td>
                <td>
                  <User small user={row.author} />
                </td>
                <td>
                  <Time datetime={row.createdAt} />
                </td>
                <td>
                  <AnalysisStatus analysis={row} />
                </td>
                <td>
                  <div className="invisible flex justify-end gap-1 group-hover:visible">
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
                    ].includes(row.status) && (
                      <Link
                        href={{
                          pathname: routes.project_analysis_edit,
                          query: { projectId: project.id, analysisId: row.id },
                        }}
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
      <div className="mt-3 border-t border-gray-200">
        <Pagination
          className="px-2"
          loading={loading}
          onChange={(page) => setPagination({ ...pagination, page })}
          page={pagination.page}
          countItems={rows.length}
          perPage={pagination.perPage}
          totalItems={totalItems}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

ProjectAnalysesTable.fragments = {
  project: gql`
    fragment ProjectAnalysesTable_project on AccessmodProject {
      id
    }
  `,
};

ProjectAnalysesTable.prefetch = async (
  client: CustomApolloClient,
  variables: ProjectAnalysesTableQueryVariables
) => {
  await client.query({
    query: gql`
      query ProjectAnalysesTable(
        $page: Int = 1
        $perPage: Int = 5
        $projectId: String!
      ) {
        analyses: accessmodAnalyses(
          projectId: $projectId
          page: $page
          perPage: $perPage
        ) {
          items {
            __typename
            id
            type
            name
            author {
              __typename
              ...User_user
            }
            createdAt
            status
            ...AnalysisStatus_analysis
          }
          pageNumber
          totalPages
          totalItems
        }
      }
      ${AnalysisStatus.fragments.analysis}
      ${User.fragments.user}
    `,
    variables,
  });
};

export default ProjectAnalysesTable;
