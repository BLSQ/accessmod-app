import { gql } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { Classes as ButtonClasses } from "components/Button";
import DeleteProjectTrigger from "features/project/DeleteProjectTrigger";
import { ProjectActionsMenu_ProjectFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { Fragment } from "react";

const Classes = {
  Menu: "relative",
  TriggerButton: clsx(
    "group",
    ButtonClasses.base,
    ButtonClasses.white,
    ButtonClasses.md
  ),
  Item: "group flex px-2 py-2 items-center w-full text-sm rounded",
  ActiveItem: "bg-lochmara text-white",
  Items:
    "origin-top-right absolute right-0 mt-2 w-36 rounded shadow-lg bg-white text-gray-900 focus:outline-none text-right z-40 divide-y divide-gray-200 ",
};

const TRANSITION = {
  enter: "transition ease-out duration-100",
  enterFrom: "transform opacity-0 scale-95",
  enterTo: "transform opacity-100 scale-100",
  leave: "transition ease-in duration-75",
  leaveFrom: "transform opacity-100 scale-100",
  leaveTo: "transform opacity-0 scale-95",
};

const ProjectActionsMenu = ({
  project,
  className,
}: {
  project: ProjectActionsMenu_ProjectFragment;
  className?: string;
}) => {
  const { t } = useTranslation();
  return (
    <Menu as="div" className={clsx(Classes.Menu, className)}>
      <Menu.Button className={Classes.TriggerButton}>
        {t("Actions")}
        <ChevronDownIcon
          className="ml-2 -mr-1 h-4 w-4 text-gray-500 group-hover:text-gray-700"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition as={Fragment} {...TRANSITION}>
        <Menu.Items className={Classes.Items}>
          <div className="px-1 py-1">
            <DeleteProjectTrigger project={project}>
              {({ onClick }) => (
                <Menu.Item onClick={onClick}>
                  {({ active }) => (
                    <button
                      className={clsx(
                        Classes.Item,
                        active && "bg-red-500 text-white"
                      )}
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      {t("Delete")}
                    </button>
                  )}
                </Menu.Item>
              )}
            </DeleteProjectTrigger>
          </div>
        </Menu.Items>
      </Transition>
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
