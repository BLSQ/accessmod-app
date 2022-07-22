import { gql } from "@apollo/client";
import {
  AccessmodFilesetFormat,
  DatasetViewer_DatasetFragment,
  DatasetViewer_ProjectFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import RasterDatasetMap from "./RasterDatasetMap";
import TabularDatasetTable from "./TabularDatasetTable";
import VectorDatasetMap from "./VectorDatasetMap";
import DownloadDatasetButton from "features/dataset/DownloadDatasetButton";
import { InformationCircleIcon } from "@heroicons/react/outline";

type DatasetViewerProps = {
  dataset: DatasetViewer_DatasetFragment;
  project: DatasetViewer_ProjectFragment;
};

const DatasetViewer = (props: DatasetViewerProps) => {
  const { dataset } = props;
  const { t } = useTranslation();
  if (dataset.role.format === AccessmodFilesetFormat.Tabular) {
    return <TabularDatasetTable dataset={dataset} />;
  } else if (dataset.role.format === AccessmodFilesetFormat.Vector) {
    return (
      <div className="relative w-full">
        <VectorDatasetMap dataset={dataset} />
      </div>
    );
  } else if (dataset.role.format === AccessmodFilesetFormat.Raster) {
    return (
      <div className="relative flex w-full items-center justify-between gap-x-2 text-gray-600">
        <InformationCircleIcon className="text-picton-yellow h-10 w-10" />
        <div className="flex flex-col gap-y-1">
          <p>
            {t(
              "Due to a technical issue, we are unable to display a preview of raster files for now."
            )}
          </p>
          <p>
            {t(
              "The technical team is working on the issue. In the meantime, you can download the file and open it in another tool."
            )}
          </p>
        </div>
        <DownloadDatasetButton variant="primary" dataset={dataset} />
      </div>
    );
  }
  return (
    <div className="w-full px-4 py-6 text-center italic text-gray-600">
      {t("This dataset cannot be opened in the browser. Please download it.")}
    </div>
  );
};

DatasetViewer.fragments = {
  project: gql`
    fragment DatasetViewer_project on AccessmodProject {
      id
    }
  `,
  dataset: gql`
    fragment DatasetViewer_dataset on AccessmodFileset {
      id
      role {
        id
        code
        name
        format
      }
      ...TabularDatasetTable_dataset
      ...VectorDatasetMap_dataset
      ...RasterDatasetMap_dataset
      ...DownloadDatasetButton_dataset
    }
    ${TabularDatasetTable.fragments.dataset}
    ${VectorDatasetMap.fragments.dataset}
    ${RasterDatasetMap.fragments.dataset}
    ${DownloadDatasetButton.fragments.dataset}
  `,
};

export default DatasetViewer;
