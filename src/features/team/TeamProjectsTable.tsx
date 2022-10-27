import { gql } from "@apollo/client";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Pagination from "components/Pagination";
import Time from "components/Time";
import User from "features/User";
import { CustomApolloClient } from "libs/apollo";
import {
  TeamProjectsTable_TeamFragment,
  useTeamProjectsTableQuery,
} from "libs/graphql";
import { routes } from "libs/router";
import { NextPageWithFragments, NextPageWithPrefetch } from "libs/types";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import Team from "./Team";

type TeamProjectsTableProps = {
  team: TeamProjectsTable_TeamFragment;
};

const TeamProjectsTable: NextPageWithPrefetch & NextPageWithFragments = ({
  team,
}: TeamProjectsTableProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [variables, setVariables] = useState({
    teamIds: [team.id],
    page: 1,
    perPage: 10,
  });
  const { data, loading, previousData } = useTeamProjectsTableQuery({
    variables,
  });

  const { projects } = data ?? previousData ?? {};

  if (!projects) {
    return (
      <p className="text-center text-sm italic text-gray-700">
        {t("There is no project linked to this team")}
      </p>
    );
  }
  const onRowClick = (event: MouseEvent<Element>, row: { id: string }) => {
    // If the user clicked on a button or a anchor, let's this element handles the click and forget about it.
    if (
      event.target instanceof HTMLButtonElement ||
      event.target instanceof HTMLAnchorElement
    ) {
      return;
    }
    router.push({
      pathname: routes.project,
      query: { projectId: row.id },
    });
  };

  return (
    <div>
      {projects.items.length > 0 && (
        <>
          <table className="who">
            <thead>
              <tr>
                <th>{t("Name")}</th>
                <th>{t("Owner")}</th>
                <th>{t("Created on")}</th>
                <th>
                  <span className="sr-only">{t("Actions")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.items.map((project) => (
                <tr
                  key={project.id}
                  className="cursor-pointer"
                  onClick={(e) => onRowClick(e, project)}
                >
                  <td>
                    <Link
                      href={{
                        pathname: routes.project,
                        query: { projectId: project.id },
                      }}
                    >
                      <a className="hover:underline">{project.name}</a>
                    </Link>
                  </td>
                  <td>
                    {project.owner?.__typename === "User" && (
                      <User user={project.owner} small />
                    )}
                    {project.owner?.__typename === "Team" && (
                      <Team team={project.owner} />
                    )}
                  </td>
                  <td>
                    <Time datetime={project.createdAt} />
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            perPage={10}
            loading={loading}
            className="mt-6"
            countItems={projects.items.length}
            page={variables.page}
            onChange={(page) => setVariables({ ...variables, page })}
            totalItems={projects.totalItems}
            totalPages={projects.totalPages}
          />
        </>
      )}
      {projects.items.length === 0 && (
        <p className="text-center text-sm italic text-gray-700">
          {t("There is no project linked to this team")}
        </p>
      )}
    </div>
  );
};

TeamProjectsTable.fragments = {
  team: gql`
    fragment TeamProjectsTable_team on Team {
      id
    }
  `,
};

TeamProjectsTable.prefetch = async (
  client: CustomApolloClient,
  { teamIds }
) => {
  client.query({
    query: gql`
      query TeamProjectsTable(
        $page: Int! = 1
        $perPage: Int = 10
        $teamIds: [String!]!
      ) {
        projects: accessmodProjects(
          teams: $teamIds
          page: $page
          perPage: $perPage
        ) {
          totalPages
          totalItems
          items {
            id
            name
            createdAt
            owner {
              __typename
              ...User_user
              ...Team_team
            }
          }
        }
      }
      ${Team.fragments.team}
      ${User.fragments.user}
    `,
    variables: { page: 1, perPage: 10, teamIds: teamIds },
  });
};

export default TeamProjectsTable;
