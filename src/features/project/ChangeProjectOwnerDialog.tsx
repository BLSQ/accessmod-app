import { gql } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import TeamPicker from "features/team/TeamPicker";
import {
  ChangeProjectOwnerDialog_ProjectFragment,
  PermissionMode,
  useChangeProjectOwnershipMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";

type ChangeProjectOwnerDialogProps = {
  onClose: () => void;
  open: boolean;
  project: ChangeProjectOwnerDialog_ProjectFragment;
};

const MUTATION = gql`
  mutation ChangeProjectOwnership($input: CreateAccessmodProjectMemberInput!) {
    createAccessmodProjectMember(input: $input) {
      success
      errors
      member {
        id
      }
    }
  }
`;

const ChangeProjectOwnerDialog = (props: ChangeProjectOwnerDialogProps) => {
  const { open, onClose, project } = props;
  const [owner, setOwner] = useState<{ id: string } | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (project.owner?.__typename === "Team") {
      setOwner(project.owner);
    }
  }, [project]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const [changeOwner, { loading }] = useChangeProjectOwnershipMutation();

  const onSubmit = useCallback(async () => {
    if (!owner) {
      return;
    }
    await changeOwner({
      variables: {
        input: {
          mode: PermissionMode.Owner,
          projectId: project.id,
          teamId: owner.id,
        },
      },
    });
    onClose();
  }, [owner, project, changeOwner, onClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={onSubmit}>
        <Dialog.Title>{t("Change the owner of this project")}</Dialog.Title>
        <Dialog.Content className="space-y-4 px-9 py-8">
          {project.owner?.__typename === "User" && (
            <Dialog.Description>
              {t(
                "This project is currently a user project. By selecting a team below it will become a team project and be shared with all of the users of the team."
              )}
            </Dialog.Description>
          )}
          {project.owner?.__typename === "Team" && (
            <Dialog.Description>
              {t("Select the owner of this team project.")}
            </Dialog.Description>
          )}
          <TeamPicker
            disabled={loading}
            value={owner}
            required
            onChange={(team) => setOwner(team)}
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button type="button" onClick={handleClose} variant="white">
            {t("Cancel")}
          </Button>
          <Button type="submit" className="space-x-2" disabled={!owner}>
            {t("Change")}
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

ChangeProjectOwnerDialog.fragments = {
  project: gql`
    fragment ChangeProjectOwnerDialog_project on AccessmodProject {
      id
      owner {
        __typename
        ... on Team {
          id
          name
        }
      }
    }
  `,
};

export default ChangeProjectOwnerDialog;
