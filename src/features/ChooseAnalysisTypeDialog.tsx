import { gql } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import { ChooseAnalysisTypeDialog_ProjectFragment } from "libs/graphql";
import { useRouter } from "next/router";

const AnalysisCard = ({
  label,
  description,
  onClick,
}: {
  label: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <div className="flex w-full items-center rounded shadow px-5 py-4 bg-white hover:bg-gray-50  gap-4 group border border-gray-200">
      <div className="flex-1">
        <h6 className="group-hover:text-gray-900">{label}</h6>
        <p className="text-sm mt-2 text-gray-500 group-hover:text-gray-700">
          {description}
        </p>
      </div>
      <div>
        <Button onClick={onClick}>Create</Button>
      </div>
    </div>
  );
};

type Props = {
  onClose: () => void;
  open: boolean;
  project: ChooseAnalysisTypeDialog_ProjectFragment;
};

const ChooseAnalysisTypeDialog = ({ onClose, open, project }: Props) => {
  const router = useRouter();
  return (
    <Dialog open={open} onClose={onClose} closeOnEsc closeOnOutsideClick>
      <Dialog.Title>Choose the analysis you would like to run</Dialog.Title>
      <Dialog.Content>
        <div className="space-y-5">
          <AnalysisCard
            label={"Accessibility Analysis"}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elitUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            onClick={() =>
              router.push({
                pathname: `/projects/${encodeURIComponent(
                  project.id
                )}/analysis/create`,
                query: { type: "accessibility" },
              })
            }
          />
          <AnalysisCard
            label={"Accessibility Analysis"}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.."
            onClick={() =>
              router.push(
                `/projects/${encodeURIComponent(project.id)}/analysis/create`
              )
            }
          />
          <AnalysisCard
            label={"Accessibility Analysis"}
            description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            onClick={() =>
              router.push(
                `/projects/${encodeURIComponent(project.id)}/analysis/create`
              )
            }
          />
        </div>
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="white" onClick={onClose}>
          Cancel
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

ChooseAnalysisTypeDialog.fragments = {
  project: gql`
    fragment ChooseAnalysisTypeDialog_project on AccessmodProject {
      id
    }
  `,
};

export default ChooseAnalysisTypeDialog;
