import clsx from "clsx";
import Textarea from "components/forms/Textarea";
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

  return (
    <div className="relative">
      <Textarea
        rows={10}
        className={clsx(className)}
        placeholder={PLACEHOLDER}
        value={internalTextValue}
        onChange={(event) => setInternalTextValue(event.target.value)}
        disabled={disabled}
      />
      {error && (
        <span className="absolute bottom-2 right-2 rounded-md bg-white p-2 text-sm text-red-400">
          {error}
        </span>
      )}
    </div>
  );
};

export default StackLayerPriorities;
