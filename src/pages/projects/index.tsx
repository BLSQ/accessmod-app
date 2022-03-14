import { gql } from "@apollo/client";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Layout from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import Pagination from "components/Pagination";
import ProjectsList from "features/ProjectsList";
import { useProjectsPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const ProjectsPage = () => {
  const [pagination, setPagination] = useState({ page: 1, perPage: 20 });
  const { t } = useTranslation();
  const { loading, data, previousData } = useProjectsPageQuery({
    variables: pagination,
  });

  const projects = data?.accessmodProjects || previousData?.accessmodProjects;

  return (
    <>
      <PageHeader>
        <Breadcrumbs>
          <Breadcrumbs.Part href="/projects">{t("Projects")}</Breadcrumbs.Part>
        </Breadcrumbs>
        <h1 className="mt-4 text-3xl font-bold text-white">{t("Projects")}</h1>
      </PageHeader>
      <PageContent>
        {projects && (
          <Block>
            <ProjectsList projects={projects} />
            <footer className="mt-6">
              <Pagination
                perPage={pagination.perPage}
                loading={loading}
                countItems={projects.items.length}
                page={pagination.page}
                onChange={(page) => setPagination({ ...pagination, page })}
                totalItems={projects.totalItems}
                totalPages={projects.totalPages}
              />
            </footer>
          </Block>
        )}
      </PageContent>
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
            items {
              __typename
            }
          }
        }
        ${ProjectsList.fragments.projects}
      `,
    });
  },
});

export default ProjectsPage;
