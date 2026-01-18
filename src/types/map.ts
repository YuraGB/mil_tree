import { MARK_TYPES } from "@/constants";
import { mapMarks } from "@/db/schemas/mapMarks";
import * as L from "leaflet";

export type TMArkTypes = (typeof MARK_TYPES)[number];

export type TMarkCoordinates = [number, number];

export type TMArkGeometry = {
  coordinates: TMarkCoordinates | TMarkCoordinates[];
  type: TMArkTypes;
  properties: {
    radius?: number;
    color?: string;
    serverId?: string;
  };
};

export type TMarkJson = {
  geometry: TMArkGeometry;
  type: "Feature";
  properties: object;
};

export type LayerWithMeta = L.Layer & {
  options: {
    serverId?: string;
  };
};

export type TDBMark = typeof mapMarks.$inferSelect;

export type TMark = Omit<TDBMark, "createdAt" | "updatedAt">;
