import { gql } from "@apollo/client";
import { TrashIcon, UserIcon } from "@heroicons/react/outline";
import Menu from "components/Menu";
import DeleteProjectTrigger from "features/project/DeleteProjectTrigger";
import useToggle from "hooks/useToggle";
import {
  AccessmodProjectAuthorizedActions,
  ProjectActionsMenu_ProjectFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import ChangeProjectOwnerDialog from "./ChangeProjectOwnerDialog";

const ProjectActionsMenu = ({
  project,
}: {
  project: ProjectActionsMenu_ProjectFragment;
}) => {
  const { t } = useTranslation();
  const [isDialogOpen, { toggle: toggleDialog }] = useToggle();
  return (
    <>
      <Menu label={t("Actions")}>
        {project.authorizedActions.includes(
          AccessmodProjectAuthorizedActions.CreatePermission
        ) && (
          <Menu.Item onClick={toggleDialog}>
            <UserIcon className="mr-2 h-4 w-4" />
            {t("Change owner")}
          </Menu.Item>
        )}
        <DeleteProjectTrigger project={project}>
          {({ onClick }) => (
            <Menu.Item
              onClick={onClick}
              activeClassName="bg-red-500 text-white"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              {t("Delete")}
            </Menu.Item>
          )}
        </DeleteProjectTrigger>
      </Menu>
      <ChangeProjectOwnerDialog
        project={project}
        open={isDialogOpen}
        onClose={toggleDialog}
      />
    </>
  );
};

ProjectActionsMenu.fragments = {
  project: gql`
    fragment ProjectActionsMenu_project on AccessmodProject {
      id
      name
      ...DeleteProjectTrigger_project
      ...ChangeProjectOwnerDialog_project
    }
    ${DeleteProjectTrigger.fragments.project}
    ${ChangeProjectOwnerDialog.fragments.project}
  `,
};

export default ProjectActionsMenu;
