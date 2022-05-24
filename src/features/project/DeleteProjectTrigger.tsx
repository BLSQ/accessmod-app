import { gql } from "@apollo/client";
import Button from "components/Button";
import useCacheKey from "hooks/useCacheKey";
import {
  AccessmodProjectAuthorizedActions,
  useDeleteProjectMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ReactElement, useCallback } from "react";

type Props = {
  project: any;
  children?: ({ onClick }: { onClick: () => void }) => ReactElement;
  className?: string;
};

const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProject($input: DeleteAccessmodProjectInput!) {
    deleteAccessmodProject(input: $input) {
      success
    }
  }
`;

const DeleteProjectTrigger = ({ project, children, className }: Props) => {
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
      if (
        router.asPath.startsWith(`/projects/${encodeURIComponent(project.id)}`)
      )
        await router.push("/projects");
      clearCache();
    }
  }, [project, router, deleteProject, t, clearCache]);

  if (
    !project.authorizedActions.includes(
      AccessmodProjectAuthorizedActions.Delete
    )
  ) {
    return null;
  } else if (children) {
    return children({ onClick: onDeleteClick });
  } else {
    return (
      <Button variant="white" className={className} onClick={onDeleteClick}>
        {t("Delete")}
      </Button>
    );
  }
};

DeleteProjectTrigger.fragments = {
  project: gql`
    fragment DeleteProjectTrigger_project on AccessmodProject {
      id
      name
      authorizedActions
    }
  `,
};

export default DeleteProjectTrigger;
