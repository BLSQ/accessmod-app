import { gql } from "@apollo/client";
import DataGrid, { Column, DATA_GRID_DEFAULT_THEME } from "components/DataGrid";
import Spinner from "components/Spinner";
import { getTabularFileContent } from "libs/dataset";
import { TabularDatasetTable_DatasetFragment } from "libs/graphql";
import { useEffect, useMemo, useState } from "react";

type TabularDatasetTableProps = {
  dataset: TabularDatasetTable_DatasetFragment;
  onChange?: (dataset: any) => void;
  pageSize?: number;
};

const GRID_THEME = {
  ...DATA_GRID_DEFAULT_THEME,
  tbody: "divide-y divide-gray-200",
};

const TabularDatasetTable = (props: TabularDatasetTableProps) => {
  const { dataset, pageSize = 10 } = props;
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const currentFile = useMemo(() => {
    const files = dataset.files.filter((file) =>
      ["application/csv", "text/csv"].includes(file.mimeType)
    );
    return files?.length > 0 ? files[0] : null;
  }, [dataset]);

  useEffect(() => {
    if (!currentFile) return;
    setLoading(true);
    getTabularFileContent(currentFile)?.then((content) => {
      setData(content);
      setLoading(false);
    });
  }, [currentFile]);

  const columns = useMemo<Column<any>[]>(() => {
    if (data?.length > 0) {
      return Object.keys(data[0]).map((key) => ({
        accessor: (cell) => cell[key],
        Header: key,
      }));
    } else {
      return [];
    }
  }, [data]);

  const pageSizeOptions = useMemo(() => [5, 10, 25, 50], []);

  return (
    <div>
      {!isLoading && data?.length > 0 && (
        <DataGrid
          data={data}
          columns={columns}
          pageSizeOptions={pageSizeOptions}
          defaultPageSize={pageSize}
          totalItems={data?.length ?? 0}
          theme={GRID_THEME}
          sortable
          wide
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
