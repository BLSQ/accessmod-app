import { gql } from "@apollo/client";
import Pagination from "components/Pagination";
import Time from "components/Time";
import { CustomApolloClient } from "libs/apollo";
import { useTeamMembersTableQuery } from "libs/graphql";
import { formatMembershipRole } from "libs/team";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import User from "./User";

type Props = {
  team: any;
};

const TeamMembersTable = ({ team }: Props) => {
  const { t } = useTranslation();
  const [variables, setVariables] = useState({
    teamId: team.id,
    page: 1,
    perPage: 10,
  });
  const { data } = useTeamMembersTableQuery({
    variables: {
      teamId: team.id,
    },
  });
  if (!data?.team) {
    return null;
  }

  const { memberships } = data.team;
  return (
    <>
      <table className="who">
        <thead>
          <tr>
            <th>{t("User")}</th>
            <th>{t("Member since")}</th>
            <th>{t("Role")}</th>
            <th>
              <span className="sr-only">{t("Actions")}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {memberships.items.map((member) => (
            <tr key={member.id} className="text-gray-700">
              <td>
                <User user={member.user} small />
              </td>
              <td>
                <Time datetime={member.createdAt} />
              </td>
              <td>{formatMembershipRole(member.role)}</td>
              <td>
                <div className="flex justify-end gap-3">
                  <a
                    href=""
                    className="text-lochmara-500 hover:text-lochmara-700"
                  >
                    {t("Edit")}
                  </a>
                  <a
                    href=""
                    className="text-lochmara-500 hover:text-lochmara-700"
                  >
                    {t("Remove")}
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        countItems={memberships.items.length}
        page={memberships.pageNumber}
        totalItems={memberships.totalItems}
        totalPages={memberships.totalPages}
        perPage={variables.perPage}
        onChange={(page) => setVariables({ ...variables, page })}
      />
    </>
  );
};

TeamMembersTable.fragments = {
  team: gql`
    fragment TeamMembersTable_team on Team {
      id
    }
  `,
};

TeamMembersTable.prefetch = async (
  client: CustomApolloClient,
  options: { teamId: string }
) => {
  await client.query({
    query: gql`
      query TeamMembersTable($teamId: String!) {
        team(id: $teamId) {
          memberships(page: 1, perPage: 10) {
            totalItems
            totalPages
            pageNumber
            items {
              id
              createdAt
              updatedAt
              role
              user {
                ...User_user
              }
            }
          }
        }
      }
      ${User.fragments.user}
    `,
    variables: { teamId: options.teamId },
  });
};

export default TeamMembersTable;
