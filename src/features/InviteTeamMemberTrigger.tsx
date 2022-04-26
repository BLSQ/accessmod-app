import { gql } from "@apollo/client";
import useToggle from "hooks/useToggle";
import { TeamAuthorizedActions } from "libs/graphql";
import { ReactNode } from "react";
import InviteTeamMemberDialog from "./InviteTeamMemberDialog";

type Props = {
  team: any;
  children: ({ onClick }: { onClick: () => void }) => ReactNode;
};

const InviteTeamMemberTrigger = ({ team, children }: Props) => {
  const [isOpen, { toggle }] = useToggle();

  if (
    !team.authorizedActions.includes(TeamAuthorizedActions.CreateMembership)
  ) {
    return null;
  }
  return (
    <>
      {children({ onClick: toggle })}
      <InviteTeamMemberDialog open={isOpen} onClose={toggle} team={team} />
    </>
  );
};

InviteTeamMemberTrigger.fragments = {
  team: gql`
    fragment InviteTeamMemberTrigger_team on Team {
      ...InviteTeamMemberDialog_team
      authorizedActions
    }

    ${InviteTeamMemberDialog.fragments.team}
  `,
};

export default InviteTeamMemberTrigger;
