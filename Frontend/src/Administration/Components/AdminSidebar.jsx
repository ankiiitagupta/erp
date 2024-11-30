import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faPlus,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  return (
    <div style={{ width: "250px", backgroundColor: "#f8f9fa", height: "100vh", padding: "15px" }}>
      <nav className="sidebar">
        <ul style={{ listStyle: "none", padding: 0 }}>
          {/* Dashboard */}
          <li style={{ marginBottom: "15px" }}>
            <NavLink
              to="/dashboard"
              style={{ textDecoration: "none", color: "#000", display: "flex", alignItems: "center" }}
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faHome} style={{ marginRight: "10px" }} />
              Dashboard
            </NavLink>
          </li>

          {/* Profile */}
          <li style={{ marginBottom: "15px" }}>
            <NavLink
              to="/profile"
              style={{ textDecoration: "none", color: "#000", display: "flex", alignItems: "center" }}
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
              Profile
            </NavLink>
          </li>

          {/* Create Notice */}
          <li style={{ marginBottom: "15px" }}>
            <NavLink
              to="/create-notice"
              style={{ textDecoration: "none", color: "#000", display: "flex", alignItems: "center" }}
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px", color: "blue" }} />
              Create Notice
            </NavLink>
          </li>

          {/* Add Admin */}
          <li style={{ marginBottom: "15px" }}>
            <NavLink
              to="/add-admin"
              style={{ textDecoration: "none", color: "#000", display: "flex", alignItems: "center" }}
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
              Add Admin
            </NavLink>
          </li>

          {/* Delete Admin */}
          <li style={{ marginBottom: "15px" }}>
            <NavLink
              to="/delete-admin"
              style={{ textDecoration: "none", color: "#000", display: "flex", alignItems: "center" }}
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: "10px", color: "red" }} />
              Delete Admin
            </NavLink>
          </li>

          {/* Add Department */}
          <li style={{ marginBottom: "15px" }}>
            <NavLink
              to="/add-department"
              style={{ textDecoration: "none", color: "#000", display: "flex", alignItems: "center" }}
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
              Add Department
            </NavLink>
          </li>

          {/* Delete Department */}
          <li style={{ marginBottom: "15px" }}>
            <NavLink
              to="/delete-department"
              style={{ textDecoration: "none", color: "#000", display: "flex", alignItems: "center" }}
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: "10px", color: "red" }} />
              Delete Department
            </NavLink>
          </li>

          {/* Our Faculty */}
          <li style={{ marginBottom: "15px" }}>
            <NavLink
              to="/our-faculty"
              style={{ textDecoration: "none", color: "#000", display: "flex", alignItems: "center" }}
              activeClassName="active"
            >
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: "10px" }} />
              Our Faculty
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
