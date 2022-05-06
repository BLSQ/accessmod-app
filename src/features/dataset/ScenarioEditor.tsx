import { PlusIcon, XIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import DataGrid, { Column, DATA_GRID_DEFAULT_THEME } from "components/DataGrid";
import Input from "components/forms/Input";
import { useTranslation } from "next-i18next";
import {
  FocusEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Cell, CellProps } from "react-table";

type ScenarioInput = {
  [key: string]: number;
};

type ScenarioEditorProps = {
  scenario: ScenarioInput | null;
  onChange: (data: object) => void;
};

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const GRID_THEME = {
  ...DATA_GRID_DEFAULT_THEME,
  table: "divide-y divide-gray-200 w-full table-fixed",
  tbody: "divide-y divide-gray-200",
  tr: "divide-x divide-gray-200",
};

const ClassCell = ({
  value,
  row,
  column,
  updateData,
  isEdited,
}: CellProps<any>) => {
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
  if (!isEdited) {
    return value;
  }

  return (
    <>
      <Input
        onBlur={onBlur}
        className="w-full"
        defaultValue={value}
        type={inputType}
      />
    </>
  );
};

const arrayToScenario = (data: { class: string; speed: number }[]) => {
  return data.reduce((acc, val) => {
    if (val.class) {
      acc[val.class] = val.speed;
    }
    return acc;
  }, {} as ScenarioInput);
};

const ScenarioEditor = (props: ScenarioEditorProps) => {
  const { scenario, onChange } = props;
  const [isEdited, setEdited] = useState(false);
  const [data, setData] = useState<{ class: string; speed: number }[]>([]);
  const { t } = useTranslation();
  const columns = useMemo(() => {
    const cols: Column[] = [
      {
        Header: t("Class"),
        accessor: "class",
        Cell: ClassCell,
      },
      {
        Header: t("Speed (in km/h)"),
        accessor: "speed",
        Cell: ClassCell,
        inputType: "number",
      },
    ];
    if (isEdited) {
      cols.push({
        id: "actions",
        Header: "",
        width: 60,
        Cell: (cell: Cell) => (
          <div className="flex w-full justify-end">
            <Button
              onClick={() => {
                const d = [...data];
                d.splice(cell.row.index, 1);
                setData(d);
              }}
              variant="white"
              size="sm"
            >
              <XIcon className="mr-1 h-3 w-3" />
              {t("Remove")}
            </Button>
          </div>
        ),
      });
    }
    return cols;
  }, [t, data, isEdited]);

  useEffect(() => {
    if (!scenario) {
      setData([{ class: "", speed: 0 }]);
      setEdited(true);
    } else {
      setEdited(Object.keys(scenario).length === 0);
      setData(
        Object.entries(scenario).map(([key, speed]) => ({
          class: key,
          speed,
        }))
      );
    }
  }, [scenario]);

  const onAddRow = () => {
    setData([...data, { class: "", speed: 0 }]);
  };

  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: any) => {
      setData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        })
      );
    },
    []
  );
  const onSave = useCallback(() => {
    setEdited(false);
    const scenario = arrayToScenario(data);
    onChange(scenario);
  }, [data, onChange]);

  return (
    <div>
      <div className="mb-2 flex justify-end gap-2">
        {isEdited && (
          <>
            <Button onClick={onAddRow} variant="secondary" size="sm">
              <PlusIcon className="mr-1 h-4 w-4" />
              {t("Add a row")}
            </Button>
            <Button variant={"primary"} size="sm" onClick={onSave}>
              {t("Save")}
            </Button>
          </>
        )}
        {!isEdited && (
          <Button onClick={() => setEdited(true)} size="sm">
            {t("Edit")}
          </Button>
        )}
      </div>
      <DataGrid
        data={data}
        columns={columns}
        className="overflow-hidden rounded-md shadow ring-1 ring-black ring-opacity-5"
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        defaultPageSize={5}
        extraTableProps={{ updateData, isEdited }}
        theme={GRID_THEME}
        sortable
      />
    </div>
  );
};

export default ScenarioEditor;
