import { TMarkCoordinates, TMArkGeometry } from '@/types/map';
import { Circle, Polyline } from 'react-leaflet';
import { geoPointToLatLng, geoPolygonToLatLngs } from '../utils';

export const MarkComponent = ({ markData }: { markData: TMArkGeometry }) => {
  switch (markData.type) {
    case 'Point':
      return (
        <Circle
          center={geoPointToLatLng(markData.coordinates as TMarkCoordinates)}
          radius={markData.properties?.radius ?? 100}
        />
      );
    case 'Circle':
      return (
        <Circle
          center={geoPointToLatLng(
            markData.coordinates.center as TMarkCoordinates,
          )}
          radius={markData.properties?.radius ?? 10}
        />
      );

    case 'Polygon':
      return (
        <Polyline
          fillColor="green"
          fillOpacity={0.4}
          fill={true}
          fillRule="evenodd"
          lineCap="butt"
          stroke={false}
          smoothFactor={2}
          interactive={false}
          positions={geoPolygonToLatLngs(
            markData.coordinates as [number, number][][],
          )}
        />
      );

    default:
      return null;
  }
};
