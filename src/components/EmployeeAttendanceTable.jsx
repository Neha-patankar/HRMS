

import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function EmployeeAttendanceTable() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const empRes = await api.get("/employees");
        const attRes = await api.get("/attendance/all");
        setEmployees(empRes.data);
        setAttendance(attRes.data);
      } catch (err) {
        console.error("Error fetching combined data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Combine data
  const combinedData = attendance.map((att) => ({
    employeeId: att.employee?.employeeId || "N/A",
    fullName: att.employee?.fullName || "N/A",
    email: att.employee?.email || "N/A",
    department: att.employee?.department || "N/A",
    date: att.date,
    status: att.status,
    _id: att._id,
  }));

  // Filter data based on search
  const filteredData = combinedData.filter((row) => {
    const search = searchTerm.toLowerCase();
    return (
      row.employeeId.toLowerCase().includes(search) ||
      row.fullName.toLowerCase().includes(search) ||
      row.email.toLowerCase().includes(search) ||
      row.department.toLowerCase().includes(search) ||
      row.date.toLowerCase().includes(search) ||
      row.status.toLowerCase().includes(search)
    );
  });

  // Calculate statistics
  const totalRecords = combinedData.length;
  const totalPresent = combinedData.filter((row) => row.status.toLowerCase() === "present").length;
  const totalAbsent = combinedData.filter((row) => row.status.toLowerCase() === "absent").length;

  if (loading) return <div className="p-8 text-center">Loading combined records...</div>;

  return (
    <div className="px-0">
      <h1 className="text-2xl font-bold mb-6 text-center bg-blue-950 text-white p-4">Employee Attendance Table</h1>

      {/* Stats and Search Section */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between px-4">
        {/* Stats Buttons */}
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 transition">
            Total: {totalRecords}
          </button>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-600 transition">
            Present: {totalPresent}
          </button>
          <button className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold shadow-md hover:bg-red-600 transition">
            Absent: {totalAbsent}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name, ID, email, department, date, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      {filteredData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? "No matching records found." : "No attendance records found."}
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-950">
              <tr>
                <th className="px-6 py-3 text-left text-md font-bold text-white uppercase tracking-wider">S no</th>
                <th className="px-6 py-3 text-left text-md font-bold text-white  uppercase tracking-wider">Employee ID</th>
                <th className="px-6 py-3 text-left text-md font-bold text-white  uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-md font-bold text-white  uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-md font-bold text-white  uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-md font-bold text-white  uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-md font-bold text-white  uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((row, index) => (
                <tr key={row._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.employeeId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      row.status.toLowerCase() === "present" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}