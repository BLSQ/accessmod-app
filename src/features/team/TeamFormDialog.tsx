import { gql } from "@apollo/client";
import clsx from "clsx";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import Spinner from "components/Spinner";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import {
  CreateTeamError,
  TeamFormDialog_TeamFragment,
  UpdateTeamError,
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

type Props = {
  onClose: () => void;
  open: boolean;
  team?: TeamFormDialog_TeamFragment;
};

type Form = {
  name: string;
};

const MUTATIONS = gql`
  mutation CreateTeam($input: CreateTeamInput!) {
    result: createTeam(input: $input) {
      success
      team {
        id
      }
      errors
    }
  }
  mutation UpdateTeam($input: UpdateTeamInput!) {
    result: updateTeam(input: $input) {
      success
      team {
        id
        name
      }
      errors
    }
  }
`;

const TeamFormDialog = (props: Props) => {
  const { open, onClose, team } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const clearCache = useCacheKey("teams");
  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();

  const form = useForm<Form>({
    initialState: {
      name: team?.name ?? "",
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.name) {
        errors.name = t("Enter a name");
      }

      return errors;
    },

    onSubmit: async (values) => {
      let mutation;
      if (team) {
        mutation = await updateTeam({
          variables: {
            input: {
              id: team.id,
              name: values.name,
            },
          },
        });
      } else {
        mutation = await createTeam({
          variables: {
            input: {
              name: values.name,
            },
          },
        });
      }
      if (!mutation.data) {
        throw new Error();
      }

      const { success, errors, team: resultTeam } = mutation.data.result;

      if (success) {
        if (resultTeam && !team) {
          // Only redirect user on team creation
          router.push(`/teams/${encodeURIComponent(resultTeam.id)}`);
        }
        clearCache();
        onClose();
      } else if (
        (errors as CreateTeamError[]).includes(CreateTeamError.NameDuplicate) ||
        (errors as UpdateTeamError[]).includes(UpdateTeamError.NameDuplicate)
      ) {
        throw new Error(t("A team already exists with this name"));
      } else if (
        (errors as CreateTeamError[]).includes(
          CreateTeamError.PermissionDenied
        ) ||
        (errors as UpdateTeamError[]).includes(UpdateTeamError.PermissionDenied)
      ) {
        throw new Error(
          t("You do not have sufficient permissions to perform this action")
        );
      }
    },
  });

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>
          {team
            ? t("Edit team: {{name}}", { name: team.name })
            : t("Create a new Team")}
        </Dialog.Title>

        <Dialog.Content className="space-y-4 px-9 py-8">
          <Field
            label={t("Team name")}
            required
            name="name"
            disabled={form.isSubmitting}
            type="text"
            value={form.formData.name}
            onChange={form.handleInputChange}
            error={form.touched.name && form.errors.name}
          />

          {form.submitError && (
            <p className={clsx("text-sm", "text-red-600")}>
              {form.submitError}
            </p>
          )}
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            role="button"
            onClick={onCancel}
            disabled={form.isSubmitting}
            variant="outlined"
          >
            {t("Cancel")}
          </Button>
          <Button
            disabled={form.isSubmitting}
            role="submit"
            className="space-x-2"
          >
            {form.isSubmitting && <Spinner size="xs" />}
            <span>{t("Save")}</span>
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

TeamFormDialog.fragments = {
  team: gql`
    fragment TeamFormDialog_team on Team {
      id
      name
    }
  `,
};

export default TeamFormDialog;
