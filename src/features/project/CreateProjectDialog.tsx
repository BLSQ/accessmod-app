import { gql } from "@apollo/client";
import clsx from "clsx";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import Textarea from "components/forms/Textarea";
import Spinner from "components/Spinner";
import DatasetFileInput from "features/dataset/DatasetFileInput";
import FilesetRolePicker from "features/FilesetRolePicker";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import { Country } from "libs/countries";
import {
  createDataset,
  getExtentCoords,
  getRasterMetadata,
} from "libs/dataset";
import {
  AccessmodFilesetFormat,
  CreateAccessmodProjectError,
  useCreateProjectMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import CountryPicker from "../CountryPicker";

type Props = {
  onClose: () => void;
  open: boolean;
};

type Form = {
  name: string;
  description: string;
  spatialResolution: string;
  country: Country;
  crs: string;
  extent?: number[];
};
const MUTATION = gql`
  mutation CreateProject($input: CreateAccessmodProjectInput) {
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [configurationDataset, setConfigurationDataset] = useState<{
    role: any;
    files: File[];
  }>({
    role: null,
    files: [],
  });
  const [createProjectMutation] = useCreateProjectMutation();
  const { t } = useTranslation();
  const form = useForm<Form>({
    validate: (values) => {
      const errors = {} as any;
      if (!values.name) {
        errors.name = t("Enter a name");
      }
      if (!values.country) {
        errors.country = t("Select a country");
      }
      if (!values.description) {
        errors.description = t("Type a short description");
      }
      if (!values.spatialResolution) {
        errors.spatialResolution = t("Enter a spatial resolution");
      }
      if (!values.crs) {
        errors.crs = t("Enter a Coordinate Reference System");
      }

      return errors;
    },

    onSubmit: async (values) => {
      const mutation = await createProjectMutation({
        variables: {
          input: {
            description: values.description,
            spatialResolution: parseInt(values.spatialResolution, 10),
            name: values.name,
            country: { code: values.country.code },
            crs: parseInt(values.crs, 10),
            extent: values.extent ? JSON.stringify(values.extent) : undefined,
          },
        },
      });
      if (!mutation.data) {
        throw new Error();
      }

      const { success, project, errors } = mutation.data.createAccessmodProject;

      if (success && project) {
        if (configurationDataset.files && configurationDataset.role) {
          // Create this first dataset as well
          await createDataset(
            {
              name: configurationDataset.files[0].name
                .split(".")
                .slice(0, -1)
                .join(""),
              project,
              role: configurationDataset.role,
              files: configurationDataset.files,
            },
            { onProgress: setUploadProgress }
          );
        }
        router.push(`/projects/${encodeURIComponent(project.id)}`);
        clearCache();
        onClose();
      } else if (errors.includes(CreateAccessmodProjectError.NameDuplicate)) {
        throw new Error(t("A project already exists with this name"));
      } else {
        throw new Error("The project has not been created.");
      }
    },
  });

  const clearCache = useCacheKey("projects");

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClose();
  };

  useEffect(() => {
    if (!configurationDataset.role) return;
    if (configurationDataset.files.length > 0) {
      getRasterMetadata(configurationDataset.files[0]).then((metadata) => {
        form.setFieldValue("crs", metadata?.crs);
        form.setFieldValue("spatialResolution", metadata.resolution);
        form.setFieldValue("extent", getExtentCoords(metadata.bounds));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configurationDataset]);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="max-w-xl">
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>{t("Create a new Project")}</Dialog.Title>
        <Dialog.Content className="space-y-4 px-9 py-8">
          <Field
            label={t("Project name")}
            required
            name="name"
            disabled={form.isSubmitting}
            type="text"
            onChange={form.handleInputChange}
            error={form.touched.name && form.errors.name}
          />
          <Field
            label={t("Country")}
            required
            name="country"
            error={form.touched.country && form.errors.country}
          >
            <CountryPicker
              required
              disabled={form.isSubmitting}
              value={form.formData.country}
              onChange={(value) => form.setFieldValue("country", value)}
            />
          </Field>
          <Field
            label={t("Description")}
            name="description"
            required
            error={form.touched.description && form.errors.description}
          >
            <Textarea
              required
              name="description"
              disabled={form.isSubmitting}
              onChange={form.handleInputChange}
            >
              {form.formData.description}
            </Textarea>
          </Field>

          <fieldset className="pt-2">
            <p className="mb-6 text-base text-gray-600">
              {t(
                "You can configure your project by either uploading a raster file or by entering the spatial resolution and coordinate reference system."
              )}
            </p>
            <div className="-m-3 divide-y divide-gray-300 rounded-md bg-gray-50 p-3">
              <div className="grid grid-cols-2 items-end gap-2 pb-5">
                <Field
                  required
                  label="Spatial Resolution"
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
              </div>
              <div className="space-y-4 pt-5">
                <Field label={t("Role")} name="role">
                  <FilesetRolePicker
                    disabled={form.isSubmitting}
                    format={AccessmodFilesetFormat.Raster}
                    onChange={(role) =>
                      setConfigurationDataset({ ...configurationDataset, role })
                    }
                    value={configurationDataset.role}
                  />
                </Field>
                <Field label={t("Raster File")} name="raster">
                  <DatasetFileInput
                    className="bg-white"
                    role={configurationDataset?.role}
                    files={configurationDataset.files}
                    onChange={(files) =>
                      setConfigurationDataset({
                        ...configurationDataset,
                        files,
                      })
                    }
                  />
                </Field>
              </div>
            </div>
          </fieldset>

          {form.submitError && (
            <p className={clsx("text-sm", "text-red-600")}>
              {form.submitError}
            </p>
          )}
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            onClick={onCancel}
            disabled={form.isSubmitting}
            variant="outlined"
          >
            {t("Cancel")}
          </Button>
          <Button
            disabled={form.isSubmitting}
            type="submit"
            className="space-x-2"
          >
            {form.isSubmitting && <Spinner size="xs" />}
            {form.isSubmitting && uploadProgress > 0 ? (
              <span>
                {t("Uploading {{progress}}%", { progress: uploadProgress })}
              </span>
            ) : (
              <span>{t("Create")}</span>
            )}
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

export default CreateProjectDialog;
