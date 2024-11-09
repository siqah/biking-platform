// ParentComponent.jsx
import { useState } from 'react';
import RoutesList from "./RoutesList";
import RouteMap from './RouteMap';

const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

function ParentComponent() {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [showRoadDetails, setShowRoadDetails] = useState(true);

  const handleRouteSearch = async (startLocation, endLocation) => {
    try {
      const startResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(startLocation)}&key=${API_KEY}`);
      const startData = await startResponse.json();
      if (!startData.results || startData.results.length === 0) throw new Error("No results found for start location");
      
      const endResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(endLocation)}&key=${API_KEY}`);
      const endData = await endResponse.json();
      if (!endData.results || endData.results.length === 0) throw new Error("No results found for end location");

      const startCoordinates = startData.results[0].geometry;
      const endCoordinates = endData.results[0].geometry;

      setRouteCoordinates([
        { lat: startCoordinates.lat, lng: startCoordinates.lng },
        { lat: endCoordinates.lat, lng: endCoordinates.lng },
      ]);
    } catch (error) {
      console.error("Error fetching route coordinates:", error);
    }
  };

  const toggleRoadDetails = () => {
    setShowRoadDetails(prev => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-4 bg-gray-100">
        <RoutesList handleRouteSearch={handleRouteSearch} />
        <button
          onClick={toggleRoadDetails}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md w-full hover:bg-blue-600 focus:outline-none"
        >
          {showRoadDetails ? "Hide Road Details" : "Show Road Details"}
        </button>
      </div>
      <div className="w-full md:w-2/3 p-4">
        <RouteMap routeCoordinates={routeCoordinates} showRoadDetails={showRoadDetails} />
      </div>
    </div>
  );
}

export default ParentComponent;
