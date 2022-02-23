import { gql } from "@apollo/client";
import {
  ChevronRightIcon,
  HomeIcon,
  MapIcon,
  PlusIcon,
  UploadIcon,
  UserIcon,
} from "@heroicons/react/solid";
import Block from "components/Block";
import Button from "components/Button";
import Field from "components/forms/Field";
import Layout, { PageHeader } from "components/layouts/Layout";
import ProjectActionsButton from "features/ProjectActionsButton";
import ProjectAnalysisTable from "features/ProjectAnalysisTable";
import ProjectDatasetsTable from "features/ProjectDatasetsTable";
import ProjectNavbar from "features/ProjectNavbar";
import { useProjectPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { NextPageWithLayout } from "libs/types";
import { useRouter } from "next/router";

const ProjectPage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const { loading, data } = useProjectPageQuery({
    variables: { id: router.query.id as string },
  });

  if (!data?.accessmodProject) {
    // Unknonwn project or not authorized
    return null;
  }
  const project = data.accessmodProject;

  return (
    <>
      <PageHeader className="pb-8 space-y-3">
        <div className="text-white/90 flex items-center gap-x-1 mb-1">
          <HomeIcon className="h-5" />
          <ChevronRightIcon className="h-5" /> Projects
        </div>
        <h1 className="text-3xl font-bold text-white flex justify-between">
          {project.name}
          <ProjectActionsButton project={project} />
        </h1>
        <div className="mt-1 flex space-x-6 text-white text-sm">
          <div className="flex space-x-2 items-center">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img className="h-4" src={project.country.flag} />
            <span>{project.country.name}</span>
          </div>
          <div className="flex space-x-2 items-center">
            <UserIcon className="h-5" />
            <span>{project.owner.email}</span>
          </div>
        </div>
      </PageHeader>
      <div className="flex-1 space-y-6">
        <Block className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center justify-between">
            <span>Project Information</span>
          </h3>
          <div className="grid grid-cols-2 align-top gap-4">
            <Field name="name" label="Project Name" required>
              <span className="text-md">{project.name}</span>
            </Field>
            <Field name="country" label="Country" required>
              <span className="text-md flex items-center gap-1">
                <img className="h-3" src={project.country.flag} />
                <span>{project.country.name}</span>
              </span>
            </Field>
            <Field name="owner" label="Owner" required>
              <span className="text-md">{project.owner.email}</span>
            </Field>
          </div>
        </Block>
        <Block>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center justify-between">
            <span>Analysis</span>
            <Button
              variant="primary"
              leadingIcon={<PlusIcon className="h-4 w-4" />}
            >
              New Analysis
            </Button>
          </h3>
          <ProjectAnalysisTable project={project}></ProjectAnalysisTable>
        </Block>

        <Block>
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center justify-between">
            <span>Datasets</span>
            <Button
              variant="primary"
              leadingIcon={<UploadIcon className="h-4 w-4" />}
            >
              Upload Data
            </Button>
          </h3>
          <ProjectDatasetsTable project={project}></ProjectDatasetsTable>
        </Block>
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
            ...ProjectNavbar_project
            ...ProjectActionsButton_project
            ...ProjectDatasetsTable_project
            ...ProjectAnalysisTable_project

            country {
              name
              code
              flag
            }
            owner {
              email
            }
          }
        }
        ${ProjectActionsButton.fragments.project}
        ${ProjectNavbar.fragments.project}
        ${ProjectDatasetsTable.fragments.project}
        ${ProjectAnalysisTable.fragments.project}
      `,
      variables: { id: params.id },
    });
    await ProjectDatasetsTable.prefetch(client, params.id as string);
  },
});

export default ProjectPage;
