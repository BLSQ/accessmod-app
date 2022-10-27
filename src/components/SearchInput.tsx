import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import usePrevious from "hooks/usePrevious";
import { useTranslation } from "next-i18next";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "./forms/Input";
import Spinner from "./Spinner";

type Props = {
  onChange: (value?: string | null) => void;
  className?: string;
  placeholder?: string;
  loading?: boolean;
  debounce?: number;
  defaultValue?: string;
};

const Classes = {
  icon: "h-5 text-gray-400 hover:text-gray-600 group-focus-within:text-gray-500",
};

const SearchInput = (props: Props) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    loading,
    placeholder = t("Search..."),
    debounce = 200,
    onChange,
    defaultValue,
    ...delegated
  } = props;
  const [internalValue, setInternalValue] = useState<string | null>();
  const prevValue = usePrevious(internalValue);

  useEffect(() => {
    // If debounce duration has to be longer than a few hundreds of millis ...
    // ... this need to be changed in favor of a ref to the timeout to avoid to ...
    // ... trigger twice the onChange if the user is fast enough to click on the button.
    if (prevValue !== internalValue) {
      const timeout = setTimeout(() => {
        onChange(inputRef.current?.value);
      }, debounce);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [internalValue, debounce, onChange, prevValue]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
      if ("value" in event.target) {
        setInternalValue(event.target.value);
      } else {
        setInternalValue(inputRef.current?.value ?? "");
      }
    },
    []
  );

  const clearInput = () => {
    setInternalValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Input
      ref={inputRef}
      placeholder={placeholder}
      onChange={handleInputChange}
      defaultValue={defaultValue}
      {...delegated}
      trailingIcon={
        <>
          {loading && <Spinner size="xs" />}
          {!loading && !(internalValue || defaultValue) && (
            <button onClick={() => onChange(internalValue)}>
              <MagnifyingGlassIcon className={Classes.icon} />
            </button>
          )}
          {!loading && (internalValue || defaultValue) && (
            <button onClick={clearInput}>
              <XMarkIcon className={Classes.icon} />
            </button>
          )}
        </>
      }
    />
  );
};

export default SearchInput;
