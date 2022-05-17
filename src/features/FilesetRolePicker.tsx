import { gql } from "@apollo/client";
import clsx from "clsx";
import Badge from "components/Badge";
import SelectInput, { DefaultComponents } from "components/forms/SelectInput";
import { getFormatLabel } from "libs/constants";
import { getFilesetRoles } from "libs/dataset";
import { AccessmodFilesetFormat } from "libs/graphql";
import { PromiseReturnType } from "libs/types";
import { useEffect, useMemo, useState } from "react";

type Props = {
  value: { [key: string]: string };
  onChange: (value: any) => void;
  format?: AccessmodFilesetFormat;
  disabled?: boolean;
  required?: boolean;
};

const RoleOption = (props: any) => {
  return (
    <DefaultComponents.Option {...props}>
      <div className="flex">
        <div className="flex flex-1 flex-col">
          <span className="text-sm font-bold">{props.data.name}</span>
          <span className={clsx("mt-1 text-xs")}>Description of the role</span>
        </div>
        <Badge size="xs" className="self-center bg-lochmara text-white">
          {getFormatLabel(props.data.format)}
        </Badge>
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
  const { value, format, onChange, disabled, required } = props;
  const [roles, setRoles] = useState<
    PromiseReturnType<ReturnType<typeof getFilesetRoles>>
  >([]);

  useEffect(() => {
    getFilesetRoles().then(setRoles);
  }, []);

  const options = useMemo(() => {
    if (format) {
      return roles.filter((role) => role.format === format);
    } else {
      return roles;
    }
  }, [roles, format]);

  return (
    <SelectInput
      options={options}
      value={value}
      onChange={onChange}
      labelKey="name"
      valueKey="id"
      required={required}
      disabled={disabled || !roles.length}
      components={COMPONENTS}
    />
  );
};

export default FilesetRolePicker;
