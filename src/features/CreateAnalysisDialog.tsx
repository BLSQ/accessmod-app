import { gql } from "@apollo/client";
import clsx from "clsx";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import useForm from "hooks/useForm";
import {
  AccessmodAnalysisType,
  CreateAccessmodAccessibilityAnalysisError,
  CreateAnalysisDialog_ProjectFragment,
  useCreateAccessibilityAnalysisMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import AnalysisTypePicker from "./analysis/AnalysisTypePicker";

const CREATE_ANALYSIS_MUTATION = gql`
  mutation CreateAccessibilityAnalysis(
    $input: CreateAccessmodAccessibilityAnalysisInput
  ) {
    response: createAccessmodAccessibilityAnalysis(input: $input) {
      success
      errors
      analysis {
        id
      }
    }
  }
`;

type Props = {
  onClose: () => void;
  open: boolean;
  project: CreateAnalysisDialog_ProjectFragment;
};

type Form = {
  type: { value: AccessmodAnalysisType };
  name: string;
};

const CreateAnalysisDialog = ({ onClose, open, project }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [createAnalysis] = useCreateAccessibilityAnalysisMutation();
  const form = useForm<Form>({
    validate: (values: Partial<Form>) => {
      const errors = {} as any;
      if (!values.type) {
        errors.type = t("Select a analysis type");
      }
      if (!values.name) {
        errors.name = t("Enter a name");
      }
      return errors;
    },
    onSubmit: async (values) => {
      // FIXME: Handle multiple analysis' types
      const { data } = await createAnalysis({
        variables: { input: { name: values.name, projectId: project.id } },
      });
      if (!data) {
        throw new Error();
      }
      const { success, errors, analysis } = data.response;
      if (success) {
        return router.push(
          `/projects/${encodeURIComponent(project.id)}/analysis/${
            analysis?.id
          }/edit`
        );
      } else if (
        errors.includes(CreateAccessmodAccessibilityAnalysisError.NameDuplicate)
      ) {
        throw new Error(t("An analysis with this name already exists."));
      }
    },
  });

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} closeOnEsc closeOnOutsideClick>
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>{t("Create a new analysis")}</Dialog.Title>
        <Dialog.Content className="space-y-4">
          <Field
            label={t("Analysis Name")}
            name="name"
            required
            onChange={form.handleInputChange}
            type="text"
            error={form.touched.name && form.errors.name}
          />
          <Field
            label={t("Analysis Type")}
            name="type"
            required
            error={form.touched.type && form.errors.type}
          >
            <AnalysisTypePicker
              value={form.formData.type}
              onChange={(value) => form.setFieldValue("type", value)}
              required
            />
          </Field>
          {form.submitError && (
            <p className={clsx("text-sm", "text-red-600")}>
              {form.submitError}
            </p>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button type="button" variant="white" onClick={handleClose}>
            {t("Cancel")}
          </Button>
          <Button type="submit">{t("Create")}</Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

CreateAnalysisDialog.fragments = {
  project: gql`
    fragment CreateAnalysisDialog_project on AccessmodProject {
      id
    }
  `,
};

export default CreateAnalysisDialog;
