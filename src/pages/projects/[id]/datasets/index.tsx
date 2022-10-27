import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/24/outline";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import CreateDatasetDialog from "features/dataset/DatasetFormDialog";
import ProjectDatasetsTable from "features/project/ProjectDatasetsTable";
import {
  AccessmodProjectAuthorizedActions,
  useProjectDatasetsPageQuery,
} from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const ProjectDatasetsPage = () => {
  const [showUploadDialog, toggleUploadDialog] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const { loading, data, refetch } = useProjectDatasetsPageQuery({
    variables: { id: router.query.id as string },
  });

  const onDialogClose = useCallback(
    () => {
      toggleUploadDialog(false);
      refetch();
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
    <Page title={t("Datasets of {{name}}", data.accessmodProject)}>
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
              pathname: routes.project_datasets_list,
              query: { projectId: data.accessmodProject.id },
            }}
          >
            {t("Datasets")}
          </Breadcrumbs.Part>
        </Breadcrumbs>
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <h1 className="text-3xl font-bold text-white">{t("Datasets")}</h1>
          </div>
          {data.accessmodProject.authorizedActions.includes(
            AccessmodProjectAuthorizedActions.CreateFileset
          ) && (
            <Button
              variant="primary"
              onClick={() => toggleUploadDialog(true)}
              leadingIcon={<PlusIcon className="h-4 w-4" />}
            >
              {t("Upload dataset")}
            </Button>
          )}
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
    </Page>
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
        query ProjectDatasetsPage($id: String!) {
          accessmodProject(id: $id) {
            id
            name
            authorizedActions
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

export default ProjectDatasetsPage;
