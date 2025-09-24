import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../slice/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (isLogin) {
        result = await dispatch(login({ username, password })).unwrap();
        toast.success(result.message);
      } else {
        result = await dispatch(signup({ username, password })).unwrap();
        toast.success(result.message);
      }

      if (result?.token) {
        navigate("/winners");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded shadow-md bg-white relative">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-8 text-center">
        {isLogin ? "Login" : "Signup"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded text-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded text-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded text-lg font-semibold transition"
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Signup"}
        </button>
      </form>

      {/* Toggle */}
      <div className="text-center mt-4">
        <p>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-amber-600 hover:underline font-semibold"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
