import Map, { MapProps } from "components/map/Map";
import { CRS } from "leaflet";

type Props = {
  geoJSON?: any;
} & MapProps;

const ClientVectorMap = (props: Props) => {
  const { geoJSON, ...delegated } = props;

  return <Map {...delegated} crs={CRS.EPSG3857}></Map>;
};

export default ClientVectorMap;
