import { gql, useQuery } from "@apollo/client";
import { addApolloState, getApolloClient } from "libs/apollo";
import { NextPageWithLayout } from "libs/types";
import { withUserRequired } from "libs/withUser";
import { useProjectsPageQuery } from "libs/graphql";

import ProjectsList from "features/ProjectsList";
import Pagination from "components/Pagination";
import { PageHeader } from "components/layouts/Layout";
import Block from "components/Block";

const QUERY = gql`
  query ProjectsPage {
    accessmodProjects(page: 1, perPage: 20) {
      ...ProjectsList_projects
      pageNumber
      totalPages
      totalItems
    }
  }
  ${ProjectsList.fragments.projects}
`;

const ProjectsPage: NextPageWithLayout = () => {
  const { loading, data, error } = useProjectsPageQuery();

  if (loading || !data) {
    return (
      <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        Loading...
      </div>
    );
  }

  const onChangePage = (page: number) => {};

  return (
    <>
      <PageHeader>
        <h1 className="text-3xl font-bold text-white">Projects</h1>
      </PageHeader>
      <Block>
        <ProjectsList projects={data.accessmodProjects} />
        <footer className="mt-6">
          <Pagination
            perPage={20}
            page={1}
            onChange={onChangePage}
            totalItems={data.accessmodProjects.totalItems}
            totalPages={data.accessmodProjects.totalPages}
          />
        </footer>
      </Block>
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
