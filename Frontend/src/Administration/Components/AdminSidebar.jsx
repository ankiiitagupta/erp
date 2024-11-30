import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faPlus,
  faTrash,
  faUsers,
  faChevronDown,
  faBars, // Hamburger menu icon for toggle
} from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/AdminSidebar.css";

const AdminSidebar = () => {
  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);
  // State to track if the sidebar is collapsed
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleDropdownToggle = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`adside-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <div className="adside-sidebar-header-container">
        <button className="adsidebar-toggle-btn" onClick={handleSidebarToggle}>
          <FontAwesomeIcon icon={faBars} className="adsidebar-toggle-icon" />
        </button>
        {!isSidebarCollapsed && <h2 className="adside-sidebar-header">MPGI</h2>}
      </div>
      <ul className="adside-sidebar-list">
        {/* Dashboard */}
        <li className="adside-sidebar-item">
          <NavLink to="/dashboard" className="adside-sidebar-link">
            <FontAwesomeIcon icon={faHome} className="adside-sidebar-icon" />
            {!isSidebarCollapsed && "Dashboard"}
          </NavLink>
        </li>

        {/* Profile */}
        <li className="adside-sidebar-item">
          <NavLink to="/profile" className="adside-sidebar-link">
            <FontAwesomeIcon icon={faUser} className="adside-sidebar-icon" />
            {!isSidebarCollapsed && "Profile"}
          </NavLink>
        </li>

        {/* Admin Dropdown */}
        <li
          className={`adside-sidebar-item ${openDropdown === "admin" ? "active" : ""}`}
        >
          <button
            className="adside-sidebar-link"
            onClick={() => handleDropdownToggle("admin")}
          >
            <FontAwesomeIcon icon={faUser} className="adside-sidebar-icon" />
            {!isSidebarCollapsed && "Admin"}
            <FontAwesomeIcon
              icon={faChevronDown}
              className="adside-dropdown-chevron"
              style={{
                transform: openDropdown === "admin" ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </button>
          {openDropdown === "admin" && (
            <ul className="adside-dropdown">
              <li>
                <NavLink to="/add-admin" className="adside-dropdown-link">
                  <FontAwesomeIcon icon={faPlus} className="adside-dropdown-icon" />
                  {!isSidebarCollapsed && "Add Admin"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/delete-admin" className="adside-dropdown-link">
                  <FontAwesomeIcon icon={faTrash} className="adside-dropdown-icon" />
                  {!isSidebarCollapsed && "Delete Admin"}
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Department Dropdown */}
        <li
          className={`adside-sidebar-item ${openDropdown === "department" ? "active" : ""}`}
        >
          <button
            className="adside-sidebar-link"
            onClick={() => handleDropdownToggle("department")}
          >
            <FontAwesomeIcon icon={faUsers} className="adside-sidebar-icon" />
            {!isSidebarCollapsed && "Department"}
            <FontAwesomeIcon
              icon={faChevronDown}
              className="adside-dropdown-chevron"
              style={{
                transform: openDropdown === "department" ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </button>
          {openDropdown === "department" && (
            <ul className="adside-dropdown">
              <li>
                <NavLink to="/add-department" className="adside-dropdown-link">
                  <FontAwesomeIcon icon={faPlus} className="adside-dropdown-icon" />
                  {!isSidebarCollapsed && "Add Department"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/delete-department" className="adside-dropdown-link">
                  <FontAwesomeIcon icon={faTrash} className="adside-dropdown-icon" />
                  {!isSidebarCollapsed && "Delete Department"}
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Faculty Dropdown */}
        <li
          className={`adside-sidebar-item ${openDropdown === "faculty" ? "active" : ""}`}
        >
          <button
            className="adside-sidebar-link"
            onClick={() => handleDropdownToggle("faculty")}
          >
            <FontAwesomeIcon icon={faUsers} className="adside-sidebar-icon" />
            {!isSidebarCollapsed && "Faculty"}
            <FontAwesomeIcon
              icon={faChevronDown}
              className="adside-dropdown-chevron"
              style={{
                transform: openDropdown === "faculty" ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </button>
          {openDropdown === "faculty" && (
            <ul className="adside-dropdown">
              <li>
                <NavLink to="/add-faculty" className="adside-dropdown-link">
                  <FontAwesomeIcon icon={faPlus} className="adside-dropdown-icon" />
                  {!isSidebarCollapsed && "Add Faculty"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/delete-faculty" className="adside-dropdown-link">
                  <FontAwesomeIcon icon={faTrash} className="adside-dropdown-icon" />
                  {!isSidebarCollapsed && "Delete Faculty"}
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
