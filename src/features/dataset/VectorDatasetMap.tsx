import { gql } from "@apollo/client";
import { getVectorFileContent } from "libs/dataset";
import { VectorDatasetMap_DatasetFragment } from "libs/graphql";
import { useEffect, useMemo, useState } from "react";

type VectorDatasetMapProps = {
  dataset: VectorDatasetMap_DatasetFragment;
};

const VectorDatasetMap = ({ dataset }: VectorDatasetMapProps) => {
  const [isLoading, setLoading] = useState(true);
  const [geoJSON, setGeoJSON] = useState(null);

  const supportedFile = useMemo(
    () =>
      dataset.files.find((file) =>
        ["application/geo+json"].includes(file.mimeType)
      ),
    [dataset]
  );

  useEffect(() => {
    setLoading(true);
    if (supportedFile) {
      getVectorFileContent(supportedFile).then((data) => {
        setGeoJSON(data);
        console.log(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dataset, supportedFile]);
  return null;
};

VectorDatasetMap.fragments = {
  dataset: gql`
    fragment VectorDatasetMap_dataset on AccessmodFileset {
      id
      role {
        code
        format
      }
      files {
        id
        name
        mimeType
      }
    }
  `,
};

export default VectorDatasetMap;
