import {
  createTileLayerComponent,
  LeafletContextInterface,
} from "@react-leaflet/core";
import { GridLayer as LeafletGridLayer } from "leaflet";
import _GeoRasterLayer, {
  GeoRasterLayerOptions,
} from "georaster-layer-for-leaflet";

function createGeoRasterLayer(
  props: GeoRasterLayerOptions,
  context: LeafletContextInterface
) {
  console.log("Props", props);
  return {
    instance: new _GeoRasterLayer(props),
    context,
  };
}

const GeoRasterLayer = createTileLayerComponent<
  LeafletGridLayer,
  GeoRasterLayerOptions
>(createGeoRasterLayer);

export default GeoRasterLayer;
