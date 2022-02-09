import { gql } from "@apollo/client";
import SelectInput from "components/forms/SelectInput";
import { useProjectPickerQuery } from "libs/graphql";

type Props = {
  value: { [key: string]: string };
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
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const ProjectPicker = (props: Props) => {
  const { value, onChange } = props;
  const { data } = useProjectPickerQuery();

  return (
    <SelectInput
      options={(data?.accessmodProjects?.items as any) ?? []}
      value={value}
      onChange={onChange}
      labelKey="name"
      valueKey="id"
    />
  );
};

export default ProjectPicker;
