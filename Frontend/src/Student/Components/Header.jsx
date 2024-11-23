import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../../axios.js";

const Header = ({ facultyID }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGrievanceFormOpen, setIsGrievanceFormOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showroleselector, setshowroleselector] = useState(true);

  const [showProfile, setShowProfile] = useState(true);
  const location = useLocation();
  const [grievanceData, setGrievanceData] = useState({
    name: "",
    rollNumber: "",
    category: "",
    subject: "",
    document: null,
    query: "",
  });
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("faculty");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/roles?facultyID=${facultyID}`)
      .then((response) => {
        // Normalize roles to lowercase to avoid case-sensitive duplicates
        const apiRoles = response.data.map((role) =>
          role.role_name.toLowerCase()
        );
        const uniqueRoles = Array.from(new Set(["faculty", ...apiRoles])); // Ensure 'faculty' is included and unique

        // Capitalize each role for a consistent dropdown display
        const capitalizedRoles = uniqueRoles.map(
          (role) => role.charAt(0).toUpperCase() + role.slice(1)
        );

        setRoles(capitalizedRoles);
        console.log("Processed Roles:", capitalizedRoles); // Debug: Check processed roles
      })
      .catch((error) => {
        setError("Failed to fetch roles data");
        console.error(error);
      });
  }, [facultyID]);

  useEffect(() => {
    // Toggle search bar and profile visibility based on current path
    const isLoginPage = location.pathname.toLowerCase() === "/";
    setShowSearchBar(!isLoginPage);
    setShowProfile(!isLoginPage);
    setshowroleselector(!isLoginPage);
  }, [location]);

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const section = document.getElementById(searchTerm.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      alert("Section not found");
    }
    setSearchTerm("");
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;

    const userConfirmed = confirm(
      `Are you sure you want to change your role to ${role}?`
    );

    if (userConfirmed) {
      console.log(`Role is selected to ${role}`);
      setSelectedRole(role); // Update the selected role state
    } else {
      console.log("Role not changed.");
      // Optionally reset the dropdown to the previous value
      event.target.value = selectedRole; // Ensure dropdown reflects current role
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    alert("You have been logged out.");
    window.location.href = "/"; // Redirect to home or login page
  };

  // Function to handle grievance form toggle
  const toggleGrievanceForm = () => {
    setIsGrievanceFormOpen(!isGrievanceFormOpen);
  };

  // Handle grievance form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrievanceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input (document upload)
  const handleFileChange = (e) => {
    setGrievanceData((prevState) => ({
      ...prevState,
      document: e.target.files[0],
    }));
  };

  // Submit grievance form
  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    alert(`Grievance submitted by ${grievanceData.name}`);
    setIsGrievanceFormOpen(false);
  };

  return (
    <nav className="navbar poppins-regular">
      {/* Left side: Logo and Search bar */}
      <div className="navbar-start">
        <div className="navbar-brand">
          <a href="#" className="navbar-item">
            {/* <img src={logo} alt="Logo" /> */}
          </a>
        </div>

        {/* Search Bar with Icon */}
        {showSearchBar && (
          <form className="navbar-item search-form" onSubmit={handleSearch}>
            <div className="search-container">
              <span className="icon">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="input search-bar"
                placeholder="Page Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        )}
      </div>
      {showroleselector && (
  <div className="role-selector">
    <label htmlFor="faculty-roles">
      <strong>Select Role: </strong>
    </label>
    <select
      id="faculty-roles"
      className="role-dropdown"
      value={selectedRole}
      onChange={handleRoleChange}
    >
      {roles.map((role, index) => (
        <option key={index} value={role.toLowerCase()}>
          {role}
        </option>
      ))}
    </select>
  </div>
)}


      

      {/* Right side: Navigation links and Profile Dropdown */}
      <div className="navbar-end">
        <a href="/" className="navbar-item">
          Home
        </a>
        <a href="https://www.mpgi.edu.in/" className="navbar-item">
          About
        </a>
        <a href="#contact" className="navbar-item">
          Contact
        </a>
        <a href="#privacy" className="navbar-item">
          Privacy Policy
        </a>

        {/* Profile Dropdown */}
        {showProfile && (
          <div className="profile-container" onClick={toggleDropdown}>
            <div className="profile-img">
              <i className="fas fa-user"></i> {/* Font Awesome Profile Icon */}
            </div>
            <span className="profile-name">
              Profile{" "}
              <i
                className={`fas fa-chevron-down ${isDropdownOpen ? "rotate" : ""}`}
              ></i>
            </span>

            {isDropdownOpen && (
              <div className="profile-dropdown">
                <a href="#" className="dropdown-item">
                  <i className="fas fa-user"></i> My Profile
                </a>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-cog"></i> Settings
                </a>
                <a href="#" className="dropdown-item" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Log Out
                </a>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={toggleGrievanceForm}
                >
                  <i className="fas fa-envelope"></i> Submit Grievance
                </a>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-comment-dots"></i> Feedback
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grievance Form Modal */}
      {isGrievanceFormOpen && (
        <div className="grievance-form-modal">
          <div className="form-overlay" onClick={toggleGrievanceForm}></div>
          <form className="grievance-form" onSubmit={handleGrievanceSubmit}>
            <h3>Submit Grievance</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={grievanceData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rollNumber">Roll Number</label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={grievanceData.rollNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Grievance Category</label>
              <select
                id="category"
                name="category"
                value={grievanceData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="ACADEMICS">ACADEMICS</option>
                <option value="HOSTEL">HOSTEL</option>
                <option value="FACULTY">FACULTY</option>
                <option value="CAMPUS">CAMPUS</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={grievanceData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="query">Query</label>
              <textarea
                id="query"
                name="query"
                value={grievanceData.query}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="document">Document Upload</label>
              <input
                type="file"
                id="document"
                name="document"
                onChange={handleFileChange}
              />
            </div>
            
            <button type="submit" className="btn-submit">
              Submit Grievance
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Header;
