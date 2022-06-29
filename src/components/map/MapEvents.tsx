import { LeafletEventHandlerFnMap } from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";

type MapEventsProps = LeafletEventHandlerFnMap;

const MapEvents = (props: MapEventsProps) => {
  const map = useMap();
  useMapEvents(props);
  return null;
};

export default MapEvents;
