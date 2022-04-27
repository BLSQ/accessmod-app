import Map, { MapProps } from "components/map/Map";
import { CRS, GeoJSONOptions } from "leaflet";
import { useCallback, useMemo } from "react";
import L from "leaflet";
import { GeoJSON } from "react-leaflet";

type Props = {
  geoJSON?: any;
} & MapProps;

function coordsToLatLng(coords: any) {
  //                    latitude , longitude, altitude
  //return new L.LatLng(coords[1], coords[0], coords[2]); //Normal behavior
  console.log(new L.LatLng(coords[0], coords[1]));
  // return new L.LatLng(coords[0] / 10000, coords[1] / 10000);
  return new L.LatLng(coords[0], coords[1]);
}

const ClientVectorMap = (props: Props) => {
  const { geoJSON, ...delegated } = props;

  const filter: GeoJSONOptions["filter"] = (feat) => {
    return feat.properties.fid < 2200;
  };
  return (
    <Map {...delegated} crs={CRS.EPSG3857}>
      {geoJSON && <GeoJSON data={geoJSON} filter={filter} />}
    </Map>
  );
};

export default ClientVectorMap;
