import { gql } from "@apollo/client";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Block from "components/Block";
import Button from "components/Button";
import Checkbox from "components/forms/Checkbox";
import Field from "components/forms/Field";
import RadioGroup from "components/forms/RadioGroup";
import Spinner from "components/Spinner";
import Tooltip from "components/Tooltip";
import ScenarioEditor from "features/dataset/ScenarioEditor";
import StackLayerPriorities from "features/dataset/StackLayerPriorities";
import useBeforeUnload from "hooks/useBeforeUnload";
import useForm from "hooks/useForm";
import { displayAlert } from "libs/alert";
import { launchAnalysis } from "libs/analysis";
import {
  AccessibilityAnalysisForm_AnalysisFragment,
  AccessibilityAnalysisForm_ProjectFragment,
  AccessmodAccessibilityAnalysisAlgorithm,
  AccessmodAnalysisStatus,
  AccessmodFilesetRoleCode,
  AccessmodFilesetStatus,
  DatasetPicker_DatasetFragment,
  UpdateAccessmodAccessibilityAnalysisError,
  UpdateAccessmodAccessibilityAnalysisInput,
  useUpdateAccessibilityAnalysisMutation,
} from "libs/graphql";
import { routes } from "libs/router";
import { isTruthy } from "libs/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { LegacyRef, useCallback, useEffect, useMemo, useState } from "react";
import DatasetPicker from "../dataset/DatasetPicker";
import AnalysisStep from "./AnalysisStep";

type AccessibilityForm = {
  name: string;
  maxTravelTime: string;
  dem: DatasetPicker_DatasetFragment | null;
  stack?: DatasetPicker_DatasetFragment | null;
  water?: DatasetPicker_DatasetFragment | null;
  barrier?: DatasetPicker_DatasetFragment | null;
  landCover?: DatasetPicker_DatasetFragment | null;
  transportNetwork?: DatasetPicker_DatasetFragment | null;
  movingSpeeds: { kls: string; speed: number }[];
  stackPriorities: { id: string | null; class: string | null }[];
  healthFacilities: DatasetPicker_DatasetFragment | null;
  travelDirection: string;
  algorithm?: AccessmodAccessibilityAnalysisAlgorithm;
  waterAllTouched?: boolean;
  analysis: AccessmodAccessibilityAnalysisAlgorithm;
  knightMove?: boolean;
};

function getInitialFormState(
  analysis: AccessibilityAnalysisForm_AnalysisFragment
): Partial<AccessibilityForm> {
  return {
    name: analysis?.name,
    maxTravelTime: analysis?.maxTravelTime?.toString() ?? "120",
    stack: analysis?.stack,
    algorithm:
      analysis?.algorithm ??
      AccessmodAccessibilityAnalysisAlgorithm.Anisotropic,
    waterAllTouched: analysis?.waterAllTouched ?? undefined,
    travelDirection: analysis?.invertDirection ? "from" : "towards",
    dem: analysis?.dem,
    landCover: analysis?.landCover,
    knightMove: analysis?.knightMove ?? undefined,
    transportNetwork: analysis?.transportNetwork,
    barrier: analysis?.barrier,
    water: analysis?.water,
    healthFacilities: analysis?.healthFacilities,
    movingSpeeds: Object.entries<number>(analysis?.movingSpeeds ?? {}).map(
      ([kls, speed]) => ({ kls, speed })
    ),
    stackPriorities: analysis?.stackPriorities,
  };
}

function datasetToInput(dataset?: { id: string } | null) {
  return dataset?.id ?? null;
}

function getMutationInput(
  analysis: AccessibilityAnalysisForm_AnalysisFragment,
  formData: Partial<AccessibilityForm>,
  compositeStackMode: boolean
): UpdateAccessmodAccessibilityAnalysisInput {
  let input: UpdateAccessmodAccessibilityAnalysisInput = {
    id: analysis.id,
    name: formData.name,
    knightMove: formData.knightMove ?? undefined,
    maxTravelTime: parseInt(formData.maxTravelTime ?? "", 10),
    demId: datasetToInput(formData.dem),
    movingSpeeds:
      formData.movingSpeeds?.reduce((acc: any, { kls, speed }) => {
        acc[kls] = speed;
        return acc;
      }, {}) ?? {},
    healthFacilitiesId: datasetToInput(formData.healthFacilities),
    invertDirection: formData.travelDirection === "from",
    algorithm: formData.algorithm,
  };

  if (compositeStackMode) {
    input = {
      ...input,
      landCoverId: datasetToInput(formData.landCover),
      transportNetworkId: datasetToInput(formData.transportNetwork),
      waterId: datasetToInput(formData.water),
      barrierId: datasetToInput(formData.barrier),
      waterAllTouched: formData.waterAllTouched,
      stackPriorities: formData.stackPriorities,
    };
  } else {
    input.stackId = datasetToInput(formData.stack);
  }

  return input;
}

interface Props {
  project: AccessibilityAnalysisForm_ProjectFragment;
  analysis: AccessibilityAnalysisForm_AnalysisFragment;
}

const AccessibilityAnalysisForm = (props: Props) => {
  const { project, analysis } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const [compositeStackMode, setCompositeStackMode] = useState(!analysis.stack);
  const [updateAnalysis] = useUpdateAccessibilityAnalysisMutation();

  const form = useForm<AccessibilityForm>({
    // validate: validateForm,
    getInitialState: () => getInitialFormState(analysis),
    onSubmit: async (values) => {
      const { data } = await updateAnalysis({
        variables: {
          input: getMutationInput(analysis, values, compositeStackMode),
        },
      });
      if (!data) {
        throw new Error();
      }
      const { success, errors } = data.updateAccessmodAccessibilityAnalysis;

      if (success) {
        return;
      }

      if (
        errors.includes(UpdateAccessmodAccessibilityAnalysisError.NameDuplicate)
      ) {
        throw new Error(t("An analysis with this name already exists."));
      }
    },
  });

  useEffect(() => {
    if (form.isDirty && form.previousFormData !== form.formData) {
      form.handleSubmit();
    }
  }, [form]);

  useEffect(() => {
    form.resetForm();
    // We only want to reset the form when the analysis changes, regardless of the form object itself
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysis]);

  useBeforeUnload(() => form.isDirty);

  const onCompute = useCallback(async () => {
    if (!form.isValid) return;
    if (form.isDirty) {
      await form.handleSubmit();
    }
    try {
      await launchAnalysis(analysis);
      await router.push({
        pathname: routes.project_analysis,
        query: { projectId: project.id, analysisId: analysis.id },
      });
    } catch (err) {
      displayAlert(t("Computation failed. Check your input data."), "error");
    }
  }, [analysis, form, project, router, t]);

  const onChangePriorities = useCallback(
    (value: object | null) => form.setFieldValue("stackPriorities", value),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const availableLayers = useMemo(() => {
    return [
      form.formData.barrier,
      form.formData.transportNetwork,
      form.formData.water,
      form.formData.landCover,
    ].filter(isTruthy);
  }, [
    form.formData.barrier,
    form.formData.transportNetwork,
    form.formData.water,
    form.formData.landCover,
  ]);

  const isScenarioStepDisabled = useMemo(() => {
    if (form.formData.stack) {
      return form.formData.stack.status !== AccessmodFilesetStatus.Valid;
    } else {
      return !availableLayers.every((l) =>
        [
          AccessmodFilesetStatus.Valid,
          AccessmodFilesetStatus.ToAcquire,
        ].includes(l.status)
      );
    }
  }, [form.formData, availableLayers]);

  return (
    <form className="space-y-5 text-gray-700">
      <Block className="space-y-4">
        <div className="flex items-start">
          <InformationCircleIcon className="mr-2 h-8 w-8 text-gray-500" />
          <p>
            {t(
              "An accessibility analysis computes the traveling time surface, informing the time needed to reach the nearest health facility."
            )}
          </p>
        </div>
        <Field
          label={t("Analysis Name")}
          error={form.touched.name && form.errors.name}
          name="name"
          required
          type="text"
          className="md:w-1/2 xl:w-1/3"
          defaultValue={form.formData.name}
          onChange={(e) => form.setDebouncedFieldValue("name", e.target.value)}
        />
      </Block>

      {/* Step 1 */}

      <AnalysisStep id="friction" title={t("Friction Surface")} defaultOpen>
        <p className="mb-4">
          {t(
            "Choose the geographic layers used to generate the friction surface."
          )}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label={t("Digital Elevation Model")}
            name="dem"
            required
            error={form.touched.dem && form.errors.dem}
          >
            <DatasetPicker
              project={project}
              roleCode={AccessmodFilesetRoleCode.Dem}
              dataset={form.formData.dem}
              onChange={(value) => form.setFieldValue("dem", value)}
            />
          </Field>
          <div />

          <div className="col-span-2 -mx-2.5 rounded-md bg-gray-100 py-3 px-2.5">
            <h5 className="mb-2 font-semibold">{t("Stack")}</h5>
            <p className="mb-5 ">
              {t(
                "You have the choice to use an existing stack that you already uploaded or used in another analysis or you can create a new stack by uploading the different layers to merge together."
              )}
            </p>
            <RadioGroup
              className="col-span-2 mb-2"
              value={compositeStackMode ? "true" : "false"}
              required
              onChange={(event) =>
                setCompositeStackMode(event.target.value === "true")
              }
              name="compositeStackMode"
              options={[
                {
                  id: "true",
                  label: t("Create a new stack by selecting the layers"),
                },
                {
                  id: "false",
                  label: t("Use an existing stack or upload your own"),
                },
              ]}
            />
            <div className="grid gap-4  md:grid-cols-2">
              {compositeStackMode ? (
                <>
                  <Field
                    label={t("Land Cover")}
                    name="landCover"
                    required
                    error={form.touched.landCover && form.errors.landCover}
                  >
                    <DatasetPicker
                      project={project}
                      roleCode={AccessmodFilesetRoleCode.LandCover}
                      dataset={form.formData.landCover}
                      onChange={(value) =>
                        form.setFieldValue("landCover", value)
                      }
                    />
                  </Field>
                  <Field
                    label={t("Transport Network")}
                    name="transportNetwork"
                    error={
                      form.touched.transportNetwork &&
                      form.errors.transportNetwork
                    }
                  >
                    <DatasetPicker
                      project={project}
                      roleCode={AccessmodFilesetRoleCode.TransportNetwork}
                      dataset={form.formData.transportNetwork}
                      onChange={(value) =>
                        form.setFieldValue("transportNetwork", value)
                      }
                    />
                  </Field>

                  <Field
                    label={t("Water")}
                    name="water"
                    error={form.touched.water && form.errors.water}
                  >
                    <DatasetPicker
                      project={project}
                      roleCode={AccessmodFilesetRoleCode.Water}
                      dataset={form.formData.water}
                      onChange={(value) => form.setFieldValue("water", value)}
                    />
                  </Field>
                  <Field
                    label={t("Barriers")}
                    name="barrier"
                    error={form.touched.barrier && form.errors.barrier}
                  >
                    <DatasetPicker
                      project={project}
                      roleCode={AccessmodFilesetRoleCode.Barrier}
                      dataset={form.formData.barrier}
                      onChange={(value) => form.setFieldValue("barrier", value)}
                    />
                  </Field>
                  <Checkbox
                    label={t("All cells intersecting water are impassable")}
                    checked={form.formData.waterAllTouched}
                    name="waterAllTouched"
                    onChange={form.handleInputChange}
                  />

                  <Field
                    label={t("Layer priorities")}
                    className="col-span-2"
                    name="stackPriorities"
                    required
                    error={
                      form.touched.stackPriorities &&
                      form.errors.stackPriorities
                    }
                  >
                    <StackLayerPriorities
                      value={form.formData.stackPriorities ?? []}
                      onChange={onChangePriorities}
                      layers={availableLayers}
                    />
                  </Field>
                </>
              ) : (
                <Field
                  label={t("Stack")}
                  name="stack"
                  required
                  error={form.errors.stack}
                >
                  <DatasetPicker
                    project={project}
                    roleCode={AccessmodFilesetRoleCode.Stack}
                    dataset={form.formData.stack}
                    onChange={(value) => form.setFieldValue("stack", value)}
                  />
                </Field>
              )}
            </div>
          </div>
        </div>
      </AnalysisStep>

      {/* Step 2 */}

      <AnalysisStep
        id="healthFacilities"
        title={t("Health Facilities")}
        className="space-y-4"
      >
        <p>{t("Choose the health facilities layer.")}</p>
        <Field
          name="healthFacilities"
          required
          label={t("Health Facilities")}
          className="md:w-1/2 xl:w-1/3"
          error={form.touched.healthFacilities && form.errors.healthFacilities}
        >
          <DatasetPicker
            project={project}
            roleCode={AccessmodFilesetRoleCode.HealthFacilities}
            dataset={form.formData.healthFacilities}
            onChange={(value) => form.setFieldValue("healthFacilities", value)}
          />
        </Field>
      </AnalysisStep>

      {/* Step 3 */}

      <AnalysisStep
        id="travelScenario"
        title={
          <div className="flex items-center">
            <div className="flex-1">{t("Travel Scenario")}</div>
            {isScenarioStepDisabled && (
              <Tooltip
                className="mr-2"
                label={t("Your stack (or its layers) has to be valid.")}
                renderTrigger={(ref: LegacyRef<any>) => (
                  <ExclamationCircleIcon
                    ref={ref}
                    className="mr-2 h-5 w-5 cursor-pointer text-amber-400"
                  />
                )}
              />
            )}
          </div>
        }
        disabled={isScenarioStepDisabled}
      >
        <p className="mb-4">
          {t(
            "Assign moving speeds to each category of road network and land cover."
          )}
        </p>
        <div className="w-3/4">
          <ScenarioEditor
            scenario={form.formData.movingSpeeds}
            onChange={(movingSpeeds) => {
              form.setFieldValue("movingSpeeds", movingSpeeds);
            }}
          />
          {form.touched.movingSpeeds && form.errors.movingSpeeds && (
            <div className="mt-2 text-red-500">{form.errors.movingSpeeds}</div>
          )}
        </div>
      </AnalysisStep>

      {/* Step 4 */}

      <AnalysisStep
        id="advancedSettings"
        title={t("Optional Settings")}
        className="space-y-4"
      >
        <Field
          name="algorithm"
          label={t("Cost distance analysis method")}
          required
        >
          <RadioGroup
            name="algorithm"
            onChange={form.handleInputChange}
            value={form.formData.algorithm}
            options={[
              {
                id: AccessmodAccessibilityAnalysisAlgorithm.Isotropic,
                label: t("Isotropic"),
              },
              {
                id: AccessmodAccessibilityAnalysisAlgorithm.Anisotropic,
                label: t("Anisotropic"),
              },
            ]}
          />
        </Field>
        <Field name="travelDirection" label={t("Direction of travel")} required>
          <RadioGroup
            name="travelDirection"
            onChange={form.handleInputChange}
            value={form.formData.travelDirection}
            options={[
              { id: "towards", label: t("Towards facilities") },
              { id: "from", label: t("From facilities") },
            ]}
          />
        </Field>

        <Field
          name="maxTravelTime"
          onChange={form.handleInputChange}
          type="number"
          className="md:w-1/2 xl:w-1/3"
          required
          label={t("Max travel time (in minutes)")}
          placeholder={"60"}
          value={form.formData.maxTravelTime}
        />
        <Checkbox
          label={t("Use Knight’s move in cost distance analysis")}
          checked={form.formData.knightMove}
          name="knightMove"
          onChange={form.handleInputChange}
        />
      </AnalysisStep>

      <div className="flex items-center justify-between bg-gray-50">
        <div>
          {form.submitError && (
            <div className="text-right text-sm text-danger">
              {form.submitError}
            </div>
          )}
          {analysis.status !== AccessmodAnalysisStatus.Ready && (
            <div className="text-right text-sm font-medium text-gray-600">
              {t(
                "All fields need to be filled in to be able to run the analysis."
              )}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={onCompute}
            disabled={
              form.isSubmitting ||
              analysis.status !== AccessmodAnalysisStatus.Ready
            }
          >
            {form.isSubmitting && <Spinner className="mr-2" size="xs" />}
            {t("Run")}
          </Button>
        </div>
      </div>
    </form>
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
      movingSpeeds
      healthFacilities {
        ...DatasetPicker_dataset
      }
      type
      waterAllTouched
      stackPriorities
      knightMove
      algorithm
      invertDirection
      maxTravelTime
      status
      landCover {
        ...DatasetPicker_dataset
      }
      dem {
        ...DatasetPicker_dataset
      }
      stack {
        ...DatasetPicker_dataset
      }
      barrier {
        ...DatasetPicker_dataset
      }
      water {
        ...DatasetPicker_dataset
      }
      transportNetwork {
        ...DatasetPicker_dataset
      }
    }

    ${DatasetPicker.fragments.dataset}
  `,
};

const UPDATE_ANALYSIS_MUTATION = gql`
  mutation UpdateAccessibilityAnalysis(
    $input: UpdateAccessmodAccessibilityAnalysisInput
  ) {
    updateAccessmodAccessibilityAnalysis(input: $input) {
      success
      errors
      analysis {
        ...AccessibilityAnalysisForm_analysis
      }
    }
  }
  ${AccessibilityAnalysisForm.fragments.analysis}
`;

export default AccessibilityAnalysisForm;
