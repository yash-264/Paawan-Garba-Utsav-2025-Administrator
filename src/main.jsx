import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import your components
import AdminDashboard from "./components/AdminDashboard";
import ScanPass from "./components/ScanPass";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

// Import Tailwind CSS
import "./index.css"; // Make sure this file contains Tailwind directives

// Protected Route component
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  return isLoggedIn ? element : <Navigate to="/" replace />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/Dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/AdminDashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/ScanPass" element={<ProtectedRoute element={<ScanPass />} />} />

        {/* Catch all: redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
