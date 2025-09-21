import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Logo path
import bgImage from "../assets/garba.jpg"; // Background image path

export default function Login() {
  const navigate = useNavigate();
  const [accessId, setAccessId] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const correctId = "yashgarba@12345"; 
    const correctKey = "garba#7748965563"; 

    if (accessId === correctId && accessKey === correctKey) {
      sessionStorage.setItem("isLoggedIn", "true");
      setMessageType("success");
      setMessage("✅ Access Granted!");
      setTimeout(() => {
        navigate("/Dashboard");
      }, 1000);
    } else {
      setMessageType("error");
      setMessage("❌ Access Denied! Wrong ID or Key.");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen p-6 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for low opacity */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
        </div>

        <h1 className="text-3xl font-bold text-[#800000] mb-6 text-center">
          Utsav Unlimited Garba Night Administration Access
        </h1>

        {message && (
          <div
            className={`mb-4 p-4 rounded ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            } font-semibold text-center`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Access ID
            </label>
            <input
              type="text"
              value={accessId}
              onChange={(e) => setAccessId(e.target.value)}
              placeholder="Enter Access ID"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#800000]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Access Key
            </label>
            <input
              type="password"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Enter Access Key"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#800000]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#800000] text-white font-bold py-2 px-4 rounded hover:bg-[#a83232] transition-colors"
          >
            Access
          </button>
        </form>
      </div>
    </div>
  );
}
