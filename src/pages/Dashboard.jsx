

import { useState } from "react";
import AddEmployee from "../components/AddEmployee";
import EmployeeList from "../components/EmployeeList";
import MarkAttendance from "../components/MarkAttendance";
import AttendanceList from "../components/AttendanceList";
import EmployeeAttendanceTable from "../components/EmployeeAttendanceTable";

export default function Dashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // NEW

  return (
    <div className="min-h-screen flex bg-slate-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-indigo-700">HRMS Lite</h1>
          <p className="text-xs text-slate-500 mt-1">HR Management System</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActivePage("dashboard")}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
              activePage === "dashboard"
                ? "bg-indigo-50 text-indigo-700"
                : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActivePage("employees")}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
              activePage === "employees"
                ? "bg-indigo-50 text-indigo-700"
                : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            Employees
          </button>

          <button
            onClick={() => setActivePage("attendance")}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
              activePage === "attendance"
                ? "bg-indigo-50 text-indigo-700"
                : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            Attendance
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200 text-sm text-slate-500">
          © 2025 HRMS Lite
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="bg-blue-950 shadow-sm border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-slate-900 capitalize">
            {activePage}
          </h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          
          {/* 👉 Dashboard Page */}
          {activePage === "dashboard" && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <EmployeeAttendanceTable />
            </div>
          )}

          {/* 👉 Employees Page */}
          {activePage === "employees" && (
            <div className="">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <AddEmployee refresh={() => setRefresh(!refresh)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <EmployeeList onSelect={setSelectedEmployee} refresh={refresh} />
              </div>
            </div>
          )}

          {/* 👉 Attendance Page */}
          {activePage === "attendance" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <MarkAttendance employee={selectedEmployee} />
              </div>

              {selectedEmployee && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <AttendanceList employee={selectedEmployee} />
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
