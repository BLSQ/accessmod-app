import { gql } from "@apollo/client";
import clsx from "clsx";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import Textarea from "components/forms/Textarea";
import Spinner from "components/Spinner";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import {
  Country,
  CreateAccessmodProjectError,
  useCreateProjectMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect } from "react";
import CountryPicker from "../CountryPicker";

type Props = {
  onClose: () => void;
  open: boolean;
};

type Form = {
  name: string;
  description: string;
  spatialResolution: string;
  crs: string;
  country: Country;
};
const MUTATION = gql`
  mutation CreateProject($input: CreateAccessmodProjectByCountryInput!) {
    createAccessmodProjectByCountry(input: $input) {
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
  const form = useForm<Form>({
    initialState: {
      spatialResolution: "100",
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.name) {
        errors.name = t("Enter a name");
      }
      if (!values.country) {
        errors.country = t("Select a country");
      }
      if (!values.spatialResolution) {
        errors.spatialResolution = t("Enter a spatial resolution");
      }

      if (!values.crs) {
        errors.crs = t("Enter a CRS");
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
          },
        },
      });
      if (!mutation.data) {
        throw new Error();
      }

      const { success, project, errors } =
        mutation.data.createAccessmodProjectByCountry;

      if (success && project) {
        form.resetForm();
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

  useEffect(() => {
    if (!form.formData.country) return;
    form.setFieldValue(
      "crs",
      `${form.formData.country.whoInfo?.defaultCRS || 6933}`
    );
    // We do not add form as a dependency to only trigger the useEffect when country changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formData.country]);

  const clearCache = useCacheKey("projects");

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="max-w-xl">
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>{t("Create a new Project")}</Dialog.Title>
        <Dialog.Content className="space-y-4 px-9 py-8">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label={t("Project name")}
              required
              className="col-span-2"
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
                form.touched.spatialResolution && form.errors.spatialResolution
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
            variant="white"
          >
            {t("Cancel")}
          </Button>
          <Button
            disabled={form.isSubmitting}
            type="submit"
            className="space-x-2"
          >
            {form.isSubmitting && <Spinner size="xs" />}
            <span>{t("Create")}</span>
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

export default CreateProjectDialog;
