import { gql } from "@apollo/client";
import useToggle from "hooks/useToggle";
import { AccessmodProjectAuthorizedActions } from "libs/graphql";
import { ReactNode } from "react";
import DatasetFormDialog from "./DatasetFormDialog";

type Props = {
  project: any;
  children: ({ onClick }: { onClick: () => void }) => ReactNode;
};

const CreateDatasetTrigger = ({ project, children }: Props) => {
  const [isOpen, { toggle }] = useToggle();

  if (
    !project.authorizedActions.includes(
      AccessmodProjectAuthorizedActions.CreateFileset
    )
  ) {
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
      authorizedActions
    }
    ${DatasetFormDialog.fragments.project}
  `,
};

export default CreateDatasetTrigger;
