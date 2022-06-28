import { gql } from "@apollo/client";
import { getDatasetVisualizationUrl } from "libs/dataset";
import { RasterDatasetMap_DatasetFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type RasterDatasetMapProps = {
  dataset: RasterDatasetMap_DatasetFragment;
};

const DynamicClientRasterMap = dynamic(() => import("./ClientRasterMap"), {
  ssr: false,
});

const RasterDatasetMap = ({ dataset }: RasterDatasetMapProps) => {
  const [url, setUrl] = useState<string>();
  const { t } = useTranslation();
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
      {!url && !loading && (
        <div className="w-full p-2 text-center text-sm italic text-gray-700">
          {t("The preview of this dataset is not yet ready")}
        </div>
      )}
      {url && (
        <DynamicClientRasterMap
          url={url}
          zoom={4}
          nodata={dataset.metadata.nodata}
          values={dataset.metadata.unique_values}
          scale="YlOrBr"
        />
      )}
    </div>
  );
};

RasterDatasetMap.fragments = {
  dataset: gql`
    fragment RasterDatasetMap_dataset on AccessmodFileset {
      id
      metadata
    }
  `,
};

export default RasterDatasetMap;
