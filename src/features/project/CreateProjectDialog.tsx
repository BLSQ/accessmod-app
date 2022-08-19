import { gql } from "@apollo/client";
import clsx from "clsx";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import Input from "components/forms/Input";
import RadioGroup from "components/forms/RadioGroup";
import Textarea from "components/forms/Textarea";
import Spinner from "components/Spinner";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import {
  GeoFileMetadata,
  getExtentCoords,
  getRasterMetadata,
} from "libs/dataset";
import {
  Country,
  CreateAccessmodProjectError,
  CreateProjectMutationVariables,
  useCreateProjectMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import CountryPicker from "../CountryPicker";

type Props = {
  onClose: () => void;
  open: boolean;
};

type Form = {
  step: "project" | "config";
  name: string;
  description: string;
  spatialResolution: string;
  configMode: "auto" | "manual";
  raster: GeoFileMetadata;
  crs: string;
  country: Country;
};
const MUTATION = gql`
  mutation CreateProject($input: CreateAccessmodProjectInput!) {
    createAccessmodProject(input: $input) {
      success
      project {
        id
      }
      errors
    }
  }
`;

const CreateProjectDialog = (props: Props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const [createProjectMutation] = useCreateProjectMutation();
  const { t } = useTranslation();
  const [rasterError, setRasterError] = useState<string | null>(null);
  const clearCache = useCacheKey("projects");

  const form = useForm<Form>({
    initialState: {
      step: "project",
      spatialResolution: "100",
      configMode: "auto",
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.name) {
        errors.name = t("Enter a name");
      }
      if (!values.country) {
        errors.country = t("Select a country");
      }

      if (values.step !== "config") {
        return errors;
      }

      if (values.configMode === "manual") {
        if (!values.spatialResolution) {
          errors.spatialResolution = t("Enter a spatial resolution");
        }
        if (!values.crs) {
          errors.crs = t("Enter a CRS");
        }
      } else if (values.raster) {
        if (!values.raster.crs) {
          errors.raster = t("Unsupported CRS found in raster.");
        } else if (!values.raster.bounds) {
          errors.raster = t("Invalid bounds found in raster.");
        } else if (
          !values.raster.resolution ||
          !Number.isInteger(values.raster.resolution)
        ) {
          errors.raster = t(
            "Invalid resolution found in raster. Resolution must be an integer"
          );
        }
      }

      return errors;
    },

    onSubmit: async (values) => {
      const input = {
        description: values.description,
        name: values.name,
        country: { code: values.country.code },
      } as CreateProjectMutationVariables["input"];

      if (values.configMode === "auto") {
        input.spatialResolution = values.raster.resolution;
        input.crs = values.raster.crs!;
        input.extent = getExtentCoords(values.raster.bounds);
      } else {
        input.spatialResolution = parseInt(values.spatialResolution, 10);
        input.crs = parseInt(values.crs, 10);
      }

      const mutation = await createProjectMutation({
        variables: {
          input,
        },
      });

      if (!mutation.data) {
        throw new Error();
      }

      const { success, project, errors } = mutation.data.createAccessmodProject;

      if (success && project) {
        clearCache();
        await router.push(`/projects/${encodeURIComponent(project.id)}`);
        onClose();
      } else if (errors.includes(CreateAccessmodProjectError.NameDuplicate)) {
        throw new Error(t("A project already exists with this name"));
      } else {
        throw new Error("The project has not been created.");
      }
    },
  });

  const onBack: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault();
      if (form.formData.step === "config") {
        form.setFieldValue("step", "project");
      } else {
        onClose();
      }
    },
    [onClose, form]
  );

  const onNext: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (form.formData.step === "project") {
      event.preventDefault();
      form.setFieldValue("step", "config");
    }
    // Else let the form handles the submit event from this button
  };

  useEffect(() => {
    if (!form.formData.country) return;
    form.setFieldValue(
      "crs",
      `${form.formData.country.whoInfo?.defaultCRS || 6933}`
    );
    // We do not add form as a dependency to only trigger the useEffect when country changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formData.country]);

  useEffect(() => {
    if (!open) {
      form.resetForm();
      setRasterError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onRasterChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    setRasterError(null);
    if (!event.target.files?.length) {
      return null;
    }
    try {
      const metadata = await getRasterMetadata(event.target.files[0]);
      form.setFieldValue("raster", metadata);
    } catch (err) {
      setRasterError(t("This raster file is invalid"));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="max-w-xl">
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>
          {form.formData.step === "config"
            ? t("Configure your project")
            : t("Create a new Project")}
        </Dialog.Title>
        <Dialog.Content className="space-y-4 px-9 py-8">
          {form.formData.step === "project" && (
            <div className="flex flex-col gap-4">
              <Field
                label={t("Project name")}
                required
                className="col-span-2"
                name="name"
                value={form.formData.name}
                disabled={form.isSubmitting}
                type="text"
                onChange={form.handleInputChange}
                error={form.touched.name && form.errors.name}
              />
              <Field
                label={t("Country")}
                required
                name="country"
                className="col-span-2"
                error={form.touched.country && form.errors.country}
              >
                <CountryPicker
                  disabled={form.isSubmitting}
                  value={form.formData.country ?? null}
                  required
                  onChange={(value) => form.setFieldValue("country", value)}
                />
              </Field>

              <Field
                label={t("Description")}
                name="description"
                error={form.touched.description && form.errors.description}
              >
                <Textarea
                  name="description"
                  disabled={form.isSubmitting}
                  onChange={form.handleInputChange}
                >
                  {form.formData.description}
                </Textarea>
              </Field>
            </div>
          )}
          {form.formData.step === "config" && (
            <div className="flex flex-col gap-4">
              <p>
                {t(
                  "Your new project can be configured manually or initialized from a raster file"
                )}
              </p>
              <RadioGroup
                name="configMode"
                className="mb-3 flex-col"
                value={form.formData.configMode}
                onChange={form.handleInputChange}
                options={[
                  {
                    id: "auto",
                    label: t(
                      "Upload a raster file to automatically configure your new project"
                    ),
                  },
                  {
                    id: "manual",
                    label: t(
                      "Specify the spatial resolution and the coordinate reference system of your new project"
                    ),
                  },
                ]}
              />

              {form.formData.configMode === "manual" && (
                <>
                  <Field
                    required
                    label="Spatial Resolution (in meters)"
                    value={form.formData.spatialResolution}
                    help={t(
                      "The spatial resolution refers to the linear spacing of a measurement."
                    )}
                    name="spatialResolution"
                    type="number"
                    onChange={form.handleInputChange}
                    disabled={form.isSubmitting}
                    error={
                      form.touched.spatialResolution &&
                      form.errors.spatialResolution
                    }
                  />
                  <Field
                    required
                    label={t("Coordinate Reference System")}
                    name="crs"
                    type="number"
                    value={form.formData.crs}
                    help={t(
                      "A coordinate reference system (CRS) defines, with the help of coordinates, how the two-dimensional, projected map in your GIS is related to real places on the earth."
                    )}
                    onChange={form.handleInputChange}
                    disabled={form.isSubmitting}
                    error={form.touched.crs && form.errors.crs}
                  />
                  <div className="text-sm text-gray-500">
                    {t(
                      "Default values have been selected according to the project's country."
                    )}
                  </div>
                </>
              )}

              {form.formData.configMode === "auto" && (
                <>
                  <Field
                    name="raster"
                    label={t("Raster file")}
                    required
                    error={
                      (form.touched.raster && form.errors.raster) || rasterError
                    }
                  >
                    <Input
                      type="file"
                      accept={".tiff,.tif"}
                      required
                      onChange={onRasterChange}
                    />
                  </Field>
                  <div className="text-sm text-gray-500">
                    {t(
                      "Spatial resolution, coordinate reference system and geographic extent will be extracted from the raster file."
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {form.submitError && (
            <p className={clsx("text-sm", "text-red-600")}>
              {form.submitError}
            </p>
          )}
        </Dialog.Content>

        <Dialog.Actions>
          <Button onClick={onBack} disabled={form.isSubmitting} variant="white">
            {form.formData.step === "config" && t("Back")}
            {form.formData.step === "project" && t("Cancel")}
          </Button>
          <Button
            type={form.formData.step === "project" ? "button" : "submit"}
            disabled={form.isSubmitting || !form.isValid}
            className="space-x-2"
            onClick={onNext}
          >
            {form.isSubmitting && <Spinner size="xs" />}
            <span>
              {form.formData.step === "config" && t("Create")}
              {form.formData.step === "project" && t("Next")}
            </span>
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

export default CreateProjectDialog;
