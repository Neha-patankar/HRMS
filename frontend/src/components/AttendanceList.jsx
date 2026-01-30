
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function AttendanceList({ employee }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ present: 0, absent: 0, total: 0 });

  useEffect(() => {
    if (!employee) return;

    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/attendance/${employee._id}`);
        setRecords(res.data);
        
        // Calculate statistics
        const present = res.data.filter(r => r.status === "Present").length;
        const absent = res.data.filter(r => r.status === "Absent").length;
        setStats({
          present,
          absent,
          total: res.data.length
        });
      } catch (err) {
        console.error("Error fetching attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [employee]);

  if (!employee) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Attendance Records
        </h3>
        <p className="text-sm text-slate-600 mt-1">View attendance history for {employee.fullName}</p>
      </div>

      {/* Statistics Cards */}
      {records.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Total</p>
            <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Present</p>
            <p className="text-2xl font-bold text-emerald-900">{stats.present}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">Absent</p>
            <p className="text-2xl font-bold text-red-900">{stats.absent}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <svg className="animate-spin h-8 w-8 text-purple-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-slate-600 text-sm">Loading records...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && records.length === 0 && (
        <div className="text-center py-8 px-4">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-full mb-3">
            <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h4 className="text-base font-semibold text-slate-900 mb-1">No Attendance Records</h4>
          <p className="text-sm text-slate-600">No attendance has been marked yet</p>
        </div>
      )}

      {/* Attendance Timeline */}
      {!loading && records.length > 0 && (
        <div className="space-y-3">
          {records.map((rec, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-all"
            >
              {/* Status Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                rec.status === "Present"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-red-100 text-red-600"
              }`}>
                {rec.status === "Present" ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>

              {/* Date and Status */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                    rec.status === "Present"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {rec.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(rec.date)}
                </p>
              </div>

              {/* Record Number */}
              <div className="text-right">
                <span className="text-xs font-medium text-slate-500">
                  #{records.length - index}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Attendance Rate */}
      {!loading && records.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-purple-900">Attendance Rate</span>
            <span className="text-lg font-bold text-purple-900">
              {((stats.present / stats.total) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(stats.present / stats.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

