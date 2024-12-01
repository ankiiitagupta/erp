import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../stylesheets/AdminDashboard.css"; // External CSS
import AdminSidebar from "./AdminSidebar.jsx";
import DashboardContent from "./DashboardContent"; // Import the new component
import CreateNotice from "./CreateNotice.jsx";
import AddTimetable from "./CreateTimeTable.jsx";

const AdminDashboard = () => {
  const { admin_id } = useParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [CreateNoticeFlag, setcreateNoticeFlag] = useState(false);
  const [AddTimetableFlag, setAddTimetableFlag] = useState(false);

  // Toggle sidebar collapse/expand state
  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  const resetFlags = () => {
    setcreateNoticeFlag(false);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div
        className={`sidebar-section ${
          sidebarCollapsed ? "collapsed" : "expanded"
        }`}
      >
        <AdminSidebar
          setcreateNoticeFlag={setcreateNoticeFlag}
          setAddTimetableFlag={setAddTimetableFlag}
          admin_id={admin_id}
          resetFlags={resetFlags}
        />
      </div>

      {AddTimetableFlag ? (
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
