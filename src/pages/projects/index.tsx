import { gql } from "@apollo/client";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import Pagination from "components/Pagination";
import SearchInput from "components/SearchInput";
import CountryPicker from "features/CountryPicker";
import ProjectsList from "features/ProjectsList";
import usePrevious from "hooks/usePrevious";
import { ensureArray } from "libs/array";
import { countries, Country } from "libs/countries";
import { useProjectsPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import _ from "lodash";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Variables = {
  page: number;
  perPage: number;
  term: string;
  countries: string[];
};

const ProjectsPage = ({
  defaultVariables,
}: {
  defaultVariables: Variables;
}) => {
  const router = useRouter();
  const [variables, setVariables] = useState<Variables>(defaultVariables);
  const { t } = useTranslation();
  const { loading, data, previousData } = useProjectsPageQuery({
    variables,
  });
  const prevVariables = usePrevious(variables);

  // Update location URL based on the search criteria
  useEffect(() => {
    if (prevVariables && !_.isEqual(prevVariables, variables)) {
      router.push(
        { pathname: routes.project_list, query: variables },
        undefined,
        { shallow: true }
      );
    }
  }, [variables, prevVariables, router]);

  const projects = data?.accessmodProjects || previousData?.accessmodProjects;

  return (
    <Page title={t("Projects")}>
      <PageHeader>
        <Breadcrumbs>
          <Breadcrumbs.Part href="/projects">{t("Projects")}</Breadcrumbs.Part>
        </Breadcrumbs>
        <h1 className="mt-4 text-3xl font-bold text-white">{t("Projects")}</h1>
      </PageHeader>
      <PageContent>
        {projects && (
          <Block>
            <div className="mb-4 flex items-start gap-2">
              <SearchInput
                className="w-80"
                placeholder={t("Search...")}
                loading={loading}
                defaultValue={variables.term ?? ""}
                onChange={(term) =>
                  setVariables({ ...variables, term: term ?? "", page: 1 })
                }
              />
              <div className="w-80">
                <CountryPicker
                  placeholder={t("Filter by country")}
                  onChange={(value) =>
                    setVariables({
                      ...variables,
                      countries: ensureArray<Country>(value).map((x) => x.code),
                      page: 1,
                    })
                  }
                  multiple
                  value={variables.countries.map((c) =>
                    countries.find(({ code }) => code === c)
                  )}
                />
              </div>
            </div>
            {projects.items.length > 0 ? (
              <>
                <ProjectsList projects={projects} />
                <footer className="mt-6">
                  <Pagination
                    perPage={variables.perPage}
                    loading={loading}
                    countItems={projects.items.length}
                    page={variables.page}
                    onChange={(page) => setVariables({ ...variables, page })}
                    totalItems={projects.totalItems}
                    totalPages={projects.totalPages}
                  />
                </footer>
              </>
            ) : (
              <p className="text-center text-sm italic text-gray-700">
                {t("No project matches your criteria")}
              </p>
            )}
          </Block>
        )}
      </PageContent>
    </Page>
  );
};

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async (ctx, client) => {
    const defaultVariables = {
      page: parseInt(`${ctx.query.page}`, 10) || 1,
      perPage: parseInt(`${ctx.query.perPage}`, 10) || 10,
      term: (ctx.query.term as string) ?? "",
      countries: ensureArray(ctx.query.countries || []),
    };
    await Layout.prefetch(client);
    await client.query({
      query: gql`
        query ProjectsPage(
          $term: String
          $countries: [String!]
          $page: Int = 1
          $perPage: Int = 20
        ) {
          accessmodProjects(
            term: $term
            countries: $countries
            page: $page
            perPage: $perPage
          ) {
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
      variables: defaultVariables,
    });

    return {
      props: {
        defaultVariables,
      },
    };
  },
});

export default ProjectsPage;
