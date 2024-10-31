import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      <div className="w-full  max-w-sm bg-white rounded-lg shadow-md p-8">

        {currentUser ? (
          <>
          <div  className="flex justify-between items-center">
          <button className="ml-2 shadow-md rounded-md p-2 text-lg ">
                <Link to="/">Home</Link>
              </button>
          <button className="mr-2 shadow-md rounded-md p-2 text-lg ">
                <Link to="/logout">Logout</Link>
              </button>
          </div>
            <div className="flex justify-center mb-4">
              <img
                src={currentUser.photoURL || '/default-profile.png'}
                alt=""
                className="w-24 h-24 rounded-full object-cover border-2 p-4 border-gray-300"
              />
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-1">
              {currentUser.displayName || 'No Name Available'}
            </h2>
            <p className="text-center text-gray-500 mb-4">{currentUser.email}</p>
          </>

        ) : (
          <p className="text-center text-gray-500">No user information available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
