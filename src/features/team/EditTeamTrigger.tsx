import { gql } from "@apollo/client";
import Toggle from "components/Toggle";
import {
  EditTeamTrigger_TeamFragment,
  TeamAuthorizedActions,
} from "libs/graphql";
import { ReactNode } from "react";
import TeamFormDialog from "./TeamFormDialog";

type Props = {
  team: EditTeamTrigger_TeamFragment;
  children: ({ onClick }: { onClick: () => void }) => ReactNode;
};

const EditTeamTrigger = ({ team, children }: Props) => {
  return (
    <Toggle>
      {({ isToggled, toggle }) => (
        <>
          <TeamFormDialog onClose={toggle} open={isToggled} team={team} />
          {children({ onClick: toggle })}
        </>
      )}
    </Toggle>
  );
};

EditTeamTrigger.fragments = {
  team: gql`
    fragment EditTeamTrigger_team on Team {
      ...TeamFormDialog_team
    }
    ${TeamFormDialog.fragments.team}
  `,
};

export default EditTeamTrigger;
