import { gql } from "@apollo/client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Menu from "components/Menu";
import {
  DatasetActionsMenu_DatasetFragment,
  DatasetActionsMenu_ProjectFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { DatasetDialog } from "./DatasetDialog";
import DeleteDatasetTrigger from "./DeleteDatasetTrigger";
import DownloadDatasetButton from "./DownloadDatasetButton";

type DatasetActionsMenuProps = {
  project: DatasetActionsMenu_ProjectFragment;
  dataset: DatasetActionsMenu_DatasetFragment;
};

const DatasetActionsMenu = (props: DatasetActionsMenuProps) => {
  const { dataset, project } = props;
  const { t } = useTranslation();
  const [isEditing, setEditing] = useState(false);

  return (
    <div className="flex gap-2">
      <DownloadDatasetButton variant="primary" dataset={dataset} />
      {dataset.permissions.delete ||
        (dataset.permissions.update && (
          <Menu label={t("Actions")}>
            {dataset.permissions.update && (
              <Menu.Item onClick={() => setEditing(true)}>
                <PencilIcon className="mr-2 h-4 w-4" />
                {t("Edit")}
              </Menu.Item>
            )}
            <DeleteDatasetTrigger dataset={dataset} project={project}>
              {({ onClick }) => (
                <Menu.Item
                  activeClassName="bg-red-500 text-white"
                  onClick={onClick}
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  {t("Delete")}
                </Menu.Item>
              )}
            </DeleteDatasetTrigger>
          </Menu>
        ))}
      <DatasetDialog
        dataset={dataset}
        onClose={() => setEditing(false)}
        open={isEditing}
      />
    </div>
  );
};

DatasetActionsMenu.fragments = {
  dataset: gql`
    fragment DatasetActionsMenu_dataset on AccessmodFileset {
      id
      status
      metadata
      permissions {
        update
        delete
      }
      ...DatasetDialog_dataset
      ...DownloadDatasetButton_dataset
      ...DeleteDatasetTrigger_dataset
    }
    ${DatasetDialog.fragments.dataset}
    ${DownloadDatasetButton.fragments.dataset}
    ${DeleteDatasetTrigger.fragments.dataset}
  `,
  project: gql`
    fragment DatasetActionsMenu_project on AccessmodProject {
      id
      ...DeleteDatasetTrigger_project
    }
    ${DeleteDatasetTrigger.fragments.project}
  `,
};

export default DatasetActionsMenu;
