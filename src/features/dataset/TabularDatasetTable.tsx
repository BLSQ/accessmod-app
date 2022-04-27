import { gql } from "@apollo/client";
import DataGrid, { Column } from "components/DataGrid";
import SimpleSelect from "components/forms/SimpleSelect";
import Spinner from "components/Spinner";
import { getTabularFileContent } from "libs/dataset";
import { TabularDatasetTable_DatasetFragment } from "libs/graphql";
import { Unpacked } from "libs/types";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";

type TabularDatasetTableProps = {
  dataset: TabularDatasetTable_DatasetFragment;
};

type CurrentFile = Unpacked<TabularDatasetTable_DatasetFragment["files"]>;

const TabularDatasetTable = (props: TabularDatasetTableProps) => {
  const { dataset } = props;
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [currentFile, setCurrentFile] = useState<CurrentFile | null>();
  const tabularFiles = useMemo(
    () =>
      dataset.files.filter((file) =>
        ["application/csv", "text/csv"].includes(file.mimeType)
      ),
    [dataset]
  );

  useEffect(() => {
    if (tabularFiles.length > 0) {
      setCurrentFile(tabularFiles[0]);
    }
  }, [tabularFiles]);

  useEffect(() => {
    if (!currentFile) return;
    setLoading(true);
    getTabularFileContent(currentFile)?.then((content) => {
      setData(content);
      setLoading(false);
    });
  }, [currentFile]);

  const columns = useMemo<Column[]>(() => {
    if (data?.length > 0) {
      return Object.keys(data[0]).map((key) => ({
        accessor: key,
        Header: key,
      }));
    } else {
      return [];
    }
  }, [data]);

  const pageSizeOptions = useMemo(() => [10, 25, 50], []);

  return (
    <div>
      <h3 className="mb-4 flex items-center justify-between">{t("Content")}</h3>
      {tabularFiles?.length > 1 && (
        <SimpleSelect
          required
          value={currentFile?.id ?? ""}
          onChange={(event) =>
            setCurrentFile(
              tabularFiles.find((f) => f.id === event.target.value)
            )
          }
        >
          {tabularFiles.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </SimpleSelect>
      )}
      {!isLoading && data?.length && (
        <DataGrid
          data={data}
          columns={columns}
          pageSizeOptions={pageSizeOptions}
          totalItems={data?.length ?? 0}
          sortable
        />
      )}
      {isLoading && (
        <div className="mt-4 flex w-full items-center justify-center">
          <Spinner size="md" />
        </div>
      )}
    </div>
  );
};

TabularDatasetTable.fragments = {
  dataset: gql`
    fragment TabularDatasetTable_dataset on AccessmodFileset {
      role {
        format
        code
      }
      files {
        name
        mimeType
        id
      }
    }
  `,
};

export default TabularDatasetTable;
