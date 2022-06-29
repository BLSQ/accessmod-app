import { gql } from "@apollo/client";
import { getDatasetVisualizationUrl } from "libs/dataset";
import { VectorDatasetMap_DatasetFragment } from "libs/graphql";
import { useTranslation } from "next-i18next";
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
  const [isReady, setReady] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getDatasetVisualizationUrl(dataset.id).then(async (url) => {
      setReady(true);
      if (!url) {
        return;
      }
      try {
        setLoading(true);
        setGeoJSON(await fetch(url).then((resp) => resp.json()));
      } finally {
        setLoading(false);
      }
    });
  }, [dataset]);

  return (
    <div>
      {isReady && !loading && !geoJSON && (
        <div className="w-full p-2 text-center text-sm italic text-gray-700">
          {t("The preview of this dataset is not yet ready")}
        </div>
      )}
      {(loading || geoJSON) && (
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
    }
  `,
};

export default VectorDatasetMap;
