/* eslint-disable react/prop-types */
// RouteMap.jsx
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RouteMap = ({ routeCoordinates }) => {
  if (!routeCoordinates || routeCoordinates.length === 0) return null;

  // Center the map on the first coordinate point in the route
  const center = [routeCoordinates[0].lat, routeCoordinates[0].lng];

  return (
    <div className="relative h-screen w-full">
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Draw the polyline for the route */}
        <Polyline positions={routeCoordinates.map(point => [point.lat, point.lng])} color="blue" />

        {/* Add a marker for each point */}
        {routeCoordinates.map((point, idx) => (
          <Marker key={idx} position={[point.lat, point.lng]} />
        ))}
      </MapContainer>
    </div>
  );
};

export default RouteMap;
