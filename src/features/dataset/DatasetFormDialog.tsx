import { gql } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import Spinner from "components/Spinner";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import { createDataset, guessFileMimeType } from "libs/dataset";
import {
  AccessmodFilesetFormat,
  AccessmodFilesetRoleCode,
  DatasetFormDialog_ProjectFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import FilesetRolePicker from "../FilesetRolePicker";
import ProjectPicker from "../project/ProjectPicker";
import DatasetFileInput from "./DatasetFileInput";

type Props = {
  onClose: (
    reason?: string,
    fileset?: {
      id: string;
      name: string;
      [key: string]: any;
    }
  ) => void;
  open: boolean;
  role?: {
    id: string;
    code: AccessmodFilesetRoleCode;
    name: string;
    format: AccessmodFilesetFormat;
  };
  project?: DatasetFormDialog_ProjectFragment | { id: string; name: string };
};

type Form = {
  role: any;
  project: any;
  name: string;
  files: File[];
};

const DatasetFormDialog = (props: Props) => {
  const { open, onClose, project, role } = props;
  const [progress, setProgress] = useState(0);
  const clearFilesets = useCacheKey(["filesets"]);
  const { t } = useTranslation();
  const form = useForm<Form>({
    initialState: {
      role,
      files: [],
      name: "",
      project,
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.files?.length) {
        errors.files = t("Select files");
      } else {
        const invalidFiles = values.files.filter((f) => !guessFileMimeType(f));
        if (invalidFiles.length) {
          errors.files = t('Invalid format for files: "{{files}}"', {
            files: invalidFiles.map((f) => f.name).join(", "),
          });
        }
      }

      if (!values.name) {
        errors.name = t("Enter a name");
      }
      if (!values.project) {
        errors.project = t("Select a project");
      }
      if (!values.role) {
        errors.role = t("Select a role");
      }
      return errors;
    },
    onSubmit: async () => {
      if (project) {
        const dataset = await createDataset(
          {
            role: form.formData.role,
            project,
            automatic: false,
            files: form.formData.files,
            name: form.formData.name,
          },
          { onProgress: setProgress }
        );

        form.resetForm();
        onClose("submit", dataset);
        clearFilesets();
      }
    },
  });

  useEffect(() => {
    if (project && form.formData.project?.id !== project.id) {
      form.setFieldValue("project", project, false);
    }
    if (role && form.formData.role?.id !== role.id) {
      form.setFieldValue("role", role, false);
    }
  }, [project, role, form]);

  const handleClose = () => {
    form.resetForm();
    onClose("cancel");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      closeOnEsc={false}
      closeOnOutsideClick={false}
    >
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>{t("Create a dataset")}</Dialog.Title>

        <Dialog.Content className="px-9 py-8 ">
          <div className="space-y-4">
            <Field
              label={t("Name")}
              required
              name="name"
              onChange={form.handleInputChange}
              value={form.formData.name}
              disabled={form.isSubmitting}
              error={form.touched.name && form.errors.name}
            />
            {!project && (
              <Field
                label={t("Project")}
                required
                name="project"
                error={form.touched.project && form.errors.project}
              >
                <ProjectPicker
                  disabled={form.isSubmitting}
                  onChange={(value) => form.setFieldValue("project", value)}
                  value={form.formData.project}
                  required
                />
              </Field>
            )}
            <Field
              label={t("Role")}
              required
              name="role"
              error={form.touched.role && form.errors.role}
            >
              <FilesetRolePicker
                disabled={form.isSubmitting || Boolean(props.role)}
                onChange={(value) => form.setFieldValue("role", value)}
                value={form.formData.role}
                required
              />
            </Field>
            {form.formData.role && (
              <Field
                label={t("Files")}
                required
                name="files"
                error={form.touched.files && form.errors.files}
              >
                <DatasetFileInput
                  disabled={!form.formData.role}
                  role={form.formData.role}
                  onChange={(files) => form.setFieldValue("files", files)}
                  files={form.formData.files}
                />
              </Field>
            )}

            {form.submitError && (
              <div className="mt-3 text-sm text-danger">{form.submitError}</div>
            )}
          </div>
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            type="button"
            onClick={handleClose}
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
            {form.isSubmitting ? (
              <span>{t("Uploading ({{progress}}%)", { progress })}</span>
            ) : (
              <span>{t("Create")}</span>
            )}
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

DatasetFormDialog.fragments = {
  project: gql`
    fragment DatasetFormDialog_project on AccessmodProject {
      id
      name
    }
  `,
};

export default DatasetFormDialog;
