import { gql } from "@apollo/client";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import Menu from "components/Menu";
import { TeamActionsMenu_TeamFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";
import DeleteTeamTrigger from "./DeleteTeamTrigger";
import EditTeamTrigger from "./EditTeamTrigger";

const TeamActionsMenu = ({ team }: { team: TeamActionsMenu_TeamFragment }) => {
  const { t } = useTranslation();
  return (
    <>
      <Menu label={t("Actions")}>
        <EditTeamTrigger team={team}>
          {({ onClick }) => (
            <Menu.Item onClick={onClick}>
              <PencilIcon className="mr-2 h-4" />
              {t("Edit")}
            </Menu.Item>
          )}
        </EditTeamTrigger>

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
      </Menu>
    </>
  );
};

TeamActionsMenu.fragments = {
  team: gql`
    fragment TeamActionsMenu_team on Team {
      id
      name
      ...DeleteTeamTrigger_team
    }
    ${DeleteTeamTrigger.fragments.team}
  `,
};

export default TeamActionsMenu;
