import chroma from "chroma-js";
import Legend from "components/map/Legend";
import { MapProps } from "components/map/Map";
import { PixelValuesToColorFn } from "georaster-layer-for-leaflet";
import { useCallback, useMemo } from "react";
import ClientRasterMap from "./ClientRasterMap";

type Props = MapProps & {
  url?: string;
  loading?: boolean;
  scale: string;
  nodata: number;
  values: number[];
  labels?: { [key: string]: string };
};

const ClientContinuousRasterMap = (props: Props) => {
  const { url, loading, scale, nodata, labels, ...delegated } = props;

  const uniqueValues = useMemo(() => {
    return props.values.filter((v) => v !== nodata);
  }, [props.values, nodata]);

  const colors = useMemo(() => {
    return chroma.scale(scale).colors(uniqueValues.length);
  }, [scale, uniqueValues]);

  const pixelValuesToColorFn: PixelValuesToColorFn = useCallback(
    (vals) => {
      const [value, ..._] = vals;
      if (value === nodata) {
        return "";
      }

      return colors[uniqueValues.indexOf(value)];
    },
    [colors, uniqueValues, nodata]
  );

  return (
    <ClientRasterMap
      url={url}
      loading={loading}
      pixelValuesToColorFn={pixelValuesToColorFn}
      {...delegated}
    >
      <Legend className="space-y-1">
        {uniqueValues.map((val) => (
          <div key={val} className="flex items-center gap-2">
            <div
              className="h-5 w-5 rounded-sm"
              style={{ background: colors[uniqueValues.indexOf(val)] }}
            ></div>
            <span className="text-xs">
              {labels?.[val] ? `${labels?.[val]} (${val})` : val}
            </span>
          </div>
        ))}
      </Legend>
    </ClientRasterMap>
  );
};

export default ClientContinuousRasterMap;
