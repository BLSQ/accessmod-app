import { gql } from "@apollo/client";
import Button from "components/Button";
import Dialog from "components/Dialog";
import Field from "components/forms/Field";
import useCacheKey from "hooks/useCacheKey";
import useForm from "hooks/useForm";
import {
  MetadataFormValues,
  toMetadataFormValues,
  toMetadataInput,
} from "libs/dataset";
import {
  AccessmodFilesetStatus,
  DatasetDialog_DatasetFragment,
  UpdateAccessmodFilesetError,
  useUpdateDatasetMutation,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect } from "react";
import DatasetMetadataForm from "../DatasetMetadataForm";
import DatasetStatusBadge from "../DatasetStatusBadge";

type DatasetDialogProps = {
  open: boolean;
  onClose: () => void;
  dataset: DatasetDialog_DatasetFragment;
};

type Form = {
  metadata: MetadataFormValues;
  name: string;
};

const MUTATION = gql`
  mutation UpdateDataset($input: UpdateAccessmodFilesetInput!) {
    updateAccessmodFileset(input: $input) {
      success
      fileset {
        id
        name
        metadata
        status
      }
      errors
    }
  }
`;

const DatasetDialog = (props: DatasetDialogProps) => {
  const { open, onClose, dataset } = props;
  const { t } = useTranslation();
  const [updateDataset] = useUpdateDatasetMutation();
  const clearCache = useCacheKey(["datasets", dataset.id]);

  const form = useForm<Form>({
    getInitialState: () => {
      return {
        name: dataset.name,
        metadata: toMetadataFormValues(dataset.metadata),
      };
    },

    onSubmit: async (values) => {
      const { data } = await updateDataset({
        variables: {
          input: {
            id: dataset.id,
            name: values.name,
            metadata: toMetadataInput(values.metadata),
          },
        },
      });
      if (!data?.updateAccessmodFileset?.success) {
        if (
          data?.updateAccessmodFileset?.errors?.includes(
            UpdateAccessmodFilesetError.NotFound
          )
        ) {
          throw new Error(t("This dataset is invalid."));
        }
        if (
          data?.updateAccessmodFileset?.errors?.includes(
            UpdateAccessmodFilesetError.NameDuplicate
          )
        ) {
          throw new Error(t("Dataset name must be unique"));
        }
        if (
          data?.updateAccessmodFileset?.errors?.includes(
            UpdateAccessmodFilesetError.PermissionDenied
          )
        ) {
          throw new Error(t("You don't have the right to perform this action"));
        }
        throw new Error("An error ocurred. Please contact your administrator");
      }
      onClose();
      clearCache();
    },
  });

  useEffect(() => {
    form.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset]);

  const handleClose = useCallback(() => onClose(), [onClose]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"max-w-2xl"}>
      <form onSubmit={form.handleSubmit}>
        <Dialog.Title>
          {t("Dataset {{name}}", { name: dataset.name })}
        </Dialog.Title>
        <Dialog.Content>
          <div className="space-y-3">
            <Field name="status" label={t("Status")} required>
              <div className="flex items-center gap-2">
                <DatasetStatusBadge dataset={dataset} />
                <span className="text-sm text-gray-600 ">
                  {dataset.status === AccessmodFilesetStatus.ToAcquire &&
                    t(
                      "This dataset will be downloaded automatically with the analysis"
                    )}
                  {(dataset.status === AccessmodFilesetStatus.Invalid &&
                    dataset.metadata.validation_error) ??
                    t("Unknown validation error.")}
                  {dataset.status === AccessmodFilesetStatus.Valid &&
                    t("This dataset has been validated")}
                  {dataset.status === AccessmodFilesetStatus.Pending &&
                    t("Add files to the dataset to trigger the validation")}
                </span>
              </div>
            </Field>
            <Field
              name="name"
              label={t("Name")}
              value={form.formData.name}
              onChange={form.handleInputChange}
              required
            />
            <DatasetMetadataForm
              status={dataset.status}
              roleCode={dataset.role.code}
              metadata={form.formData.metadata!}
              onChange={(metadata) => form.setFieldValue("metadata", metadata)}
            />

            {form.submitError && (
              <div className="text-danger">{form.submitError}</div>
            )}
          </div>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={handleClose} variant="white">
            {t("Close")}
          </Button>
          <Button type="submit">{t("Save")}</Button>
        </Dialog.Actions>
      </form>
    </Dialog>
  );
};

DatasetDialog.fragments = {
  dataset: gql`
    fragment DatasetDialog_dataset on AccessmodFileset {
      id
      name
      role {
        code
        format
      }
      metadata
      ...DatasetStatusBadge_dataset
      mode
      status
      authorizedActions
    }
    ${DatasetStatusBadge.fragments.dataset}
  `,
};

export default DatasetDialog;
