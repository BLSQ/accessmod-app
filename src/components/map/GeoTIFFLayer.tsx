import { useLeafletContext } from "@react-leaflet/core";
import * as L from "leaflet";
import "leaflet-geotiff-2";
import "leaflet-geotiff-2/dist/leaflet-geotiff-plotty";
import { useEffect } from "react";

type Props = {
  url: string;
};

const GeoTIFFLayer = (props: Props) => {
  const { url } = props;
  const context = useLeafletContext();
  console.log("geotifflayer");
  useEffect(() => {
    const container = context.layerContainer || context.map;
    const renderer = L.LeafletGeotiff.plotty({});
    const layer = L.leafletGeotiff(url, {
      renderer,
    });
    container.addLayer(layer);
    return () => {
      container.removeLayer(layer);
    };
  }, [url, context]);

  return null;
};

export default GeoTIFFLayer;
