import { gql } from "@apollo/client";
import Block from "components/Block";
import Field from "components/forms/Field";
import Layout, { PageHeader } from "components/layouts/Layout";
import ProjectActionsButton from "features/ProjectActionsButton";
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
      <PageHeader className="pb-4">
        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
      </PageHeader>
      <div className="flex-1 grid grid-cols-12 gap-4 lg:gap-7">
        <div className="col-span-3 xl:col-span-2">
          <ProjectNavbar project={project} />
        </div>
        <div className="col-span-9 xl:col-span-10">
          <h2 className="text-white mb-3 flex justify-between">
            <span>Project Information</span>
            <ProjectActionsButton project={project} />
          </h2>
          <Block className="grid grid-cols-2 align-top gap-4">
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
            ...ProjectNavbar_project
            ...ProjectActionsButton_project
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
      `,
      variables: { id: params.id },
    });
  },
});

export default ProjectPage;
