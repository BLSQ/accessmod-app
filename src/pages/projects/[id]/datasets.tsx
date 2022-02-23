import { gql } from "@apollo/client";
import { UploadIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import Layout, { PageHeader } from "components/layouts/Layout";
import CreateDatasetDialog from "features/CreateDatasetDialog";
import ProjectDatasetsTable from "features/ProjectDatasetsTable";
import ProjectNavbar from "features/ProjectNavbar";
import useCacheKey from "hooks/useCacheKey";
import { useProjectDataPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { NextPageWithLayout } from "libs/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const ProjectDataPage: NextPageWithLayout = () => {
  const [showUploadDialog, toggleUploadDialog] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showUploadDialog]
  );

  if (loading || !data) {
    return null;
  }

  if (!data.accessmodProject) {
    // Unknown project or not authorized
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
      <div className="flex-1 grid grid-cols-12 gap-4 lg:gap-8">
        <ProjectNavbar
          project={data.accessmodProject}
          className="col-span-3 xl:col-span-2"
        />
        <div className="col-span-9 xl:col-span-10">
          <h2 className="text-white mb-3 flex justify-between">
            <span>{t("Datasets")}</span>
            <Button
              variant="primary"
              onClick={() => toggleUploadDialog(true)}
              leadingIcon={<UploadIcon className="h-4 w-4" />}
            >
              {t("Upload Data")}
            </Button>
          </h2>
          <ProjectDatasetsTable
            project={data.accessmodProject}
          ></ProjectDatasetsTable>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async ({ params }, client) => {
    if (!params?.id) {
      // Project id not given, we consider this as a 404
      return { notFound: true };
    }
    await Layout.prefetch(client);

    await client.query({
      query: gql`
        query ProjectDataPage($id: String!) {
          accessmodProject(id: $id) {
            id
            name
            ...ProjectNavbar_project
            ...CreateDatasetDialog_project
            ...ProjectDatasetsTable_project
          }
        }
        ${ProjectNavbar.fragments.project}
        ${CreateDatasetDialog.fragments.project}
        ${ProjectDatasetsTable.fragments.project}
      `,
      variables: { id: params.id },
    });

    await ProjectDatasetsTable.prefetch(client, params.id as string);
  },
});

export default ProjectDataPage;
