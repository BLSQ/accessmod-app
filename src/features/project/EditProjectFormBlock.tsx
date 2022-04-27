import { gql } from "@apollo/client";
import clsx from "clsx";
import Block from "components/Block";
import Button from "components/Button";
import Field from "components/forms/Field";
import Textarea from "components/forms/Textarea";
import Spinner from "components/Spinner";
import useForm from "hooks/useForm";
import {
  EditProjectFormBlock_ProjectFragment,
  UpdateAccessmodProjectError,
  useEditProjectQuery,
  useUpdateProjectMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";

type EditProjectFormProps = {
  project: EditProjectFormBlock_ProjectFragment;
  onSave: () => void;
  onCancel: () => void;
};

type Form = {
  name: string;
  description: string;
  crs: string | number;
  spatialResolution: string | number;
};

const EDIT_PROJECT_QUERY = gql`
  query EditProject($projectId: String!) {
    project: accessmodProject(id: $projectId) {
      id
      name
      crs
      description
      spatialResolution
    }
  }
`;

const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($input: UpdateAccessmodProjectInput) {
    updateAccessmodProject(input: $input) {
      success
      errors
      project {
        id
        name
        description
        crs
        spatialResolution
      }
    }
  }
`;

const EditProjectFormBlock = (props: EditProjectFormProps) => {
  const { t } = useTranslation();
  const { data, loading } = useEditProjectQuery({
    variables: { projectId: props.project.id },
  });
  const [updateProject] = useUpdateProjectMutation();

  const form = useForm<Form>({
    onSubmit: async (values) => {
      const { data } = await updateProject({
        variables: {
          input: {
            id: props.project.id,
            name: values.name,
            description: values.description,
            spatialResolution: parseInt(
              values.spatialResolution.toString(),
              10
            ),
            crs: parseInt(values.crs.toString(), 10),
          },
        },
      });
      if (data?.updateAccessmodProject?.success) {
        props.onSave();
      } else if (!data?.updateAccessmodProject) {
        throw new Error(t("Unknown error"));
      } else if (
        data.updateAccessmodProject.errors.includes(
          UpdateAccessmodProjectError.NotFound
        )
      ) {
        throw new Error(t("Unknown project"));
      } else if (
        data.updateAccessmodProject.errors.includes(
          UpdateAccessmodProjectError.NameDuplicate
        )
      ) {
        throw new Error(t("A project already exists with this name"));
      }
    },
    getInitialState: () => {
      return {
        name: data?.project?.name ?? "",
        crs: data?.project?.crs ?? "",
        description: data?.project?.description ?? "",
        spatialResolution: data?.project?.spatialResolution ?? "",
      };
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.name) {
        errors.name = t("Enter a name");
      }
      if (!values.description) {
        errors.description = t("Enter a description");
      }
      if (!values.spatialResolution) {
        errors.spatialResolution = t("Enter a spatial resolution");
      }
      return errors;
    },
  });

  if (loading) {
    return (
      <Block>
        <div className="flex h-72 items-center justify-center">
          <Spinner />
        </div>
      </Block>
    );
  }

  return (
    <Block>
      <form onSubmit={form.handleSubmit} className="grid grid-cols-4 gap-4">
        <Field
          className="col-span-2"
          label={t("Project name")}
          required
          name="name"
          disabled={form.isSubmitting}
          type="text"
          onChange={form.handleInputChange}
          value={form.formData.name}
          error={form.touched.name && form.errors.name}
        />

        <Field
          className="col-span-4"
          label={t("Description")}
          required
          name="description"
          error={form.touched.description && form.errors.description}
        >
          <Textarea
            rows={5}
            name="description"
            disabled={form.isSubmitting}
            onChange={form.handleInputChange}
          >
            {form.formData.description}
          </Textarea>
        </Field>

        <Field
          className="col-span-2"
          required
          label="Spatial Resolution"
          help={t(
            "The spatial resolution refers to the linear spacing of a measurement."
          )}
          name="spatialResolution"
          type="number"
          onChange={form.handleInputChange}
          disabled={form.isSubmitting}
          value={form.formData.spatialResolution}
          error={
            form.touched.spatialResolution && form.errors.spatialResolution
          }
        />

        <Field
          required
          className="col-span-2"
          label={t("Coordinate Reference System Code")}
          name="crs"
          type="number"
          help={t(
            "A coordinate reference system (CRS) defines, with the help of coordinates, how the two-dimensional, projected map in your GIS is related to real places on the earth."
          )}
          onChange={form.handleInputChange}
          value={form.formData.crs}
          disabled={form.isSubmitting}
          error={form.touched.crs && form.errors.crs}
        />

        {form.submitError && (
          <p className="col-span-4 text-sm text-red-600">{form.submitError}</p>
        )}

        <div className="col-span-4 flex justify-end gap-2">
          <Button type="button" variant="white" onClick={props.onCancel}>
            {t("Cancel")}
          </Button>
          <Button disabled={form.isSubmitting} type="submit">
            {t("Save")}
          </Button>
        </div>
      </form>
    </Block>
  );
};

EditProjectFormBlock.fragments = {
  project: gql`
    fragment EditProjectFormBlock_project on AccessmodProject {
      id
    }
  `,
};

export default EditProjectFormBlock;
