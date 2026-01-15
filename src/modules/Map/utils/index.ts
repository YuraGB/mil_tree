import { LayerWithMeta, TMarkJson } from '@/types/map';

export type GeoJSONLayer = LayerWithMeta & {
  toGeoJSON: () => GeoJSON.GeoJsonObject;
  _leaflet_id: number;
};

export const toGeoJSONSafe = (layer: GeoJSONLayer): TMarkJson | null => {
  try {
    return JSON.parse(JSON.stringify(layer.toGeoJSON()));
  } catch (e) {
    console.log(e);
    return null;
  }
};
