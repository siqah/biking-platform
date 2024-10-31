import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { currentUser } = useAuth();

  return (
    <>
      <nav className="mt-0 flex flex-row justify-between shadow-md bg- items-center rounded-md">
        <ul className="flex flex-row justify-between mb-2">
          <button className="mr-4 shadow-md rounded-md p-2 text-lg ">
            <Link to="/">
              <h1 className="text-2xl font-bold">NBiking</h1>
            </Link>
          </button>
        </ul>
        <ul className="flex flex-row justify-between items-center mb-2">
          {currentUser ? (
            <>

              <button className="mr-2 mt-2" >
                <Link to="/profile">
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-14  h-14 rounded-full mr-4 p-2"
                  />
                </Link>
              </button>
            </>
          ) : (
            <>
              <button className="mr-4 shadow-md rounded-md p-1 text-lg ">
                <Link to="/signup">Signup</Link>
              </button>
              <button className="mr-4 shadow-md rounded-md p-2 text-lg ">
                <Link to="/login">Login</Link>
              </button>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
