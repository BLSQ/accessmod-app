import { gql } from "@apollo/client";
import Button from "components/Button";
import Spinner from "components/Spinner";
import TabularDatasetTable from "features/dataset/TabularDatasetTable";
import { useTabularDatasetEditorLazyQuery } from "libs/graphql";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

type TabularDatasetEditorProps = {
  dataset: { id: string };
  onChange: (dataset: any) => void;
};

const QUERY = gql`
  query TabularDatasetEditor($id: String!) {
    dataset: accessmodFileset(id: $id) {
      ...TabularDatasetTable_dataset
      id
      role {
        id
        code
        format
      }
      status
      files {
        id
        name
        mimeType
      }
    }
  }
  ${TabularDatasetTable.fragments.dataset}
`;

const TabularDatasetEditor = (props: TabularDatasetEditorProps) => {
  const { dataset, onChange } = props;
  const [fetch, { data, loading }] = useTabularDatasetEditorLazyQuery();
  const { t } = useTranslation();
  useEffect(() => {
    fetch({
      variables: { id: dataset.id },
    });
  }, [dataset, fetch]);

  if (!data?.dataset || loading) {
    return <Spinner />;
  }
  return (
    <div className={"rounded-md bg-white"}>
      <div className="flex justify-end p-3 pb-0">
        <Button variant="secondary" size="sm">
          {t("Edit dataset")}
        </Button>
      </div>
      <div className="mt-2">
        <TabularDatasetTable
          pageSize={5}
          dataset={data.dataset}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

TabularDatasetEditor.fragments = {
  dataset: gql`
    fragment TabularDatasetEditor_dataset on AccessmodFileset {
      id
    }
  `,
};

export default TabularDatasetEditor;
