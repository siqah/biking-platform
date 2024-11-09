import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/Profile";
import RoutesList from "./components/mainMap/RoutesList";
import Dashboard from "./components/Dashboard";
import Logout from "./components/auth/Logout";
import RouteMap from "./components/mainMap/RouteMap";
import ProtectedRoute from "./components/ProtectedRoute";
import Chat2 from "./components/messaging/Chat2";
// import Chat from "./components/messaging/Chat";

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
        {/* <Route path="/chat" element={<Chat/>} /> */}
        <Route path="/chat2" element={<Chat2 />} />
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
