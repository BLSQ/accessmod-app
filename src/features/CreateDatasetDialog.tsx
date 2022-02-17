import { gql } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Dropzone from "components/Dropzone";
import Field from "components/forms/Field";
import Spinner from "components/Spinner";
import filesize from "filesize";
import useForm from "hooks/useForm";
import { createFile, getPresignedURL } from "libs/fileset";
import {
  AccessmodFilesetRoleCode,
  CreateDatasetDialog_ProjectFragment,
  useCreateFilesetMutation,
} from "libs/graphql";
import uploader, { JobFile } from "libs/upload";
import { MouseEventHandler, useEffect, useState } from "react";
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
  role?: { id: string; code: AccessmodFilesetRoleCode; name: string };
  project?: CreateDatasetDialog_ProjectFragment | { id: string; name: string };
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

const CreateDatasetDialog = (props: Props) => {
  const { open, onClose, project, role } = props;
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<null | string>(null);
  const [createFileset, { error: filesetError }] = useCreateFilesetMutation();

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
        errors.files = "Select files";
      }
      if (!values.name) {
        errors.name = "Enter a name";
      }
      if (!values.project) {
        errors.project = "Select a project";
      }
      if (!values.role) {
        errors.role = "Select a role";
      }
      return errors;
    },
    onSubmit: async () => {
      setError(null);

      // Create Fileset
      const { data } = await createFileset({
        variables: {
          input: {
            roleId: form.formData.role.id,
            name: form.formData.name,
            projectId: form.formData.project.id,
          },
        },
      });
      const fileset = data?.createAccessmodFileset?.fileset;
      if (!fileset) {
        throw new Error("Fileset not created");
      }

      try {
        await uploader.createUploadJob({
          files: form.formData.files,
          axiosConfig: { method: "PUT" },
          onProgress: setProgress,
          onBeforeFileUpload: async (file: FilesetFile) => {
            const data = await getPresignedURL(fileset.id, file.type);
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
            await createFile(fileset.id, file.uri, file.type);
          },
        });
        form.resetForm();
        onClose("submit", fileset);
      } catch (err: any) {
        console.error(err);
        setError(err?.message);
      }
    },
  });

  useEffect(() => {
    form.setFieldValue("project", project);
    form.setFieldValue("role", role);
  }, [project, role]);

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClose("cancel");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOutsideClick={false}
    >
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>Create a dataset</Dialog.Title>

        <Dialog.Content className="px-9 py-8 ">
          <div className="space-y-4">
            <Field
              label="Name"
              required
              name="name"
              onChange={form.handleInputChange}
              value={form.formData.name}
              disabled={form.isSubmitting}
              error={form.touched.name && form.errors.name}
            />
            <Field
              label="Project"
              required
              name="project"
              error={form.touched.project && form.errors.project}
            >
              <ProjectPicker
                disabled={Boolean(project) || form.isSubmitting}
                onChange={(value) => form.setFieldValue("project", value)}
                value={form.formData.project}
                required
              />
            </Field>
            <Field
              label="Role"
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
            <Field
              label="Files"
              required
              name="files"
              error={form.touched.files && form.errors.files}
            >
              <Dropzone
                className="mt-1"
                label="Select your files"
                onChange={(files) => form.setFieldValue("files", files)}
              >
                {form.formData.files?.length > 0 ? (
                  <div>
                    {form.formData.files
                      .map((f) => `${f.name} (${filesize(f.size)})`)
                      .join(", ")}
                  </div>
                ) : undefined}
              </Dropzone>
            </Field>

            {(error || filesetError) && (
              <div className="text-danger mt-3 text-sm">
                {error || filesetError}
              </div>
            )}
          </div>
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            role="button"
            onClick={onCancel}
            disabled={form.isSubmitting}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            disabled={form.isSubmitting}
            role="submit"
            className="space-x-2"
          >
            {form.isSubmitting && <Spinner size="xs" />}
            {form.isSubmitting ? (
              <span>Uploading ({progress}%)</span>
            ) : (
              <span>Create</span>
            )}
          </Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

CreateDatasetDialog.fragments = {
  project: gql`
    fragment CreateDatasetDialog_project on AccessmodProject {
      id
      name
    }
  `,
};

export default CreateDatasetDialog;
