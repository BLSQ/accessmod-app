import { gql } from "@apollo/client";
import Block from "components/Block";
import Button from "components/Button";
import Field from "components/forms/Field";
import useBeforeUnload from "hooks/useBeforeUnload";
import useForm from "hooks/useForm";
import {
  AccessibilityAnalysisForm_ProjectFragment,
  AccessmodFilesetRoleCode,
  useCreateAccessibilityAnalysisMutation,
} from "libs/graphql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DatasetPicker from "../DatasetPicker";
import AnalysisStep from "./AnalysisStep";

type AccessibilityForm = {
  name: string;
  landCover: any;
  transportNetwork: any;
  [key: string]: any;
};

const CREATE_ANALYSIS_MUTATION = gql`
  mutation CreateAccessibilityAnalysis(
    $input: CreateAccessmodAccessibilityAnalysisInput
  ) {
    response: createAccessmodAccessibilityAnalysis(input: $input) {
      success
      analysis {
        id
        name
        status
      }
    }
  }
`;

const validateForm = (values: Partial<AccessibilityForm>) => {
  const errors = {} as any;

  return errors;
};

const AccessibilityAnalysisForm = (props: {
  project: AccessibilityAnalysisForm_ProjectFragment;
}) => {
  const { project } = props;

  const router = useRouter();

  const form = useForm<AccessibilityForm>({
    validate: validateForm,
    onSubmit: (values) => {},
  });
  useBeforeUnload(() => Object.keys(form.touched).length > 0);

  const [createAnalysis, { loading }] =
    useCreateAccessibilityAnalysisMutation();

  const [analysis, setAnalysis] = useState<null | { [key: string]: any }>(null);

  useEffect(() => {
    if (form.formData.name !== form.previousFormData?.name && !analysis) {
      // Create analysis once we changed the value of the name
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formData]);

  const onNameBlur = async () => {
    console.log("Hey", form.formData);
    if (!analysis && !loading) {
      const response = await createAnalysis({
        variables: { input: { name: form.formData.name } },
      });
      // FIXME: Handle Errors
      const analysis = response.data?.response?.analysis ?? null;
      if (analysis) {
        setAnalysis(analysis);
        router.push(
          `/projects/${encodeURIComponent(project.id)}/analysis/${
            analysis.id
          }/edit`
        );
      }
    }
  };

  console.log(form.formData);
  return (
    <div className="space-y-5">
      <Block className="space-y-4">
        <p>
          Description of the analysis. Sed ut perspiciatis unde omnis iste natus
          error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo.
        </p>
        <Field
          label="Analysis Name"
          name="name"
          required
          type="text"
          value={form.formData.name}
          onChange={form.handleInputChange}
          onBlur={onNameBlur}
        />
      </Block>

      {/* Step 1 */}

      <AnalysisStep
        id="friction"
        title="Generate Friction Map"
        defaultOpen
        className="space-y-4"
      >
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
        <Field label="Land Cover" name="landCover" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.LandCover}
            value={form.formData.landCover}
            onChange={(value) => form.setFieldValue("landCover", value)}
          />
        </Field>
        <Field label="Transport Network" name="transportNetwork" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.TransportNetwork}
            value={form.formData.transportNetwork}
            onChange={(value) => form.setFieldValue("transportNetwork", value)}
          />
        </Field>
        <Field label="Barriers" name="barriers" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.Barrier}
            value={form.formData.barriers}
            onChange={(value) => form.setFieldValue("barriers", value)}
          />
        </Field>
        <Field label="Water" name="water" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.Water}
            value={form.formData.water}
            onChange={(value) => form.setFieldValue("water", value)}
          />
        </Field>
        <div className="flex justify-end gap-4">
          <Button variant="secondary">Save</Button>
        </div>
      </AnalysisStep>

      {/* Step 2 */}

      <AnalysisStep
        id="healthFacilities"
        title={"Health Facilities"}
        className="space-y-4"
        defaultOpen
      >
        <p>
          Description of the analysis. Sed ut perspiciatis unde omnis iste natus
          error sit voluptatem
        </p>
        <Field name="healthFacilities" required label="Health Facilities">
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.HealthFacilities}
            value={form.formData.healthFacilities}
            onChange={(value) => form.setFieldValue("healthFacilities", value)}
          />
        </Field>
        <div className="flex justify-end gap-4">
          <Button variant="secondary">Save</Button>
        </div>
      </AnalysisStep>

      {/* Step 3 */}

      <AnalysisStep
        id="travelScenario"
        title={"Travel Scenario"}
        className="space-y-4"
        defaultOpen
      >
        <p>
          Description of the analysis. Sed ut perspiciatis unde omnis iste natus
          error sit voluptatem
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="secondary">Save</Button>
        </div>
      </AnalysisStep>

      {/* Step 4 */}

      <AnalysisStep
        id="advancedSettings"
        title={"Advanced Settings"}
        className="space-y-4"
        defaultOpen
      >
        <p>
          Description of the analysis. Sed ut perspiciatis unde omnis iste natus
          error sit voluptatem
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="secondary">Save</Button>
        </div>
      </AnalysisStep>

      <div className="flex justify-end gap-4">
        <Button variant="white">Cancel</Button>
        <Button
          disabled={form.isSubmitting}
          type="submit"
          onClick={form.handleSubmit}
        >
          Compute
        </Button>
      </div>
    </div>
  );
};

AccessibilityAnalysisForm.fragments = {
  project: gql`
    fragment AccessibilityAnalysisForm_project on AccessmodProject {
      id
      ...DatasetPicker_project
    }
    ${DatasetPicker.fragments.project}
  `,
};

export default AccessibilityAnalysisForm;
