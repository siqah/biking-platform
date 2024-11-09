import { useAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
// import Chat from "./Chat";
import ParentComponent from "./parentComponent";

// import RaceMap from './RaceMap';
// import LivePositionUpdater from './LivePositionUpdater';
// import LeaderBoard from './LeaderBoard';

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
        {/* <Chat user1Id={currentUser.id} user2Id="user2-id" /> */}
        {/* <LivePositionUpdater/> */}
        {/* <RaceMap /> */}
        {/* <LeaderBoard /> */}
      </div>
    </>
  );
}

export default Dashboard;
