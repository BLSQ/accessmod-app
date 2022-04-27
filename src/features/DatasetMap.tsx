import { gql } from "@apollo/client";
import Map from "components/map/Map";
import { AccessmodFile, AccessmodFileset } from "libs/graphql";

type DatasetFile = Pick<AccessmodFile, "id" | "mimeType" | "name">;

type Dataset = Pick<AccessmodFileset, "id"> & {
  files: DatasetFile[];
};

type Props = {
  dataset: Dataset;
};

const DatasetMap = (props: Props) => {
  const { dataset } = props;
  console.log(dataset);
  return <Map bounceAtZoomLimits></Map>;
};

export default DatasetMap;
