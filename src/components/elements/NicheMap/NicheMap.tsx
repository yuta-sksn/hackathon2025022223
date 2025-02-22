import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './initLeaflet';
import './nicheMap.css';

const NicheMap = () => {
  const position = new LatLng(40.5122, 141.4883); // 初期値八戸市

  return (
    <MapContainer center={position} zoom={12}>
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          PopUp!! PopUp!! PopUp!! <br /> ポップアップ
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default NicheMap;
