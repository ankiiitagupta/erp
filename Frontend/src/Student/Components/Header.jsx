import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGrievanceFormOpen, setIsGrievanceFormOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  const location = useLocation();
  const [grievanceData, setGrievanceData] = useState({
    name: '',
    rollNumber: '',
    category: '',
    subject: '',
    document: null,
    query: '',
  });

  useEffect(() => {
    // Toggle search bar and profile visibility based on current path
    const isLoginPage = location.pathname.toLowerCase() === '/';
    setShowSearchBar(!isLoginPage);
    setShowProfile(!isLoginPage);
  }, [location]);

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const section = document.getElementById(searchTerm.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      alert('Section not found');
    }
    setSearchTerm('');
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    alert('You have been logged out.');
    window.location.href = '/'; // Redirect to home or login page
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

      {/* Right side: Navigation links and Profile Dropdown */}
      <div className="navbar-end">
        <a href="/" className="navbar-item">Home</a>
        <a href="https://www.mpgi.edu.in/" className="navbar-item">About</a>
        <a href="#contact" className="navbar-item">Contact</a>
        <a href="#privacy" className="navbar-item">Privacy Policy</a>

        {/* Profile Dropdown */}
        {showProfile && (
          <div className="profile-container" onClick={toggleDropdown}>
            <div className="profile-img">
              <i className="fas fa-user"></i> {/* Font Awesome Profile Icon */}
            </div>
            <span className="profile-name">
              Profile <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}></i>
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
                <a href="#" className="dropdown-item" onClick={toggleGrievanceForm}>
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
                <option value="ATTENDANCE">ATTENDANCE</option>
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
              <label htmlFor="document">Attach Document (Image)</label>
              <input
                type="file"
                id="document"
                name="document"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="query">Grievance Description</label>
              <textarea
                id="query"
                name="query"
                value={grievanceData.query}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={toggleGrievanceForm}>Cancel</button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Header;
