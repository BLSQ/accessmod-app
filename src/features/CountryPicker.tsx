import Listbox from "components/forms/Listbox";
import { ensureArray } from "libs/array";
import { countries, Country, regions } from "libs/countries";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

type CountryPickerProps = {
  onChange: (value: Country | Country[]) => void;
  disabled?: boolean;
  placeholder?: string;
  multiple?: boolean;
} & (
  | {
      multiple: true;
      value: Country[] | null;
    }
  | {
      multiple?: false;
      value: Country | null;
    }
);

const CountryPicker = (props: CountryPickerProps) => {
  const { t } = useTranslation();
  const {
    value,
    onChange,
    disabled,
    multiple,
    placeholder = t("Select a country"),
  } = props;
  const countryOptions: { label: string; options: Country[] }[] =
    useMemo(() => {
      const groups = [];
      for (const [regionKey, regionLabel] of Object.entries(regions)) {
        groups.push({
          label: regionLabel,
          options: countries.filter((country) => country.region === regionKey),
        });
      }
      groups.push({
        label: t("No Region"),
        options: countries.filter((country) => !country.region),
      });
      return groups;
    }, [t]);

  return (
    <Listbox
      onChange={onChange}
      displayValue={(value) =>
        ensureArray(value)
          .map((v) => v.name)
          .join(", ")
      }
      placeholder={placeholder}
      value={value}
      multiple={multiple}
      disabled={disabled}
    >
      {countryOptions.map((group) => (
        <li key={group.label} className="relative">
          <div className="sticky top-0 z-10 bg-gray-100 px-3 py-2">
            {group.label}
          </div>
          <ul>
            {group.options.map((option, i) => (
              <Listbox.CheckOption key={i} value={option}>
                {option.name}
              </Listbox.CheckOption>
            ))}
          </ul>
        </li>
      ))}
    </Listbox>
  );
};

export default CountryPicker;
