import React, { useState } from "react";
import "../stylesheets/AdminDashboard.css"; // External CSS
import AdminSidebar from "./AdminSidebar.jsx";
import DashboardContent from "./DashboardContent"; // Import the new component

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [noticeFlag, setNoticeFlag] = useState(false);

  // Toggle sidebar collapse/expand state
  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
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
          
        />
      </div>

      {/* Dashboard Content */}
      <div
        className={`dashboard-section ${
          sidebarCollapsed ? "shifted" : "full-width"
        }`}
      >
        <DashboardContent />
      </div>
    </div>
  );
};

export default AdminDashboard;
