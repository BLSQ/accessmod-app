import { gql } from "@apollo/client";
import { addApolloState, getApolloClient } from "libs/apollo";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "libs/types";
import { withUserRequired } from "libs/withUser";
import { useProjectPageQuery } from "libs/graphql";
import { PageHeader } from "components/layouts/Layout";
import ProjectNavbar from "features/ProjectNavbar";
import Button from "components/Button";
import { UploadIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";

const QUERY = gql`
  query ProjectAnalysisPage($id: String!) {
    accessmodProject(id: $id) {
      id
      name
      ...ProjectNavbar_project
    }
  }
  ${ProjectNavbar.fragments.project}
`;

const ProjectAnalysisPage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const { loading, data } = useProjectPageQuery({
    variables: { id: router.query.id as string },
  });

  if (loading || !data) {
    return (
      <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        Loading...
      </div>
    );
  }

  if (!data.accessmodProject) {
    // Unknonwn project or not authorized
    return null;
  }

  return (
    <>
      <PageHeader className="pb-4">
        <h1 className="text-3xl font-bold text-white">
          {data.accessmodProject?.name}
        </h1>
      </PageHeader>
      <div className="flex-1 grid grid-cols-12 gap-6 lg:gap-8 overflow-x-hidden">
        <ProjectNavbar
          className="col-span-3 xl:col-span-2"
          project={data.accessmodProject}
        />
        <div className="col-span-9 xl:col-span-10">
          <h2 className="text-white mb-3 flex justify-between">
            <span>Analysis</span>
            <Button
              variant="primary"
              leadingIcon={<PlusIcon className="h-4 w-4" />}
            >
              New Analysis
            </Button>
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

export default ProjectAnalysisPage;
