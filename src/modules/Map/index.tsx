import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useMapDraw } from "./hooks/useMapDraw";
import { MAP_ATTR_URL, MAP_MAP_ATTR_URL } from "@/constants";
import { MarkComponent } from "./components/Mark";

const MapComponent = () => {
  const { onCreate, onDelete, onEditPath, initialMarks } = useMapDraw();
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer attribution={MAP_MAP_ATTR_URL} url={MAP_ATTR_URL} />

      <FeatureGroup>
        <EditControl
          position='topright'
          onEdited={onEditPath}
          onCreated={onCreate}
          onDeleted={onDelete}
          draw={{
            rectangle: false,
          }}
        />
        {initialMarks.map((mark) => (
          <MarkComponent key={mark.id} markData={mark} />
        ))}
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapComponent;
