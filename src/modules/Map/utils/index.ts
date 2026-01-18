import { LayerWithMeta, TMarkJson } from "@/types/map";
import L from "leaflet";

export type GeoJSONLayer = LayerWithMeta & {
  toGeoJSON: () => GeoJSON.GeoJsonObject;
  _leaflet_id: number;
  properties?: {
    radius?: number;
  };
};

export const toGeoJSONSafe = (layer: GeoJSONLayer): TMarkJson | null => {
  try {
    const geo = layer.toGeoJSON() as TMarkJson;

    // якщо це коло — додаємо radius
    if (layer instanceof L.Circle) {
      geo.properties = {
        ...(geo.properties || {}),
        radius: layer.getRadius(),
      };
    }

    return JSON.parse(JSON.stringify(geo));
  } catch (e) {
    console.log(e);
    return null;
  }
};
