import { ChangeEvent, useCallback, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import Button from "components/Button";
import Input from "components/forms/Input";
import Field from "components/forms/Field";

type ScenarioEntry = { kls: string; speed: number };
type Scenario = ScenarioEntry[];
type ScenarioEditorProps = {
  scenario?: Scenario;
  onChange: (data: Scenario) => void;
};

const ScenarioEditor = (props: ScenarioEditorProps) => {
  const { scenario = [], onChange } = props;
  const { t } = useTranslation();

  const [data, setData] = useState([...scenario]);

  const handleRowChange = useCallback(
    (index: number, key: string, value: any) => {
      const newData = [...data];
      newData[index] = { ...newData[index], [key]: value };
      setData(newData);
      onChange(newData);
    },
    [data, onChange]
  );
  const handleRowRemove = useCallback(
    (index: number) => {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      onChange(newData);
    },
    [data, onChange]
  );
  const handleRowAdd = useCallback(() => {
    const newData = data.concat({ kls: `class ${data.length + 1}`, speed: 0 });
    setData(newData);
    onChange(newData);
  }, [data, onChange]);
  const handleUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length === 1) {
        const reader = new FileReader();
        const abort = (message: string) => {
          alert(message);
          event.target.value = "";
        };
        reader.addEventListener(
          "load",
          () => {
            if (typeof reader.result !== "string") {
              return abort(t("Expected string, got ArrayBuffer"));
            }
            const rawRows = reader.result
              .split("\n")
              .filter((row) => row.replace(" ", "") !== "");

            // Make sure that the file is not empty and has two columns
            if (rawRows.length === 0) {
              return abort(t("File is empty"));
            }

            // Split by comma or semicolon
            let rows;
            if (rawRows[0].indexOf(";") !== -1) {
              rows = rawRows.map((row) => row.split(";"));
            } else if (rawRows[0].indexOf(",") !== -1) {
              rows = rawRows.map((row) => row.split(","));
            } else {
              return abort(
                t("Values must be separated either by commas or semicolon")
              );
            }

            if (rows.find((row) => row.length !== 2)) {
              return abort(t("The file must have two columns"));
            }

            // Exclude the header row if any, and validate that the second column can be parsed as an integer
            if (isNaN(parseInt(rows[0][1]))) {
              rows = rows.slice(1);
            }
            if (rows.find((row) => isNaN(parseInt(row[1])))) {
              return abort(
                t("The second column may only contain integer numbers")
              );
            }

            // Set scenario data
            const newData = rows.map((row) => ({
              kls: row[0],
              speed: parseInt(row[1]),
            }));
            setData(newData);
            onChange(newData);

            // Reset the file input
            event.target.value = "";
          },
          false
        );
        reader.readAsText(event.target.files[0]);
      }
    },
    [t, onChange]
  );

  return (
    <div>
      <div className="overflow-hidden rounded-md shadow ring-1 ring-black ring-opacity-5">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {t("Class")}
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {t("Speed (in km/h)")}
              </th>
              <th>
                <span className="sr-only">{t("Actions")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {scenario.map((row, i) => {
              return (
                <tr key={i}>
                  <td className="whitespace-nowrap px-3 py-1 text-sm font-medium text-gray-800 md:py-2">
                    <Input
                      className="w-full"
                      value={data[i].kls}
                      onChange={(e) =>
                        handleRowChange(i, "kls", e.target.value)
                      }
                      type="text"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-1 text-sm font-medium text-gray-800 md:py-2">
                    <Input
                      className="w-full"
                      value={data[i].speed}
                      onChange={(e) =>
                        handleRowChange(i, "speed", e.target.value)
                      }
                      type="number"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-1 text-sm font-medium text-gray-800 md:py-2">
                    <div className="flex w-full justify-end">
                      <Button
                        onClick={() => {
                          handleRowRemove(i);
                        }}
                        variant="white"
                        size="sm"
                      >
                        <XIcon className="mr-1 h-3 w-3" />
                        {t("Remove")}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex flex-col justify-start gap-4">
        <div>
          <Button onClick={handleRowAdd} variant="secondary" size="sm">
            <PlusIcon className="mr-1 h-4 w-4" />
            {t("Add a row")}
          </Button>
        </div>
        <div className="flex w-full max-w-lg flex-col gap-2">
          <Field
            name="raster"
            label={t("Fill from CSV")}
            required
            error={false}
          >
            <Input
              type="file"
              accept={".csv"}
              required
              onChange={handleUpload}
            />
          </Field>
          <div className="text-sm text-gray-500">
            {t(
              "You may upload a CSV file with two columns (the first one should contain a class name, the second one should contain a speed expressed in km/h)." +
                "The scenario table above will be replaced with the file content."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioEditor;
