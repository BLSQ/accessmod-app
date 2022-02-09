import { gql } from "@apollo/client";
import { addApolloState, getApolloClient } from "libs/apollo";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "libs/types";
import { withUserRequired } from "libs/withUser";
import { PageHeader } from "components/layouts/Layout";
import ProjectNavbar from "features/ProjectNavbar";
import Table from "components/Table";
import Button from "components/Button";
import { UploadIcon } from "@heroicons/react/outline";
import { useProjectDataPageQuery } from "libs/graphql";

const QUERY = gql`
  query ProjectDataPage($id: String!) {
    accessmodProject(id: $id) {
      id
      name
      ...ProjectNavbar_project
    }
  }
  ${ProjectNavbar.fragments.project}
`;

const ProjectDataPage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const { loading, data } = useProjectDataPageQuery({
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
      <div className="flex flex-1 space-x-6">
        <ProjectNavbar project={data.accessmodProject} />
        <div className="flex-1">
          <h2 className="text-white mb-3 flex justify-between">
            <span>Data</span>
            <Button
              variant="primary"
              leadingIcon={<UploadIcon className="h-4 w-4" />}
            >
              Upload Data
            </Button>
          </h2>
          <Table />
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

export default ProjectDataPage;
