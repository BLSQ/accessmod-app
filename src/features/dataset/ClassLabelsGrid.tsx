import { PlusIcon, XIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import DataGrid, { Column } from "components/DataGrid";
import Input from "components/forms/Input";
import { MetadataFormValues } from "libs/dataset";
import { useTranslation } from "next-i18next";
import { useCallback, useMemo, useRef, useState } from "react";

type Props = {
  labels: NonNullable<MetadataFormValues["labels"]>;
  editable?: boolean;
} & (
  | { editable?: false; onChange?: undefined }
  | {
      editable: true;
      onChange: (labels: NonNullable<MetadataFormValues["labels"]>) => void;
    }
);

const ClassLabelsGrid = ({ labels, editable, onChange }: Props) => {
  const { t } = useTranslation();
  const [skipPageReset, setSkipPageReset] = useState(false);
  const classInputRef = useRef<HTMLInputElement>(null);

  const columns = useMemo(() => {
    const cols: Column<any>[] = [
      {
        id: "class",
        accessor: (row) => row[0],
        width: 100,
        Header: t("Class"),
      },
      {
        id: "label",
        accessor: (row) => row[1],
        Header: t("Label"),
        Cell: (cell) =>
          editable ? (
            <Input
              className="w-full"
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
          ) : (
            cell.value
          ),
      },
    ];
    if (editable) {
      cols.push({
        id: "actions",
        Header: "",
        width: 60,
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
      });
    }
    return cols;
  }, [labels, onChange, t, editable]);

  const onAddItem = () => {
    if (
      !classInputRef.current?.value ||
      !editable ||
      !classInputRef.current?.checkValidity()
    ) {
      return;
    }
    onChange([[classInputRef.current.value, ""], ...labels]);
    classInputRef.current.value = "";
  };

  return (
    <div>
      {editable && (
        <div className="mb-1 flex items-center gap-2">
          <Input
            ref={classInputRef}
            placeholder={t("Class id")}
            min={0}
            step={1}
            required
            pattern="\d*"
            type="number"
          />
          <Button variant="secondary" onClick={onAddItem}>
            <PlusIcon className="h-4" />
          </Button>
        </div>
      )}
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

export default ClassLabelsGrid;
