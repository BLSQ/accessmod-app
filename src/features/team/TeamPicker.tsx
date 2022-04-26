import { gql } from "@apollo/client";
import SelectInput from "components/forms/SelectInput";
import { useTeamPickerLazyQuery } from "libs/graphql";
import { useCallback, useMemo, useState } from "react";

type Props = {
  value: any;
  disabled?: boolean;
  onChange: (value: any) => void;
  required?: boolean;
  multiple?: boolean;
  placeholder?: string;
};

const QUERY = gql`
  query TeamPicker($page: Int = 1, $perPage: Int = 15, $term: String) {
    teams(page: $page, perPage: $perPage, term: $term) {
      items {
        id
        name
      }
      totalItems
    }
  }
`;

const TeamPicker = (props: Props) => {
  const { value, multiple, onChange, disabled, required, placeholder } = props;
  const [term, setTerm] = useState("");
  const [fetch, { data, loading }] = useTeamPickerLazyQuery({
    variables: { term },
    fetchPolicy: "cache-and-network",
  });

  // Load more items
  const onMenuScrollToBottom = useCallback(() => {
    if (data && data.teams.items.length < data.teams.totalItems) {
      fetch({
        variables: {
          perPage: data.teams.items.length + 10,
          term,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const options = useMemo(() => {
    return data?.teams?.items ?? [];
  }, [data]);

  const onMenuOpen = useCallback(() => {
    fetch({
      variables: {
        term,
      },
    });
  }, [fetch, term]);
  return (
    <>
      <SelectInput
        options={options}
        multiple={multiple}
        value={value}
        onMenuOpen={onMenuOpen}
        disabled={disabled}
        onChange={onChange}
        required={required}
        onInputChange={setTerm}
        isLoading={loading}
        onMenuScrollToBottom={onMenuScrollToBottom}
        labelKey="name"
        valueKey="id"
        formatOptionLabel={(option) => option.name}
        placeholder={placeholder}
      />
    </>
  );
};

export default TeamPicker;
