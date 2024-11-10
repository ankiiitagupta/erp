import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

const Sidebar = ({ setAttFlag, setNoticeFlag, resetFlags, RollNO }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard'); // Track selected menu item
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuClick = (menuItem, action) => {
    setSelectedMenuItem(menuItem);
    resetFlags();
    action && action();
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
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
            onClick={() => handleMenuClick('Dashboard', () => navigate(`/studentdashboard/${RollNO}`))}
          >
            MPGI
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <CDBSidebarMenuItem
              icon="columns"
              className={selectedMenuItem === 'Dashboard' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('Dashboard', () => navigate(`/studentdashboard/${RollNO}`))}
            >
              Dashboard
            </CDBSidebarMenuItem>
            
            <CDBSidebarMenuItem
              icon="table"
              className={selectedMenuItem === 'Attendance' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('Attendance', () => setAttFlag(true))}
            >
              Attendance Detail
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem
              icon="user"
              className={selectedMenuItem === 'Profile' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('Profile', () => navigate('/profile'))}
            >
              Profile Page
            </CDBSidebarMenuItem>
            
            <CDBSidebarMenuItem
              icon="chart-line"
              className={selectedMenuItem === 'Analytics' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('Analytics', () => navigate('/analytics'))}
            >
              Analytics
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem
              icon="exclamation-circle"
              className={selectedMenuItem === '404' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('404', () => window.open('/hero404', '_blank'))}
            >
              404 Page
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem
              icon="bell"
              className={selectedMenuItem === 'Notices' ? 'activeClicked' : ''}
              onClick={() => handleMenuClick('Notices', () => setNoticeFlag(true))}
            >
              Notices
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}></CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
