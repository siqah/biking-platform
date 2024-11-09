import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to the dashboard
      console.log("Login successful!");
    } catch (error) {
      alert("Login failed: " + error.message);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            Login
          </button>
          <p className="flex justify-center mt-2">or</p>
          <p className="flex justify-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 ml-1">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
