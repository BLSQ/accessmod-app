import { PlusIcon, XIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import Input from "components/forms/Input";
import { useTranslation } from "next-i18next";
import { useCallback, useState } from "react";

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
    (index, key, value) => {
      const newData = [...data];
      newData[index] = { ...newData[index], [key]: value };
      setData(newData);
      onChange(newData);
    },
    [data, onChange]
  );
  const handleRowRemove = useCallback(
    (index) => {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      onChange(newData);
    },
    [data, onChange]
  );
  const handleRowAdd = useCallback(() => {
    const newData = data.concat({ kls: "", speed: 0 });
    setData(newData);
    onChange(newData);
  }, [data, onChange]);

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
                        {t("Remove")} ({i})
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex justify-start gap-2">
        <Button onClick={handleRowAdd} variant="secondary" size="sm">
          <PlusIcon className="mr-1 h-4 w-4" />
          {t("Add a row")}
        </Button>
      </div>
    </div>
  );
};

export default ScenarioEditor;
