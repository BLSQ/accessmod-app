import { gql } from "@apollo/client";
import Layout, { PageHeader } from "components/layouts/Layout";
import { ANALYSIS } from "features/analysis";
import AccessibilityAnalysisForm from "features/analysis/AccessibilityAnalysisForm";
import ProjectNavbar from "features/ProjectNavbar";
import {
  AccessmodAnalysisStatus,
  AnalysisEditPageQuery,
  useAnalysisEditPageQuery,
} from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { NextPageWithLayout } from "libs/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const AnalysisEditPage: NextPageWithLayout = (props) => {
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

  const AnalysisComponents = ANALYSIS[data.analysis.type];
  if (!AnalysisComponents) return <div>{t("Unknown analysis type")}</div>;

  return (
    <>
      <PageHeader className="pb-4">
        <h1 className="text-3xl font-bold text-white">{data.project.name}</h1>
      </PageHeader>
      <div className=" relative flex-1 grid grid-cols-12 gap-4 lg:gap-8">
        <div className="col-span-4 xl:col-span-3">
          <AnalysisComponents.Aside />
        </div>
        <div className="col-span-8 xl:col-span-9">
          <AnalysisComponents.Form
            project={data.project}
            analysis={data.analysis}
          />
        </div>
      </div>
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
            ...ProjectNavbar_project
            ...AccessibilityAnalysisForm_project
          }
          analysis: accessmodAnalysis(id: $analysisId) {
            __typename
            id
            type
            name
            status
            ...AccessibilityAnalysisForm_analysis
          }
        }
        ${AccessibilityAnalysisForm.fragments.project}
        ${AccessibilityAnalysisForm.fragments.analysis}
        ${ProjectNavbar.fragments.project}
      `,
      variables: { id: params.id, analysisId: params.analysisId },
    });

    if (
      [
        AccessmodAnalysisStatus.Running,
        AccessmodAnalysisStatus.Success,
        AccessmodAnalysisStatus.Queued,
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
