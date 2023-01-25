import { gql } from "@apollo/client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Menu from "components/Menu";
import useToggle from "hooks/useToggle";
import { TeamActionsMenu_TeamFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";
import DeleteTeamTrigger from "./DeleteTeamTrigger";
import TeamFormDialog from "./TeamFormDialog";

const TeamActionsMenu = ({ team }: { team: TeamActionsMenu_TeamFragment }) => {
  const { t } = useTranslation();
  const [isEditing, { toggle: toggleEdit }] = useToggle();
  if (!team.permissions.update && !team.permissions.delete) {
    return null;
  }

  return (
    <>
      <Menu label={t("Actions")}>
        {team.permissions.update && (
          <Menu.Item onClick={toggleEdit}>
            <PencilIcon className="mr-2 h-4" />
            {t("Edit")}
          </Menu.Item>
        )}
        {team.permissions.delete && (
          <DeleteTeamTrigger team={team}>
            {({ onClick }) => (
              <Menu.Item
                onClick={onClick}
                activeClassName="bg-red-500 text-white"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                {t("Delete")}
              </Menu.Item>
            )}
          </DeleteTeamTrigger>
        )}
      </Menu>
      <TeamFormDialog onClose={toggleEdit} open={isEditing} team={team} />
    </>
  );
};

TeamActionsMenu.fragments = {
  team: gql`
    fragment TeamActionsMenu_team on Team {
      id
      name
      permissions {
        update
        delete
      }
      ...DeleteTeamTrigger_team
      ...TeamFormDialog_team
    }
    ${DeleteTeamTrigger.fragments.team}
    ${TeamFormDialog.fragments.team}
  `,
};

export default TeamActionsMenu;
