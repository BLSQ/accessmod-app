import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/outline";
import Block from "components/Block";
import Breadcrumbs from "components/Breadcrumbs";
import Button from "components/Button";
import DescriptionList from "components/DescriptionList";
import Layout, { Page } from "components/layouts/Layout";
import { PageContent, PageHeader } from "components/layouts/Layout/PageContent";
import Time from "components/Time";
import InviteTeamMemberTrigger from "features/InviteTeamMemberTrigger";
import TeamMembersTable from "features/TeamMembersTable";
import { TeamPageQueryVariables, useTeamPageQuery } from "libs/graphql";
import { createGetServerSideProps } from "libs/page";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";

const TeamPage = ({
  defaultVariables,
  ...props
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
          <Button variant="white" disabled>
            {t("Edit")}
          </Button>
        </div>
      </PageHeader>
      <PageContent className="space-y-4">
        <Block>
          <DescriptionList>
            <DescriptionList.Item label={t("Creation Date")}>
              <span className="text-md">
                <Time datetime={team.createdAt} />
              </span>
            </DescriptionList.Item>
          </DescriptionList>
        </Block>

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
                    {t("Add member")}
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
          <p className="w-full p-4 text-center text-sm italic text-gray-400">
            {t("No projects")}
          </p>
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
    await client.query({
      query: gql`
        query TeamPage($id: String!) {
          team(id: $id) {
            id
            name
            createdAt
            ...TeamMembersTable_team
            ...InviteTeamMemberTrigger_team
          }
        }
        ${InviteTeamMemberTrigger.fragments.team}
        ${TeamMembersTable.fragments.team}
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
