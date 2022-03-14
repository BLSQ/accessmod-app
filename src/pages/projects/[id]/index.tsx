import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/outline";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import DescriptionList from "components/DescriptionList";
import Layout from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import Time from "components/Time";
import CreateAnalysisTrigger from "features/CreateAnalysisTrigger";
import CreateDatasetTrigger from "features/CreateDatasetTrigger";
import ProjectActionsButton from "features/ProjectActionsButton";
import ProjectAnalysesTable from "features/ProjectAnalysesTable";
import ProjectDatasetsTable from "features/ProjectDatasetsTable";
import User from "features/User";
import { ProjectPage_ProjectFragment, useProjectPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { NextPageWithFragments } from "libs/types";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

const LatestAnalysisBlock = ({
  project,
}: {
  project: ProjectPage_ProjectFragment;
}) => {
  const { t } = useTranslation();
  return (
    <Block>
      <h3 className="mb-4 flex items-center justify-between">
        <Link
          href={{
            pathname: routes.project_analyses_list,
            query: { projectId: project.id },
          }}
        >
          <a title={t("See all analyses")} className="hover:underline">
            {t("Latest Analyses")}
          </a>
        </Link>
        <div className="flex items-center space-x-2">
          <CreateAnalysisTrigger project={project}>
            {({ onClick }) => (
              <Button
                variant="secondary"
                onClick={onClick}
                size="sm"
                leadingIcon={<PlusIcon className="h-4 w-4" />}
              >
                {t("New Analysis")}
              </Button>
            )}
          </CreateAnalysisTrigger>
          <Link
            href={{
              pathname: routes.project_analyses_list,
              query: { projectId: project.id },
            }}
          >
            <a style={{ lineHeight: 0 }}>
              <Button variant="white" size="sm">
                {t("View all")}
              </Button>
            </a>
          </Link>
        </div>
      </h3>
      <ProjectAnalysesTable project={project} />
    </Block>
  );
};

const LatestDatasetsBlock = ({
  project,
}: {
  project: ProjectPage_ProjectFragment;
}) => {
  const { t } = useTranslation();
  return (
    <Block>
      <h3 className="mb-4 flex items-center justify-between">
        <Link
          href={{
            pathname: routes.project_dataset_list,
            query: { projectId: project.id },
          }}
        >
          <a title={t("See all datasets")} className="hover:underline">
            {t("Latest Datasets")}
          </a>
        </Link>
        <div className="flex items-center space-x-2">
          <CreateDatasetTrigger project={project}>
            {({ onClick }) => (
              <Button
                variant="secondary"
                onClick={onClick}
                size="sm"
                leadingIcon={<PlusIcon className="h-4 w-4" />}
              >
                {t("New Dataset")}
              </Button>
            )}
          </CreateDatasetTrigger>
          <Link
            href={{
              pathname: routes.project_dataset_list,
              query: { projectId: project.id },
            }}
          >
            <a style={{ lineHeight: 0 }}>
              <Button variant="white" size="sm">
                {t("View all")}
              </Button>
            </a>
          </Link>
        </div>
      </h3>
      <ProjectDatasetsTable project={project} />
    </Block>
  );
};

const ProjectPage: NextPageWithFragments = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data } = useProjectPageQuery({
    variables: { id: router.query.id as string },
  });

  if (!data?.project) {
    // Unknonwn project or not authorized
    return null;
  }
  const { project } = data;

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
        </Breadcrumbs>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            <div className="flex flex-wrap items-center gap-10 gap-y-2 mt-2 text-sm text-white">
              <div className="flex items-center">
                <img
                  alt={t("Country Flag")}
                  className="h-4 mr-2"
                  src={project.country.flag}
                />
                <span>{project.country.name}</span>
              </div>
              <User small user={project.owner} textColor="text-white" />
            </div>
          </div>
          <ProjectActionsButton project={project} />
        </div>
      </PageHeader>
      <PageContent className="space-y-4">
        <Block>
          <DescriptionList>
            <DescriptionList.Item label={t("Creation Date")}>
              <span className="text-md">
                <Time datetime={project.createdAt} />
              </span>
            </DescriptionList.Item>
            <DescriptionList.Item
              label={t("Spatial Resolution")}
              help={t(
                "The spatial resolution refers to the linear spacing of a measurement."
              )}
            >
              <span className="text-md">{project.spatialResolution}</span>
            </DescriptionList.Item>
            <DescriptionList.Item
              label={t("Coordinate Reference System")}
              help={t(
                "A coordinate reference system (CRS) defines, with the help of coordinates, how the two-dimensional, projected map in your GIS is related to real places on the earth."
              )}
            >
              <span className="text-md">{project.crs}</span>
            </DescriptionList.Item>
          </DescriptionList>
        </Block>
        <LatestAnalysisBlock project={project} />
        <LatestDatasetsBlock project={project} />
      </PageContent>
    </>
  );
};

// We create fragments to be able to type the children of the page easily
ProjectPage.fragments = {
  project: gql`
    fragment ProjectPage_project on AccessmodProject {
      id
      name
      crs
      ...ProjectActionsButton_project
      ...ProjectAnalysesTable_project
      ...ProjectDatasetsTable_project
      ...CreateAnalysisTrigger_project
      ...CreateDatasetTrigger_project
      country {
        name
        code
        flag
      }
      createdAt
      spatialResolution
      owner {
        ...User_user
        email
      }
    }
    ${User.fragments.user}
    ${ProjectDatasetsTable.fragments.project}
    ${ProjectAnalysesTable.fragments.project}
    ${ProjectActionsButton.fragments.project}
    ${CreateAnalysisTrigger.fragments.project}
    ${CreateDatasetTrigger.fragments.project}
  `,
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
          project: accessmodProject(id: $id) {
            ...ProjectPage_project
          }
        }
        ${ProjectPage.fragments.project}
      `,
      variables: { id: params.id },
    });
    await ProjectAnalysesTable.prefetch(client, {
      projectId: params.id as string,
    });
    await ProjectDatasetsTable.prefetch(client, {
      projectId: params.id as string,
    });
  },
});

export default ProjectPage;
