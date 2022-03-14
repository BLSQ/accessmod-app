import { gql } from "@apollo/client";
import { DocumentReportIcon } from "@heroicons/react/outline";
import Breadcrumbs from "components/Breadcrumbs";
import Layout from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import AnalysisForm from "features/analysis/AnalysisForm";
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
    <>
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
        <div className="flex flex-wrap items-center gap-10 gap-y-2 mt-2 text-sm text-white">
          <div className="flex items-center">
            <DocumentReportIcon className="h-5 mr-1.5" />
            {getLabelFromAnalysisType(data.analysis.type)}
          </div>
        </div>
      </PageHeader>
      <PageContent>
        <AnalysisForm project={data.project} analysis={data.analysis} />
      </PageContent>
    </>
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
            ...AnalysisForm_analysis
          }
        }
        ${AnalysisForm.fragments.project}
        ${AnalysisForm.fragments.analysis}
      `,
      variables: { id: params.id, analysisId: params.analysisId },
    });

    if (
      ![
        AccessmodAnalysisStatus.Draft,
        AccessmodAnalysisStatus.Ready,
        undefined,
      ].includes(response.data?.analysis?.status)
    ) {
      return {
        notFound: true,
      };
    }
  },
});

export default AnalysisEditPage;
