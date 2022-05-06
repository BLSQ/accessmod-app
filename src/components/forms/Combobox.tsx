import { Combobox as UICombobox } from "@headlessui/react";
import { CheckIcon, SelectorIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Spinner from "components/Spinner";
import {
  ChangeEvent,
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Input from "./Input";

type ComboboxProps = {
  value: any;
  onChange: (value: any) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  required?: boolean;
  name?: string;
  disabled?: boolean;
  children: ReactNode;
  loading?: boolean;
  renderIcon?: ({ value }: { value: any }) => ReactElement | undefined | null;
  onOpen?: () => void;
  onClose?: () => void;
  placeholder?: string;
  displayValue: (value: any) => string;
};

const OptionsWrapper = (props: {
  onOpen?: () => void;
  onClose?: () => void;
  children: ReactElement;
}) => {
  const { onOpen, onClose, children } = props;

  useEffect(() => {
    onOpen && onOpen();
    return onClose;
  }, [onOpen, onClose]);

  return children;
};

const Classes = {
  trailingIcon:
    "flex items-center rounded-r-md gap-0.5 focus:outline-none text-gray-400",
  Options:
    "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
};

const Combobox = (props: ComboboxProps) => {
  const {
    loading = false,
    required = false,
    children,
    onOpen,
    onClose,
    onInputChange,
    displayValue,
    renderIcon,
    value,
    placeholder,
    onChange,
    ...delegated
  } = props;

  const btnRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<boolean>(false);

  // const handleFocus = useCallback(() => {
  //   // Simulate a click on the button to open the menu ...
  //   // ... when the user focuses the input (and do nothing ...
  //   // ... when the user already clicked on the button)
  //   console.log("handleFocus", openRef.current);
  //   if (!openRef.current) btnRef.current?.click();
  // }, [openRef, btnRef]);

  const handleOpen = useCallback(() => {
    openRef.current = true;
    onOpen && onOpen();
  }, [onOpen, openRef]);

  const handleClose = useCallback(() => {
    openRef.current = false;
    onClose && onClose();
  }, [onClose, openRef]);

  const icon = useMemo(() => {
    if (loading) {
      return <Spinner size="xs" />;
    } else if (renderIcon) {
      return renderIcon({ value });
    }
  }, [loading, renderIcon, value]);

  const onClear = useCallback(() => {
    onChange(null);
    openRef.current = false;
  }, [openRef, onChange]);

  return (
    <UICombobox
      {...delegated}
      onChange={onChange}
      value={value}
      as="div"
      nullable={!required}
    >
      <div className="relative mt-1">
        <UICombobox.Input
          as={Fragment}
          onChange={onInputChange}
          displayValue={displayValue}
        >
          <Input
            placeholder={placeholder}
            trailingIcon={
              <div className={Classes.trailingIcon}>
                {icon}
                {!required && value && (
                  <XIcon
                    onClick={onClear}
                    className="h-4 w-4 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                )}
                <UICombobox.Button ref={btnRef} className="hover:text-gray-500">
                  <SelectorIcon className="h-5 w-5" aria-hidden="true" />
                </UICombobox.Button>
              </div>
            }
          />
        </UICombobox.Input>

        <UICombobox.Options className={Classes.Options}>
          <OptionsWrapper onOpen={handleOpen} onClose={handleClose}>
            <>{children}</>
          </OptionsWrapper>
        </UICombobox.Options>
      </div>
    </UICombobox>
  );
};

type CheckOptionsProps = {
  value: any;
  className?: string;
  disabled?: boolean;
  forceSelected?: boolean;
  children?:
    | ReactNode
    | (({
        active,
        selected,
      }: {
        active: boolean;
        selected: boolean;
      }) => ReactNode);
};

Combobox.CheckOption = function CheckOption(props: CheckOptionsProps) {
  const {
    value,
    className,
    children,
    disabled = false,
    forceSelected = false,
  } = props;

  return (
    <UICombobox.Option
      value={value}
      disabled={disabled}
      className={({ active }) =>
        clsx(
          "relative cursor-default select-none px-2 py-2",
          active ? "bg-lochmara text-white" : "text-gray-900",
          className
        )
      }
    >
      {({ active, selected }) => (
        <div className="group flex w-full items-center">
          <span
            className={clsx(
              "flex items-center pr-4",
              !selected && !forceSelected && "invisible",
              active ? "text-white" : "text-gray-900"
            )}
          >
            <CheckIcon
              className={clsx(
                "h-5 w-5",
                (selected || forceSelected) && !active && "text-lochmara"
              )}
              aria-hidden="true"
            />
          </span>
          <span
            className={clsx(
              "flex-1 truncate",
              (selected || forceSelected) && "font-semibold"
            )}
          >
            {typeof children === "function"
              ? children({ active, selected: selected || forceSelected })
              : children}
          </span>
        </div>
      )}
    </UICombobox.Option>
  );
};

export default Combobox;
