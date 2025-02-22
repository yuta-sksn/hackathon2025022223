import { LatLng, LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import './initLeaflet';
import './nicheMap.css';

type Props = {
  centerPosition?: LatLngLiteral;
};

function ChangeMapCenter({ position }: { position: LatLngLiteral }) {
  const map = useMap();
  map.panTo(position);

  return null;
}

const NicheMap = ({
  centerPosition = { lat: 40.5122, lng: 141.4883 },
}: Props) => {
  const position = new LatLng(centerPosition.lat, centerPosition.lng); // 初期値八戸市

  return (
    <MapContainer center={position} zoom={12}>
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          PopUp!! PopUp!! PopUp!! <br /> ポップアップ
        </Popup>
      </Marker>
      <ChangeMapCenter position={centerPosition} />
    </MapContainer>
  );
};

export default NicheMap;
