import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/24/outline";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import InviteTeamMemberTrigger from "features/InviteTeamMemberTrigger";
import TeamActionsMenu from "features/team/TeamActionsMenu";
import TeamFormDialog from "features/team/TeamFormDialog";
import TeamProjectsTable from "features/team/TeamProjectsTable";
import TeamMembersTable from "features/TeamMembersTable";
import { TeamPageQueryVariables, useTeamPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";

const TeamPage = ({
  defaultVariables,
}: {
  defaultVariables: TeamPageQueryVariables;
}) => {
  const { data, previousData } = useTeamPageQuery({
    variables: defaultVariables,
  });
  const { t } = useTranslation();
  const { team } = data || previousData || {};

  if (!team) {
    return null;
  }

  return (
    <Page title={t("Team {{name}}", { name: team.name })}>
      <PageHeader>
        <Breadcrumbs className="mb-3">
          <Breadcrumbs.Part href="/teams">{t("Teams")}</Breadcrumbs.Part>
          <Breadcrumbs.Part
            href={{
              pathname: routes.team,
              query: { teamId: team.id },
            }}
          >
            {team.name}
          </Breadcrumbs.Part>
        </Breadcrumbs>
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-3xl font-bold text-white">{team.name}</h1>
          <TeamActionsMenu team={team} />
        </div>
      </PageHeader>
      <PageContent className="space-y-4">
        <Block>
          <h3 className="mb-4 flex items-center justify-between">
            {t("Members")}

            <div className="flex items-center space-x-2">
              <InviteTeamMemberTrigger team={team}>
                {({ onClick }) => (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={onClick}
                    leadingIcon={<PlusIcon className="h-4 w-4" />}
                  >
                    {t("Add a member")}
                  </Button>
                )}
              </InviteTeamMemberTrigger>
            </div>
          </h3>
          <TeamMembersTable team={team} />
        </Block>
        <Block>
          <h3 className="mb-4 flex items-center justify-between">
            {t("Projects")}
          </h3>
          <TeamProjectsTable team={team} />
        </Block>
      </PageContent>
    </Page>
  );
};

export const getServerSideProps = createGetServerSideProps({
  requireAuth: true,
  getServerSideProps: async (ctx, client) => {
    const variables = {
      id: ctx.query.teamId as string,
    };

    await Layout.prefetch(client);
    await TeamMembersTable.prefetch(client, { teamId: variables.id });
    await TeamProjectsTable.prefetch(client, { teamIds: [variables.id] });

    await client.query({
      query: gql`
        query TeamPage($id: String!) {
          team(id: $id) {
            id
            name
            createdAt
            authorizedActions
            ...TeamMembersTable_team
            ...InviteTeamMemberTrigger_team
            ...TeamFormDialog_team
            ...TeamProjectsTable_team
            ...TeamActionsMenu_team
          }
        }
        ${TeamActionsMenu.fragments.team}
        ${InviteTeamMemberTrigger.fragments.team}
        ${TeamMembersTable.fragments.team}
        ${TeamFormDialog.fragments.team}
        ${TeamProjectsTable.fragments.team}
      `,
      variables,
    });
    return {
      props: {
        defaultVariables: variables,
      },
    };
  },
});

export default TeamPage;
