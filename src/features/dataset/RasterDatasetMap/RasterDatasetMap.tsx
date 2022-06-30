import { gql } from "@apollo/client";
import { getDatasetVisualizationUrl } from "libs/dataset";
import {
  AccessmodFilesetRoleCode,
  RasterDatasetMap_DatasetFragment,
} from "libs/graphql";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

type RasterDatasetMapProps = {
  dataset: RasterDatasetMap_DatasetFragment;
};

const DynamicClientContinuousRasterMap = dynamic(
  () => import("./ClientContinuousRasterMap"),
  {
    ssr: false,
  }
);
const DynamicClientDiscreteRasterMap = dynamic(
  () => import("./ClientDiscreteRasterMap"),
  {
    ssr: false,
  }
);

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

  const isContinuous = useMemo(() => {
    return [
      AccessmodFilesetRoleCode.Dem,
      AccessmodFilesetRoleCode.Population,
      AccessmodFilesetRoleCode.ZonalStatistics,
      AccessmodFilesetRoleCode.TravelTimes,
    ].includes(dataset.role.code);
  }, [dataset]);

  const isContinuousValid = useMemo(() => {
    return (
      "min" in dataset.metadata &&
      "max" in dataset.metadata &&
      "nodata" in dataset.metadata
    );
  }, [dataset]);

  const isDiscreteValid = useMemo(() => {
    return "unique_values" in dataset.metadata && "nodata" in dataset.metadata;
  }, [dataset]);

  return (
    <div>
      {!url && !loading && (
        <div className="w-full p-2 text-center text-sm italic text-gray-700">
          {t("The preview of this dataset is not yet ready")}
        </div>
      )}
      {url && isContinuous && isContinuousValid && (
        <DynamicClientContinuousRasterMap
          url={url}
          zoom={4}
          nodata={dataset.metadata.nodata}
          min={dataset.metadata.min}
          max={dataset.metadata.max}
          scale="RdPu"
        />
      )}
      {url && !isContinuous && isDiscreteValid && (
        <DynamicClientDiscreteRasterMap
          url={url}
          zoom={4}
          nodata={dataset.metadata.nodata}
          values={dataset.metadata.unique_values}
          labels={dataset.metadata.labels}
          scale="Paired"
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
      role {
        code
      }
    }
  `,
};

export default RasterDatasetMap;
