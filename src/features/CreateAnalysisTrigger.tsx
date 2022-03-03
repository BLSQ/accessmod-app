import { gql } from "@apollo/client";
import Button from "components/Button";
import useToggle from "hooks/useToggle";
import { ReactNode } from "react";
import CreateAnalysisDialog from "./CreateAnalysisDialog";

type Props = {
  project: any;
  children: ({ onClick }: { onClick: () => void }) => ReactNode;
};

const CreateAnalysisTrigger = ({ project, children }: Props) => {
  const [isOpen, { toggle }] = useToggle();
  return (
    <>
      {children({ onClick: toggle })}
      <CreateAnalysisDialog open={isOpen} onClose={toggle} project={project} />
    </>
  );
};

CreateAnalysisTrigger.fragments = {
  project: gql`
    fragment CreateAnalysisTrigger_project on AccessmodProject {
      ...CreateAnalysisDialog_project
    }
    ${CreateAnalysisDialog.fragments.project}
  `,
};

export default CreateAnalysisTrigger;