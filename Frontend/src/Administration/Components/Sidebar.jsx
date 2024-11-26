import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

const AdminSidebar = ({
  admin_id,
  setNoticeFlag,
  setStudAttendanceFlag,
  setAcademicFlag,
  setAllTimetableFlag,
  setReportsFlag,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const navigate = useNavigate();

  // Function to reset all flags
  const resetFlags = () => {
    setNoticeFlag(false);
    setStudAttendanceFlag(false);
    setAcademicFlag(false);
    setAllTimetableFlag(false);
    setReportsFlag(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuClick = (menuItem, action) => {
    setSelectedMenuItem(menuItem);
    resetFlags(); // Reset all flags before setting a specific one
    if (action) action();
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "auto" }}>
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#001F54"
        toggled={!isCollapsed}
        collapse={isCollapsed}
      >
        <CDBSidebarHeader
          prefix={
            <i
              className={`fa ${isCollapsed ? "fa-times" : "fa-bars"} fa-lg`}
              onClick={toggleSidebar}
            ></i>
          }
        >
          <a href="/" className="text-decoration-none" style={{ color: "inherit" }}>
            MPGI
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {/* Dashboard */}
            <NavLink
              to={`/AdminDashboard/${admin_id}`}
              className={selectedMenuItem === "Dashboard" ? "activeClicked" : ""}
              onClick={() => handleMenuClick("Dashboard")}
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>

            {/* Notice */}
            <NavLink
              to="#"
              className={selectedMenuItem === "notices" ? "activeClicked" : ""}
              onClick={() => handleMenuClick("notices", () => setNoticeFlag(true))}
            >
              <CDBSidebarMenuItem icon="bell">Notice</CDBSidebarMenuItem>
            </NavLink>

            {/* Nested Items for Notices */}
            {selectedMenuItem === "notices" && (
              <div className="nested-items">
                <NavLink
                  to="#"
                  className={selectedMenuItem === "notice-1" ? "activeClicked" : ""}
                  onClick={() => handleMenuClick("notice-1", () => setNoticeFlag(true))}
                >
                  <CDBSidebarMenuItem>Notice 1</CDBSidebarMenuItem>
                </NavLink>

                <NavLink
                  to="#"
                  className={selectedMenuItem === "notice-2" ? "activeClicked" : ""}
                  onClick={() => handleMenuClick("notice-2", () => setNoticeFlag(true))}
                >
                  <CDBSidebarMenuItem>Notice 2</CDBSidebarMenuItem>
                </NavLink>
              </div>
            )}

            Student Attendance
            <NavLink
              to="#"
              className={selectedMenuItem === "StudAttendance" ? "activeClicked" : ""}
              onClick={() =>
                handleMenuClick("StudAttendance", () => setStudAttendanceFlag(true))
              }
            >
              <CDBSidebarMenuItem icon="book">Student Attendance</CDBSidebarMenuItem>
            </NavLink>

            {/* Academic */}
            <NavLink
              to="#"
              className={selectedMenuItem === "Academic" ? "activeClicked" : ""}
              onClick={() => handleMenuClick("Academic", () => setAcademicFlag(true))}
            >
              <CDBSidebarMenuItem icon="chart-line">Academic</CDBSidebarMenuItem>
            </NavLink>

            {/* Timetable */}
            <NavLink
              to="#"
              className={selectedMenuItem === "AllTimetable" ? "activeClicked" : ""}
              onClick={() => handleMenuClick("AllTimetable", () => setAllTimetableFlag(true))}
            >
              <CDBSidebarMenuItem icon="calendar">Timetable</CDBSidebarMenuItem>
            </NavLink>

            {/* Reports */}
            <NavLink
              to="#"
              className={selectedMenuItem === "Reports" ? "activeClicked" : ""}
              onClick={() => handleMenuClick("Reports", () => setReportsFlag(true))}
            >
              <CDBSidebarMenuItem icon="file-alt">Reports</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }} />
      </CDBSidebar>
    </div>
  );
};

export default AdminSidebar;
