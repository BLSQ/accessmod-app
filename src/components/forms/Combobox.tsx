import { Combobox as UICombobox, Portal } from "@headlessui/react";
import { CheckIcon, SelectorIcon, XIcon } from "@heroicons/react/outline";
import { Modifier } from "@popperjs/core";
import clsx from "clsx";
import Spinner from "components/Spinner";
import { sameWidthModifier } from "libs/popper";
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
import { usePopper } from "react-popper";
import Input from "./Input";

type ComboboxProps = {
  value: any;
  onChange: (value: any) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  required?: boolean;
  name?: string;
  disabled?: boolean;
  inputClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  renderIcon?: ({ value }: { value: any }) => ReactElement | undefined | null;
  onOpen?: () => void;
  onClose?: () => void;
  placeholder?: string;
  displayValue: (value: any) => string;
  withPortal?: boolean;
};

const OptionsWrapper = (props: {
  onOpen?: () => void;
  onClose?: () => void;
  children: ReactNode;
}) => {
  const { onOpen, onClose, children } = props;

  useEffect(() => {
    onOpen && onOpen();
    return onClose;
  }, [onOpen, onClose]);

  return <>{children}</>;
};

const Classes = {
  trailingIcon:
    "flex items-center rounded-r-md gap-0.5 focus:outline-none text-gray-400",
  Options:
    "max-h-60 z-10 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm flex flex-col",
  OptionsList: "overflow-auto flex-1",
};

const Combobox = (props: ComboboxProps) => {
  const {
    loading = false,
    required = false,
    withPortal = false,
    children,
    footer,
    onOpen,
    onClose,
    onInputChange,
    inputClassName,
    displayValue,
    renderIcon,
    value,
    placeholder,
    onChange,
    ...delegated
  } = props;

  const btnRef = useRef<HTMLButtonElement>(null);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const modifiers = useMemo(() => {
    return [
      { name: "offset", options: { offset: [0, 4] } },
      withPortal && sameWidthModifier,
    ].filter(Boolean) as Modifier<any, any>[];
  }, [withPortal]);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: withPortal ? "fixed" : "absolute",
    placement: "bottom-start",
    modifiers,
  });

  const icon = useMemo(() => {
    if (loading) {
      return <Spinner size="xs" />;
    } else if (renderIcon) {
      return renderIcon({ value });
    }
  }, [loading, renderIcon, value]);

  const onClear = useCallback(() => {
    onChange(null);
  }, [onChange]);

  const optionsElement = (
    <UICombobox.Options
      className={Classes.Options}
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
    >
      <div className={Classes.OptionsList}>
        <OptionsWrapper onOpen={onOpen} onClose={onClose}>
          {children}
        </OptionsWrapper>
      </div>
      {footer}
    </UICombobox.Options>
  );

  return (
    <UICombobox
      {...delegated}
      onChange={onChange}
      value={value}
      as="div"
      nullable={!required}
    >
      <div className="relative" ref={setReferenceElement}>
        <UICombobox.Input
          as={Fragment}
          onChange={onInputChange}
          displayValue={displayValue}
        >
          <Input
            placeholder={placeholder}
            inputClassName={inputClassName}
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

        {withPortal ? <Portal>{optionsElement}</Portal> : optionsElement}
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
