import { PlusIcon, XIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import DataGrid, { Column, DATA_GRID_DEFAULT_THEME } from "components/DataGrid";
import Input from "components/forms/Input";
import { getDatasetDefaultMetadata } from "libs/dataset";
import { AccessmodFilesetRoleCode } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { FocusEventHandler, useCallback, useEffect, useMemo } from "react";
import { Cell, CellProps } from "react-table";

type ScenarioEntry = { kls: string; speed: number };
type Scenario = ScenarioEntry[];
type ScenarioEditorProps = {
  scenario?: Scenario;
  onChange: (data: Scenario) => void;
};

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const GRID_THEME = {
  ...DATA_GRID_DEFAULT_THEME,
  table: "divide-y divide-gray-200 w-full",
  tbody: "divide-y divide-gray-200",
  tr: "",
};

const ClassCell = ({
  value,
  row,
  column,
  updateData,
}: CellProps<any> & { updateData: Function; isEdited: boolean }) => {
  const inputType = (column as any).inputType;
  const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    updateData(
      row.index,
      column.id,
      inputType === "number"
        ? parseFloat(event.target.value)
        : event.target.value
    );
  };
  return (
    <>
      <Input
        list={inputType !== "number" ? "classes" : undefined}
        onBlur={onBlur}
        className="w-full"
        defaultValue={value}
        type={inputType}
      />
    </>
  );
};

const ScenarioEditor = (props: ScenarioEditorProps) => {
  const { scenario = [], onChange } = props;
  const { t } = useTranslation();
  const columns = useMemo(() => {
    const cols: Column<ScenarioEntry>[] = [
      {
        Header: t("Class"),
        id: "kls",
        accessor: (row) => row.kls,
        Cell: ClassCell,
      },
      {
        Header: t("Speed (in km/h)"),
        id: "speed",
        accessor: (row) => row.speed,
        Cell: ClassCell,
        inputType: "number",
      },
      {
        id: "actions",
        Header: "",
        Cell: (cell: Cell) => (
          <div className="flex w-full justify-end">
            <Button
              onClick={() => {
                const d = [...scenario];
                d.splice(cell.row.index, 1);
                onChange(d);
              }}
              variant="white"
              size="sm"
            >
              <XIcon className="mr-1 h-3 w-3" />
              {t("Remove")}
            </Button>
          </div>
        ),
      },
    ];
    return cols;
  }, [t, scenario, onChange]);

  useEffect(() => {
    if (!scenario.length) {
      onChange([{ kls: "", speed: 0 }]);
    }
  }, [scenario, onChange]);

  const onAddRow = () => {
    onChange(scenario.concat({ kls: "", speed: 0 }));
  };

  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: string | number) => {
      onChange(
        scenario.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...scenario[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        })
      );
    },
    [onChange, scenario]
  );

  // FIXME: Use actual data from the datasets
  const listOptions = useMemo(() => {
    return [
      ...(getDatasetDefaultMetadata(AccessmodFilesetRoleCode.TransportNetwork)
        .columns ?? []),
      ...Object.keys(
        getDatasetDefaultMetadata(AccessmodFilesetRoleCode.LandCover).labels ??
          {}
      ),
    ];
  }, []);

  return (
    <div>
      <datalist id="classes">
        {listOptions.map((opt) => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
      <DataGrid
        data={scenario}
        columns={columns}
        className="overflow-hidden rounded-md shadow ring-1 ring-black ring-opacity-5"
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        defaultPageSize={5}
        extraTableProps={{ updateData }}
        theme={GRID_THEME}
        sortable
      />
      <div className="mt-2 flex justify-start gap-2">
        <Button onClick={onAddRow} variant="secondary" size="sm">
          <PlusIcon className="mr-1 h-4 w-4" />
          {t("Add a row")}
        </Button>
      </div>
    </div>
  );
};

export default ScenarioEditor;
