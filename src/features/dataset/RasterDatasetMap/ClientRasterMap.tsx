import chroma from "chroma-js";
import GeoRasterLayer from "components/map/GeoRasterLayer";
import Legend from "components/map/Legend";
import Map, { MapProps } from "components/map/Map";
import { PixelValuesToColorFn } from "georaster-layer-for-leaflet";
import { useCallback, useMemo } from "react";

type Props = {
  url?: string;
  scale: string;
  values: number[];
  nodata: number | string;
  loading?: boolean;
} & MapProps;

const ClientRasterMap = (props: Props) => {
  const { url, loading, scale, nodata, values, ...delegated } = props;

  const uniqueValues = useMemo(() => {
    return values.filter((v) => v !== nodata);
  }, [values, nodata]);

  const colors = useMemo(() => {
    return chroma.scale(scale).colors(uniqueValues.length);
  }, [scale, uniqueValues]);

  const pixelValuesToColorFn: PixelValuesToColorFn = useCallback(
    (vals) => {
      const [value, ..._] = vals;
      if (value === nodata) return "";

      return colors[uniqueValues.indexOf(value)];
    },
    [colors, uniqueValues, nodata]
  );

  return (
    <Map loading={loading} {...delegated}>
      {url && (
        <>
          <GeoRasterLayer
            path={url}
            pixelValuesToColorFn={pixelValuesToColorFn}
            opacity={0.7}
            resolution={64}
          />
          <Legend>
            <div className="space-y-1">
              {uniqueValues.map((val) => (
                <div key={val} className="flex items-center gap-2">
                  <div
                    className="h-5 w-5 rounded-sm"
                    style={{ background: colors[uniqueValues.indexOf(val)] }}
                  ></div>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </Legend>
        </>
      )}
    </Map>
  );
};

export default ClientRasterMap;
