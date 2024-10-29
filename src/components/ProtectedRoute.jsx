import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  // If there is no authenticated user, redirect to signup page
  return currentUser ? children : <Navigate to="/signup" />;
}

export default ProtectedRoute;
