import { gql } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Badge from "components/Badge";
import Block from "components/Block";
import Button from "components/Button";
import Field from "components/forms/Field";
import Input from "components/forms/Input";
import Spinner from "components/Spinner";
import useBeforeUnload from "hooks/useBeforeUnload";
import useForm from "hooks/useForm";
import { displayErrorAlert } from "libs/alert";
import { launchAnalysis } from "libs/analysis";
import {
  AccessmodAnalysisStatus,
  AccessmodFilesetRoleCode,
  DatasetPicker_DatasetFragment,
  UpdateAccessmodZonalStatisticsError,
  UpdateAccessmodZonalStatisticsInput,
  useUpdateZonalStatisticsMutation,
  ZonalStatisticsForm_AnalysisFragment,
  ZonalStatisticsForm_ProjectFragment,
} from "libs/graphql";
import { routes } from "libs/router";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { KeyboardEvent, useCallback, useEffect, useRef } from "react";
import DatasetPicker from "../dataset/DatasetPicker";

type Form = {
  name: string;
  population: DatasetPicker_DatasetFragment | null;
  travelTimes: DatasetPicker_DatasetFragment | null;
  boundaries: DatasetPicker_DatasetFragment | null;
  timeThresholds: string[];
};

function getInitialFormState(
  analysis: ZonalStatisticsForm_AnalysisFragment
): Partial<Form> {
  return {
    name: analysis?.name,
    timeThresholds: analysis?.timeThresholds ?? [],
    population: analysis?.population,
    boundaries: analysis?.boundaries,
    travelTimes: analysis?.travelTimes,
  };
}

function getMutationInput(
  analysis: ZonalStatisticsForm_AnalysisFragment,
  formData: Partial<Form>
): UpdateAccessmodZonalStatisticsInput {
  let input: UpdateAccessmodZonalStatisticsInput = {
    id: analysis.id,
    name: formData.name,
    populationId: formData.population?.id,
    travelTimesId: formData.travelTimes?.id,
    boundariesId: formData?.boundaries?.id,
    timeThresholds: formData.timeThresholds,
  };

  return input;
}

interface Props {
  project: ZonalStatisticsForm_ProjectFragment;
  analysis: ZonalStatisticsForm_AnalysisFragment;
}

const ZonalStatisticsForm = (props: Props) => {
  const { project, analysis } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const thresholdRef = useRef<HTMLInputElement>(null);
  const [updateAnalysis] = useUpdateZonalStatisticsMutation();

  const form = useForm<Form>({
    // validate: validateForm,
    getInitialState: () => getInitialFormState(analysis),
    onSubmit: async (values) => {
      const { data } = await updateAnalysis({
        variables: { input: getMutationInput(analysis, values) },
      });
      if (!data) {
        throw new Error();
      }
      const { success, errors } = data.updateAccessmodZonalStatistics;

      if (success) return;

      if (errors.includes(UpdateAccessmodZonalStatisticsError.NameDuplicate)) {
        throw new Error(t("An analysis with this name already exists."));
      }
    },
  });

  useEffect(() => {
    if (form.isDirty) {
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
      displayErrorAlert("Computation failed. Check your input data.");
    }
  }, [analysis, form, project, router]);

  const onThresholdAdd = useCallback(
    () => {
      if (!thresholdRef.current?.value) return;
      form.setFieldValue(
        "timeThresholds",
        (form.formData.timeThresholds ?? []).concat(thresholdRef.current.value)
      );
      thresholdRef.current.value = "";
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.formData.timeThresholds]
  );

  const onThresholdKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && (event.target as HTMLInputElement).value) {
        event.preventDefault();
        event.stopPropagation();
        onThresholdAdd();
      }
    },
    [onThresholdAdd]
  );

  const onThresholdRemove = useCallback(
    (index: number) => {
      const value = [...(form.formData.timeThresholds ?? [])];
      value.splice(index, 1);
      form.setFieldValue("timeThresholds", value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.formData.timeThresholds]
  );

  return (
    <form className="space-y-5 text-gray-700">
      <Block className="space-y-4">
        <div className="flex items-start">
          <InformationCircleIcon className="mr-2 h-8 w-8 text-gray-500" />
          <p>
            {t(
              "The zonal statistics analysis computes the percentage of the population being covered in each sub national division."
            )}
          </p>
        </div>
        <Field
          label={t("Analysis Name")}
          error={form.touched.name && form.errors.name}
          name="name"
          required
          type="text"
          className="w-1/2"
          defaultValue={form.formData.name}
          onChange={(e) => form.setDebouncedFieldValue("name", e.target.value)}
        />
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-4"></div>
          <Field
            label={t("Population")}
            error={form.touched.population && form.errors.population}
            name="population"
            required
            className="col-span-2"
          >
            <DatasetPicker
              project={project}
              roleCode={AccessmodFilesetRoleCode.Population}
              dataset={form.formData.population}
              onChange={(population) =>
                form.setFieldValue("population", population)
              }
            />
          </Field>
          <Field
            label={t("Boundaries")}
            error={form.touched.boundaries && form.errors.boundaries}
            name="boundaries"
            required
            className="col-span-2"
          >
            <DatasetPicker
              project={project}
              roleCode={AccessmodFilesetRoleCode.Boundaries}
              dataset={form.formData.boundaries}
              onChange={(boundaries) =>
                form.setFieldValue("boundaries", boundaries)
              }
            />
          </Field>
          <Field
            label={t("Travel Times")}
            error={form.touched.travelTimes && form.errors.travelTimes}
            name="travelTimes"
            required
            className="col-span-2"
          >
            <DatasetPicker
              project={project}
              roleCode={AccessmodFilesetRoleCode.TravelTimes}
              dataset={form.formData.travelTimes}
              onChange={(travelTimes) =>
                form.setFieldValue("travelTimes", travelTimes)
              }
            />
          </Field>
          <Field
            label={t("Time thresholds (in minutes)")}
            error={form.touched.timeThresholds && form.errors.timeThresholds}
            name="timeThresholds"
            required
            className="col-span-2"
          >
            <div className="flex flex-wrap items-center gap-2">
              {form.formData.timeThresholds?.map((value, idx) => (
                <Badge
                  size="sm"
                  className="bg-gray-100"
                  key={idx}
                  onRemove={() => onThresholdRemove(idx)}
                >
                  {value}
                </Badge>
              ))}
              <Input
                ref={thresholdRef}
                type="number"
                className="w-24"
                placeholder={"10"}
                onKeyDown={onThresholdKeyDown}
              />
              <Button onClick={onThresholdAdd} size="sm">
                <PlusIcon className="w-4" />
              </Button>
            </div>
          </Field>
        </div>
      </Block>

      <div className="flex items-center justify-between bg-gray-50">
        <div>
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

ZonalStatisticsForm.fragments = {
  project: gql`
    fragment ZonalStatisticsForm_project on AccessmodProject {
      id
      ...DatasetPicker_project
    }
    ${DatasetPicker.fragments.project}
  `,
  analysis: gql`
    fragment ZonalStatisticsForm_analysis on AccessmodZonalStatistics {
      __typename
      id
      name
      type
      timeThresholds
      travelTimes {
        id
        ...DatasetPicker_dataset
      }
      boundaries {
        id
        ...DatasetPicker_dataset
      }
      population {
        id
        ...DatasetPicker_dataset
      }
      status
    }

    ${DatasetPicker.fragments.dataset}
  `,
};

const UPDATE_ANALYSIS_MUTATION = gql`
  mutation UpdateZonalStatistics($input: UpdateAccessmodZonalStatisticsInput) {
    updateAccessmodZonalStatistics(input: $input) {
      success
      errors
      analysis {
        ...ZonalStatisticsForm_analysis
      }
    }
  }
  ${ZonalStatisticsForm.fragments.analysis}
`;

export default ZonalStatisticsForm;
