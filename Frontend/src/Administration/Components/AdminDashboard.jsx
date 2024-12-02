import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../stylesheets/AdminDashboard.css"; // External CSS
import AdminSidebar from "./AdminSidebar.jsx";
import DashboardContent from "./DashboardContent"; // Import the new component
import CreateNotice from "./CreateNotice.jsx";
import AddTimetable from "./CreateTimeTable.jsx";
import AddStudent from "./AddStudent.jsx";
import AddFaculty from "./AddFaculty.jsx";
import EditFaculty from "./EditFaculty.jsx";
import DeleteFaculty from "./DeleteFaculty.jsx";
import DeleteStudent from "./DeleteStudent.jsx";
import EditStudent from "./EditStudent.jsx";
import Profile from "./Profile.jsx";

const AdminDashboard = () => {
  const { admin_id } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [flags, setFlags] = useState({
    CreateNoticeFlag: false,
    AddTimetableFlag: false,
    AddFacultyFlag: false,
    AddStudentFlag: false,
    EditStudentFlag: false,
    DeleteStudentFlag: false,
    EditFacultyFlag: false,
    DeleteFacultyFlag: false,
    ProfileUserFlag: false,
  });

  // Toggle sidebar collapse/expand state
  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  // Reset all flags
  const resetFlags = () => {
    setFlags({
      CreateNoticeFlag: false,
      AddTimetableFlag: false,
      AddFacultyFlag: false,
      AddStudentFlag: false,
      EditStudentFlag: false,
      DeleteStudentFlag: false,
      EditFacultyFlag: false,
      DeleteFacultyFlag: false,
      ProfileUserFlag: false,
    });
  };

  // Render the correct component based on the active flag
  const renderContent = () => {
    if (flags.DeleteStudentFlag) return <DeleteStudent />;
    if (flags.EditStudentFlag) return <EditStudent />;
    if (flags.AddStudentFlag) return <AddStudent />;
    if (flags.DeleteFacultyFlag) return <DeleteFaculty />;
    if (flags.EditFacultyFlag) return <EditFaculty />;
    if (flags.AddFacultyFlag) return <AddFaculty />;
    if (flags.AddTimetableFlag) return <AddTimetable />;
    if (flags.CreateNoticeFlag) return <CreateNotice />;
    if (flags.ProfileUserFlag) return <Profile />;
    return <DashboardContent />;
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar-section ${sidebarCollapsed ? "collapsed" : "expanded"}`}>
        <AdminSidebar
          setProfileUserFlag={(flag) => setFlags((prev) => ({ ...prev, ProfileUserFlag: flag }))}
          setcreateNoticeFlag={(flag) => setFlags((prev) => ({ ...prev, CreateNoticeFlag: flag }))}
          setAddTimetableFlag={(flag) => setFlags((prev) => ({ ...prev, AddTimetableFlag: flag }))}
          setAddFacultyFlag={(flag) => setFlags((prev) => ({ ...prev, AddFacultyFlag: flag }))}
          setAddStudentFlag={(flag) => setFlags((prev) => ({ ...prev, AddStudentFlag: flag }))}
          setEditStudentFlag={(flag) => setFlags((prev) => ({ ...prev, EditStudentFlag: flag }))}
          setEditFacultyFlag={(flag) => setFlags((prev) => ({ ...prev, EditFacultyFlag: flag }))}
          setDeleteStudentFlag={(flag) => setFlags((prev) => ({ ...prev, DeleteStudentFlag: flag }))}
          setDeleteFacultyFlag={(flag) => setFlags((prev) => ({ ...prev, DeleteFacultyFlag: flag }))}
          admin_id={admin_id}
          resetFlags={resetFlags}
        />
      </div>

      {/* Main content */}
      <div className={`dashboard-section ${sidebarCollapsed ? "shifted" : "full-width"}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
