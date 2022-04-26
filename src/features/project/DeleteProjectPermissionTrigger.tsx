import { gql } from "@apollo/client";
import Button from "components/Button";
import useCacheKey from "hooks/useCacheKey";
import {
  AccessmodProjectPermissionAuthorizedActions,
  DeleteProjectPermissionTrigger_PermissionFragment,
  useDeleteProjectPermissionMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { ReactElement, useCallback } from "react";

type Props = {
  permission: DeleteProjectPermissionTrigger_PermissionFragment;
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
  permission,
  children,
  className,
}: Props) => {
  const [deletePermission] = useDeleteProjectPermissionMutation();
  const { t } = useTranslation();
  const clearCache = useCacheKey(["projects"]);

  const onDeleteClick = useCallback(async () => {
    if (window.confirm(t("Are you sure you want to delete this permission?"))) {
      await deletePermission({ variables: { input: { id: permission.id } } });
      clearCache();
    }
  }, [t, deletePermission, permission, clearCache]);

  if (
    !permission.authorizedActions.includes(
      AccessmodProjectPermissionAuthorizedActions.Delete
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
  permission: gql`
    fragment DeleteProjectPermissionTrigger_permission on AccessmodProjectPermission {
      id
      authorizedActions
    }
  `,
};

export default DeleteProjectPermissionTrigger;
