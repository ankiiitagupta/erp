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
  setProfileUserFlag,
  setcreateNoticeFlag,
  setAddTimetableFlag,
  setAddFacultyFlag,
  setEditFacultyFlag,
  setDeleteFacultyFlag,
  setDeleteStudentFlag,
  setEditStudentFlag,
  setAddStudentFlag,
  resetFlags,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [submenuVisibility, setSubmenuVisibility] = useState({
    academic: false,
    student: false,
    department: false,
    subject: false,
  });

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuClick = (menuItem, navigatePath) => {
    setSelectedMenuItem(menuItem);
    resetFlags();

    if (navigatePath) {
      navigate(navigatePath);
    }
  };

  const toggleSubmenu = (submenu) => {
    setSubmenuVisibility((prevState) => ({
      ...prevState,
      [submenu]: !prevState[submenu],
    }));
  };

  return (
    <div style={{ display: "flex", height: "100%", overflow: "scroll initial" }}>
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#001F54"
        toggled={!isCollapsed}
        collapse={isCollapsed}
      >
        {/* Sidebar Header */}
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

        {/* Sidebar Content */}
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {/* Dashboard */}
            <NavLink
              className={selectedMenuItem === "Dashboard" ? "activeClicked" : ""}
              onClick={() => handleMenuClick("Dashboard", `/AdminDashboard/${admin_id}`)}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>

            {/* Profile */}
            <NavLink
              className={selectedMenuItem === "Profile" ? "activeClicked" : ""}
              onClick={() => {
                setProfileUserFlag(true);
                setSelectedMenuItem("Profile");
              }}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>

            {/* Notice */}
            <NavLink
              className={selectedMenuItem === "Notice" ? "activeClicked" : ""}
              onClick={() => {
                setcreateNoticeFlag(true);
                setSelectedMenuItem("Notice");
              }}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="fas fa-sticky-note">Notice</CDBSidebarMenuItem>
            </NavLink>

            {/* Timetable */}
            <NavLink
              className={selectedMenuItem === "TimeTable" ? "activeClicked" : ""}
              onClick={() => {
                setAddTimetableFlag(true);
                setSelectedMenuItem("TimeTable");
              }}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="fas fa-calendar-plus">Timetable</CDBSidebarMenuItem>
            </NavLink>

            {/* Academic Section */}
            <div>
              <div
                aria-expanded={submenuVisibility.academic ? "true" : "false"}
                onClick={() => toggleSubmenu("academic")}
                style={{ cursor: "pointer" }}
              >
                <CDBSidebarMenuItem icon="chalkboard-teacher">Faculty</CDBSidebarMenuItem>
              </div>
              {submenuVisibility.academic && (
                <div style={{ paddingLeft: "20px" }}>
                  <NavLink
                    className={selectedMenuItem === "AddFaculty" ? "activeClicked" : ""}
                    onClick={() => {
                      setAddFacultyFlag(true);
                      setSelectedMenuItem("AddFaculty");
                    }}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-user-plus">Add Faculty</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={selectedMenuItem === "EditFaculty" ? "activeClicked" : ""}
                    onClick={() => {
                      setEditFacultyFlag(true);
                      setSelectedMenuItem("EditFaculty");
                    }}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-user-edit">Edit Faculty</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={selectedMenuItem === "DeleteFaculty" ? "activeClicked" : ""}
                    onClick={() => {
                      setDeleteFacultyFlag(true);
                      setSelectedMenuItem("DeleteFaculty");
                    }}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-user-minus">Delete Faculty</CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Student Section */}
            <div>
              <div
                aria-expanded={submenuVisibility.student ? "true" : "false"}
                onClick={() => toggleSubmenu("student")}
                style={{ cursor: "pointer" }}
              >
                <CDBSidebarMenuItem icon="fas fa-user-graduate">Student</CDBSidebarMenuItem>
              </div>
              {submenuVisibility.student && (
                <div style={{ paddingLeft: "20px" }}>
                  <NavLink
                    className={selectedMenuItem === "AddStudent" ? "activeClicked" : ""}
                    onClick={() => {
                      setAddStudentFlag(true);
                      setSelectedMenuItem("AddStudent");
                    }}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-plus">Add Student</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={selectedMenuItem === "EditStudent" ? "activeClicked" : ""}
                    onClick={() => {
                      setEditStudentFlag(true);
                      setSelectedMenuItem("EditStudent");
                    }}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-pencil">Edit Student</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={selectedMenuItem === "RemoveStudent" ? "activeClicked" : ""}
                    onClick={() => {
                      setDeleteStudentFlag(true);
                      setSelectedMenuItem("RemoveStudent");
                    }}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-user-minus">Remove Student</CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Department Section */}
            <div>
              <div
                aria-expanded={submenuVisibility.department ? "true" : "false"}
                onClick={() => toggleSubmenu("department")}
                style={{ cursor: "pointer" }}
              >
                <CDBSidebarMenuItem icon="fas fa-building">Department</CDBSidebarMenuItem>
              </div>
              {submenuVisibility.department && (
                <div style={{ paddingLeft: "20px" }}>
                  <NavLink
                    className={selectedMenuItem === "AddDepartment" ? "activeClicked" : ""}
                    onClick={() => handleMenuClick("AddDepartment", "/department/add")}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-plus">Add Department</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={selectedMenuItem === "RemoveDepartment" ? "activeClicked" : ""}
                    onClick={() => handleMenuClick("RemoveDepartment", "/department/remove")}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-minus">Remove Department</CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Subject Section */}
            <div>
              <div
                aria-expanded={submenuVisibility.subject ? "true" : "false"}
                onClick={() => toggleSubmenu("subject")}
                style={{ cursor: "pointer" }}
              >
                <CDBSidebarMenuItem icon="fas fa-book">Subjects</CDBSidebarMenuItem>
              </div>
              {submenuVisibility.subject && (
                <div style={{ paddingLeft: "20px" }}>
                  <NavLink
                    className={selectedMenuItem === "AddSubject" ? "activeClicked" : ""}
                    onClick={() => handleMenuClick("AddSubject", "/subject/add")}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-book-medical">Add Subject</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={selectedMenuItem === "RemoveSubject" ? "activeClicked" : ""}
                    onClick={() => handleMenuClick("RemoveSubject", "/subject/remove")}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-times-circle">Remove Subject</CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* Sidebar Footer */}
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "10px",
              backgroundColor: "#001F54",
              color: "#fff",
              textAlign: "center",
            }}
          >
            MPGI Admin Panel
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default AdminSidebar;
