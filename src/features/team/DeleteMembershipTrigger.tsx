import { gql } from "@apollo/client";
import Button from "components/Button";
import useCacheKey from "hooks/useCacheKey";
import {
  DeleteMembershipTrigger_MembershipFragment,
  MembershipAuthorizedActions,
  useDeleteMembershipMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { ReactElement, useCallback } from "react";

type Props = {
  membership: DeleteMembershipTrigger_MembershipFragment;
  children?: ({ onClick }: { onClick: () => void }) => ReactElement;
  className?: string;
};

const MUTATION = gql`
  mutation DeleteMembership($input: DeleteMembershipInput!) {
    deleteMembership(input: $input) {
      success
      errors
    }
  }
`;

const DeleteMembershipTrigger = ({
  membership,
  children,
  className,
}: Props) => {
  const [deleteMembership] = useDeleteMembershipMutation();
  const { t } = useTranslation();
  const clearCache = useCacheKey(["teams", membership.team.id]);

  const onDeleteClick = useCallback(async () => {
    if (
      window.confirm(
        t("Are you sure you want to delete {{name}} from {{teamName}}?", {
          name: [membership.user.firstName, membership.user.lastName]
            .filter(Boolean)
            .join(" "),
          teamName: membership.team.name,
        })
      )
    ) {
      await deleteMembership({ variables: { input: { id: membership.id } } });
      clearCache();
    }
  }, [membership, deleteMembership, t, clearCache]);

  if (
    !membership.authorizedActions.includes(MembershipAuthorizedActions.Delete)
  ) {
    return null;
  }

  if (children) {
    return children({ onClick: onDeleteClick });
  } else {
    return (
      <Button variant="white" className={className} onClick={onDeleteClick}>
        {t("Delete")}
      </Button>
    );
  }
};

DeleteMembershipTrigger.fragments = {
  membership: gql`
    fragment DeleteMembershipTrigger_membership on Membership {
      id
      authorizedActions
      user {
        firstName
        lastName
      }
      team {
        id
        name
      }
    }
  `,
};

export default DeleteMembershipTrigger;
