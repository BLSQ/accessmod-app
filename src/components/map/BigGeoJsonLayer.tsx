import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import "libs/map/BigGeoJSON";
import { useEffect } from "react";
import { GeoJSONProps } from "react-leaflet";

type BigGeoJsonLayerProps = {
  data: GeoJSONProps["data"];
  style?: object | Function;
};

const BigGeoJsonLayer = (props: BigGeoJsonLayerProps) => {
  const context = useLeafletContext();
  const { data, style } = props;
  useEffect(() => {
    const container = context.layerContainer || context.map;
    const layer = L.bigGeoJson(data, {
      maxZoom: 16,
      tolerance: 3,
      debug: 0,
      style: style,
    });
    container.addLayer(layer);
    return () => {
      container.removeLayer(layer);
    };
  }, [data, context, style]);

  return null;
};

export default BigGeoJsonLayer;
