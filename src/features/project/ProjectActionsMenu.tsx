import { gql } from "@apollo/client";
import { TrashIcon } from "@heroicons/react/outline";
import Menu from "components/Menu";
import DeleteProjectTrigger from "features/project/DeleteProjectTrigger";
import { ProjectActionsMenu_ProjectFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";

const ProjectActionsMenu = ({
  project,
}: {
  project: ProjectActionsMenu_ProjectFragment;
}) => {
  const { t } = useTranslation();
  return (
    <Menu label={t("Actions")}>
      <DeleteProjectTrigger project={project}>
        {({ onClick }) => (
          <Menu.Item onClick={onClick} activeClassName="bg-red-500 text-white">
            <TrashIcon className="mr-2 h-4 w-4" />
            {t("Delete")}
          </Menu.Item>
        )}
      </DeleteProjectTrigger>
    </Menu>
  );
};

ProjectActionsMenu.fragments = {
  project: gql`
    fragment ProjectActionsMenu_project on AccessmodProject {
      id
      name
      ...DeleteProjectTrigger_project
    }
    ${DeleteProjectTrigger.fragments.project}
  `,
};

export default ProjectActionsMenu;
