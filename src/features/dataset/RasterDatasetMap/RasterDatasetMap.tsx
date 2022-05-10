import { gql } from "@apollo/client";
import { getFileDownloadUrl } from "libs/dataset";
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
  const [loading, setLoading] = useState(false);
  const supportedFile = useMemo(
    () =>
      dataset.files.find((file) =>
        ["image/geotiff", "image/tiff", "image/geo+tiff"].includes(
          file.mimeType
        )
      ),
    [dataset]
  );

  useEffect(() => {
    if (supportedFile) {
      setLoading(true);
      getFileDownloadUrl(supportedFile.id).then(
        (url) => {
          setUrl(url);
          setLoading(false);
        },
        () => setLoading(false)
      );
    } else {
      console.warn("No supported raster file");
    }
  }, [supportedFile]);

  return (
    <div>
      {!supportedFile ? (
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

export default RasterDatasetMap;
