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
            label={t("Category column")}
            type="text"
            help={t(
              "The exact name of the column in the file that contains the road category"
            )}
            onChange={(e) => setValues({ category_column: e.target.value })}
            required
          />
        </>
      )}
    </>
  );
};

export default DatasetMetadataForm;
