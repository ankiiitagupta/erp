import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

const FacultySidebar = ({ setEmpdetailFlag, setNoticeFlag, setMarkAttendanceFlag, setAcademicFlag }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
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
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            MPGI
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="#"
              onClick={() => setEmpdetailFlag(true)} 
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">Employee Detail</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="#" 
              onClick={() => setMarkAttendanceFlag(true)}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="book">Mark Attendance</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="#" 
              onClick={() => setAcademicFlag(true)}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="chart-line">Academic</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              to="/hero404"
              target="_blank"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">Student Attendance</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              to="/hero404"
              target="_blank"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">Timetable</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              to="#"
              onClick={() => setNoticeFlag(true)} 
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="bell">Notices</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }} />
      </CDBSidebar>
    </div>
  );
};

export default FacultySidebar;
