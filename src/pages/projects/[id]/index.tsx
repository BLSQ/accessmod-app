import { gql } from "@apollo/client";
import Block from "components/Block";
import DescriptionList from "components/DescriptionList";
import Layout, { PageHeader } from "components/layouts/Layout";
import ProjectActionsButton from "features/ProjectActionsButton";
import ProjectNavbar from "features/ProjectNavbar";
import { useProjectPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { NextPageWithLayout } from "libs/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ProjectPage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data } = useProjectPageQuery({
    variables: { id: router.query.id as string },
  });

  if (!data?.accessmodProject) {
    // Unknonwn project or not authorized
    return null;
  }
  const project = data.accessmodProject;

  return (
    <>
      <PageHeader className="pb-4">
        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
      </PageHeader>
      <div className="flex-1 grid grid-cols-12 gap-4 lg:gap-7">
        <div className="col-span-3 xl:col-span-2">
          <ProjectNavbar project={project} />
        </div>
        <div className="col-span-9 xl:col-span-10">
          <h2 className="text-white mb-3 flex justify-between">
            <span>{t("Project Information")}</span>
            <ProjectActionsButton project={project} />
          </h2>
          <Block>
            <DescriptionList>
              <DescriptionList.Item label={t("Country")}>
                <span className="flex items-center">
                  <img
                    alt={t("Country Flag")}
                    className="h-3 mr-1"
                    src={project.country.flag}
                  />
                  <span>{project.country.name}</span>
                </span>
              </DescriptionList.Item>
              <DescriptionList.Item label={t("Owner")}>
                <span className="text-md">{project.owner.email}</span>
              </DescriptionList.Item>
              <DescriptionList.Item label={t("Spatial Resolution")}>
                <span className="text-md">{project.spatialResolution}</span>
              </DescriptionList.Item>
              <DescriptionList.Item label={t("Coordinate Reference System")}>
                <span className="text-md">{project.crs}</span>
              </DescriptionList.Item>
            </DescriptionList>
          </Block>
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
        query ProjectPage($id: String!) {
          accessmodProject(id: $id) {
            id
            name
            crs
            ...ProjectNavbar_project
            ...ProjectActionsButton_project
            country {
              name
              code
              flag
            }
            spatialResolution
            owner {
              email
            }
          }
        }
        ${ProjectActionsButton.fragments.project}
        ${ProjectNavbar.fragments.project}
      `,
      variables: { id: params.id },
    });
  },
});

export default ProjectPage;
