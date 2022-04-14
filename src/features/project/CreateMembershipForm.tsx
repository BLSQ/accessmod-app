import { gql } from "@apollo/client";
import clsx from "clsx";
import Button from "components/Button";
import Spinner from "components/Spinner";
import TeamPicker from "features/team/TeamPicker";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import {
  CreateMembershipForm_ProjectFragment,
  PermissionMode,
  useCreateProjectMembershipMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import ProjectPermissionPicker from "./ProjectPermissionPicker";

type CreateMembershipFormProps = {
  project: CreateMembershipForm_ProjectFragment;
  className?: string;
};

type Form = {
  team: any;
  mode: PermissionMode;
};

const CREATE_MEMBERSHIP_MUTATION = gql`
  mutation CreateProjectMembership(
    $input: CreateAccessmodProjectPermissionInput!
  ) {
    createAccessmodProjectPermission(input: $input) {
      success
      errors
      permission {
        id
      }
    }
  }
`;

const CreateMembershipForm = (props: CreateMembershipFormProps) => {
  const { project, className } = props;
  const { t } = useTranslation();
  const [createMembership] = useCreateProjectMembershipMutation();
  const clearCache = useCacheKey(["projects", project.id]);

  const form = useForm<Form>({
    initialState: {
      team: null,
      mode: undefined,
    },
    onSubmit: async (values) => {
      try {
        const { data } = await createMembership({
          variables: {
            input: {
              teamId: values.team.id,
              projectId: project.id,
              mode: values.mode!,
            },
          },
        });

        if (data?.createAccessmodProjectPermission.success) {
          clearCache();
          form.resetForm();
        }
      } catch (err) {
        console.error(err);
        throw new Error("Unexpected error. Retry later.");
      }
    },
    validate: (values) => {
      const errors = {} as any;

      if (!values.team) {
        errors.team = t("Select a team");
      }
      if (!values.mode) {
        errors.mode = t("Select a permission");
      }

      return errors;
    },
  });
  return (
    <form
      onSubmit={form.handleSubmit}
      className={clsx("mb-4 flex items-center gap-2", className)}
    >
      <div className="w-72">
        <TeamPicker
          value={form.formData.team}
          required
          onChange={(team) => form.setFieldValue("team", team)}
        />
      </div>
      <div>
        <ProjectPermissionPicker
          project={project}
          required
          value={form.formData.mode}
          onChange={(value) => form.setFieldValue("mode", value)}
        />
      </div>
      <div>
        <Button disabled={!form.isValid} variant="secondary" type="submit">
          {form.isSubmitting && <Spinner size="xs" className="mr-2" />}
          {t("Create permission")}
        </Button>
      </div>
      {form.submitError && (
        <div className="text-sm text-danger">{form.submitError}</div>
      )}
    </form>
  );
};

CreateMembershipForm.fragments = {
  project: gql`
    fragment CreateMembershipForm_project on AccessmodProject {
      id
      ...ProjectPermissionPicker_project
      permissions {
        mode
        team {
          __typename
          id
        }
      }
    }
    ${ProjectPermissionPicker.fragments.project}
  `,
};

export default CreateMembershipForm;
