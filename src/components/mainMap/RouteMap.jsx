import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const RouteMap = ({ routeCoordinates, showRoadDetails = true }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    // Initialize the map only if it hasn't been initialized already
    if (!mapRef.current && routeCoordinates.length >= 2) {
      const center = [
        (routeCoordinates[0].lat + routeCoordinates[1].lat) / 2,
        (routeCoordinates[0].lng + routeCoordinates[1].lng) / 2,
      ];

      mapRef.current = L.map('map').setView(center, 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }
  }, [routeCoordinates]);

  useEffect(() => {
    if (!mapRef.current || routeCoordinates.length < 2) return;

    const [startPoint, endPoint] = [
      L.latLng(routeCoordinates[0].lat, routeCoordinates[0].lng),
      L.latLng(routeCoordinates[1].lat, routeCoordinates[1].lng)
    ];

    // Remove existing routing control if it exists
    if (routingControlRef.current) {
      routingControlRef.current.remove();
      routingControlRef.current = null;
    }

    if (showRoadDetails) {
      // Add route with road details
      routingControlRef.current = L.Routing.control({
        waypoints: [startPoint, endPoint],
        routeWhileDragging: true,
      }).addTo(mapRef.current);
    } else {
      // Add markers only for start and end points
      L.marker(startPoint).addTo(mapRef.current).bindPopup("Start Point").openPopup();
      L.marker(endPoint).addTo(mapRef.current).bindPopup("End Point");
    }
  }, [routeCoordinates, showRoadDetails]);

  if (!routeCoordinates || routeCoordinates.length < 2) return null;

  return (
    <div id="map" className="relative h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="w-full h-full max-w-4xl shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <div className="absolute top-0 left-0 w-full h-full" id="map"></div>
      </div>
    </div>
  );
};

RouteMap.propTypes = {
  routeCoordinates: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ).isRequired,
  showRoadDetails: PropTypes.bool,
};

export default RouteMap;
