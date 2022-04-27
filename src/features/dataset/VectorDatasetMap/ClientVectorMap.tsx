import BigGeoJsonLayer from "components/map/BigGeoJsonLayer";
import Map, { MapProps } from "components/map/Map";

type Props = {
  geoJSON?: any;
} & MapProps;

const ClientVectorMap = (props: Props) => {
  const { geoJSON, ...delegated } = props;

  return (
    <Map loading={!geoJSON} {...delegated}>
      {geoJSON && <BigGeoJsonLayer data={geoJSON} />}
    </Map>
  );
};

export default ClientVectorMap;
