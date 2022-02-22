import { gql } from "@apollo/client";
import { PageHeader } from "components/layouts/Layout";
import { ANALYSIS } from "features/analysis";
import AccessibilityAnalysisForm from "features/analysis/AccessibilityAnalysisForm";
import ProjectNavbar from "features/ProjectNavbar";
import { getAnalysisComponentsFromTypename } from "libs/analysis";
import { addApolloState, getApolloClient } from "libs/apollo";
import { useAnalysisEditPageQuery } from "libs/graphql";
import { NextPageWithLayout } from "libs/types";
import { withUserRequired } from "libs/withUser";
import { useRouter } from "next/router";

const QUERY = gql`
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
      ...AccessibilityAnalysisForm_analysis
    }
  }
  ${AccessibilityAnalysisForm.fragments.project}
  ${AccessibilityAnalysisForm.fragments.analysis}
  ${ProjectNavbar.fragments.project}
`;

const AnalysisEditPage: NextPageWithLayout = (props) => {
  const router = useRouter();
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
  if (!AnalysisComponents) return <div>Unknown analysis type</div>;

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
          <h2 className="text-white mb-3 flex justify-between">
            Create a new {AnalysisComponents.label}
          </h2>
          <AnalysisComponents.Form
            project={data.project}
            analysis={data.analysis}
          />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = withUserRequired({
  getServerSideProps: async (ctx) => {
    const client = getApolloClient({ headers: ctx.req?.headers });
    await client.query({
      query: QUERY,
      variables: { id: ctx.params.id, analysisId: ctx.params.analysisId },
    });

    return addApolloState(client);
  },
});

export default AnalysisEditPage;
