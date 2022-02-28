import { SearchIcon } from "@heroicons/react/outline";
import useDebounce from "hooks/useDebounce";
import { useTranslation } from "next-i18next";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { InputProps } from "react-select";
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
  const [value, setValue] = useState<string | null>();

  useEffect(() => {
    // If debounce duration has to be longer than a few hundreds of millis ...
    // ... this need to be changed in favor of a ref to the timeout to avoid to ...
    // ... trigger twice the onChange if the user is fast enough to click on the button.
    const timeout = setTimeout(
      () => onChange(inputRef.current?.value),
      debounce
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [value, debounce, onChange]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
      if ("value" in event.target) {
        setValue(event.target.value);
      } else {
        setValue(inputRef.current?.value ?? null);
      }
    },
    []
  );
  return (
    <Input
      ref={inputRef}
      placeholder={placeholder}
      onChange={handleInputChange}
      defaultValue={defaultValue}
      {...delegated}
      trailingIcon={
        loading ? (
          <Spinner size="xs" />
        ) : (
          <button onClick={() => onChange(value)}>
            <SearchIcon className="h-5 text-gray-400 hover:text-gray-600 group-focus-within:text-gray-500" />
          </button>
        )
      }
    />
  );
};

export default SearchInput;
