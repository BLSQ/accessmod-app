import Button from "components/Button";
import { gql } from "@apollo/client";
import Dialog from "components/Dialog";
import Input from "components/forms/Input";
import Field from "components/forms/Field";
import useForm from "hooks/useForm";
import { FormEvent, MouseEventHandler, useCallback, useState } from "react";
import {
  CreateDatasetDialog_ProjectFragment,
  useCreateFilesetMutation,
} from "libs/graphql";
import Spinner from "components/Spinner";
import FilesetRolePicker from "./FilesetRolePicker";
import ProjectPicker from "./ProjectPicker";
import Dropzone from "components/Dropzone";
import filesize from "filesize";
import uploader, { JobFile } from "libs/upload";
import { createFile, getPresignedURL } from "libs/fileset";

type Props = {
  onClose: (reason?: string) => void;
  open: boolean;
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
      }
    }
  }
`;

type FilesetFile = JobFile & {
  uri?: string;
};

const CreateDatasetDialog = (props: Props) => {
  const { open, onClose, project } = props;
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<null | string>(null);
  const [createFileset, { error: filesetError }] = useCreateFilesetMutation();
  const { formData, isValid, handleInputChange, setFieldValue, resetForm } =
    useForm<Form>({
      initialState: {
        role: null,
        files: [],
        name: "",
        project,
      },
      validate: (values) =>
        Boolean(
          values.files?.length > 0 &&
            values.name &&
            values.project?.id &&
            values.role?.id
        ),
    });

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClose("cancel");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || !isValid) {
      // It should not happen but...
      console.warn("Form submitted while submitting or invalid");
      return;
    }
    setError(null);
    setSubmitting(true);

    // Create Fileset
    const { data } = await createFileset({
      variables: {
        input: {
          roleId: formData.role.id,
          name: formData.name,
          projectId: formData.project.id,
        },
      },
    });
    const fileset = data?.createAccessmodFileset?.fileset;
    if (!fileset) {
      throw new Error("Fileset not created");
    }

    try {
      await uploader.createUploadJob({
        files: formData.files,
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
      resetForm();
      setSubmitting(false);
      onClose("submit");
    } catch (err: any) {
      console.error(err);
      setError(err?.message);
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      closeOnEsc={false}
      closeOnOutsideClick={false}
    >
      <form onSubmit={onSubmit}>
        <Dialog.Title>Create a dataset</Dialog.Title>

        <Dialog.Content className="px-9 py-8 ">
          <div className="space-y-4">
            <Field label="Name" required name="name">
              <Input
                name="name"
                required
                disabled={submitting}
                onChange={handleInputChange}
                value={formData.name}
              />
            </Field>
            <Field label="Project" required name="project">
              <ProjectPicker
                disabled={Boolean(project) || submitting}
                onChange={(value) => setFieldValue("project", value)}
                value={formData.project}
              />
            </Field>
            <Field label="Role" required name="role">
              <FilesetRolePicker
                disabled={submitting}
                onChange={(value) => setFieldValue("role", value)}
                value={formData.role}
              />
            </Field>
            <Dropzone
              label="Select your files"
              onChange={(files) => setFieldValue("files", files)}
            >
              {formData.files?.length > 0 ? (
                <div>{formData.files.map((f) => f.name).join(", ")}</div>
              ) : undefined}
            </Dropzone>

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
            disabled={submitting}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            disabled={!isValid || submitting}
            role="submit"
            className="space-x-2"
          >
            {submitting && <Spinner size="xs" />}
            {submitting ? (
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
