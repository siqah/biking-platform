/* eslint-disable react/prop-types */
// RoutesList.jsx
import { useState,useEffect } from 'react';

function RoutesList({ handleRouteSearch }) {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const handleStartChange = (e) => {
    setStartLocation(e.target.value);
  };
  
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStartLocation(`Current Position (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`);
        },
        (error) => console.error("Error fetching initial position:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleEndChange = (e) => {
    setEndLocation(e.target.value);
  };

  const handleUseCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStartLocation(`Current Position (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`);
          handleRouteSearch({ lat: latitude, lng: longitude }, endLocation);
        },
        (error) => console.error("Error fetching current position:", error),
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSearch = () => {
    handleRouteSearch(startLocation, endLocation);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Route Details</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Start Location</label>
        <input
          type="text"
          value={startLocation}
          onChange={handleStartChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUseCurrentPosition}
          className="mt-2 p-2 bg-green-500 text-white rounded-md w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Use Current Position
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">End Location</label>
        <input
          type="text"
          value={endLocation}
          onChange={handleEndChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Start
      </button>
    </div>
  );
}

export default RoutesList;
