import { gql } from "@apollo/client";
import { addApolloState, getApolloClient } from "libs/apollo";
import { NextPageWithLayout } from "libs/types";
import { withUserRequired } from "libs/withUser";
import { useProjectsPageQuery } from "libs/graphql";

import ProjectsList from "features/ProjectsList";
import Pagination from "components/Pagination";
import { PageHeader } from "components/layouts/Layout";
import Block from "components/Block";
import { useState } from "react";

const QUERY = gql`
  query ProjectsPage($page: Int = 1, $perPage: Int = 20) {
    accessmodProjects(page: $page, perPage: $perPage) {
      ...ProjectsList_projects
      pageNumber
      totalPages
      totalItems
    }
  }
  ${ProjectsList.fragments.projects}
`;

const ProjectsPage: NextPageWithLayout = () => {
  const [pagination, setPagination] = useState({ page: 1, perPage: 20 });
  const { loading, data, previousData } = useProjectsPageQuery({
    variables: pagination,
  });

  const projects = data?.accessmodProjects || previousData?.accessmodProjects;

  return (
    <>
      <PageHeader>
        <h1 className="text-3xl font-bold text-white">Projects</h1>
      </PageHeader>
      {projects && (
        <Block>
          <ProjectsList projects={projects} />
          <footer className="mt-6">
            <Pagination
              perPage={20}
              loading={loading}
              page={1}
              onChange={(page) => setPagination({ ...pagination, page })}
              totalItems={projects.totalItems}
              totalPages={projects.totalPages}
            />
          </footer>
        </Block>
      )}
    </>
  );
};

export const getServerSideProps = withUserRequired({
  getServerSideProps: async (ctx) => {
    const client = getApolloClient({ headers: ctx.req?.headers });
    await client.query({
      query: QUERY,
    });

    return addApolloState(client);
  },
});

export default ProjectsPage;
