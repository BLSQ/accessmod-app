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
      getFileDownloadUrl(supportedFile.id).then((url) => setUrl(url));
    } else {
      console.warn("No supported raster file");
    }
  }, [supportedFile]);

  return (
    <>
      <DynamicClientRasterMap url={url} zoom={4} />
    </>
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
