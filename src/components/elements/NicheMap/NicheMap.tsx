import L, { LatLng, LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import './initLeaflet';
import './nicheMap.css';
import { Spot } from '@/features/spot/types';

type Props = {
  centerPosition?: LatLngLiteral;
  nicheSpots?: Spot[];
};

function ChangeMapCenter({ position }: { position: LatLngLiteral }) {
  const map = useMap();
  map.panTo(position);

  return null;
}

const NicheMap = ({
  centerPosition = { lat: 40.5122, lng: 141.4883 },
  nicheSpots,
}: Props) => {
  const position = new LatLng(centerPosition.lat, centerPosition.lng); // 初期値八戸市

  return (
    <MapContainer center={position} zoom={12}>
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>現在地</Popup>
      </Marker>
      {nicheSpots &&
        nicheSpots.map((spot, i) => (
          <Marker
            key={i}
            position={{ lat: spot.latitude, lng: spot.longitude }}
          >
            <Popup>
              <h3 className="!text-base font-bold">{spot.name}</h3>
              <p className="!my-0">{spot.address}</p>
            </Popup>
          </Marker>
        ))}
      <ChangeMapCenter position={centerPosition} />
    </MapContainer>
  );
};

export default NicheMap;
