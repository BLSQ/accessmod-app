import { gql } from "@apollo/client";
import { UploadIcon } from "@heroicons/react/outline";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import Input from "components/forms/Input";
import Layout from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import SearchInput from "components/SearchInput";
import CreateDatasetDialog from "features/DatasetFormDialog";
import ProjectDatasetsTable from "features/ProjectDatasetsTable";
import { useProjectDataPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const ProjectDataPage = () => {
  const [showUploadDialog, toggleUploadDialog] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const { loading, data } = useProjectDataPageQuery({
    variables: { id: router.query.id as string },
  });

  const onDialogClose = useCallback(
    () => {
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
      <PageHeader>
        <Breadcrumbs className="mb-3">
          <Breadcrumbs.Part href="/projects">{t("Projects")}</Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.project,
              query: { projectId: data.accessmodProject.id },
            }}
          >
            {data.accessmodProject.name}
          </Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.project_dataset_list,
              query: { projectId: data.accessmodProject.id },
            }}
          >
            {t("Datasets")}
          </Breadcrumbs.Part>
        </Breadcrumbs>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <h1 className="text-3xl font-bold text-white">{t("Datasets")}</h1>
          </div>
          <Button
            variant="primary"
            onClick={() => toggleUploadDialog(true)}
            leadingIcon={<UploadIcon className="h-4 w-4" />}
          >
            {t("Upload Data")}
          </Button>
        </div>
      </PageHeader>
      <PageContent>
        <Block>
          <ProjectDatasetsTable
            searchable
            perPage={20}
            project={data.accessmodProject}
          />
        </Block>
      </PageContent>
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
            ...DatasetFormDialog_project
            ...ProjectDatasetsTable_project
          }
        }
        ${CreateDatasetDialog.fragments.project}
        ${ProjectDatasetsTable.fragments.project}
      `,
      variables: { id: params.id },
    });

    await ProjectDatasetsTable.prefetch(client, {
      projectId: params.id as string,
      perPage: 20,
    });
  },
});

export default ProjectDataPage;
