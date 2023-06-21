import { gql } from "@apollo/client";
import useToggle from "hooks/useToggle";
import { ReactNode } from "react";
import DatasetFormDialog from "./DatasetFormDialog";

type Props = {
  project: any;
  children: ({ onClick }: { onClick: () => void }) => ReactNode;
};

const CreateDatasetTrigger = ({ project, children }: Props) => {
  const [isOpen, { toggle }] = useToggle();

  if (!project.permissions.createFileset) {
    return null;
  }
  return (
    <>
      {children({ onClick: toggle })}
      <DatasetFormDialog open={isOpen} onClose={toggle} project={project} />
    </>
  );
};

CreateDatasetTrigger.fragments = {
  project: gql`
    fragment CreateDatasetTrigger_project on AccessmodProject {
      ...DatasetFormDialog_project
      permissions {
        createFileset
      }
    }
    ${DatasetFormDialog.fragments.project}
  `,
};

export default CreateDatasetTrigger;
