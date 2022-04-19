import { gql } from "@apollo/client";
import { DocumentReportIcon } from "@heroicons/react/solid";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import AnalysisActionsButton from "features/analysis/AnalysisActionsButton";
import AnalysisOutput from "features/analysis/AnalysisOutput";
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
              {t("Input Parameters")}
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {t("Land Cover")}
                </dt>
                <dd className="col-span-2 mt-1 text-sm text-gray-900">
                  {data.analysis.landCover?.name ?? "Automatic"}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {t("Barrier")}
                </dt>
                <dd className="col-span-2 mt-1 text-sm text-gray-900">
                  {data.analysis.barrier?.name ?? "Automatic"}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {t("Water")}
                </dt>
                <dd className="col-span-2 mt-1 text-sm text-gray-900">
                  {data.analysis.water?.name ?? "Automatic"}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {t("Health Facilities")}
                </dt>
                <dd className="col-span-2 mt-1 text-sm text-gray-900">
                  {data.analysis.healthFacilities?.name ?? "Automatic"}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {t("Slope")}
                </dt>
                <dd className="col-span-2 mt-1 text-sm text-gray-900">
                  {data.analysis.slope?.name ?? "Automatic"}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {t("Travel Scenario")}
                </dt>
                <dd className="col-span-2 mt-1 text-sm text-gray-900">
                  {data.analysis.movingSpeeds?.name ?? "Automatic"}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {t("Transport Network")}
                </dt>
                <dd className="col-span-2 mt-1 text-sm text-gray-900">
                  {data.analysis.transportNetwork?.name ?? "Automatic"}
                </dd>
              </div>
            </dl>
          </Block>
        )}
        {data.analysis.status === AccessmodAnalysisStatus.Success && (
          <Block>
            <h3 className="mb-4 flex items-center justify-between">
              {t("Output")}
            </h3>
            <AnalysisOutput analysis={data.analysis} />
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
            ...AnalysisOutput_analysis
            author {
              ...User_user
            }

            ... on AccessmodAccessibilityAnalysis {
              landCover {
                name
              }
              transportNetwork {
                name
              }
              slope {
                name
              }
              water {
                name
              }
              barrier {
                name
              }
              movingSpeeds {
                name
              }
              healthFacilities {
                name
              }
            }
          }
        }
        ${AnalysisActionsButton.fragments.project}
        ${AnalysisActionsButton.fragments.analysis}
        ${AnalysisStatus.fragments.analysis}
        ${AnalysisOutput.fragments.analysis}
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
