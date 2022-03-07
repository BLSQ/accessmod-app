import { gql } from "@apollo/client";
import ButtonGroup, { ButtonGroupOption } from "components/ButtonGroup";
import useCacheKey from "hooks/useCacheKey";
import { useDeleteProjectMutation } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

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
  const { t } = useTranslation();
  const router = useRouter();
  const clearCache = useCacheKey("projects");

  const onDeleteClick = useCallback(async () => {
    // TODO: Implement permissions check
    if (
      window.confirm(
        t('Are you sure you want to delete the project "{{name}}"?', {
          name: project.name,
        })
      )
    ) {
      await deleteProject({ variables: { input: { id: project.id } } });
      await router.push("/projects");
      clearCache();
    }
  }, [project, router, deleteProject, t, clearCache]);

  const items = useMemo<ButtonGroupOption[]>(() => {
    const actions = [
      {
        label: t("Edit"),
        onClick: () => {
          console.log("onClick(edit)");
        },
      },
      { label: t("Delete"), onClick: onDeleteClick },
    ];
    return actions;
  }, [t, onDeleteClick]);

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
