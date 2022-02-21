import { gql } from "@apollo/client";
import { PageHeader } from "components/layouts/Layout";
import ProjectNavbar from "features/ProjectNavbar";
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
    }
    analysis: accessmodAnalysis(id: $analysisId) {
      id
      name
    }
  }
  ${ProjectNavbar.fragments.project}
`;

const AnalysisEditPage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const { loading, data } = useAnalysisEditPageQuery({
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
        <h1 className="text-3xl font-bold text-white">{data.project?.name}</h1>
      </PageHeader>
      <div className="flex-1 grid grid-cols-12 gap-6 lg:gap-8">
        <ProjectNavbar
          className="col-span-3 xl:col-span-2"
          project={data.project}
        />
        <div className="col-span-9 xl:col-span-10">
          <h2 className="text-white mb-3 flex justify-between">
            <span>Analysis: {data.analysis.name}</span>
          </h2>
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
      variables: { id: ctx.params.id },
    });

    return addApolloState(client);
  },
});

export default AnalysisEditPage;
