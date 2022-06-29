import chroma, { Scale } from "chroma-js";
import clsx from "clsx";
import Legend from "components/map/Legend";
import { MapProps } from "components/map/Map";
import { PixelValuesToColorFn } from "georaster-layer-for-leaflet";
import { useCallback, useMemo } from "react";
import ClientRasterMap from "./ClientRasterMap";

type Props = MapProps & {
  url?: string;
  scale: string;
  loading?: boolean;
  min: number;
  nodata: number;
  max: number;
};

const ClientContinuousRasterMap = (props: Props) => {
  const { url, loading, scale, nodata, min, max, ...delegated } = props;

  const brewer: Scale = useMemo(
    () => chroma.scale(scale).domain([min, max]),
    [scale, min, max]
  );

  const pixelValuesToColorFn: PixelValuesToColorFn = useCallback(
    (vals) => {
      const [value, ..._] = vals;
      if (value === nodata) return "";

      return brewer(value).hex();
    },
    [brewer, nodata]
  );

  const legendColors = useMemo(() => {
    return brewer.colors(3, "hex");
  }, [brewer]);

  return (
    <ClientRasterMap
      url={url}
      loading={loading}
      pixelValuesToColorFn={pixelValuesToColorFn}
      {...delegated}
    >
      <Legend>
        <div className="flex h-32 gap-2">
          <span
            style={{
              background: `linear-gradient(180deg, ${legendColors[0]} 0%, ${legendColors[1]} 50%, ${legendColors[2]} 100%)`,
            }}
            className={clsx("opacity-85 h-full w-4 rounded-md")}
          ></span>
          <div className="items-left flex flex-col justify-between py-0.5 text-xs">
            <span>{min}</span>
            <span>{Math.round((max + min) / 2)}</span>
            <span>{max}</span>
          </div>
        </div>
      </Legend>
    </ClientRasterMap>
  );
};

export default ClientContinuousRasterMap;
