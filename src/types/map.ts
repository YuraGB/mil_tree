import * as L from "leaflet";
export const MARK_TYPES = ["Point", "LineString", "Polygon"] as const;
export type TMArkTypes = (typeof MARK_TYPES)[number];

export type TMarkCoordinates = [number, number];

export type TMArkGeometry = {
  type: TMArkTypes;
  coordinates:
    | TMarkCoordinates
    | TMarkCoordinates[]
    | TMarkCoordinates[][]
    | TMarkCoordinates[][][];
};

export type TMarkJson = {
  geometry: TMArkGeometry;
  type: "Feature";
  properties?: {
    radius?: number;
  };
};

export type LayerWithMeta = L.Layer & {
  options: {
    serverId?: string;
  };
};

export type TMark = {
  id: string;
  geometry: TMArkGeometry;
  properties: TMarkJson["properties"];
};

export type TPolygonPosition =
  | TMarkCoordinates[]
  | TMarkCoordinates[][]
  | TMarkCoordinates[][][];
