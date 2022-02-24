import { gql } from "@apollo/client";
import Block from "components/Block";
import Button from "components/Button";
import Field from "components/forms/Field";
import RadioGroup from "components/forms/RadioGroup";
import useBeforeUnload from "hooks/useBeforeUnload";
import useDebounce from "hooks/useDebounce";
import useForm from "hooks/useForm";
import { launchAnalysis } from "libs/analysis";
import {
  AccessibilityAnalysisForm_AnalysisFragment,
  AccessibilityAnalysisForm_ProjectFragment,
  AccessmodAnalysisStatus,
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
  extent: any;
};

function getInitialFormState(
  analysis: AccessibilityAnalysisForm_AnalysisFragment
): Partial<AccessibilityForm> {
  return {
    name: analysis.name,
    maxTravelTime: analysis.maxTravelTime?.toString() ?? "120",
    analysisType: !analysis?.anisotropic ? "isotropic" : "anisotropic",
    travelDirection: analysis?.invertDirection ? "from" : "towards",
    landCover: analysis?.landCover,
    extent: analysis?.extent,
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
    return undefined;
  }
  return dataset?.id ?? undefined;
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
    extentId: datasetToInput(formData.extent),
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
  const router = useRouter();
  const [isTriggering, setTriggering] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [updateAnalysis] = useUpdateAccessibilityAnalysisMutation();

  const form = useForm<AccessibilityForm>({
    validate: validateForm,
    getInitialState: () => getInitialFormState(analysis),
    onSubmit: async (values) => {
      await updateAnalysis({
        variables: { input: getMutationInput(analysis, values) },
      });
    },
  });
  const debouncedFormData = useDebounce(form.formData, 500);

  useEffect(() => {
    form.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysis]);

  useEffect(() => {
    console.log("Form has changed", form.isDirty);
    if (form.isDirty) {
      form.handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFormData]);

  useBeforeUnload(() => form.isDirty);

  const onCompute = useCallback(async () => {
    setTriggering(true);
    if (form.isDirty) {
      await form.handleSubmit();
    }

    if (await launchAnalysis(analysis)) {
      router.push({
        pathname: routes.project_analysis,
        query: { projectId: project.id, analysisId: analysis.id },
      });
    } else {
      setTriggering(false);
      setError("Computation failed. Check your input data");
    }
  }, [form.formData]);

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
        <Field label="Extent" name="extent" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.Geometry}
            value={form.formData.extent}
            required
            onChange={(value) => form.setFieldValue("extent", value)}
          />
        </Field>
        <Field label="Land Cover" name="landCover" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.LandCover}
            value={form.formData.landCover}
            required
            onChange={(value) => form.setFieldValue("landCover", value)}
          />
        </Field>
        <Field label="Slope" name="slope" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.Slope}
            value={form.formData.slope}
            required
            onChange={(value) => form.setFieldValue("slope", value)}
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
        <Field label="Barriers" name="barrier" required>
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.Barrier}
            value={form.formData.barrier}
            required
            onChange={(value) => form.setFieldValue("barrier", value)}
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
      </AnalysisStep>

      {error && <div className="text-sm text-danger text-right">{error}</div>}
      {analysis.status !== AccessmodAnalysisStatus.Ready && (
        <div className="text-sm font-medium text-gray-600 text-right">
          All fields need to be filled in to be able to run the analysis.
        </div>
      )}

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
          disabled={
            form.isSubmitting ||
            isTriggering ||
            analysis.status !== AccessmodAnalysisStatus.Ready
          }
          type="button"
          onClick={onCompute}
        >
          {form.isSubmitting ? "Saving..." : "Compute"}
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
      extent {
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
