import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      login(data);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gray-100">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Login
        </h2>

        
        <input
          type="email"
          className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

       
        <input
          type="password"
          className="border border-gray-300 p-3 w-full mb-5 rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        
        <button className="bg-black text-white w-full py-3 rounded hover:bg-gray-800 transition duration-200">
          Login
        </button>

       
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;