import { gql } from "@apollo/client";
import Pagination from "components/Pagination";
import Time from "components/Time";
import useCacheKey from "hooks/useCacheKey";
import { CustomApolloClient } from "libs/apollo";
import {
  Membership,
  MembershipRole,
  useTeamMembersTableQuery,
  useUpdateMembershipMutation,
} from "libs/graphql";
import { formatMembershipRole } from "libs/team";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import MembershipRolePicker from "./MembershipRolePicker";
import User from "./User";
import DeleteMembershipTrigger from "./team/DeleteMembershipTrigger";

type Props = {
  team: any;
};

const MUTATION = gql`
  mutation UpdateMembership($input: UpdateMembershipInput!) {
    updateMembership(input: $input) {
      success
      errors
      membership {
        id
        role
      }
    }
  }
`;

const TeamMembersTable = ({ team }: Props) => {
  const { t } = useTranslation();
  const [variables, setVariables] = useState({
    teamId: team.id,
    page: 1,
    perPage: 10,
  });
  const { data, refetch } = useTeamMembersTableQuery({
    variables: {
      teamId: team.id,
    },
  });
  const [updateMember] = useUpdateMembershipMutation();
  useCacheKey(["teams", team.id], () => refetch());

  if (!data?.team) {
    return null;
  }

  const { memberships } = data.team;
  const onMemberRoleChange = async (
    member: Pick<Membership, "id">,
    role: MembershipRole
  ) => {
    await updateMember({ variables: { input: { id: member.id, role } } });
  };

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
              <td>
                {member.permissions.update ? (
                  <MembershipRolePicker
                    onChange={(role) => onMemberRoleChange(member, role)}
                    value={member.role}
                    required
                  />
                ) : (
                  formatMembershipRole(member.role)
                )}
              </td>
              <td>
                <div className="flex justify-end gap-3">
                  {member.permissions.delete && (
                    <DeleteMembershipTrigger membership={member}>
                      {({ onClick }) => (
                        <button
                          onClick={onClick}
                          className="text-lochmara-500 hover:text-lochmara-700"
                        >
                          {t("Remove")}
                        </button>
                      )}
                    </DeleteMembershipTrigger>
                  )}
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
      query TeamMembersTable($teamId: UUID!) {
        team(id: $teamId) {
          memberships(page: 1, perPage: 10) {
            totalItems
            totalPages
            pageNumber
            items {
              ...DeleteMembershipTrigger_membership
              id
              permissions {
                update
                delete
              }
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
      ${DeleteMembershipTrigger.fragments.membership}
    `,
    variables: { teamId: options.teamId },
  });
};

export default TeamMembersTable;
