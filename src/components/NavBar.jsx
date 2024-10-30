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
        <ul className="flex flex-row justify-between mb-2">
          {currentUser ? (
            <>
              <button className="mr-4 shadow-md rounded-md p-2 text-lg ">
                <Link to="/logout">Logout</Link>
              </button>
              
              <button className="mr-4 shadow-md rounded-[100%] p-2 text-lg  ">
                <Link to="/profile">Profile</Link>
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
