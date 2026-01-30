
import { useState } from "react";
import { api } from "../services/api";

export default function MarkAttendance({ employee }) {
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
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  if (!employee) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Mark Attendance
          </h3>
          <p className="text-sm text-slate-600 mt-1">Select an employee to mark attendance</p>
        </div>
        
        <div className="text-center py-12 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-slate-900 mb-1">No Employee Selected</h4>
          <p className="text-slate-600 text-sm">Please select an employee from the list to mark their attendance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Mark Attendance
        </h3>
        <p className="text-sm text-slate-600 mt-1">Record attendance for the selected employee</p>
      </div>

      {/* Selected Employee Card */}
      <div className="mb-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">Selected Employee</p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold">
              {employee.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-slate-900">{employee.fullName}</p>
            <p className="text-sm text-slate-600">{employee.department}</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-emerald-800">Attendance marked successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-red-800">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={submitAttendance} className="space-y-4">
        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Status Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Status <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setStatus("Present")}
              className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                status === "Present"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                  : "bg-white text-slate-700 border border-slate-300 hover:border-emerald-300"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Present
            </button>
            <button
              type="button"
              onClick={() => setStatus("Absent")}
              className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                status === "Absent"
                  ? "bg-red-600 text-white shadow-lg shadow-red-200"
                  : "bg-white text-slate-700 border border-slate-300 hover:border-red-300"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Absent
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submit Attendance
            </>
          )}
        </button>
      </form>
    </div>
  );
}
