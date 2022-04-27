import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";

export type MapProps = MapContainerProps;
const Map = (props: MapProps) => {
  const {
    children,
    center = [12.2395, -1.5584094],
    zoom = 7,
    ...delegated
  } = props;

  // const [georaster, setGeoraster] = useState<any>(null);
  // useEffect(() => {
  //   if (!georaster) {
  //     fetch("http://localhost:8003/population.tif")
  //       .then((response) => response.arrayBuffer())
  //       .then(function (arrayBuffer) {
  //         parseGeoraster(arrayBuffer, null, true).then(
  //           (georaster) => {
  //             console.log("georaster", georaster);
  //             setGeoraster(georaster);
  //           },
  //           (err) => console.error(err)
  //         );
  //       });
  //   }
  // }, []);

  // const pixelValuesToColorFn = useCallback(
  //   (pixelValues) => {
  //     try {
  //       const min = georaster.mins[0];
  //       const range = georaster.ranges[0];
  //       const scale = chroma.scale("Viridis");
  //       const [pixelValue, ..._] = pixelValues;
  //       if (pixelValue < 0) {
  //         return "";
  //       } else {
  //         // scale to 0 - 1 used by chroma
  //         var scaledPixelValue = (pixelValue - min) / range;

  //         return scale(scaledPixelValue).hex();
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       return "";
  //     }
  //   },
  //   [georaster]
  // );
  return (
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
  );
};

export default Map;
