import Field from "components/forms/Field";
import usePrevious from "hooks/usePrevious";
import { AccessmodFilesetRoleCode, Scalars } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

type DatasetMetadataFormProps = {
  roleCode: AccessmodFilesetRoleCode;
  files?: File[];
  onChange: (values: Scalars["AccessmodFilesetMetadata"]) => void;
  metadata: Scalars["AccessmodFilesetMetadata"] | null;
};

const DatasetMetadataForm = (props: DatasetMetadataFormProps) => {
  const { roleCode, files, onChange } = props;
  const { t } = useTranslation();
  const [values, setValues] = useState<Scalars["AccessmodFilesetMetadata"]>(
    props.metadata ?? {}
  );
  const prevValues = usePrevious(values);

  useEffect(() => {
    if (prevValues !== values) {
      onChange(values);
    }
  }, [prevValues, values, onChange]);
  return (
    <>
      {roleCode === AccessmodFilesetRoleCode.TransportNetwork && (
        <>
          <Field
            name="category_column"
            list="categories"
            label={t("Category column")}
            type="text"
            onChange={(e) => setValues({ category_column: e.target.value })}
            required
          />
          <datalist id="categories">
            <option value="highway" />
            <option value="category_column" />
          </datalist>
        </>
      )}
    </>
  );
};

export default DatasetMetadataForm;
