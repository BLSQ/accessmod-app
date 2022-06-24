import Field from "components/forms/Field";
import Input from "components/forms/Input";
import SimpleSelect from "components/forms/SimpleSelect";
import usePrevious from "hooks/usePrevious";
import { MetadataFormValues } from "libs/dataset";
import { AccessmodFilesetRoleCode, AccessmodFilesetStatus } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import ClassLabelsGrid from "./ClassLabelsGrid";

type DatasetMetadataFormProps = {
  roleCode: AccessmodFilesetRoleCode;
  files?: File[];
  status?: AccessmodFilesetStatus;
  onChange: (values: MetadataFormValues) => void;
  metadata: MetadataFormValues;
};

const DatasetMetadataForm = (props: DatasetMetadataFormProps) => {
  const { roleCode, status, onChange, metadata } = props;
  const { t } = useTranslation();
  const prevMetadata = usePrevious(metadata);

  useEffect(() => {
    if (prevMetadata !== metadata) {
      onChange(metadata);
    }
  }, [prevMetadata, metadata, onChange]);

  return (
    <>
      {roleCode === AccessmodFilesetRoleCode.Boundaries && (
        <Field
          name="name_column"
          label={t("Area's name column")}
          type="text"
          required
          value={metadata.name_column ?? ""}
          onChange={(event) =>
            onChange({ ...metadata, name_column: event.target.value })
          }
        />
      )}
      {roleCode === AccessmodFilesetRoleCode.TransportNetwork && (
        <>
          <Field name="category_column" label={t("Category column")} required>
            {metadata.columns?.length ? (
              <div>
                <SimpleSelect
                  name="category_column"
                  className="w-44"
                  required
                  value={metadata.category_column ?? ""}
                  onChange={(event) =>
                    onChange({
                      ...metadata,
                      category_column: event.target.value,
                    })
                  }
                >
                  {metadata.columns.map((col: string) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </SimpleSelect>
                {metadata.values && metadata.category_column && (
                  <div
                    className="mt-2 truncate text-sm italic text-gray-500"
                    title={metadata.values[metadata.category_column]?.join(
                      ", "
                    )}
                  >
                    {metadata.values[metadata.category_column]?.join(", ") ??
                      t("No values.")}
                  </div>
                )}
              </div>
            ) : (
              <Input
                value={metadata.category_column ?? ""}
                required
                onChange={(e) =>
                  onChange({ ...metadata, category_column: e.target.value })
                }
                name="category_column"
              />
            )}
          </Field>
        </>
      )}
      {[
        AccessmodFilesetRoleCode.LandCover,
        AccessmodFilesetRoleCode.Stack,
      ].includes(roleCode) &&
        status && (
          <Field name="labels" label={t("Class labels")} required>
            {[
              AccessmodFilesetStatus.ToAcquire,
              AccessmodFilesetStatus.Invalid,
              AccessmodFilesetStatus.Valid,
            ].includes(status) && (
              <ClassLabelsGrid
                editable
                labels={metadata.labels ?? []}
                onChange={(labels) => onChange({ ...metadata, labels })}
              />
            )}
            {[
              AccessmodFilesetStatus.Validating,
              AccessmodFilesetStatus.Pending,
            ].includes(status) && (
              <div className="text-sm italic text-gray-500">
                {t("The metadata of your dataset have not been extracted yet.")}
              </div>
            )}
          </Field>
        )}
    </>
  );
};

export default DatasetMetadataForm;
