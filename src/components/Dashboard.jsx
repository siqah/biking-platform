import { useAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
import RouteMap from "./RouteMap";

function Dashboard() {
  const { currentUser } = useAuth();

  const routeCoordinates = [
    { lat: 40.7128, lng: -74.006 },
    { lat: 40.7138, lng: -74.0065 },
    { lat: 40.7148, lng: -74.007 },
    // Add more waypoints here
  ];

  if (!currentUser) {
    return <p className="text-center text-gray-500">Loading user data...</p>;
  }

  return (
    <>
      <NavBar />
      <h2 className="text-2xl font-bold mb-4">Hello welcom back</h2>
      <p className="text-lg">Welcome, {currentUser.name}!</p>
      <p>Your recent rides will appear here.</p>
      <h3 className="text-lg font-semibold mt-4">Your Rides</h3>
      <RouteMap routeCoordinates={routeCoordinates} />
      
    </>
  );
}

export default Dashboard;
