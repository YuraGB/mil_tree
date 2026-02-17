import { TMark, TMarkCoordinates } from '@/types/map';
import { Circle, Polyline } from 'react-leaflet';
import { geoPointToLatLng, geoPolygonToLatLngs } from '../utils';

export const MarkComponent = ({ markData }: { markData: TMark }) => {
  const coordinats =
    'coordinates' in markData
      ? (markData.coordinates as TMarkCoordinates)
      : ([0, 0] as TMarkCoordinates);

  const radius =
    markData && (markData.properties as { radius?: number })?.radius
      ? (markData.properties as { radius?: number }).radius
      : 10;

  switch (markData.type) {
    case 'Point':
      return <Circle center={geoPointToLatLng(coordinats)} radius={radius} />;
    case 'Circle':
      return <Circle center={geoPointToLatLng(coordinats)} radius={radius} />;

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
