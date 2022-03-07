import { gql } from "@apollo/client";
import Block from "components/Block";
import Button from "components/Button";
import Checkbox from "components/forms/Checkbox";
import Field from "components/forms/Field";
import RadioGroup from "components/forms/RadioGroup";
import useBeforeUnload from "hooks/useBeforeUnload";
import useDebounce from "hooks/useDebounce";
import useForm from "hooks/useForm";
import { launchAnalysis } from "libs/analysis";
import {
  AccessibilityAnalysisForm_AnalysisFragment,
  AccessibilityAnalysisForm_ProjectFragment,
  AccessmodAccessibilityAnalysisAlgorithm,
  AccessmodAnalysisStatus,
  AccessmodFilesetRoleCode,
  UpdateAccessmodAccessibilityAnalysisInput,
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
  algorithm?: AccessmodAccessibilityAnalysisAlgorithm;
  waterAllTouched?: boolean;
  analysis: AccessmodAccessibilityAnalysisAlgorithm;
  maxSlope: string;
  knightMove?: boolean;
  priorityRoads?: boolean;
};

function getInitialFormState(
  analysis: AccessibilityAnalysisForm_AnalysisFragment
): Partial<AccessibilityForm> {
  return {
    name: analysis?.name,
    maxTravelTime: analysis?.maxTravelTime?.toString() ?? "120",
    algorithm:
      analysis?.algorithm ??
      AccessmodAccessibilityAnalysisAlgorithm.Anisotropic,
    waterAllTouched: analysis?.waterAllTouched ?? undefined,
    priorityRoads: analysis?.priorityRoads ?? undefined,
    travelDirection: analysis?.invertDirection ? "from" : "towards",
    dem: analysis?.dem,
    landCover: analysis?.landCover,
    knightMove: analysis?.knightMove ?? undefined,
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
): UpdateAccessmodAccessibilityAnalysisInput {
  return {
    id: analysis.id,
    name: formData.name,
    knightMove: formData.knightMove ?? undefined,
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
    algorithm: formData.algorithm,
    waterAllTouched: formData.waterAllTouched,
    priorityRoads: formData.priorityRoads,
    maxSlope: formData.maxSlope ? parseInt(formData.maxSlope, 10) : undefined,
  };
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
    onSubmit: async (values, setErrors) => {
      const { success, errors } = await updateAnalysis({
        variables: { input: getMutationInput(analysis, values) },
      });
      setErrors(errors);
    },
    errorMessages: {
      NAME_DUPLICATE: "An analysis with the same name already exists",
    },
  });
  const debouncedFormData = useDebounce(form.formData, 500);

  useEffect(() => {
    form.resetForm();
    // We only want to reset the form when the analysis changes, regardless of the form object itself
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysis]);

  useEffect(() => {
    if (form.isDirty) {
      form.handleSubmit();
    }
    // We only want to reset the form when the debounced form data changes, regardless of the form object itself
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFormData]);

  useBeforeUnload(() => form.isDirty);

  const onCompute = useCallback(async () => {
    setTriggering(true);
    if (form.isDirty) {
      await form.handleSubmit();
    }

    if (await launchAnalysis(analysis)) {
      await router.push({
        pathname: routes.project_analysis,
        query: { projectId: project.id, analysisId: analysis.id },
      });
    } else {
      setTriggering(false);
      setError("Computation failed. Check your input data");
    }
  }, [analysis, form, project, router]);

  return (
    <div className="space-y-5">
      <Block>
        <p className="mb-4">Description</p>
        <Field
          label="Analysis Name"
          name="name"
          required
          type="text"
          className="md:w-1/2 xl:w-1/3"
          value={form.formData.name}
          onChange={form.handleInputChange}
          errors={form.errors.name}
        />
      </Block>

      {/* Step 1 */}

      <AnalysisStep id="friction" title="Friction Surface" defaultOpen>
        <p className="mb-4">
          Choose the geographic layers used to generate the friction surface.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Digital Elevation Model" name="dem" required>
            <DatasetPicker
              project={project}
              roleCode={AccessmodFilesetRoleCode.Dem}
              value={form.formData.dem}
              required
              onChange={(value) => form.setFieldValue("dem", value)}
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
          <Field label="Transport Network" name="transportNetwork" required>
            <DatasetPicker
              project={project}
              roleCode={AccessmodFilesetRoleCode.TransportNetwork}
              value={form.formData.transportNetwork}
              required
              onChange={(value) =>
                form.setFieldValue("transportNetwork", value)
              }
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
          <Field label="Slope" name="slope" required>
            <DatasetPicker
              project={project}
              roleCode={AccessmodFilesetRoleCode.Slope}
              value={form.formData.slope}
              required
              onChange={(value) => form.setFieldValue("slope", value)}
            />
          </Field>
          <Field
            label="Max Slope"
            name="maxSlope"
            value={form.formData.maxSlope}
            onChange={form.handleInputChange}
            type="number"
            min={0}
            max={1000}
          />
          <br />
          <Checkbox
            label="Roads have priority over water cells"
            checked={form.formData.priorityRoads}
            name="priorityRoads"
            onChange={form.handleInputChange}
          />
          <Checkbox
            label="All cells intersecting water are impassable"
            checked={form.formData.waterAllTouched}
            name="waterAllTouched"
            onChange={form.handleInputChange}
          />
        </div>
      </AnalysisStep>

      {/* Step 2 */}

      <AnalysisStep
        id="healthFacilities"
        title={"Health Facilities"}
        className="space-y-4"
      >
        <p>Choose the health facilities layer.</p>
        <Field
          name="healthFacilities"
          required
          label="Health Facilities"
          className="md:w-1/2 xl:w-1/3"
        >
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

      <AnalysisStep id="travelScenario" title={"Travel Scenario"}>
        <p className="mb-4">
          Assign moving speeds to each category of road network and land cover.
        </p>
        <Field
          name="movingSpeeds"
          required
          label="Scenario"
          className="md:w-1/2 xl:w-1/3"
        >
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
      >
        <p>Description</p>
        <Field name="algorithm" label="Cost distance analysis method" required>
          <RadioGroup
            name="algorithm"
            onChange={form.handleInputChange}
            value={form.formData.algorithm}
            options={[
              {
                id: AccessmodAccessibilityAnalysisAlgorithm.Isotropic,
                label: "Isotropic",
              },
              {
                id: AccessmodAccessibilityAnalysisAlgorithm.Anisotropic,
                label: "Anisotropic",
              },
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
          className="md:w-1/2 xl:w-1/3"
          required
          label="Max travel time"
          value={form.formData.maxTravelTime}
        />
        <Checkbox
          label="Use Knight’s move in cost distance analysis"
          checked={form.formData.knightMove}
          name="knightMove"
          onChange={form.handleInputChange}
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
      maxSlope
      priorityRoads
      priorityLandCover
      waterAllTouched

      knightMove
      algorithm
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
