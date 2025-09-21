import React, { useEffect, useState } from "react";
import { getAllParticipants } from "../firebase/helpers/firestoreHelpers";
import { Link ,useNavigate} from "react-router-dom"; // <- Import Link from React Router

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
    sessionStorage.clear(); // Clear everything from sessionStorage
    navigate("/", { replace: true }); // Redirect to login and replace history
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#800000] text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <Link to="/Dashboard" className="block px-3 py-2 rounded hover:bg-[#a83232]">Dashboard</Link>
          <Link to="/AdminDashboard" className="block px-3 py-2 rounded bg-[#a83232]">Bookings</Link>
          <Link to="/ScanPass" className="block px-3 py-2 rounded hover:bg-[#a83232]">Scan Pass</Link>
           <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded hover:bg-[#a83232]">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-700">Booking Submissions</h1>
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
            A
          </div>
        </header>

        {/* Table */}
        <div className="p-6 overflow-x-auto flex-1">
          {loading ? (
            <p className="text-gray-600">Loading participants...</p>
          ) : participants.length === 0 ? (
            <p className="text-gray-600">No bookings found.</p>
          ) : (
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#800000] text-white">
                <tr>
                  <th className="py-3 px-4 text-left">S.No</th>
                  <th className="py-3 px-4 text-left">Participant ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Age</th>
                  <th className="py-3 px-4 text-left">Mobile</th>
                  <th className="py-3 px-4 text-left">Gender</th>
                  <th className="py-3 px-4 text-left">Group Size</th>
                  <th className="py-3 px-4 text-left">Entered</th>
                  <th className="py-3 px-4 text-left">Payment ID</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p, index) => (
                  <tr key={p.participantId} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{p.participantId}</td>
                    <td className="py-3 px-4">{p.name}</td>
                    <td className="py-3 px-4">{p.age}</td>
                    <td className="py-3 px-4">{p.mobile}</td>
                    <td className="py-3 px-4">{p.gender}</td>
                    <td className="py-3 px-4">{p.groupSize}</td>
                    <td className="py-3 px-4">{p.isUsed ? "Yes" : "No"}</td>
                    <td className="py-3 px-4">{p.paymentId}</td>
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
