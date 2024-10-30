import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      console.log("Logout successful!");
    } catch (error) {
      alert("Failed to logout: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm text-center items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Logout</h2>
        
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
        >
          Confirm Logout
        </button>
        <Link to="/">
          <button className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Logout;
