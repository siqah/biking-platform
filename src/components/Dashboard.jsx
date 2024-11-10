import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
import ParentComponent from "./mainMap/ParentComponent";

function Dashboard() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <p className="text-center text-gray-500">Loading user data...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <p className="text-lg font-semibold text-gray-800">Welcome, {currentUser.name}</p>
        <ParentComponent />
        <button className="mr-4 shadow-md rounded-md p-1 text-lg ">
          <Link to="/chat">Chat</Link>
        </button>
      </div>
    </>
  );
}

export default Dashboard;
