import { gql } from "@apollo/client";
import Block from "components/Block";
import {
  AccessmodFilesetFormat,
  DatasetViewer_DatasetFragment,
  DatasetViewer_ProjectFragment,
} from "libs/graphql";
import TabularDatasetTable from "./TabularDatasetTable";
import VectorDatasetMap from "./VectorDatasetMap";
import RasterDatasetMap from "./RasterDatasetMap";
import { useTranslation } from "next-i18next";

type DatasetViewerProps = {
  dataset: DatasetViewer_DatasetFragment;
  project: DatasetViewer_ProjectFragment;
};

const DatasetViewer = (props: DatasetViewerProps) => {
  const { dataset, project } = props;
  const { t } = useTranslation();
  if (dataset.role.format === AccessmodFilesetFormat.Tabular) {
    return <TabularDatasetTable dataset={dataset} />;
  } else if (dataset.role.format === AccessmodFilesetFormat.Vector) {
    return (
      <div className="relative h-[600px] w-full">
        <VectorDatasetMap dataset={dataset} />
      </div>
    );
  } else if (dataset.role.format === AccessmodFilesetFormat.Raster) {
    return (
      <div className="relative h-[600px] w-full">
        <RasterDatasetMap dataset={dataset} />
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
    }
    ${TabularDatasetTable.fragments.dataset}
    ${VectorDatasetMap.fragments.dataset}
    ${RasterDatasetMap.fragments.dataset}
  `,
};

export default DatasetViewer;