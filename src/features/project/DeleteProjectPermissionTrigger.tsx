import { gql } from "@apollo/client";
import Button from "components/Button";
import useCacheKey from "hooks/useCacheKey";
import {
  AccessmodProjectAuthorizedActions,
  DeleteProjectPermissionTrigger_ProjectFragment,
  useDeleteProjectPermissionMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { ReactElement, useCallback } from "react";

type Props = {
  project: DeleteProjectPermissionTrigger_ProjectFragment;
  permissionId: string;
  children?: ({ onClick }: { onClick: () => void }) => ReactElement;
  className?: string;
};

const DELETE_PROJECT_PERMISSION_MUTATION = gql`
  mutation DeleteProjectPermission(
    $input: DeleteAccessmodProjectPermissionInput!
  ) {
    deleteAccessmodProjectPermission(input: $input) {
      success
    }
  }
`;

const DeleteProjectPermissionTrigger = ({
  project,
  permissionId,
  children,
  className,
}: Props) => {
  const [deletePermission] = useDeleteProjectPermissionMutation();
  const { t } = useTranslation();
  const clearCache = useCacheKey(["projects", project.id]);

  const onDeleteClick = useCallback(async () => {
    if (window.confirm(t("Are you sure you want to delete this permission?"))) {
      await deletePermission({ variables: { input: { id: permissionId } } });
      clearCache();
    }
  }, [t, deletePermission, permissionId, clearCache]);

  if (
    !project.authorizedActions.includes(
      AccessmodProjectAuthorizedActions.DeletePermission
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

DeleteProjectPermissionTrigger.fragments = {
  project: gql`
    fragment DeleteProjectPermissionTrigger_project on AccessmodProject {
      id
      authorizedActions
    }
  `,
};

export default DeleteProjectPermissionTrigger;
