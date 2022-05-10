import { gql } from "@apollo/client";
import { DocumentReportIcon } from "@heroicons/react/solid";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import AnalysisActionsButton from "features/analysis/AnalysisActionsButton";
import AccessibilityAnalysisOutput from "features/analysis/AccessibilityAnalysisOutput";
import AnalysisStatus from "features/analysis/AnalysisStatus";
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
import DescriptionList from "components/DescriptionList";

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
              <User small user={data.analysis.author} textColor="text-white" />
            </div>
          </div>
          <AnalysisActionsButton
            analysis={data.analysis}
            project={data.project}
          />
        </div>
      </PageHeader>
      <PageContent className="space-y-4">
        {data.analysis.__typename === "AccessmodAccessibilityAnalysis" && (
          <Block>
            <h3 className="mb-4 flex items-center justify-between">
              {t("Parameters")}
            </h3>
            <DescriptionList>
              <DescriptionList.Item label={t("Land Cover")}>
                {data.analysis.landCover?.name ?? "Automatic"}
              </DescriptionList.Item>
              <DescriptionList.Item label={t("Stack")}>
                {data.analysis.stack?.name ?? "Automatic"}
              </DescriptionList.Item>
              <DescriptionList.Item label={t("Health Facilities")}>
                {data.analysis.healthFacilities?.name ?? "Automatic"}{" "}
              </DescriptionList.Item>
              <DescriptionList.Item label={t("Land Cover")}>
                {data.analysis.landCover?.name ?? "Automatic"}
              </DescriptionList.Item>
              <DescriptionList.Item label={t("Land Cover")}>
                {data.analysis.landCover?.name ?? "Automatic"}
              </DescriptionList.Item>
              <div></div>
              <DescriptionList.Item label={t("Travel Scenario")}>
                {data.analysis.movingSpeeds ? (
                  <table className="who">
                    <thead>
                      <tr>
                        <th>{t("Class")}</th>
                        <th>{t("Speed (in km/h)")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries<[string, string]>(
                        data.analysis.movingSpeeds
                      ).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  t("No travel scenario")
                )}
              </DescriptionList.Item>
            </DescriptionList>
          </Block>
        )}
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
          </Block>
        )}
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
            author {
              ...User_user
            }

            ... on AccessmodAccessibilityAnalysis {
              landCover {
                id
                name
              }
              transportNetwork {
                id
                name
              }
              slope {
                id
                name
              }
              water {
                id
                name
              }
              barrier {
                id
                name
              }
              stack {
                id
                name
              }
              dem {
                id
                name
              }
              stackPriorities
              movingSpeeds
              healthFacilities {
                id
                name
              }
            }
          }
        }
        ${AnalysisActionsButton.fragments.project}
        ${AnalysisActionsButton.fragments.analysis}
        ${AnalysisStatus.fragments.analysis}
        ${AccessibilityAnalysisOutput.fragments.analysis}
        ${AccessibilityAnalysisOutput.fragments.project}
        ${User.fragments.user}
      `,
      variables: {
        id: params.id as string,
        analysisId: params.analysisId as string,
      },
    });
  },
});

export default AnalysisPage;
