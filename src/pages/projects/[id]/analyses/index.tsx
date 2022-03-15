import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/solid";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import CreateAnalysisTrigger from "features/CreateAnalysisTrigger";
import ProjectAnalysesTable from "features/ProjectAnalysesTable";
import { useProjectAnalysesPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ProjectAnalysesListPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data } = useProjectAnalysesPageQuery({
    variables: { id: router.query.id as string },
  });

  if (!data?.project) {
    // Unknonwn project or not authorized
    return null;
  }

  return (
    <>
      <PageHeader>
        <Breadcrumbs className="mb-3">
          <Breadcrumbs.Part href="/projects">{t("Projects")}</Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.project,
              query: { projectId: data.project.id },
            }}
          >
            {data.project.name}
          </Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.project_analyses_list,
              query: { projectId: data.project.id },
            }}
          >
            {t("Analyses")}
          </Breadcrumbs.Part>
        </Breadcrumbs>
        <h1 className="text-3xl font-bold text-white flex items-center justify-between">
          {t("Analyses")}
          <CreateAnalysisTrigger project={data.project}>
            {({ onClick }) => (
              <Button
                variant="primary"
                onClick={onClick}
                leadingIcon={<PlusIcon className="h-4 w-4" />}
              >
                {t("New Analysis")}
              </Button>
            )}
          </CreateAnalysisTrigger>
        </h1>
      </PageHeader>
      <PageContent>
        <Block>
          <ProjectAnalysesTable perPage={20} project={data.project} />
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
    // await Layout.prefetch(client);

    await client.query({
      query: gql`
        query ProjectAnalysesPage($id: String!) {
          project: accessmodProject(id: $id) {
            id
            name
            ...CreateAnalysisTrigger_project
            ...ProjectAnalysesTable_project
          }
        }
        ${ProjectAnalysesTable.fragments.project}
        ${CreateAnalysisTrigger.fragments.project}
      `,
      variables: { id: params.id },
    });
    await ProjectAnalysesTable.prefetch(client, {
      projectId: params.id as string,
      perPage: 20,
    });
  },
});

export default ProjectAnalysesListPage;
