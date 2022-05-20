import { MenuIcon, PlusIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Button from "components/Button";
import Input from "components/forms/Input";
import { SortableList } from "components/Sortable";
import useDebounce from "hooks/useDebounce";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

type StackLayerPrioritiesProps = {
  value?: object | null;
  onChange: (value: object | null) => void;
  className?: string;
  disabled?: boolean;
};

const PLACEHOLDER = `[
  {name: "<dataset-name>", class: "<class-in-dataset>"},
  ...
]
`;

const StackLayerPriorities = (props: StackLayerPrioritiesProps) => {
  const { value, onChange, className, disabled } = props;
  const { t } = useTranslation();
  const [internalTextValue, setInternalTextValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const debouncedTextValue = useDebounce(internalTextValue);

  useEffect(() => {
    setInternalTextValue(value ? JSON.stringify(value, null, 2) : "");
  }, [value]);

  useEffect(() => {
    if (debouncedTextValue) {
      try {
        const jsonValue = JSON.parse(debouncedTextValue);
        setError(null);
        onChange(jsonValue);
      } catch (err) {
        setError(t("Invalid JSON"));
      }
    } else {
      onChange(null);
    }
  }, [t, debouncedTextValue, onChange]);

  const [items, setItems] = useState([
    { id: "1", label: "test" },
    { id: "2", label: "test2" },
    { id: "3", label: "test3" },
  ]);

  return (
    <div className={clsx(className, "rounded-md bg-white px-4 py-2 pb-4")}>
      <div className=" divide-y divide-gray-200">
        <SortableList
          items={items}
          onChange={setItems}
          handle
          renderItem={(item, handleProps) => (
            <div className="flex w-full items-center gap-2 py-3">
              <div className="flex flex-1 gap-2">
                <Input placeholder={t("Layer name")} />
                <Input placeholder={t("Class")} />
              </div>
              <Button variant="outlined" size="sm">
                <XIcon className="h-4 w-4 text-gray-500 hover:text-gray-600" />
              </Button>
              <Button variant="outlined" {...handleProps} size="sm">
                <MenuIcon className="h-4 w-4 text-gray-500 hover:text-gray-600" />
              </Button>
            </div>
          )}
        />
      </div>
      <Button variant="secondary" className="mt-2" size="sm">
        <PlusIcon className="mr-1.5 h-3 w-3" />
        {t("Add a layer")}
      </Button>
      {error && (
        <span className="absolute bottom-2 right-2 rounded-md bg-white p-2 text-sm text-red-400">
          {error}
        </span>
      )}
    </div>
  );
};

export default StackLayerPriorities;
