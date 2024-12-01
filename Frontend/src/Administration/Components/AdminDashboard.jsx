import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../stylesheets/AdminDashboard.css"; // External CSS
import AdminSidebar from "./AdminSidebar.jsx";
import DashboardContent from "./DashboardContent"; // Import the new component
import CreateNotice from "./CreateNotice.jsx";
import AddTimetable from "./CreateTimeTable.jsx";
import AddStudent from "./AddStudent.jsx";
import AddFaculty from "./AddFaculty.jsx";

const AdminDashboard = () => {
  const { admin_id } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [CreateNoticeFlag, setCreateNoticeFlag] = useState(false);
  const [AddTimetableFlag, setAddTimetableFlag] = useState(false);
  const [AddFacultyFlag, setAddFacultyFlag] = useState(false);
  const [AddStudentFlag, setAddStudentFlag] = useState(false);

  // Toggle sidebar collapse/expand state
  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  // Reset all flags
  const resetFlags = () => {
    setCreateNoticeFlag(false);
    setAddFacultyFlag(false);
    setAddTimetableFlag(false);
    setAddStudentFlag(false);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Component */}
      <AdminSidebar
        setcreateNoticeFlag={setCreateNoticeFlag}
        setAddTimetableFlag={setAddTimetableFlag}
        setAddFacultyFlag={setAddFacultyFlag}
        setAddStudentFlag={setAddStudentFlag}
        admin_id={admin_id}
        resetFlags={resetFlags}
      />

      {/* Main Content Section */}
      {AddStudentFlag ? (
        <AddStudent />
      ) : AddFacultyFlag ? (
        <AddFaculty />
      ) : AddTimetableFlag ? (
        <AddTimetable />
      ) : CreateNoticeFlag ? (
        <CreateNotice />
      ) : (
        <div
          className={`dashboard-section ${
            sidebarCollapsed ? "shifted" : "full-width"
          }`}
        >
          <DashboardContent />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
