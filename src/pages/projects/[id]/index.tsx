import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/outline";
import { ClockIcon } from "@heroicons/react/solid";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import DescriptionList from "components/DescriptionList";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import Time from "components/Time";
import Toggle from "components/Toggle";
import CreateAnalysisTrigger from "features/CreateAnalysisTrigger";
import CreateDatasetTrigger from "features/dataset/CreateDatasetTrigger";
import ChangeProjectOwnerDialog from "features/project/ChangeProjectOwnerDialog";
import EditProjectFormBlock from "features/project/EditProjectFormBlock";
import ProjectActionsMenu from "features/project/ProjectActionsMenu";
import ProjectAnalysesTable from "features/project/ProjectAnalysesTable";
import ProjectDatasetsTable from "features/project/ProjectDatasetsTable";
import Team from "features/team/Team";
import User from "features/User";
import useCacheKey from "hooks/useCacheKey";
import useToggle from "hooks/useToggle";
import {
  AccessmodProjectAuthorizedActions,
  ProjectPage_ProjectFragment,
  useProjectPageQuery,
} from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { NextPageWithFragments } from "libs/types";
import { DateTime } from "luxon";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

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
            pathname: routes.project_datasets_list,
            query: { projectId: project.id },
          }}
        >
          <a title={t("See all datasets")} className="hover:underline">
            {t("Latest Datasets")}
          </a>
        </Link>
        <div className="flex items-center space-x-2">
          <Link
            href={{
              pathname: routes.project_datasets_list,
              query: { projectId: project.id },
            }}
          >
            <a style={{ lineHeight: 0 }}>
              <Button variant="white" size="sm">
                {t("View all")}
              </Button>
            </a>
          </Link>
          <CreateDatasetTrigger project={project}>
            {({ onClick }) => (
              <Button
                variant="secondary"
                onClick={onClick}
                size="sm"
                leadingIcon={<PlusIcon className="h-4 w-4" />}
              >
                {t("Upload dataset")}
              </Button>
            )}
          </CreateDatasetTrigger>
        </div>
      </h3>
      <ProjectDatasetsTable project={project} />
    </Block>
  );
};

const ProjectGeneralInformationBlock = (props: {
  project: ProjectPage_ProjectFragment;
  onEdit: () => void;
}) => {
  const { project, onEdit } = props;
  const { t } = useTranslation();
  const descriptionClassNames = clsx(
    "text-md leading-2 max-w-[100ch]",
    !project.description && "text-gray-400"
  );

  return (
    <Block className="relative">
      {project.authorizedActions.includes(
        AccessmodProjectAuthorizedActions.Update
      ) && (
        <div className="absolute top-3 right-4">
          <Button size="sm" variant="white" onClick={onEdit}>
            {t("Edit")}
          </Button>
        </div>
      )}
      <DescriptionList>
        <DescriptionList.Item className="col-span-2" label={t("Description")}>
          <div className={descriptionClassNames}>
            {project.description || t("No description")}
          </div>
        </DescriptionList.Item>
        <DescriptionList.Item
          label={t("Spatial Resolution")}
          help={t(
            "The spatial resolution refers to the linear spacing of a measurement."
          )}
        >
          <span className="text-md">
            {t("{{count}} meter", { count: project.spatialResolution })}
          </span>
        </DescriptionList.Item>
        <DescriptionList.Item
          label={t("Coordinate Reference System Code")}
          help={t(
            "A coordinate reference system (CRS) defines, with the help of coordinates, how the two-dimensional, projected map in your GIS is related to real places on the earth."
          )}
        >
          <span className="text-md">{project.crs}</span>
        </DescriptionList.Item>

        <DescriptionList.Item label={t("Creation date")}>
          <Time datetime={project.createdAt} format={DateTime.DATE_MED} />
        </DescriptionList.Item>

        <DescriptionList.Item
          label={t("Owner")}
          help={t("The user or team responsible for this project")}
        >
          <div className="flex">
            {project.owner?.__typename === "User" && (
              <User small user={project.owner} />
            )}
            {project.owner?.__typename === "Team" && (
              <Team team={project.owner} />
            )}
            {project.authorizedActions.includes(
              AccessmodProjectAuthorizedActions.CreatePermission
            ) && (
              <Toggle>
                {({ isToggled, toggle }) => (
                  <>
                    <Button
                      className="ml-1.5"
                      variant="outlined"
                      size="sm"
                      onClick={toggle}
                    >
                      {t("Edit")}
                    </Button>
                    <ChangeProjectOwnerDialog
                      project={project}
                      open={isToggled}
                      onClose={toggle}
                    />
                  </>
                )}
              </Toggle>
            )}
          </div>
        </DescriptionList.Item>

        <DescriptionList.Item
          label={t("Author")}
          help={t("The user that created this project")}
        >
          <User small user={project.author} />
        </DescriptionList.Item>
      </DescriptionList>
    </Block>
  );
};

const ProjectPage: NextPageWithFragments = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isEditingProject, { toggle: toggleEditingProject }] = useToggle();
  const { data, refetch } = useProjectPageQuery({
    variables: { id: router.query.id as string },
  });

  useCacheKey(["projects", data?.project?.id ?? ""], () => refetch());

  if (!data?.project) {
    // Unknonwn project or not authorized
    return null;
  }
  const { project } = data;

  return (
    <Page title={project.name}>
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
            <div className="mt-2 flex flex-wrap items-center gap-10 gap-y-2 text-sm text-white">
              <div className="flex items-center">
                <img
                  alt={t("Country Flag")}
                  className="mr-2 h-4"
                  src={project.country.flag}
                />
                <span className="shrink-0">{project.country.name}</span>
              </div>

              {data.project.owner?.__typename === "User" && (
                <User small user={data.project.owner} textColor="text-white" />
              )}
              {data.project.owner?.__typename === "Team" && (
                <Team
                  iconClassName="h-5 w-5 mr-1.5"
                  team={data.project.owner}
                />
              )}

              <div className="flex items-center">
                <ClockIcon className="mr-1.5 h-4" />
                <span>
                  {t("Updated at {{date}}", {
                    date: DateTime.fromISO(project.updatedAt).toLocaleString(
                      DateTime.DATETIME_SHORT
                    ),
                  })}
                </span>
              </div>
            </div>
          </div>
          <ProjectActionsMenu project={project} />
        </div>
      </PageHeader>
      <PageContent className="space-y-4">
        {isEditingProject ? (
          <EditProjectFormBlock
            project={project}
            onCancel={toggleEditingProject}
            onSave={toggleEditingProject}
          />
        ) : (
          <ProjectGeneralInformationBlock
            onEdit={toggleEditingProject}
            project={project}
          />
        )}
        <LatestAnalysisBlock project={project} />
        <LatestDatasetsBlock project={project} />
      </PageContent>
    </Page>
  );
};

// We create fragments to be able to type the children of the page easily
ProjectPage.fragments = {
  project: gql`
    fragment ProjectPage_project on AccessmodProject {
      id
      name
      crs
      description
      ...ProjectActionsMenu_project
      ...ProjectAnalysesTable_project
      ...ProjectDatasetsTable_project
      ...CreateAnalysisTrigger_project
      ...CreateDatasetTrigger_project
      ...EditProjectFormBlock_project
      ...ChangeProjectOwnerDialog_project
      authorizedActions

      country {
        name
        code
        flag
      }
      createdAt
      updatedAt
      spatialResolution
      author {
        ...User_user
        email
      }
      owner {
        __typename
        ...User_user
        ...Team_team
      }
    }
    ${ProjectActionsMenu.fragments.project}
    ${User.fragments.user}
    ${Team.fragments.team}
    ${ProjectDatasetsTable.fragments.project}
    ${ChangeProjectOwnerDialog.fragments.project}
    ${ProjectAnalysesTable.fragments.project}
    ${CreateAnalysisTrigger.fragments.project}
    ${CreateDatasetTrigger.fragments.project}
    ${EditProjectFormBlock.fragments.project}
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
