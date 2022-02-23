import { gql } from "@apollo/client";
import Block from "components/Block";
import Button from "components/Button";
import Field from "components/forms/Field";
import RadioGroup from "components/forms/RadioGroup";
import useBeforeUnload from "hooks/useBeforeUnload";
import useForm from "hooks/useForm";
import {
  AccessibilityAnalysisForm_AnalysisFragment,
  AccessibilityAnalysisForm_ProjectFragment,
  AccessmodFilesetRoleCode,
  useUpdateAccessibilityAnalysisMutation,
} from "libs/graphql";
import { routes } from "libs/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import DatasetPicker from "../DatasetPicker";
import AnalysisStep from "./AnalysisStep";

type AccessibilityForm = {
  name: string;
  maxTravelTime: string;
  landCover: any;
  transportNetwork: any;
  dem: any;
  slope: any;
  water: any;
  barrier: any;
  movingSpeeds: any;
  healthFacilities: any;
  travelDirection: string;
  analysisType: string;
  [key: string]: any;
};

function getInitialFormState(
  analysis: AccessibilityAnalysisForm_AnalysisFragment
): Partial<AccessibilityForm> {
  return {
    name: analysis.name,
    maxTravelTime: analysis.maxTravelTime?.toString() ?? "120",
    invertDirection: analysis.invertDirection ?? false,
    analysisType: !analysis?.anisotropic ? "isotropic" : "anisotropic",
    travelDirection: analysis?.invertDirection ? "from" : "towards",
    landCover: analysis?.landCover,
    transportNetwork: analysis?.transportNetwork,
    slope: analysis?.slope,
    barrier: analysis?.barrier,
    water: analysis?.water,
    healthFacilities: analysis?.healthFacilities,
    movingSpeeds: analysis?.movingSpeeds,
  };
}

function datasetToInput(dataset?: { id: string }) {
  if (dataset?.id === "AUTO") {
    return null;
  }
  return dataset?.id;
}

function getMutationInput(
  analysis: AccessibilityAnalysisForm_AnalysisFragment,
  formData: Partial<AccessibilityForm>
) {
  const input = {
    id: analysis.id,
    name: formData.name,
    maxTravelTime: parseInt(formData.maxTravelTime ?? "", 10),
    landCoverId: datasetToInput(formData.landCover),
    demId: datasetToInput(formData.dem),
    transportNetworkId: datasetToInput(formData.transportNetwork),
    slopeId: datasetToInput(formData.slope),
    waterId: datasetToInput(formData.water),
    barrierId: datasetToInput(formData.barrier),
    movingSpeedsId: datasetToInput(formData.movingSpeeds),
    healthFacilitiesId: datasetToInput(formData.healthFacilities),
    invertDirection: formData.travelDirection === "from",
    anisotropic: formData.analysisType === "anisotropic",
  };

  return input;
}

const validateForm = (values: Partial<AccessibilityForm>) => {
  const errors = {} as any;

  return errors;
};

interface Props {
  project: AccessibilityAnalysisForm_ProjectFragment;
  analysis: AccessibilityAnalysisForm_AnalysisFragment;
}

const AccessibilityAnalysisForm = (props: Props) => {
  const { project, analysis } = props;
  const [updateAnalysis] = useUpdateAccessibilityAnalysisMutation();

  const form = useForm<AccessibilityForm>({
    validate: validateForm,
    getInitialState: () => getInitialFormState(analysis),
    onSubmit: async (values) => {
      await updateAnalysis({
        variables: { input: getMutationInput(analysis, values) },
      });
      // router.push({
      //   pathname: routes.project_analysis,
      //   query: { projectId: project.id, analysisId: analysis.id },
      // });
    },
  });

  useEffect(() => {
    form.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysis]);

  useBeforeUnload(() => Object.keys(form.touched).length > 0);

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
            required
            onChange={(value) => form.setFieldValue("landCover", value)}
          />
        </Field>
        <Field label="Transport Network" name="transportNetwork" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.TransportNetwork}
            value={form.formData.transportNetwork}
            required
            onChange={(value) => form.setFieldValue("transportNetwork", value)}
          />
        </Field>
        <Field label="Barriers" name="barriers" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.Barrier}
            value={form.formData.barriers}
            required
            onChange={(value) => form.setFieldValue("barriers", value)}
          />
        </Field>
        <Field label="Water" name="water" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.Water}
            value={form.formData.water}
            required
            onChange={(value) => form.setFieldValue("water", value)}
          />
        </Field>
        <div className="flex justify-end gap-4">
          <Button
            disabled={form.isSubmitting}
            onClick={form.handleSubmit}
            variant="secondary"
          >
            Save
          </Button>
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
            required
            roleCode={AccessmodFilesetRoleCode.HealthFacilities}
            value={form.formData.healthFacilities}
            onChange={(value) => form.setFieldValue("healthFacilities", value)}
          />
        </Field>
        <div className="flex justify-end gap-4">
          <Button
            disabled={form.isSubmitting}
            onClick={form.handleSubmit}
            variant="secondary"
          >
            Save
          </Button>
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
        <Field name="movingSpeeds" required label="Scenario">
          <DatasetPicker
            project={project}
            required
            roleCode={AccessmodFilesetRoleCode.MovingSpeeds}
            value={form.formData.movingSpeeds}
            onChange={(value) => form.setFieldValue("movingSpeeds", value)}
          />
        </Field>
        <div className="flex justify-end gap-4">
          <Button
            disabled={form.isSubmitting}
            onClick={form.handleSubmit}
            variant="secondary"
          >
            Save
          </Button>
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
        <Field name="analysisType" label="Travel Direction" required>
          <RadioGroup
            name="analysisType"
            onChange={form.handleInputChange}
            value={form.formData.analysisType}
            options={[
              { id: "isotropic", label: "Isotropic (no DEM)" },
              { id: "anisotropic", label: "Anisotropic (use DEM)" },
            ]}
          />
        </Field>
        <Field name="travelDirection" label="Direction of travel" required>
          <RadioGroup
            name="travelDirection"
            onChange={form.handleInputChange}
            value={form.formData.travelDirection}
            options={[
              { id: "towards", label: "Towards Facilities" },
              { id: "from", label: "From facilities" },
            ]}
          />
        </Field>
        <Field
          name="maxTravelTime"
          onChange={form.handleInputChange}
          type="number"
          required
          label="Max travel time"
          value={form.formData.maxTravelTime}
        />
        <div className="flex justify-end gap-4">
          <Button onClick={form.handleSubmit} variant="secondary">
            Save
          </Button>
        </div>
      </AnalysisStep>

      <div className="flex justify-end gap-4">
        <Link
          href={{
            pathname: routes.project_analysis,
            query: { projectId: project.id, analysisId: analysis.id },
          }}
        >
          <a>
            <Button variant="white">Cancel</Button>
          </a>
        </Link>
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
  analysis: gql`
    fragment AccessibilityAnalysisForm_analysis on AccessmodAccessibilityAnalysis {
      __typename
      id
      name
      movingSpeeds {
        id
        name
      }
      healthFacilities {
        id
        name
      }
      anisotropic
      invertDirection
      maxTravelTime
      status
      landCover {
        id
        name
      }
      dem {
        id
        name
      }
      barrier {
        id
        name
      }
      water {
        id
        name
      }
      slope {
        id
        name
      }
      transportNetwork {
        id
        name
      }
    }
  `,
};

const UPDATE_ANALYSIS_MUTATION = gql`
  mutation UpdateAccessibilityAnalysis(
    $input: UpdateAccessmodAccessibilityAnalysisInput
  ) {
    updateAccessmodAccessibilityAnalysis(input: $input) {
      success
      analysis {
        ...AccessibilityAnalysisForm_analysis
      }
    }
  }
  ${AccessibilityAnalysisForm.fragments.analysis}
`;

export default AccessibilityAnalysisForm;
