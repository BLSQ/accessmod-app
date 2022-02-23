import { gql } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import SelectInput from "components/forms/SelectInput";
import Spinner from "components/Spinner";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import { countries, Country, regions } from "libs/countries";
import { useCreateProjectMutation } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { MouseEventHandler, useMemo } from "react";

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
      if (mutation.data && mutation.data.createAccessmodProject!.success) {
        router.push(
          `/projects/${encodeURIComponent(
            mutation.data.createAccessmodProject!.project!.id
          )}`
        );
        clearCache();
        onClose();
      }
    },
  });

  const clearCache = useCacheKey("projects");

  const countryOptions: { label: string; options: Country[] }[] =
    useMemo(() => {
      const groups = [];
      for (const [regionKey, regionLabel] of Object.entries(regions)) {
        groups.push({
          label: regionLabel,
          options: countries.filter((country) => country.region === regionKey),
        });
      }
      groups.push({
        label: t("No Region"),
        options: countries.filter((country) => !country.region),
      });
      return groups;
    }, []);

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOutsideClick={false}
    >
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>{t("Create a new Project")}</Dialog.Title>

        <Dialog.Content className="px-9 py-8 space-y-4">
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
            <SelectInput
              required
              options={countryOptions}
              labelKey="name"
              disabled={form.isSubmitting}
              valueKey="code"
              value={form.formData.country}
              onChange={(value) => form.setFieldValue("country", value)}
            />
          </Field>

          <Field
            required
            label="Spatial Resolution"
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
            onChange={form.handleInputChange}
            disabled={form.isSubmitting}
            error={form.touched.crs && form.errors.crs}
          />
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
