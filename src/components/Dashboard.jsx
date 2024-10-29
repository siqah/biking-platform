import { useAuth } from '../context/AuthContext';
import NavBar from './NavBar';

function Dashboard() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <p className="text-center text-gray-500">Loading user data...</p>;
}

  return (
    <div className="container mx-auto p-4">
      <NavBar />
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="text-lg">Welcome, {currentUser.name}!</p>
      <p>Your recent rides will appear here.</p>
    </div>
  );
}

export default Dashboard;
