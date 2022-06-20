import { PlusIcon, XIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import DataGrid, { Column } from "components/DataGrid";
import Field from "components/forms/Field";
import Input from "components/forms/Input";
import SimpleSelect from "components/forms/SimpleSelect";
import usePrevious from "hooks/usePrevious";
import { MetadataFormValues } from "libs/dataset";
import { AccessmodFilesetRoleCode, AccessmodFilesetStatus } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type DatasetMetadataFormProps = {
  roleCode: AccessmodFilesetRoleCode;
  files?: File[];
  status?: AccessmodFilesetStatus;
  onChange: (values: MetadataFormValues) => void;
  metadata: MetadataFormValues;
};

const ClassLabelsEditor = ({
  labels,
  onChange,
}: {
  labels: NonNullable<MetadataFormValues["labels"]>;
  onChange: (labels: NonNullable<MetadataFormValues["labels"]>) => void;
}) => {
  const { t } = useTranslation();
  const [skipPageReset, setSkipPageReset] = useState(false);
  const classInputRef = useRef<HTMLInputElement>(null);

  const columns = useMemo(() => {
    const cols: Column<any>[] = [
      {
        id: "class",
        accessor: (row) => row[0],
        Header: t("Class"),
      },
      {
        id: "label",
        accessor: (row) => row[1],
        Header: t("Label"),
        Cell: (cell) => (
          <Input
            placeholder={t("Class label")}
            defaultValue={cell.value}
            onBlur={(event) => {
              setSkipPageReset(true);
              const newItems = [...labels];
              newItems.splice(cell.row.index, 1, [
                labels[cell.row.index][0],
                event.target.value,
              ]);
              onChange(newItems);
              setSkipPageReset(false);
            }}
          />
        ),
      },
      {
        id: "actions",
        Header: "",

        Cell: (cell) => (
          <div className="flex w-full justify-end">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                labels.splice(cell.row.index, 1);
                onChange([...labels]);
              }}
            >
              <XIcon className="h-4" />
            </Button>
          </div>
        ),
      },
    ];
    return cols;
  }, [labels, onChange, t]);

  const onAddItem = useCallback(() => {
    if (!classInputRef.current?.value) return;
    onChange([[classInputRef.current.value, ""], ...labels]);
    classInputRef.current.value = "";
  }, [classInputRef, labels, onChange]);

  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <Input ref={classInputRef} placeholder={t("Class name")} />
        <Button variant="secondary" onClick={onAddItem}>
          <PlusIcon className="h-4" />
        </Button>
      </div>
      {labels.length > 0 && (
        <DataGrid
          data={labels}
          columns={columns}
          totalItems={labels.length}
          skipPageReset={skipPageReset}
          defaultPageSize={5}
        />
      )}
    </div>
  );
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
              <ClassLabelsEditor
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
