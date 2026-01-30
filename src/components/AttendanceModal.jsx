import { useState } from "react";
import { api } from "../services/api";

export default function AttendanceModal({ employee, onClose }) {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitAttendance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.post("/attendance", {
        employee: employee._id,
        date,
        status,
      });
      setSuccess(true);
      setDate("");
      setStatus("Present");
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Mark Attendance
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          {employee.fullName} — {employee.department}
        </p>

        {/* Success Message */}
        {success && (
          <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded text-sm text-emerald-700">
            Attendance marked successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitAttendance} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("Present")}
                className={`py-2 rounded-lg font-medium ${
                  status === "Present"
                    ? "bg-emerald-600 text-white"
                    : "bg-white border border-slate-300 text-slate-700"
                }`}
              >
                Present
              </button>
              <button
                type="button"
                onClick={() => setStatus("Absent")}
                className={`py-2 rounded-lg font-medium ${
                  status === "Absent"
                    ? "bg-red-600 text-white"
                    : "bg-white border border-slate-300 text-slate-700"
                }`}
              >
                Absent
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </form>
      </div>
    </div>
  );
}
