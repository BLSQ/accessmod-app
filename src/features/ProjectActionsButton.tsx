import { gql } from "@apollo/client";
import ButtonGroup, { ButtonGroupOption } from "components/ButtonGroup";
import { useDeleteProjectMutation } from "libs/graphql";
import { useRouter } from "next/router";
import { useMemo } from "react";

type Props = {
  project: any;
};

const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProject($input: DeleteAccessmodProjectInput) {
    deleteAccessmodProject(input: $input) {
      success
    }
  }
`;

const ProjectActionsButton = ({ project }: Props) => {
  const [deleteProject] = useDeleteProjectMutation();
  const router = useRouter();

  const onDeleteClick = async () => {
    // TODO: Implement permissions check
    if (
      window.confirm(
        `Are you sure you want to delete the project "${project.name}"?`
      )
    ) {
      await deleteProject({ variables: { input: { id: project.id } } });
      router.push("/projects");
    }
  };

  const items = useMemo<ButtonGroupOption[]>(() => {
    const actions = [
      {
        label: "Edit",
        onClick: () => {
          console.log("onClick(edit)");
        },
      },
      { label: "Delete", onClick: onDeleteClick },
    ];
    return actions;
  }, [project]);

  return <ButtonGroup items={items} />;
};

ProjectActionsButton.fragments = {
  project: gql`
    fragment ProjectActionsButton_project on AccessmodProject {
      id
    }
  `,
};

export default ProjectActionsButton;
