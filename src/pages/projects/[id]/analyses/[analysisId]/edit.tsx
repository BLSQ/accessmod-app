import { gql } from "@apollo/client";
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "components/Breadcrumbs";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import AnalysisForm from "features/analysis/AnalysisForm";
import AnalysisStatus from "features/analysis/AnalysisStatus";
import { getLabelFromAnalysisType } from "libs/analysis";
import {
  AccessmodAnalysisStatus,
  AnalysisEditPageQuery,
  useAnalysisEditPageQuery,
} from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const AnalysisEditPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data, loading } = useAnalysisEditPageQuery({
    variables: {
      id: router.query.id as string,
      analysisId: router.query.analysisId as string,
    },
  });

  if (!data?.project || !data.analysis || loading) {
    // Unknonwn project or not authorized
    return null;
  }

  return (
    <Page
      title={
        data.analysis
          ? t("Editing analysis {{name}}", { name: data.analysis.name })
          : t("New Analysis")
      }
    >
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
              pathname: routes.project,
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
        <h1 className="text-3xl font-bold text-white">
          {t("Analysis {{name}}", { name: data.analysis.name })}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-10 gap-y-2 text-sm text-white">
          <div className="flex items-center">
            <DocumentChartBarIcon className="mr-1.5 h-5" />
            {getLabelFromAnalysisType(data.analysis.type)}
          </div>
          <AnalysisStatus analysis={data.analysis} />
        </div>
      </PageHeader>
      <PageContent>
        <AnalysisForm project={data.project} analysis={data.analysis} />
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
    const response = await client.query<AnalysisEditPageQuery>({
      query: gql`
        query AnalysisEditPage($id: String!, $analysisId: String!) {
          project: accessmodProject(id: $id) {
            id
            name
            ...AnalysisForm_project
          }
          analysis: accessmodAnalysis(id: $analysisId) {
            __typename
            id
            type
            name
            status
            permissions {
              update
            }
            ...AnalysisStatus_analysis
            ...AnalysisForm_analysis
          }
        }
        ${AnalysisForm.fragments.project}
        ${AnalysisStatus.fragments.analysis}
        ${AnalysisForm.fragments.analysis}
      `,
      variables: { id: params.id, analysisId: params.analysisId },
    });

    if (
      ![
        AccessmodAnalysisStatus.Draft,
        AccessmodAnalysisStatus.Ready,
        undefined,
      ].includes(response.data?.analysis?.status) ||
      !response.data?.analysis?.permissions.update
    ) {
      return {
        notFound: true,
      };
    }
  },
});

export default AnalysisEditPage;
