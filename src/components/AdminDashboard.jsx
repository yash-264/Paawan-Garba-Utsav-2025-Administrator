import React from "react";

const submissions = [
  { id: 1, name: "Ritika Singh", age: 22, mobile: "9876543210", gender: "Female", group: 5 },
  { id: 2, name: "Aman Verma", age: 25, mobile: "9123456789", gender: "Male", group: 2 },
  { id: 3, name: "Priya Sharma", age: 20, mobile: "9988776655", gender: "Female", group: 8 },
];

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#800000] text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <a href="#" className="block px-3 py-2 rounded hover:bg-[#a83232]">Dashboard</a>
          <a href="#" className="block px-3 py-2 rounded bg-[#a83232]">Bookings</a>
          <a href="/qrscan" className="block px-3 py-2 rounded hover:bg-[#a83232]">Scan QR</a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-[#a83232]">Logout</a>
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
        <div className="p-6 overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#800000] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Mobile</th>
                <th className="py-3 px-4 text-left">Gender</th>
                <th className="py-3 px-4 text-left">Group Size</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{s.name}</td>
                  <td className="py-3 px-4">{s.age}</td>
                  <td className="py-3 px-4">{s.mobile}</td>
                  <td className="py-3 px-4">{s.gender}</td>
                  <td className="py-3 px-4">{s.group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
