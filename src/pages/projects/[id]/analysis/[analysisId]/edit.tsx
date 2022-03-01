import { gql } from "@apollo/client";
import Layout, { PageHeader } from "components/layouts/Layout";
import AccessibilityAnalysisForm from "features/analysis/AccessibilityAnalysisForm";
import AnalysisForm from "features/analysis/AnalysisForm";
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

const AnalysisEditPage: NextPageWithLayout = () => {
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
      <PageHeader className="pb-4">
        <h1 className="text-3xl font-bold text-white">{data.analysis.name}</h1>
      </PageHeader>
      <AnalysisForm project={data.project} analysis={data.analysis} />
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
