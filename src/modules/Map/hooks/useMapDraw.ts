import { EditControlProps } from "react-leaflet-draw";
import { GeoJSONLayer, toGeoJSONSafe } from "../utils";
import { useMapService } from "../services";
import { LayerWithMeta } from "@/types/map";

export const useMapDraw = () => {
  const { onDeleteMapMark, onCreateMapMark, onUpdateMapMark, loading } =
    useMapService();

  const onEditPath: EditControlProps["onEdited"] = (e) => {
    e.layers.eachLayer((layer: GeoJSONLayer) => {
      const geo = toGeoJSONSafe(layer);
      let id = layer.options?.serverId;

      if (!id) id = crypto.randomUUID();

      if (geo) {
        onUpdateMapMark({ ...geo.geometry, id });
      }
    });
  };

  const onCreate: EditControlProps["onCreated"] = (e) => {
    const geo = toGeoJSONSafe(e.layer);

    const id = crypto.randomUUID();
    (e.layer as LayerWithMeta).options.serverId = id;

    if (geo) {
      onCreateMapMark({ ...geo.geometry, id });
    }
  };

  const onDelete: EditControlProps["onDeleted"] = (e) => {
    e.layers.eachLayer((layer: LayerWithMeta) => {
      if (layer.options?.serverId) onDeleteMapMark(layer.options.serverId);
    });
  };
  return {
    onEditPath,
    onCreate,
    onDelete,
    loading,
  };
};
