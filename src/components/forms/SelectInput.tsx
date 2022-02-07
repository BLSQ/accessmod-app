import React, { useCallback } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { get } from "lodash/fp";
import useInputKeyDown from "hooks/useInputKeyDown";
export default function SelectInput({
  options,
  value,
  onChange,
  required,
  multiple,
  valueKey,
  labelKey,
  onBlur,
  onEscape = () => {},
  onCommandShiftEnter = () => {},
  autoFocus,
  onCreateOption,
}: SelectInputProps) {
  const onKeyDown = useInputKeyDown({ onEscape, onCommandShiftEnter });
  const onSelectChange = useCallback(
    (newValue: any) => {
      onChange(newValue);
    },
    [onChange]
  );

  const onSelectCreateOption = useCallback(
    async (newOptionValue) => {
      if (!onCreateOption) {
        throw new Error("This should not happen");
      }
      const newOption = await onCreateOption(newOptionValue);
      onChange(multiple ? [...value, newOption] : newOption);
    },
    [onCreateOption, onChange, value, multiple]
  );

  const selectProps = {
    options,
    value,
    onChange: onSelectChange,
    isClearable: !required,
    isMulti: multiple,
    closeMenuOnSelect: !multiple,
    className: "react-select-container",
    classNamePrefix: "react-select",
    hideSelectedOptions: false,
    getOptionLabel: labelKey
      ? (option: Option) => get(labelKey, option)
      : undefined,
    getOptionValue: valueKey
      ? (option: Option) => get(valueKey, option)
      : undefined,
    onKeyDown,
    onBlur,
    autoFocus,
    openMenuOnFocus: true,
    defaultMenuIsOpen: false,
  };

  return onCreateOption ? (
    <CreatableSelect {...selectProps} onCreateOption={onSelectCreateOption} />
  ) : (
    <Select {...selectProps} />
  );
}

type Option = { [key: string]: string };

interface SelectInputProps {
  options: Option[];
  value: any;
  onChange: (value: any) => void;
  multiple?: boolean;
  required?: boolean;
  onBlur?: () => void;
  onEscape?: () => void;
  onCommandShiftEnter?: () => void;
  autoFocus?: boolean;
  onCreateOption?: (value: any) => void;
  labelKey?: string;
  valueKey?: string;
}
