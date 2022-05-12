import chroma from "chroma-js";
import GeoRasterLayer from "components/map/GeoRasterLayer";
import Map, { MapProps } from "components/map/Map";

type Props = {
  url?: string;
  loading?: boolean;
} & MapProps;

const ClientRasterMap = (props: Props) => {
  const { url, loading, ...delegated } = props;
  return (
    <Map loading={loading} {...delegated}>
      {url && (
        <GeoRasterLayer
          path={url}
          colors={chroma.brewer.BuGn}
          opacity={0.7}
          resolution={64}
        />
      )}
    </Map>
  );
};

export default ClientRasterMap;
