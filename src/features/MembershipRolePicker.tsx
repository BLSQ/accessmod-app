import SimpleSelect from "components/forms/SimpleSelect";
import { MembershipRole } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { FormEvent } from "react";

type MembershipRolePickerProps = {
  className?: string;
} & (
  | {
      value: MembershipRole;
      required: true;
      onChange: (value: MembershipRole) => void;
    }
  | {
      required: false;
      value: MembershipRole | null;
      onChange: (value: MembershipRole | null) => void;
    }
);

const MembershipRolePicker = (props: MembershipRolePickerProps) => {
  const { t } = useTranslation();
  const { value, onChange, required, className } = props;

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    onChange(event.currentTarget.value as MembershipRole);
  };

  return (
    <SimpleSelect
      value={value?.toString()}
      onChange={handleChange}
      required={required}
      className={className}
    >
      <option value={MembershipRole.Admin}>{t("Admin")}</option>
      <option value={MembershipRole.Regular}>{t("Regular")}</option>
    </SimpleSelect>
  );
};

export default MembershipRolePicker;
