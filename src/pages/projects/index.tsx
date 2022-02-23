import { gql } from "@apollo/client";
import Block from "components/Block";
import Layout, { PageHeader } from "components/layouts/Layout";
import Pagination from "components/Pagination";
import ProjectsList from "features/ProjectsList";
import { useProjectsPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { NextPageWithLayout } from "libs/types";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const ProjectsPage: NextPageWithLayout = () => {
  const [pagination, setPagination] = useState({ page: 1, perPage: 20 });
  const { t } = useTranslation();
  const { loading, data, previousData } = useProjectsPageQuery({
    variables: pagination,
  });

  const projects = data?.accessmodProjects || previousData?.accessmodProjects;

  return (
    <>
      <PageHeader>
        <h1 className="text-3xl font-bold text-white">{t("Projects")}</h1>
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

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async (ctx, client) => {
    await Layout.prefetch(client);
    await client.query({
      query: gql`
        query ProjectsPage($page: Int = 1, $perPage: Int = 20) {
          accessmodProjects(page: $page, perPage: $perPage) {
            ...ProjectsList_projects
            pageNumber
            totalPages
            totalItems
          }
        }
        ${ProjectsList.fragments.projects}
      `,
    });
  },
});

export default ProjectsPage;
