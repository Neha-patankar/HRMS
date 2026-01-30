import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function EmployeeAttendanceTable() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const empRes = await api.get("/employees");
        const attRes = await api.get("/attendance/all"); // new API we'll add

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


  if (loading) return <p>Loading combined records...</p>;
  if (combinedData.length === 0) return <p>No attendance records found.</p>;



  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Employee Attendance Table</h3>

      <div className="overflow-x-auto">
        <table className="w-full border border-slate-200 rounded-lg">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Employee ID</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Full Name</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Email</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Department</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Date</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {combinedData.map((row) => (
              <tr key={row._id} className="hover:bg-slate-50">
                <td className="px-4 py-2 text-sm">{row.employeeId}</td>
                <td className="px-4 py-2 text-sm font-medium">{row.fullName}</td>
                <td className="px-4 py-2 text-sm">{row.email}</td>
                <td className="px-4 py-2 text-sm">{row.department}</td>
                <td className="px-4 py-2 text-sm">{row.date}</td>
                <td className="px-4 py-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    row.status === "Present"
                      ? "bg-emerald-100 text-emerald-800"
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
    </div>
  );
}
