import clsx from "clsx";
import Spinner from "components/Spinner";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "next-i18next";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";

export type MapProps = {
  loading?: boolean;
  height?: number;
} & MapContainerProps;
const Map = (props: MapProps) => {
  const {
    children,
    center = [12.2395, -1.5584094],
    zoom = 7,
    height = 600,
    loading,
    className,
    ...delegated
  } = props;
  const { t } = useTranslation();

  return (
    <div className={clsx(className, "relative w-full", `h-[${height}px]`)}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: "100%", height: "100%" }}
        {...delegated}
      >
        <TileLayer
          detectRetina
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
      {loading && (
        <div className="absolute right-2 top-2 z-[1000] flex items-center rounded-md bg-white px-3 py-2 text-gray-600 shadow">
          <Spinner size="sm" className="mr-2 inline" />
          {t("Loading...")}
        </div>
      )}
    </div>
  );
};

export default Map;
