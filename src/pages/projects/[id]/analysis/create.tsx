import { gql } from "@apollo/client";
import { PageHeader } from "components/layouts/Layout";
import { ANALYSIS } from "features/analysis";
import AccessibilityAnalysisForm from "features/analysis/AccessibilityAnalysisForm";
import { addApolloState, getApolloClient } from "libs/apollo";
import { useProjectCreateAnalysisPageQuery } from "libs/graphql";
import { NextPageWithLayout } from "libs/types";
import { withUserRequired } from "libs/withUser";
import { useRouter } from "next/router";

const QUERY = gql`
  query ProjectCreateAnalysisPage($id: String!) {
    accessmodProject(id: $id) {
      id
      name
      ...AccessibilityAnalysisForm_project
    }
  }
  ${AccessibilityAnalysisForm.fragments.project}
`;

const ProjectCreateAnalysisPage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const { loading, data } = useProjectCreateAnalysisPageQuery({
    variables: { id: router.query.id as string },
  });

  if (!data?.accessmodProject || !router.query.type) {
    // Unknonwn project or not authorized
    return null;
  }

  const Analysis = ANALYSIS[router.query.type as string];
  if (!Analysis) return null;

  return (
    <>
      <PageHeader className="pb-4">
        <h1 className="text-3xl font-bold text-white">
          {data.accessmodProject?.name}
        </h1>
      </PageHeader>
      <div className=" relative flex-1 grid grid-cols-12 gap-6 lg:gap-8">
        <div className="col-span-4 xl:col-span-3">
          <Analysis.Aside />
        </div>
        <div className="col-span-8 xl:col-span-9">
          <h2 className="text-white mb-3 flex justify-between">
            Create a new {Analysis.label}
          </h2>
          <Analysis.Form project={data.accessmodProject} />
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

export default ProjectCreateAnalysisPage;
