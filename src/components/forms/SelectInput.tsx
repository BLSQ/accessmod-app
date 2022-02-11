import React, { ReactElement, useCallback } from "react";
import Select, {
  GroupBase,
  OptionsOrGroups,
  components as DefaultComponents,
  SelectComponentsConfig,
} from "react-select";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import { get } from "lodash/fp";
import useInputKeyDown from "hooks/useInputKeyDown";

export { DefaultComponents };
export default function SelectInput({
  options,
  loadOptions,
  cacheOptions,
  disabled,
  defaultOptions,
  value,
  onChange,
  required,
  components,
  multiple,
  valueKey,
  labelKey,
  onBlur,
  onEscape = () => {},
  onCommandShiftEnter = () => {},
  autoFocus,
  onCreateOption,
}: SelectInputProps<Option, boolean, GroupBase<Option>>) {
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
    isDisabled: disabled,
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
    components,
    onBlur,
    autoFocus,
    openMenuOnFocus: true,
    defaultMenuIsOpen: false,
  };

  if (loadOptions) {
    return (
      <AsyncSelect
        {...selectProps}
        loadOptions={loadOptions}
        cacheOptions={cacheOptions}
        defaultOptions={defaultOptions}
      />
    );
  }

  return onCreateOption ? (
    <CreatableSelect {...selectProps} onCreateOption={onSelectCreateOption} />
  ) : (
    <Select {...selectProps} />
  );
}

type Option = { [key: string]: string };

interface SelectInputProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  options?: OptionsOrGroups<Option, Group>;
  value: any;
  onChange: (value: any) => void;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  onEscape?: () => void;
  onCommandShiftEnter?: () => void;
  autoFocus?: boolean;
  onCreateOption?: (value: any) => void;
  labelKey?: string;
  valueKey?: string;
  loadOptions?: (str: string) => OptionsOrGroups<Option, Group>;
  cacheOptions?: boolean;
  defaultOptions?: boolean | OptionsOrGroups<Option, Group>;
  components?: SelectComponentsConfig<Option, IsMulti, Group>;
}
