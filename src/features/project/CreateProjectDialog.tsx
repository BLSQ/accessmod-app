import { gql } from "@apollo/client";
import clsx from "clsx";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import Spinner from "components/Spinner";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import { Country } from "libs/countries";
import {
  CreateAccessmodProjectError,
  useCreateProjectMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import CountryPicker from "../CountryPicker";

type Props = {
  onClose: () => void;
  open: boolean;
};

type Form = {
  name: string;
  spatialResolution: string;
  country: Country;
  crs: string;
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

      const { success, errors } = mutation.data.createAccessmodProject;

      if (success) {
        router.push(
          `/projects/${encodeURIComponent(
            mutation.data.createAccessmodProject!.project!.id
          )}`
        );
        clearCache();
        onClose();
      } else if (errors.includes(CreateAccessmodProjectError.NameDuplicate)) {
        throw new Error(t("A project already exists with this name"));
      }
    },
  });

  const clearCache = useCacheKey("projects");

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
            required
            label="Spatial Resolution"
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
            label={t("Coordinate Reference System Code")}
            name="crs"
            type="number"
            help={t(
              "A coordinate reference system (CRS) defines, with the help of coordinates, how the two-dimensional, projected map in your GIS is related to real places on the earth."
            )}
            onChange={form.handleInputChange}
            disabled={form.isSubmitting}
            error={form.touched.crs && form.errors.crs}
          />

          {form.submitError && (
            <p className={clsx("text-sm", "text-red-600")}>
              {form.submitError}
            </p>
          )}
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            role="button"
            onClick={onCancel}
            disabled={form.isSubmitting}
            variant="outlined"
          >
            {t("Cancel")}
          </Button>
          <Button
            disabled={form.isSubmitting}
            role="submit"
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
