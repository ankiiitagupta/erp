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

const FacultySidebar = ({
  setEmpdetailFlag,
  setNoticeFlag,
  setStudAttendanceFlag,
  setAcademicFlag,
  resetFlags,
  FacultyID,
  setAllTimetableFlag,
  setReportsFlag,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  const navigate = useNavigate(); // For navigation

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuClick = (menuItem,action) => {
    setSelectedMenuItem(menuItem);
    resetFlags();
    if (action) action();
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#001F54" toggled={!isCollapsed} collapse={isCollapsed}>
        <CDBSidebarHeader
          prefix={
            <i className={`fa ${isCollapsed ? "fa-times" : "fa-bars"} fa-lg`} onClick={toggleSidebar}></i>
          }
        >
          <a href="/" className="text-decoration-none" style={{ color: "inherit" }}>
            MPGI
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              className={selectedMenuItem === 'Dashboard' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('Dashboard',() => navigate(`/facultydashboard/${FacultyID}`))}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className={selectedMenuItem === 'EmpDetail' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('EmpDetail',() => setEmpdetailFlag(true))}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">Employee Detail</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className={selectedMenuItem === 'StudAttendance' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('StudAttendance',() => setStudAttendanceFlag(true))}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="book">Student Attendance</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className={selectedMenuItem === 'Academic' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('Academic',() => setAcademicFlag(true))}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="chart-line">Academic</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className={selectedMenuItem === 'AllTimetable' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('AllTimetable',() => setAllTimetableFlag(true))}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="calendar">Timetable</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className={selectedMenuItem === 'Notice' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('Notice',() => setNoticeFlag(true))}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="bell">Notices</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              className={selectedMenuItem === 'Reports' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('Reports',() => setReportsFlag(true))}
              activeClassName="activeClicked"
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

export default FacultySidebar;
