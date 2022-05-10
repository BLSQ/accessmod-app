import BigGeoJsonLayer from "components/map/BigGeoJsonLayer";
import Map, { MapProps } from "components/map/Map";

type Props = {
  geoJSON?: any;
  loading?: boolean;
  height?: number;
} & MapProps;

const ClientVectorMap = (props: Props) => {
  const { geoJSON, height, loading = false, ...delegated } = props;

  return (
    <Map height={height} loading={loading} {...delegated}>
      {geoJSON && <BigGeoJsonLayer data={geoJSON} />}
    </Map>
  );
};

export default ClientVectorMap;
