import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/outline";
import { UserAddIcon } from "@heroicons/react/solid";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import Layout from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import Pagination from "components/Pagination";
import usePrevious from "hooks/usePrevious";
import { useTeamsPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import _ from "lodash";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";

type Variables = {
  page: number;
  perPage: number;
  term: string;
};

const TeamsPage = ({ defaultVariables }: { defaultVariables: Variables }) => {
  const router = useRouter();
  const [variables, setVariables] = useState<Variables>(defaultVariables);
  const { t } = useTranslation();
  const { loading, data, previousData } = useTeamsPageQuery({
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

  const teams = data?.teams || previousData?.teams;

  const onRowClick = (event: MouseEvent<Element>, row: { id: string }) => {
    // If the user clicked on a button or a anchor, let's this element handles the click and forget about it.
    if (
      event.target instanceof HTMLButtonElement ||
      event.target instanceof HTMLAnchorElement
    ) {
      return;
    }
    router.push({
      pathname: routes.team,
      query: { teamId: row.id },
    });
  };

  return (
    <>
      <PageHeader>
        <Breadcrumbs className="mb-3">
          <Breadcrumbs.Part href="/teams">{t("Teams")}</Breadcrumbs.Part>
        </Breadcrumbs>
        <h1 className="text-3xl font-bold text-white">{t("Teams")}</h1>
      </PageHeader>
      <PageContent>
        {teams && (
          <Block>
            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                leadingIcon={<PlusIcon className="h-4" />}
              >
                {t("Create team")}
              </Button>
            </div>
            <table className="who">
              <thead>
                <tr>
                  <th>{t("Name")}</th>
                  <th>{t("Created by")}</th>
                  <th>{t("Users")}</th>
                  <th>
                    <span className="sr-only">{t("Actions")}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {teams.items.map((team) => (
                  <tr
                    key={team.id}
                    className="cursor-pointer"
                    onClick={(e) => onRowClick(e, team)}
                  >
                    <td>
                      <Link
                        href={{
                          pathname: routes.team,
                          query: { teamId: team.id },
                        }}
                      >
                        <a className="hover:underline">{team.name}</a>
                      </Link>
                    </td>
                    <td></td>
                    <td>
                      {t("{{count}} members", {
                        count: team.memberships.totalItems,
                      })}
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {teams.items.length > 0 ? (
              <>
                <footer className="mt-6">
                  <Pagination
                    perPage={variables.perPage}
                    loading={loading}
                    countItems={teams.items.length}
                    page={variables.page}
                    onChange={(page) => setVariables({ ...variables, page })}
                    totalItems={teams.totalItems}
                    totalPages={teams.totalPages}
                  />
                </footer>
              </>
            ) : (
              <p className="italic text-center text-sm text-gray-700">
                {t("There is no team")}
              </p>
            )}
          </Block>
        )}
      </PageContent>
    </>
  );
};

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async (ctx, client) => {
    const defaultVariables = {
      page: parseInt(`${ctx.query.page}`, 10) || 1,
      perPage: parseInt(`${ctx.query.perPage}`, 10) || 10,
    };
    await Layout.prefetch(client);
    await client.query({
      query: gql`
        query TeamsPage($page: Int = 1, $perPage: Int = 20) {
          teams(page: $page, perPage: $perPage) {
            pageNumber
            totalPages
            totalItems
            items {
              name
              id
              memberships(page: 1, perPage: 5) {
                totalItems
                items {
                  user {
                    id
                    email
                    firstName
                    lastName
                    avatar {
                      initials
                      color
                    }
                  }
                }
              }
              __typename
            }
          }
        }
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

export default TeamsPage;
