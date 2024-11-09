import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import RoutesList from "./components/RoutesList";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import RouteMap from "./components/RouteMap";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/routemap" element={<RouteMap />} />
        <Route path="/routes" element={<RoutesList />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
               <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
