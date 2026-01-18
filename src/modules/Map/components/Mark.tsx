import { TMark, TMarkCoordinates, TPolygonPosition } from "@/types/map";
import { Circle, Polygon, Polyline } from "react-leaflet";

export const MarkComponent = ({ markData }: { markData: TMark }) => {
  const { geometry, properties } = markData;
  if (!geometry.type) return null;

  switch (geometry.type) {
    case "Point":
      return (
        <Circle
          center={geometry.coordinates as TMarkCoordinates}
          {...properties}
        />
      );
    case "LineString":
      return (
        <Polyline
          positions={geometry.coordinates as TMarkCoordinates[]}
          {...properties}
        />
      );
    case "Polygon":
      return (
        <Polygon
          positions={geometry.coordinates as TPolygonPosition}
          {...properties}
        />
      );
    default:
      return null;
  }
};
