export const MARK_TYPES = ['Point', 'LineString', 'Polygon'] as const;
export type TMArkTypes = (typeof MARK_TYPES)[number];

export type TMarkCoordinates = [number, number];

export type TMArkGeometry = {
  type: TMArkTypes;
  coordinates: TMarkCoordinates | TMarkCoordinates[];
};

export type TMarkJson = {
  geometry: TMArkGeometry;
  type: 'Feature';
  properties: object;
};

export type LayerWithMeta = L.Layer & {
  options: {
    serverId?: string;
  };
};
