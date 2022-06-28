import clsx from "clsx";
import { ReactNode } from "react";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

type Props = {
  children: ReactNode;
  className?: string;
  position?: "bottomleft" | "bottomright" | "topleft" | "topright";
};

const Legend = (props: Props) => {
  const { position = "bottomleft", children, className } = props;
  return (
    <div className={POSITION_CLASSES[position]}>
      <div
        className={clsx(
          "m-3 rounded-md bg-white bg-opacity-90 p-3 text-gray-700 shadow-md",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Legend;
