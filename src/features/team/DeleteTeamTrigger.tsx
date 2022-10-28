import { gql } from "@apollo/client";
import Button from "components/Button";
import useCacheKey from "hooks/useCacheKey";
import {
  DeleteTeamTrigger_TeamFragment,
  TeamAuthorizedActions,
  useDeleteTeamMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ReactElement, useCallback } from "react";

type Props = {
  team: DeleteTeamTrigger_TeamFragment;
  children?: ({ onClick }: { onClick: () => void }) => ReactElement;
  className?: string;
};

const MUTATION = gql`
  mutation DeleteTeam($input: DeleteTeamInput!) {
    deleteTeam(input: $input) {
      success
      errors
    }
  }
`;

const DeleteTeamTrigger = ({ team, children, className }: Props) => {
  const [deleteTeam] = useDeleteTeamMutation();
  const { t } = useTranslation();
  const router = useRouter();
  const clearCache = useCacheKey("teams");

  const onDeleteClick = useCallback(async () => {
    if (
      window.confirm(
        t('Are you sure you want to delete the team "{{name}}"?', {
          name: team.name,
        })
      )
    ) {
      await deleteTeam({ variables: { input: { id: team.id } } });
      if (router.asPath.startsWith(`/teams/${encodeURIComponent(team.id)}`))
        await router.push("/teams");
      clearCache();
    }
  }, [team, router, deleteTeam, t, clearCache]);

  if (!team.permissions.delete) return null;

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

DeleteTeamTrigger.fragments = {
  team: gql`
    fragment DeleteTeamTrigger_team on Team {
      id
      name
      permissions {
        delete
      }
    }
  `,
};

export default DeleteTeamTrigger;
