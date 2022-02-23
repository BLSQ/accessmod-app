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
import { useRouter } from "next/router";
import { useState } from "react";
import AnalysisTypePicker from "./analysis/AnalysisTypePicker";

const AnalysisCard = ({
  label,
  description,
  onClick,
}: {
  label: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <a
      className="flex w-full items-center rounded shadow px-5 py-4 bg-white hover:bg-gray-50  gap-4 group border border-gray-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1">
        <h6 className="group-hover:text-gray-900">{label}</h6>
        <p className="text-sm mt-2 text-gray-500 group-hover:text-gray-700">
          {description}
        </p>
      </div>
    </a>
  );
};

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
  const [error, setError] = useState<null | string>(null);
  const [createAnalysis, { loading }] =
    useMutation<CreateAccessibilityAnalysisMutation>(CREATE_ANALYSIS_MUTATION);
  const form = useForm<Form>({
    validate: (values: Partial<Form>) => {
      const errors = {} as any;
      if (!values.type) {
        errors.type = "Select a analysis type";
      }
      if (!values.name) {
        errors.name = "Enter a name";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setError(null);

      // FIXME: Handle multiple analysis' types
      const payload = await createAnalysis({
        variables: { input: { name: values.name, projectId: project.id } },
      });
      console.log(payload);
      if (payload.data?.response?.success) {
        router.push(
          `/projects/${encodeURIComponent(project.id)}/analysis/${
            payload.data.response.analysis.id
          }/edit`
        );
      } else {
        setError("Unkown error");
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} closeOnEsc closeOnOutsideClick>
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>Create a new analysis</Dialog.Title>
        <Dialog.Content>
          <div className="space-y-4">
            <Field
              label="Analytics Name"
              name="name"
              required
              onChange={form.handleInputChange}
              type="text"
              error={form.touched.name && form.errors.name}
            />
            <Field
              label="Analysis Type"
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
            Cancel
          </Button>
          <Button type="submit">Create</Button>
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
