import { EditControlProps } from 'react-leaflet-draw';
import { GeoJSONLayer, getPropertiesToPayload } from '../utils';
import { useMapService } from '../services';
import { LayerWithMeta } from '@/types/map';
import { useMemo } from 'react';

export const useMapDraw = () => {
  const {
    onDeleteMapMark,
    onCreateMapMark,
    onUpdateMapMark,
    loading,
    mapData,
  } = useMapService();

  // Handle edit path
  const onEditPath: EditControlProps['onEdited'] = (e) => {
    e.layers.eachLayer(async (layer: GeoJSONLayer) => {
      const { geometry, properties, id } = await getPropertiesToPayload(
        layer as GeoJSONLayer,
      );

      if (geometry) {
        onUpdateMapMark({ ...geometry, properties, id });
      }
    });
  };

  // Handle create
  const onCreate: EditControlProps['onCreated'] = async (e) => {
    const { geometry, properties, id } = await getPropertiesToPayload(
      e.layer as GeoJSONLayer,
    );

    if (geometry) {
      onCreateMapMark({ ...geometry, properties, id });
    }
  };

  // Handle delete
  const onDelete: EditControlProps['onDeleted'] = (e) => {
    e.layers.eachLayer((layer: LayerWithMeta) => {
      if (layer.options?.serverId) onDeleteMapMark(layer.options.serverId);
    });
  };

  const initialMarks = useMemo(() => {
    return mapData?.data?.filter((m) => !!m) ?? [];
  }, [mapData]);

  return {
    onEditPath,
    onCreate,
    onDelete,
    loading,
    initialMarks,
  };
};
