import { gql } from "@apollo/client";
import { addApolloState, getApolloClient } from "libs/apollo";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "libs/types";
import { withUserRequired } from "libs/withUser";
import { PageHeader } from "components/layouts/Layout";
import ProjectNavbar from "features/ProjectNavbar";
import Button from "components/Button";
import { UploadIcon } from "@heroicons/react/outline";
import { useProjectDataPageQuery } from "libs/graphql";
import CreateDatasetDialog from "features/CreateDatasetDialog";
import { useCallback, useState } from "react";
import ProjectFilesetsTable from "features/ProjectFilesetsTable";
import useCacheKey from "hooks/useCacheKey";

const QUERY = gql`
  query ProjectDataPage($id: String!) {
    accessmodProject(id: $id) {
      id
      name
      ...ProjectNavbar_project
      ...CreateDatasetDialog_project
      ...ProjectFilesetsTable_project
    }
  }
  ${ProjectNavbar.fragments.project}
  ${CreateDatasetDialog.fragments.project}
  ${ProjectFilesetsTable.fragments.project}
`;

const ProjectDataPage: NextPageWithLayout = () => {
  const [showUploadDialog, toggleUploadDialog] = useState(false);
  const router = useRouter();
  const { loading, data, refetch } = useProjectDataPageQuery({
    variables: { id: router.query.id as string },
  });

  const clearFilesets = useCacheKey(["filesets"]);

  const onDialogClose = useCallback(
    (reason?: string) => {
      if (reason === "submit") {
        // Reload filesets
        clearFilesets();
      }
      toggleUploadDialog(false);
    },
    [showUploadDialog]
  );

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
      <CreateDatasetDialog
        project={data.accessmodProject}
        open={showUploadDialog}
        onClose={onDialogClose}
      />
      <PageHeader className="pb-4">
        <h1 className="text-3xl font-bold text-white">
          {data.accessmodProject?.name}
        </h1>
      </PageHeader>
      <div className="flex-1 grid grid-cols-12 gap-6 lg:gap-8">
        <ProjectNavbar
          project={data.accessmodProject}
          className="col-span-3 xl:col-span-2"
        />
        <div className="col-span-9 xl:col-span-10">
          <h2 className="text-white mb-3 flex justify-between">
            <span>Datasets</span>
            <Button
              variant="primary"
              onClick={() => toggleUploadDialog(true)}
              leadingIcon={<UploadIcon className="h-4 w-4" />}
            >
              Upload Data
            </Button>
          </h2>
          <ProjectFilesetsTable
            project={data.accessmodProject}
          ></ProjectFilesetsTable>
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
    await ProjectFilesetsTable.prefetch(client, ctx.params.id);

    return addApolloState(client);
  },
});

export default ProjectDataPage;
