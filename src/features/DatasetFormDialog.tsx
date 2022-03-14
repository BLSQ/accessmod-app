import { gql } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Dropzone from "components/Dropzone";
import Field from "components/forms/Field";
import Spinner from "components/Spinner";
import filesize from "filesize";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import {
  ACCEPTED_MIMETYPES,
  createFile,
  getPresignedURL,
  guessFileMimeType,
} from "libs/dataset";
import { JobFile, uploader } from "libs/file";
import {
  AccessmodFilesetFormat,
  AccessmodFilesetRoleCode,
  CreateAccessmodFilesetError,
  DatasetFormDialog_DatasetFragment,
  DatasetFormDialog_ProjectFragment,
  useCreateFilesetMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";
import FilesetRolePicker from "./FilesetRolePicker";
import ProjectPicker from "./ProjectPicker";

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
  dataset?: DatasetFormDialog_DatasetFragment;
};

type Form = {
  role: any;
  project: any;
  name: string;
  files: File[];
};

/*
  What do we want to have ?
    * Create a Fileset
    * Get a presigned URL per file
    * Upload the file using Dropzone
    * On done create a File and attach it to the Fileset
    *
*/

const CREATE_FILESET_MUTATION = gql`
  mutation CreateFileset($input: CreateAccessmodFilesetInput) {
    createAccessmodFileset(input: $input) {
      success
      errors
      fileset {
        id
        name
        role {
          id
          code
          name
        }
      }
    }
  }
`;

type FilesetFile = JobFile & {
  uri?: string;
};

const DatasetFormDialog = (props: Props) => {
  const { open, onClose, project, role, dataset } = props;
  const [progress, setProgress] = useState(0);
  const [createFileset, { error: filesetError }] = useCreateFilesetMutation();
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

      if (!dataset && !values.name) {
        errors.name = t("Enter a name");
      }
      if (!dataset && !values.project) {
        errors.project = t("Select a project");
      }
      if (!dataset && !values.role) {
        errors.role = t("Select a role");
      }
      return errors;
    },
    onSubmit: async () => {
      let ds = dataset;
      if (!ds) {
        // Create Fileset
        const { data } = await createFileset({
          variables: {
            input: {
              roleId: form.formData.role.id,
              name: form.formData.name ?? "",
              projectId: form.formData.project.id,
            },
          },
        });
        if (!data) {
          throw new Error();
        }
        const { success, fileset, errors } = data.createAccessmodFileset;
        if (errors.includes(CreateAccessmodFilesetError.NameDuplicate)) {
          throw new Error(t("A dataset with this name already exists"));
        } else if (!success) {
          throw new Error(t("Dataset not created"));
        }
        ds = fileset!;
      }

      if (form.formData.files && form.formData.files.length > 0) {
        await uploader.createUploadJob({
          files: form.formData.files,
          axiosConfig: { method: "PUT" },
          onProgress: setProgress,
          onBeforeFileUpload: async (file: FilesetFile) => {
            const mimeType = guessFileMimeType(file);
            if (!mimeType) {
              throw new Error("Unknown mime type");
            }
            const data = await getPresignedURL(ds!.id, mimeType);
            if (!data || !data.fileUri) {
              throw new Error("No URI returned");
            }
            file.uri = data.fileUri;

            return {
              url: data!.uploadUrl as string,
            };
          },
          onAfterFileUpload: async (file: FilesetFile) => {
            if (!file.uri) {
              throw new Error("File has no URI");
            }
            const mimeType = guessFileMimeType(file);
            if (!mimeType) {
              throw new Error("Unknown mime type");
            }
            await createFile(ds!.id, file.uri, mimeType);
          },
        });
      }
      form.resetForm();
      onClose("submit", ds);
      clearFilesets();
    },
  });

  useEffect(() => {
    form.setFieldValue("project", project, false);
    form.setFieldValue("role", role, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Reset the form values when project or role are changed
  }, [project, role]);

  const validator = useCallback(
    (file: File) => {
      if (!role) return null;
      const ext = file.name.slice(file.name.lastIndexOf("."));

      if (!ACCEPTED_MIMETYPES[role.format].includes(ext)) {
        return {
          code: "wrong-file-type",
          message: t("Filetype {{ext}} is not a valid one.", { ext }),
        };
      }
      return null;
    },
    [role, t]
  );

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
        <Dialog.Title>
          {!dataset ? t("Create a dataset") : t("Add files to dataset")}
        </Dialog.Title>

        <Dialog.Content className="px-9 py-8 ">
          <div className="space-y-4">
            {!dataset && (
              <>
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
              </>
            )}
            <Field
              label={t("Files")}
              required
              name="files"
              error={form.touched.files && form.errors.files}
            >
              <Dropzone
                className="mt-1"
                label={t("Select your files")}
                onChange={(files) => form.setFieldValue("files", files)}
                accept={
                  role ? ACCEPTED_MIMETYPES[role.format].join(", ") : undefined
                }
                validator={validator}
              >
                {form.formData.files?.length ? (
                  <div>
                    {form.formData.files
                      .map((f) => `${f.name} (${filesize(f.size)})`)
                      .join(", ")}
                  </div>
                ) : undefined}
              </Dropzone>
            </Field>

            {(form.submitError || filesetError) && (
              <div className="text-danger mt-3 text-sm">
                {form.submitError || filesetError}
              </div>
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
              <span>{!dataset ? t("Create") : t("Add Files")}</span>
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

  dataset: gql`
    fragment DatasetFormDialog_dataset on AccessmodFileset {
      id
      name
    }
  `,
};

export default DatasetFormDialog;
