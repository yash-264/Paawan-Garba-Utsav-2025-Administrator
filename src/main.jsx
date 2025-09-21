import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your components
import AdminDashboard from "./components/AdminDashboard";
import ScanPass from "./components/ScanPass";
import Dashboard from "./components/Dashboard";

// Import Tailwind CSS
import "./index.css"; // Make sure this file contains Tailwind directives

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/ScanPass" element={<ScanPass />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
