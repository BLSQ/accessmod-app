import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/solid";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import CreateAnalysisTrigger from "features/CreateAnalysisTrigger";
import ProjectAnalysisTable from "features/ProjectAnalysisTable";
import { useProjectAnalysisPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ProjectAnalysisListPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data } = useProjectAnalysisPageQuery({
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
              pathname: routes.project_analysis_list,
              query: { projectId: data.project.id },
            }}
          >
            {t("Analysis")}
          </Breadcrumbs.Part>
        </Breadcrumbs>
        <h1 className="text-3xl font-bold text-white flex items-center justify-between">
          {t("Analysis")}
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
          <ProjectAnalysisTable perPage={20} project={data.project} />
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
        query ProjectAnalysisPage($id: String!) {
          project: accessmodProject(id: $id) {
            id
            name
            ...CreateAnalysisTrigger_project
            ...ProjectAnalysisTable_project
          }
        }
        ${ProjectAnalysisTable.fragments.project}
        ${CreateAnalysisTrigger.fragments.project}
      `,
      variables: { id: params.id },
    });
    await ProjectAnalysisTable.prefetch(client, {
      projectId: params.id as string,
      perPage: 20,
    });
  },
});

export default ProjectAnalysisListPage;
