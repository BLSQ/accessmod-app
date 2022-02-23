import { gql, useMutation } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import useForm from "hooks/useForm";
import {
  AccessmodAnalysisType,
  CrateAnalysisDialog_ProjectFragment,
  CreateAccessibilityAnalysisMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import AnalysisTypePicker from "./analysis/AnalysisTypePicker";

const CREATE_ANALYSIS_MUTATION = gql`
  mutation CreateAccessibilityAnalysis(
    $input: CreateAccessmodAccessibilityAnalysisInput
  ) {
    response: createAccessmodAccessibilityAnalysis(input: $input) {
      success
      analysis {
        id
      }
    }
  }
`;

type Props = {
  onClose: () => void;
  open: boolean;
  project: CrateAnalysisDialog_ProjectFragment;
};

type Form = {
  type: { value: AccessmodAnalysisType };
  name: string;
};

const CrateAnalysisDialog = ({ onClose, open, project }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [error, setError] = useState<null | string>(null);
  const [createAnalysis, { loading }] =
    useMutation<CreateAccessibilityAnalysisMutation>(CREATE_ANALYSIS_MUTATION);
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
      setError(null);

      // FIXME: Handle multiple analysis' types
      const payload = await createAnalysis({
        variables: { input: { name: values.name, projectId: project.id } },
      });
      if (payload.data?.response?.success) {
        router.push(
          `/projects/${encodeURIComponent(project.id)}/analysis/${
            payload.data.response.analysis?.id
          }/edit`
        );
      } else {
        setError(t("Unknown error"));
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} closeOnEsc closeOnOutsideClick>
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>{t("Create a new analysis")}</Dialog.Title>
        <Dialog.Content>
          <div className="space-y-4">
            <Field
              label={t("Analytics Name")}
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
            {error && <div className="text-sm text-danger">{error}</div>}
          </div>
        </Dialog.Content>
        <Dialog.Actions>
          <Button type="button" variant="white" onClick={onClose}>
            {t("Cancel")}
          </Button>
          <Button type="submit">{t("Create")}</Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

CrateAnalysisDialog.fragments = {
  project: gql`
    fragment CrateAnalysisDialog_project on AccessmodProject {
      id
    }
  `,
};

export default CrateAnalysisDialog;
