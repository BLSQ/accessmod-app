import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/solid";
import Button from "components/Button";
import { PageHeader } from "components/layouts/Layout";
import CrateAnalysisDialog from "features/CreateAnalysisDialog";
import ProjectAnalysisTable from "features/ProjectAnalysisTable";
import ProjectNavbar from "features/ProjectNavbar";
import useToggle from "hooks/useToggle";
import { addApolloState, getApolloClient } from "libs/apollo";
import { useProjectAnalysisPageQuery } from "libs/graphql";
import { NextPageWithLayout } from "libs/types";
import { withUserRequired } from "libs/withUser";
import { useRouter } from "next/router";

const QUERY = gql`
  query ProjectAnalysisPage($id: String!) {
    project: accessmodProject(id: $id) {
      id
      name
      ...ProjectNavbar_project
      ...CrateAnalysisDialog_project
      ...ProjectAnalysisTable_project
    }
  }
  ${ProjectNavbar.fragments.project}
  ${ProjectAnalysisTable.fragments.project}
  ${CrateAnalysisDialog.fragments.project}
`;

const ProjectDataPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [isAnalysisDialogOpen, { toggle: toggleAnalysisDialog }] =
    useToggle(false);
  const { data } = useProjectAnalysisPageQuery({
    variables: { id: router.query.id as string },
  });

  if (!data?.project) {
    // Unknonwn project or not authorized
    return null;
  }

  return (
    <>
      <PageHeader className="pb-4">
        <h1 className="text-3xl font-bold text-white">{data.project.name}</h1>
      </PageHeader>
      <div className="flex-1 grid grid-cols-12 gap-6 lg:gap-8">
        <ProjectNavbar
          className="col-span-3 xl:col-span-2"
          project={data.project}
        />
        <div className="col-span-9 xl:col-span-10">
          <h2 className="text-white mb-3 flex justify-between">
            <span>Analysis</span>
            <Button
              variant="primary"
              onClick={toggleAnalysisDialog}
              leadingIcon={<PlusIcon className="h-4 w-4" />}
            >
              New Analysis
            </Button>
          </h2>
          <ProjectAnalysisTable project={data.project}></ProjectAnalysisTable>
        </div>
      </div>
      <CrateAnalysisDialog
        open={isAnalysisDialogOpen}
        onClose={toggleAnalysisDialog}
        project={data.project}
      />
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
    await ProjectAnalysisTable.prefetch(client, ctx.params.id);
    return addApolloState(client);
  },
});

export default ProjectDataPage;
