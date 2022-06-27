import { gql } from "@apollo/client";
import { getDatasetVisualizationUrl, getFileDownloadUrl } from "libs/dataset";
import { RasterDatasetMap_DatasetFragment } from "libs/graphql";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

type RasterDatasetMapProps = {
  dataset: RasterDatasetMap_DatasetFragment;
};

const DynamicClientRasterMap = dynamic(() => import("./ClientRasterMap"), {
  ssr: false,
});

const RasterDatasetMap = ({ dataset }: RasterDatasetMapProps) => {
  const [url, setUrl] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDatasetVisualizationUrl(dataset.id).then(async (url) => {
      setLoading(false);
      if (url) {
        setUrl(url);
      }
    });
  }, [dataset]);

  return (
    <div>
      {!url && !loading ? (
        <div className="w-full p-2 text-center text-sm italic text-gray-700">
          We do not support this type of dataset. Only tiff files are supported.
        </div>
      ) : (
        <DynamicClientRasterMap loading={loading} url={url} zoom={4} />
      )}
    </div>
  );
};

RasterDatasetMap.fragments = {
  dataset: gql`
    fragment RasterDatasetMap_dataset on AccessmodFileset {
      id
    }
  `,
};

export default RasterDatasetMap;
