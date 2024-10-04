import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaCalendarAlt, FaCog, FaBars } from 'react-icons/fa'; // Ensure react-icons is installed

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Sidebar toggled!"); 
    setIsOpen(!isOpen); 
    
  };

  return (
    <div className="sidebar-container">
      {/* Mini sidebar with icons */}
      <div className="mini-sidebar">
        <FaBars className="burger-icon" onClick={toggleSidebar} />
        <ul>
          <li><FaHome /></li>
          <li><FaUser /></li>
          <li><FaCalendarAlt /></li>
          <li><FaCog /></li>
        </ul>
      </div>

      {/* Full sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h3>MPGI Dashboard</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/attendance">Attendance</Link></li>
          <li><Link to="/timetable">Timetable</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
