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
    const correctId = "12345";
    const correctKey = "12345";

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
      className="flex items-center justify-center min-h-screen p-4 sm:p-6 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg p-6 sm:p-8 md:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold text-[#800000] mb-6 text-center leading-snug">
          Paawan Garba Utsav 2025 Administration Access
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 sm:p-4 rounded text-center font-semibold ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
              Access ID
            </label>
            <input
              type="text"
              value={accessId}
              onChange={(e) => setAccessId(e.target.value)}
              placeholder="Enter Access ID"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#800000] text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
              Access Key
            </label>
            <input
              type="password"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="Enter Access Key"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#800000] text-sm sm:text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#800000] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded hover:bg-[#a83232] transition-colors text-sm sm:text-base"
          >
            Access
          </button>
        </form>
      </div>
    </div>
  );
}
