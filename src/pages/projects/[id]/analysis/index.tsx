import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/solid";
import Button from "components/Button";
import { PageHeader } from "components/layouts/Layout";
import CrateAnalysisDialog from "features/CreateAnalysisDialog";
import ProjectAnalysisTable from "features/ProjectAnalysisTable";
import ProjectNavbar from "features/ProjectNavbar";
import useToggle from "hooks/useToggle";
import { useProjectAnalysisPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ProjectAnalysisListPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
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
      <div className="flex-1 grid grid-cols-12 gap-4 lg:gap-8">
        <ProjectNavbar
          className="col-span-3 xl:col-span-2"
          project={data.project}
        />
        <div className="col-span-9 xl:col-span-10">
          <h2 className="text-white mb-3 flex justify-between">
            <span>{t("Analysis")}</span>
            <Button
              variant="primary"
              onClick={toggleAnalysisDialog}
              leadingIcon={<PlusIcon className="h-4 w-4" />}
            >
              {t("New Analysis")}
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
            ...ProjectNavbar_project
            ...CrateAnalysisDialog_project
            ...ProjectAnalysisTable_project
          }
        }
        ${ProjectNavbar.fragments.project}
        ${ProjectAnalysisTable.fragments.project}
        ${CrateAnalysisDialog.fragments.project}
      `,
      variables: { id: params.id },
    });
    await ProjectAnalysisTable.prefetch(client, params.id as string);
  },
});

export default ProjectAnalysisListPage;
