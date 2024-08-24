import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import trainIcon from '../assets/train-location.png'; 

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: trainIcon,
  iconUrl: trainIcon,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ trains }) => {
  const position = [7.8731, 80.7718];

  return (
    <MapContainer center={position} zoom={7} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {trains.map((train, index) => (
        <Marker
          key={index}
          position={[train.latitude, train.longitude]}
          icon={L.icon({
            iconUrl: trainIcon,
            iconSize: [30, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })}
        >
          <Popup>
            <div>
              <strong>{train.route_name} | {train.trip_number}</strong><br />
              Last update: {train.geoLocation} - {new Date(train.timestamp).toLocaleTimeString()}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
