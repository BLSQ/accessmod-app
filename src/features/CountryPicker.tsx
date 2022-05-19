import Combobox from "components/forms/Combobox";
import { ensureArray } from "libs/array";
import { fetchCountries, REGIONS } from "libs/countries";
import { Country } from "libs/graphql";
import _ from "lodash";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";

type CountryPickerProps = {
  onChange: (value: Country | Country[]) => void;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
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
    disabled = false,
    multiple = false,
    required = false,
    placeholder = t("Select a country"),
  } = props;

  const [countries, setCountries] = useState<Country[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const filteredCountries = useMemo(
    () =>
      countries?.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      ),
    [countries, query]
  );

  const options: { label: string; options: Country[] }[] = useMemo(() => {
    if (!filteredCountries) {
      return [];
    }

    const groups = [];
    for (const regionKey of REGIONS) {
      const regionOptions = filteredCountries.filter(
        (country) => country.whoRegion?.code === regionKey
      );
      if (regionOptions.length > 0) {
        groups.push({
          label: regionOptions[0].whoRegion!.name,
          options: regionOptions,
        });
      }
    }

    const orphanCountries = filteredCountries.filter(
      (country) => !country.whoRegion
    );
    if (orphanCountries.length > 0) {
      groups.push({
        label: t("No Region"),
        options: orphanCountries,
      });
    }

    return groups;
  }, [t, filteredCountries]);

  return (
    <Combobox
      required={required}
      onChange={onChange}
      displayValue={(value) =>
        multiple
          ? ensureArray(value)
              .map((v) => v.name)
              .join(", ")
          : value?.name
      }
      onInputChange={useCallback((event) => setQuery(event.target.value), [])}
      placeholder={placeholder}
      value={value}
      multiple={multiple}
      onClose={useCallback(() => setQuery(""), [])}
      disabled={disabled || !countries?.length}
    >
      {options.map((group, idx) => (
        <li key={idx} className="relative">
          <div className="sticky top-0 z-10 bg-gray-100 px-3 py-2">
            {group.label}
          </div>
          <ul>
            {group.options.map((option, i) => (
              <Combobox.CheckOption key={i} value={option}>
                <div className="flex items-center">
                  <img
                    src={option.flag}
                    className="sr-hidden mr-2"
                    alt="Country Flag"
                  />
                  {option.name}
                </div>
              </Combobox.CheckOption>
            ))}
          </ul>
        </li>
      ))}
    </Combobox>
  );
};

export default CountryPicker;
