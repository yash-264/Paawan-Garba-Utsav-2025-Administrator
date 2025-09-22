import React, { useEffect, useState } from "react";
import { getAllParticipants } from "../firebase/helpers/firestoreHelpers";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
    fetchParticipants();
  }, [navigate]);

  const fetchParticipants = async () => {
    try {
      const data = await getAllParticipants();
      setParticipants(data);
    } catch (err) {
      console.error("Error fetching participants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#800000] text-white flex flex-col md:h-screen">
        <div className="p-4 sm:p-6 text-xl sm:text-2xl font-bold border-b border-gray-700 text-center md:text-left">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2 sm:space-y-3">
          <Link to="/Dashboard" className="block px-3 py-2 rounded hover:bg-[#a83232] text-sm sm:text-base">
            Dashboard
          </Link>
          <Link to="/AdminDashboard" className="block px-3 py-2 rounded bg-[#a83232] text-sm sm:text-base">
            Bookings
          </Link>
          <Link to="/ScanPass" className="block px-3 py-2 rounded hover:bg-[#a83232] text-sm sm:text-base">
            Scan Pass
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded hover:bg-[#a83232] text-sm sm:text-base"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-md">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mb-2 sm:mb-0">
            Booking Submissions
          </h1>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
            A
          </div>
        </header>

        {/* Table */}
        <div className="p-4 sm:p-6 overflow-x-auto flex-1">
          {loading ? (
            <p className="text-gray-600">Loading participants...</p>
          ) : participants.length === 0 ? (
            <p className="text-gray-600">No bookings found.</p>
          ) : (
            <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
              <thead className="bg-[#800000] text-white text-xs sm:text-sm">
                <tr>
                  <th className="py-2 px-3 text-left">S.No</th>
                  <th className="py-2 px-3 text-left">Participant ID</th>
                  <th className="py-2 px-3 text-left">Name</th>
                  <th className="py-2 px-3 text-left">Pass Type</th> {/* changed */}
                  <th className="py-2 px-3 text-left">Mobile</th>
                 
                  <th className="py-2 px-3 text-left">Number of People</th> {/* changed */}
                  <th className="py-2 px-3 text-left">Entered</th>
                  <th className="py-2 px-3 text-left">Payment ID</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p, index) => (
                  <tr key={p.participantId} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{index + 1}</td>
                    <td className="py-2 px-3">{p.participantId}</td>
                    <td className="py-2 px-3">{p.name}</td>
                    <td className="py-2 px-3">{p.passType}</td> {/* was age */}
                    <td className="py-2 px-3">{p.mobile}</td>
                   
                    <td className="py-2 px-3">{p.numberOfPeople}</td> {/* was groupSize */}
                    <td className="py-2 px-3">{p.isUsed ? "Yes" : "No"}</td>
                    <td className="py-2 px-3">{p.paymentId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
