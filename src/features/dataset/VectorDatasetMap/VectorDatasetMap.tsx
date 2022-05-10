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
  const [loading, setLoading] = useState(false);

  const supportedFile = useMemo(
    () =>
      dataset.files.find((file) =>
        ["application/geo+json"].includes(file.mimeType)
      ),
    [dataset]
  );

  useEffect(() => {
    if (supportedFile) {
      setLoading(true);
      getVectorFileContent(supportedFile).then(
        (data) => {
          setGeoJSON(data);
          setLoading(false);
        },
        () => setLoading(false)
      );
    }
  }, [dataset, supportedFile]);

  return (
    <div>
      {!supportedFile ? (
        <div className="w-full p-2 text-center text-sm italic text-gray-700">
          We do not support this type of dataset. Only geojson files are
          supported.
        </div>
      ) : (
        <DynamicClientVectorMap
          height={600}
          loading={loading}
          geoJSON={geoJSON}
          zoom={4}
        />
      )}
    </div>
  );
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
