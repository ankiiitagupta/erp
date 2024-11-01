
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'; 
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

const Sidebar = ({ setAttFlag , setNoticeFlag, resetFlags}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#001F54"
        toggled={!isCollapsed}
        collapse={isCollapsed}
      >
        <CDBSidebarHeader
          prefix={<i className="fa fa-bars fa-large" onClick={toggleSidebar}></i>}
        >
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            MPGI
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          <CDBSidebarMenuItem
              icon="columns"
              onClick={() => {
                resetFlags();
                navigate(`/studentdashboard/${RollNO}`);
              }}
            >
              Dashboard
            </CDBSidebarMenuItem>
            <NavLink
              to="#"
              onClick={() => setAttFlag(true)} // Set attendance flag to true
              activeClassName="activeClicked" 
              toggled={!isCollapsed}
            >
              <CDBSidebarMenuItem icon="table">Attendance Detail</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="#"
              onClick={() => setNoticeFlag(true)} // Set attendance flag to true
              activeClassName="activeClicked"> {/* Notice link */}
              <CDBSidebarMenuItem icon="bell">Notices</CDBSidebarMenuItem> {/* Notice icon */}
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          {/* <div style={{ padding: '20px 5px' }}>Sidebar Footer</div> */}
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;

