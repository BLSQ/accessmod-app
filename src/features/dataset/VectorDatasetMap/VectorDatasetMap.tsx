import { gql } from "@apollo/client";
import { getVectorFileContent } from "libs/dataset";
import { VectorDatasetMap_DatasetFragment } from "libs/graphql";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

type VectorDatasetMapProps = {
  dataset: VectorDatasetMap_DatasetFragment;
};

const DynamicClientVectorMap = dynamic(() => import("./ClientVectorMap"), {
  ssr: false,
});

const VectorDatasetMap = ({ dataset }: VectorDatasetMapProps) => {
  const [geoJSON, setGeoJSON] = useState(null);

  const supportedFile = useMemo(
    () =>
      dataset.files.find((file) =>
        ["application/geo+json"].includes(file.mimeType)
      ),
    [dataset]
  );

  useEffect(() => {
    if (supportedFile) {
      getVectorFileContent(supportedFile).then((data) => {
        setGeoJSON(data);
        console.log(data);
      });
    }
  }, [dataset, supportedFile]);

  return <DynamicClientVectorMap geoJSON={geoJSON} />;
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
