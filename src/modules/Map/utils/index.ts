import { LayerWithMeta, TMArkGeometry, TMarkJson } from "@/types/map";

export type GeoJSONLayer = LayerWithMeta & {
  toGeoJSON: () => GeoJSON.GeoJsonObject;
  _leaflet_id: number;
  getRadius?: () => Promise<number>;
};

/**
 * Safely converts a GeoJSON layer to a GeoJSON object.
 *
 * @param layer The GeoJSON layer to convert.
 * @returns The converted GeoJSON object or null if conversion fails.
 */
export const toGeoJSONSafe = (layer: GeoJSONLayer): TMarkJson | null => {
  try {
    return JSON.parse(JSON.stringify(layer.toGeoJSON()));
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Extracts properties and geometry from a GeoJSON layer for payload.
 *
 * @param layer {LayerWithMeta}
 * @returns An object containing geometry, properties, and a unique ID.
 */
export const getPropertiesToPayload = async (layer: GeoJSONLayer) => {
  const geo = toGeoJSONSafe(layer);
  const id = crypto.randomUUID();
  (layer as LayerWithMeta).options.serverId = id;
  const properties: TMArkGeometry["properties"] = {
    ...(geo?.properties ?? {}),
    serverId: id,
  };

  if ("getRadius" in layer && typeof layer.getRadius === "function") {
    properties.radius = (await layer.getRadius?.()) ?? 10;
  }

  return {
    geometry: geo?.geometry,
    properties,
    id,
  };
};

/**
 *
 * @param coord
 * @returns
 */
export const geoPointToLatLng = (coord: [number, number]): [number, number] => [
  coord[1],
  coord[0],
];

/**
 *
 * @param polygon
 * @returns
 */
export const geoPolygonToLatLngs = (
  polygon: [number, number][][],
): [number, number][][] => polygon.map((ring) => ring.map(geoPointToLatLng));
