import { gql } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import Input from "components/forms/Input";
import Spinner from "components/Spinner";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import {
  CreateMembershipError,
  MembershipRole,
  useCreateMembershipMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import MembershipRolePicker from "./MembershipRolePicker";

type Props = {
  onClose: () => void;
  open: boolean;
  team: { id: string; name: string };
};

const MUTATION = gql`
  mutation CreateMembership($input: CreateMembershipInput!) {
    createMembership(input: $input) {
      success
      errors
    }
  }
`;

type Form = {
  role: MembershipRole;
  email: string;
};

const InviteTeamMemberDialog = (props: Props) => {
  const { t } = useTranslation();
  const { open, onClose, team } = props;
  const clearCache = useCacheKey(["teams", team.id]);

  const form = useForm<Form>({
    onSubmit: async (values) => {
      const { data } = await createMembership({
        variables: {
          input: {
            role: values.role,
            teamId: team.id,
            userEmail: values.email,
          },
        },
      });

      if (!data?.createMembership) {
        throw new Error("Unknown error.");
      }

      if (
        data.createMembership.errors.includes(CreateMembershipError.NotFound)
      ) {
        throw new Error(
          "No user matching this email address. Contact WHO to add this user to the platform."
        );
      } else if (
        data.createMembership.errors.includes(
          CreateMembershipError.PermissionDenied
        )
      ) {
        throw new Error("You are not authorized to perform this action");
      }
      clearCache();
      handleClose();
    },
    initialState: { role: MembershipRole.Regular, email: "" },
    validate: (values) => {
      const errors = {} as any;
      if (!values.email) {
        errors.email = t("Email address is mandatory");
      }
      return errors;
    },
  });
  const [createMembership] = useCreateMembershipMutation();

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>
          {t("Invite members in '{{name}}'", { name: team.name })}
        </Dialog.Title>

        <Dialog.Content className="space-y-4 px-9 py-8">
          <Field name="email" label={t("Email address")} type="email" required>
            <Input
              placeholder={t("Email address")}
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={form.handleInputChange}
              error={form.touched.email && form.errors.email}
            />
          </Field>

          <Field name="role" label={t("Role")} type="text" required>
            <MembershipRolePicker
              className="w-52"
              required
              value={form.formData.role ?? MembershipRole.Regular}
              onChange={(value) => form.setFieldValue("role", value)}
            />
          </Field>
          {form.submitError && (
            <div className="mt-3 text-sm text-danger">{form.submitError}</div>
          )}
        </Dialog.Content>

        <Dialog.Actions>
          <Button type="button" onClick={handleClose} variant="outlined">
            {t("Cancel")}
          </Button>
          <Button
            type="submit"
            className="space-x-2"
            disabled={!form.isValid || form.isSubmitting}
          >
            {form.isSubmitting && <Spinner size="xs" className="mr-1" />}
            {t("Invite")}
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

InviteTeamMemberDialog.fragments = {
  team: gql`
    fragment InviteTeamMemberDialog_team on Team {
      id
      name
    }
  `,
};

export default InviteTeamMemberDialog;
