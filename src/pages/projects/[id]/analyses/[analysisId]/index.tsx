import { gql } from "@apollo/client";
import { DocumentReportIcon } from "@heroicons/react/solid";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import AccessibilityAnalysisOutput from "features/analysis/AccessibilityAnalysisOutput";
import AccessibilityAnalysisParameters from "features/analysis/AccessibilityAnalysisParameters";
import AnalysisActionsButton from "features/analysis/AnalysisActionsButton";
import AnalysisStatus from "features/analysis/AnalysisStatus";
import ZonalStatisticsOutput from "features/analysis/ZonalStatisticsOutput";
import ZonalStatisticsParameters from "features/analysis/ZonalStatisticsParameters";
import Team from "features/team/Team";
import User from "features/User";
import { getLabelFromAnalysisType } from "libs/analysis";
import {
  AccessmodAnalysisStatus,
  useAnalysisDetailPageQuery,
} from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AnalysisPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { loading, data, startPolling, stopPolling } =
    useAnalysisDetailPageQuery({
      pollInterval: 0,
      variables: {
        id: router.query.id as string,
        analysisId: router.query.analysisId as string,
      },
    });

  const analysis = data?.analysis;
  useEffect(() => {
    if (!analysis) {
      return;
    }

    if (
      [
        AccessmodAnalysisStatus.Ready,
        AccessmodAnalysisStatus.Queued,
        AccessmodAnalysisStatus.Running,
      ].includes(analysis.status)
    ) {
      startPolling(5000);
    }
    return () => {
      stopPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysis]);

  if (!data?.project || !data.analysis || loading) {
    // Unknonwn project or not authorized
    return null;
  }

  return (
    <Page title={data.analysis.name}>
      <PageHeader>
        <Breadcrumbs className="mb-2">
          <Breadcrumbs.Part href="/projects">{t("Projects")}</Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.project,
              query: { projectId: data.project.id },
            }}
          >
            {data.project.name}
          </Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.project_analyses_list,
              query: { projectId: data.project.id },
            }}
          >
            {t("Analyses")}
          </Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.project_analysis,
              query: {
                projectId: data.project.id,
                analysisId: data.analysis.id,
              },
            }}
          >
            {data.analysis.name}
          </Breadcrumbs.Part>
        </Breadcrumbs>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {data.analysis.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-10 gap-y-2 text-sm text-white">
              <AnalysisStatus analysis={data.analysis} />
              <div className="flex items-center">
                <DocumentReportIcon className="mr-1.5 h-5" />
                {getLabelFromAnalysisType(data.analysis.type)}
              </div>

              {"owner" in data.analysis &&
                data.analysis.owner?.__typename === "User" && (
                  <User
                    small
                    user={data.analysis.owner}
                    textColor="text-white"
                  />
                )}
              {"owner" in data.analysis &&
                data.analysis.owner?.__typename === "Team" && (
                  <Team
                    team={data.analysis.owner}
                    iconClassName="w-4 h-4 mr-1.5"
                  />
                )}
            </div>
          </div>
          <AnalysisActionsButton
            analysis={data.analysis}
            project={data.project}
          />
        </div>
      </PageHeader>
      <PageContent className="space-y-4">
        {data.analysis.status === AccessmodAnalysisStatus.Success && (
          <Block>
            <h3 className="mb-4 flex items-center justify-between">
              {t("Output")}
            </h3>
            {data.analysis.__typename === "AccessmodAccessibilityAnalysis" && (
              <AccessibilityAnalysisOutput
                analysis={data.analysis}
                project={data.project}
              />
            )}
            {data.analysis.__typename === "AccessmodZonalStatistics" && (
              <ZonalStatisticsOutput
                analysis={data.analysis}
                project={data.project}
              />
            )}
          </Block>
        )}
        <Block>
          <h3 className="mb-4 flex items-center justify-between">
            {t("Parameters")}
          </h3>
          {data.analysis.__typename === "AccessmodAccessibilityAnalysis" && (
            <AccessibilityAnalysisParameters
              analysis={data.analysis}
              project={data.project}
            />
          )}
          {data.analysis.__typename === "AccessmodZonalStatistics" && (
            <ZonalStatisticsParameters
              analysis={data.analysis}
              project={data.project}
            />
          )}
        </Block>
      </PageContent>
    </Page>
  );
};

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async ({ params }, client) => {
    if (!params || !params.id || !params.analysisId) {
      return {
        notFound: true,
      };
    }
    await Layout.prefetch(client);
    await client.query({
      query: gql`
        query AnalysisDetailPage($id: String!, $analysisId: String!) {
          project: accessmodProject(id: $id) {
            id
            name
            ...AnalysisActionsButton_project
            ...AccessibilityAnalysisOutput_project
            ...AccessibilityAnalysisParameters_project
            ...ZonalStatisticsOutput_project
            ...ZonalStatisticsParameters_project
          }
          analysis: accessmodAnalysis(id: $analysisId) {
            __typename
            id
            name
            type
            createdAt
            updatedAt
            status
            ...AnalysisActionsButton_analysis
            ...AnalysisStatus_analysis
            ...AccessibilityAnalysisOutput_analysis
            ...AccessibilityAnalysisParameters_analysis
            ...ZonalStatisticsOutput_analysis
            ...ZonalStatisticsParameters_analysis
            ... on AccessmodOwnership {
              owner {
                __typename
                ...User_user
                ...Team_team
              }
            }
          }
        }
        ${AnalysisActionsButton.fragments.project}
        ${AnalysisActionsButton.fragments.analysis}
        ${AnalysisStatus.fragments.analysis}
        ${AccessibilityAnalysisOutput.fragments.analysis}
        ${AccessibilityAnalysisOutput.fragments.project}
        ${AccessibilityAnalysisParameters.fragments.analysis}
        ${AccessibilityAnalysisParameters.fragments.project}
        ${ZonalStatisticsOutput.fragments.analysis}
        ${ZonalStatisticsOutput.fragments.project}
        ${ZonalStatisticsParameters.fragments.project}
        ${ZonalStatisticsParameters.fragments.analysis}
        ${User.fragments.user}
        ${Team.fragments.team}
      `,
      variables: {
        id: params.id as string,
        analysisId: params.analysisId as string,
      },
    });
  },
});

export default AnalysisPage;
