import GeoRasterLayer from "components/map/GeoRasterLayer";
import Map, { MapProps } from "components/map/Map";
import { PixelValuesToColorFn } from "georaster-layer-for-leaflet";
import { FeatureGroup as LeafletFeatureGroup } from "leaflet";
import { ReactNode, useCallback, useRef } from "react";
import { FeatureGroup } from "react-leaflet";

type Props = MapProps & {
  url?: string;
  loading?: boolean;
  children?: ReactNode;
  pixelValuesToColorFn: PixelValuesToColorFn;
};

const ClientRasterMap = (props: Props) => {
  const { url, loading, pixelValuesToColorFn, children, ...delegated } = props;
  const featureGroupRef = useRef<LeafletFeatureGroup>(null);

  const onLayerAdd = useCallback(
    ({ layer }: { layer: any }) => {
      if (featureGroupRef.current) {
        layer._map.fitBounds(featureGroupRef.current.getBounds());
      }
    },
    [featureGroupRef]
  );

  return (
    <Map loading={loading} {...delegated}>
      {url && (
        <FeatureGroup
          ref={featureGroupRef}
          eventHandlers={{ layeradd: onLayerAdd }}
        >
          <GeoRasterLayer
            path={url}
            pixelValuesToColorFn={pixelValuesToColorFn}
            opacity={0.85}
            resolution={512}
          />
          {children}
        </FeatureGroup>
      )}
    </Map>
  );
};

export default ClientRasterMap;
