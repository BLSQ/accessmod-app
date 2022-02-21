import { gql } from "@apollo/client";
import clsx from "clsx";
import Button from "components/Button";
import SelectInput, { DefaultComponents } from "components/forms/SelectInput";
import { getFormatLabel } from "libs/constants";
import { useFilesetRolePickerQuery } from "libs/graphql";

type Props = {
  value: { [key: string]: string };
  onChange: (value: any) => void;
  disabled?: boolean;
  required?: boolean;
};

const RoleOption = (props: any) => {
  return (
    <DefaultComponents.Option {...props}>
      <div className="flex">
        <div className="flex-1 flex flex-col">
          <span className="text-sm font-bold">{props.data.name}</span>
          <span className={clsx("text-xs mt-1")}>Description of the role</span>
        </div>
        <Button
          variant="pill"
          size="sm"
          className="bg-who-blue-light self-center"
        >
          {getFormatLabel(props.data.format)}
        </Button>
      </div>
    </DefaultComponents.Option>
  );
};

const COMPONENTS = {
  Option: RoleOption,
};

const QUERY = gql`
  query FilesetRolePicker {
    accessmodFilesetRoles {
      id
      name
      format
      createdAt
      updatedAt
    }
  }
`;

const FilesetRolePicker = (props: Props) => {
  const { value, onChange, disabled, required } = props;
  const { data } = useFilesetRolePickerQuery();
  console.log("ROLE VALUE", value);
  return (
    <SelectInput
      options={data?.accessmodFilesetRoles ?? []}
      value={value}
      onChange={onChange}
      labelKey="name"
      valueKey="id"
      required={required}
      disabled={disabled}
      components={COMPONENTS}
    />
  );
};

export default FilesetRolePicker;
