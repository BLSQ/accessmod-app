import { gql } from "@apollo/client";
import SelectInput from "components/forms/SelectInput";
import { useProjectPickerQuery } from "libs/graphql";

type Props = {
  value: { [key: string]: string };
  disabled?: boolean;
  onChange: (value: any) => void;
};

const QUERY = gql`
  query ProjectPicker {
    accessmodProjects(page: 1, perPage: 40) {
      items {
        id
        name
        country {
          flag
          name
          code
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const ProjectPicker = (props: Props) => {
  const { value, onChange, disabled } = props;
  const { data } = useProjectPickerQuery();

  return (
    <SelectInput
      options={(data?.accessmodProjects?.items as any) ?? []}
      value={value}
      disabled={disabled}
      onChange={onChange}
      labelKey="name"
      valueKey="id"
    />
  );
};

export default ProjectPicker;
