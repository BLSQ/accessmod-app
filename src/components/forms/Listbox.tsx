import { Listbox as UIListbox, Portal } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Modifier } from "@popperjs/core";
import clsx from "clsx";
import { sameWidthModifier } from "libs/popper";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { usePopper } from "react-popper";

type ListboxProps = {
  value: any;
  onChange: (value: any) => void;
  multiple?: boolean;
  required?: boolean;
  name?: string;
  disabled?: boolean;
  children: ReactNode;
  footer?: ({
    close,
    clear,
  }: {
    close: () => void;
    clear: () => void;
  }) => ReactNode;
  placeholder?: string;
  displayValue: (value: any) => ReactNode;
  withPortal?: boolean;
  className?: string;
};

const Classes = {
  Options:
    "max-h-60 z-10 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm flex flex-col",
  OptionsList: "overflow-auto flex-1",
};

const Listbox = (props: ListboxProps) => {
  const {
    required = false,
    withPortal = false,
    children,
    footer,
    displayValue,
    className,
    value,
    placeholder,
    onChange,
    multiple,
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

  const onClear = useCallback(() => {
    onChange(null);
  }, [onChange]);
  const close = useCallback(() => {
    btnRef.current?.click();
  }, [btnRef]);

  const optionsElement = (
    <UIListbox.Options
      className={Classes.Options}
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
    >
      <div className={Classes.OptionsList}>{children}</div>
      {footer && footer({ close, clear: onClear })}
    </UIListbox.Options>
  );

  return (
    <UIListbox
      {...delegated}
      onChange={onChange}
      value={value}
      as="div"
      multiple={multiple}
    >
      {({ open }) => (
        <div className="relative" ref={setReferenceElement}>
          <UIListbox.Button
            ref={btnRef}
            className={clsx(
              "form-input flex w-full items-center justify-between rounded-md border-gray-300 shadow-sm disabled:border-gray-300",
              "focus-within:outline-none focus:ring-transparent focus-visible:border-lochmara disabled:cursor-not-allowed disabled:bg-gray-50",
              "sm:text-sm",
              open ? "border-lochmara" : "hover:border-gray-400"
            )}
          >
            <div className="truncate">
              {(!multiple && value) || value?.length > 0 ? (
                displayValue(value)
              ) : (
                <span className="text-gray-600 text-opacity-70">
                  {placeholder}
                </span>
              )}
            </div>
            <div className="ml-1 flex items-center gap-0.5 rounded-r-md text-gray-400 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 hover:text-gray-500"
                aria-hidden="true"
              />
            </div>
          </UIListbox.Button>

          {withPortal ? <Portal>{optionsElement}</Portal> : optionsElement}
        </div>
      )}
    </UIListbox>
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

Listbox.CheckOption = function CheckOption(props: CheckOptionsProps) {
  const {
    value,
    className,
    children,
    disabled = false,
    forceSelected = false,
  } = props;

  return (
    <UIListbox.Option
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
    </UIListbox.Option>
  );
};

export default Listbox;
