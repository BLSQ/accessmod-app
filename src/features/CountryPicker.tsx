import SelectInput, { SelectInputProps } from "components/forms/SelectInput";
import { countries, Country, regions } from "libs/countries";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

interface CountryPickerProps extends SelectInputProps {
  onChange: (value: Country | Country[]) => void;
}

const CountryPicker = (props: CountryPickerProps) => {
  const { t } = useTranslation();
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
    <SelectInput
      {...props}
      options={countryOptions}
      labelKey="name"
      valueKey="code"
    />
  );
};

export default CountryPicker;
