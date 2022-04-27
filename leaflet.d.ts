import * as L from "leaflet";

interface BigGeoJSONOptions extends GeoJSONOptions {
  maxZoom?: number; // max zoom to preserve detail on
  indexMaxZoom?: number; // max zoom in the tile index
  indexMaxPoints?: number; // max number of points per tile in the tile index
  tolerance?: number; // simplification tolerance (higher means simpler)
  extent?: number; // tile extent
  buffer?: number; // tile buffer on each side
  lineMetrics?: boolean; // whether to calculate line metrics
  promoteId?: string | null; // name of a feature property to be promoted to feature.id
  generateId?: boolean; // whether to generate feature ids. Cannot be used with promoteId
  debug?: number;
}

declare module "leaflet" {
  export function bigGeoJson(
    geojson: GeoJsonObject,
    options: BigGeoJSONOptions
  );
  export function leafletGeotiff(url: string, options: any);

  declare namespace LeafletGeotiff {
    export function plotty(options: any);
  }
}
