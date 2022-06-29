import type { LeafletContextInterface } from "@react-leaflet/core";
import { createPathComponent } from "@react-leaflet/core";
import parseGeoraster from "georaster";
import type {
  GeoRaster,
  GeoRasterLayerOptions,
} from "georaster-layer-for-leaflet";
import GeoRasterLayerForLeaflet from "georaster-layer-for-leaflet";
import * as React from "react";

const GeoRasterComponent = createPathComponent(
  (options: GeoRasterLayerOptions, context: LeafletContextInterface) => ({
    instance: new GeoRasterLayerForLeaflet(options),
    context,
  })
);

const useGeoraster = (path: string) => {
  const [georaster, setGeoraster] = React.useState<GeoRaster>();

  React.useEffect(() => {
    parseGeoraster(path, undefined, false)
      .then((res: GeoRaster) => {
        setGeoraster(res);
      })
      .catch((err) => {
        console.error("Error loading a Georaster in GeoRasterLayer.tsx", err);
      });
  }, [path]);

  return georaster;
};

type Props = {
  path: string;
} & Omit<GeoRasterLayerOptions, "georaster" | "georasters">;

function GeoRasterLayer({
  path,
  ...options
}: Props): React.ReactElement | null {
  const georaster = useGeoraster(path);

  return georaster ? (
    <GeoRasterComponent {...options} georaster={georaster} />
  ) : null;
}

export default GeoRasterLayer;
