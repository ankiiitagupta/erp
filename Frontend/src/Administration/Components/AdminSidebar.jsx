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
  setcreateNoticeFlag,
  setAddTimetableFlag,
  setAddFacultyFlag,
  setAddStudentFlag,
  resetFlags,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [showAcademicSubMenu, setShowAcademicSubMenu] = useState(false);
  const [showStudentSubMenu, setShowStudentSubMenu] = useState(false);
  const [showDepartmentSubMenu, setShowDepartmentSubMenu] = useState(false); // Added state for Department SubMenu
  const [showSubjectSubMenu, setShowSubjectSubMenu] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuClick = (menuItem, navigatePath) => {
    setSelectedMenuItem(menuItem);
    resetFlags();
    if (action) action();
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
        {/* Sidebar Header */}
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

        {/* Sidebar Content */}
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {/* Dashboard */}
            <NavLink
              className={
                selectedMenuItem === "Dashboard" ? "activeClicked" : ""
              }
              onClick={() =>
                handleMenuClick("Dashboard", `/AdminDashboard/${admin_id}`)
              }
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>

            {/* Employee Detail */}
            <NavLink
              className={
                selectedMenuItem === "EmpDetail" ? "activeClicked" : ""
              }
              onClick={() => handleMenuClick("EmpDetail", "/empdetail")}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>

            {/* Student Attendance */}
            <NavLink
              className={`menu-item ${
                selectedMenuItem === "Notice" ? "activeClicked" : ""
              }`}
              onClick={() => {
                setcreateNoticeFlag(true);
                setSelectedMenuItem("Notice");
              }}
            >
              <CDBSidebarMenuItem icon="fas fa-sticky-note">
                Notice
              </CDBSidebarMenuItem>
            </NavLink>
            

            {/* Timetable Section without Sub-Menu */}
            <NavLink
              className={`menu-item ${
                selectedMenuItem === "TimeTable" ? "activeClicked" : ""
              }`}
              onClick={() => {
                setAddTimetableFlag(true);
                setSelectedMenuItem("TimeTable");
              }}
            >
              <CDBSidebarMenuItem icon="fas fa-calendar-plus">
                Timetable
              </CDBSidebarMenuItem>
            </NavLink>

            {/* Academic Section with Sub-Menu */}
            <div>
              <div
                className={`academic-menu ${
                  selectedMenuItem === "Academic" ? "activeClicked" : ""
                }`}
                onClick={() => setShowAcademicSubMenu(!showAcademicSubMenu)}
                style={{ cursor: "pointer" }}
              >
                <CDBSidebarMenuItem icon="chalkboard-teacher">
                  Faculty
                </CDBSidebarMenuItem>
              </div>
              {showAcademicSubMenu && (
                <div style={{ paddingLeft: "20px" }}>
                  <NavLink
                    className={
                      selectedMenuItem === "AddFaculty" ? "activeClicked" : ""
                    }
                    onClick={() => {
                      setAddFacultyFlag(true);
                      setSelectedMenuItem("AddFaculty");
                    }}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-user-plus">
                      Add Faculty
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={
                      selectedMenuItem === "EditFaculty" ? "activeClicked" : ""
                    }
                    onClick={() =>
                      handleMenuClick("EditFaculty", "/faculty/edit")
                    }
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-user-edit">
                      Edit Faculty
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={
                      selectedMenuItem === "DeleteFaculty"
                        ? "activeClicked"
                        : ""
                    }
                    onClick={() =>
                      handleMenuClick("DeleteFaculty", "/faculty/delete")
                    }
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-user-minus">
                      Delete Faculty
                    </CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Student Section with Sub-Menu */}
            <div>
              <div
                className={`student-menu ${
                  selectedMenuItem === "Student" ? "activeClicked" : ""
                }`}
                onClick={() => setShowStudentSubMenu(!showStudentSubMenu)}
                style={{ cursor: "pointer" }}
              >
                <CDBSidebarMenuItem icon="fas fa-user-graduate">
                  Student
                </CDBSidebarMenuItem>
              </div>
              {showStudentSubMenu && (
                <div style={{ paddingLeft: "20px" }}>
                  <NavLink
                    className={
                      selectedMenuItem === "AddStudent" ? "activeClicked" : ""
                    }
                    onClick={() => {
                      setAddStudentFlag(true);
                      setSelectedMenuItem("AddStudent");
                    }}
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-plus">
                      Add Student
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={
                      selectedMenuItem === "EditStudent" ? "activeClicked" : ""
                    }
                    onClick={() =>
                      handleMenuClick("EditStudent", "/student/edit")
                    }
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-pencil">
                      Edit Student
                      </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={
                      selectedMenuItem === "RemoveStudent"
                        ? "activeClicked"
                        : ""
                    }
                    onClick={() =>
                      handleMenuClick("RemoveStudent", "/student/remove")
                    }
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-user-minus">
                      Remove Student
                    </CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Department Section with Sub-Menu */}
            <div>
              <div
                className={`department-menu ${
                  selectedMenuItem === "Department" ? "activeClicked" : ""
                }`}
                onClick={() => setShowDepartmentSubMenu(!showDepartmentSubMenu)}
                style={{ cursor: "pointer" }}
              >
                <CDBSidebarMenuItem icon="fas fa-building">
                  Department
                </CDBSidebarMenuItem>
              </div>
              {showDepartmentSubMenu && (
                <div style={{ paddingLeft: "20px" }}>
                  <NavLink
                    className={
                      selectedMenuItem === "AddDepartment"
                        ? "activeClicked"
                        : ""
                    }
                    onClick={() =>
                      handleMenuClick("AddDepartment", "/department/add")
                    }
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-plus">
                      Add Department
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={
                      selectedMenuItem === "RemoveDepartment"
                        ? "activeClicked"
                        : ""
                    }
                    onClick={() =>
                      handleMenuClick("RemoveDepartment", "/department/remove")
                    }
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-minus ">
                      Remove Department
                    </CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Subjects Section with Sub-Menu */}
            <div>
              <div
                className={`subject-menu ${
                  selectedMenuItem === "Subject" ? "activeClicked" : ""
                }`}
                onClick={() => setShowSubjectSubMenu(!showSubjectSubMenu)}
                style={{ cursor: "pointer" }}
              >
                <CDBSidebarMenuItem icon="fas fa-book">
                  Subjects
                </CDBSidebarMenuItem>
              </div>
              {showSubjectSubMenu && (
                <div style={{ paddingLeft: "20px" }}>
                  <NavLink
                    className={
                      selectedMenuItem === "AddSubject" ? "activeClicked" : ""
                    }
                    onClick={() =>
                      handleMenuClick("AddSubject", "/subject/add")
                    }
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem icon="fas fa-book-medical">
                      Add Subject
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className={
                      selectedMenuItem === "RemoveSubject"
                        ? "activeClicked"
                        : ""
                    }
                    onClick={() =>
                      handleMenuClick("RemoveSubject", "/subject/remove")
                    }
                    activeClassName="activeClicked"
                  >
                    <CDBSidebarMenuItem
                      icon="fas fa-times-circle
                    
                    
                    "
                    >
                      Remove Subject
                    </CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* Sidebar Footer */}
        <CDBSidebarFooter style={{ textAlign: "center" }} />
      </CDBSidebar>
    </div>
  );
};

export default AdminSidebar;
