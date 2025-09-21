import React from "react";

export default function Scan() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-[#800000] mb-6">
        QR Code Scanner
      </h1>
      <div className="w-80 h-80 border-4 border-dashed border-[#800000] rounded-lg flex items-center justify-center">
        <p className="text-gray-600">[Camera Preview Here]</p>
      </div>
      <button className="mt-6 px-6 py-2 bg-[#800000] text-white rounded-lg shadow hover:bg-[#a83232]">
        Start Scanning
      </button>
    </div>
  );
}
