import React from 'react'
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <nav className="navbar poppins-regular">
      <div className="navbar-brand">
        <a href="#" className="navbar-item">
          {/* <img src={logo} alt="Logo" /> */}
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <a href="/" className="navbar-item">
            Home
          </a>
          <a href="https://www.mpgi.edu.in/" className="navbar-item">
            About
          </a>
          <a href="#" className="navbar-item">
            Contact
          </a>
        </div>
        <div className="navbar-end">
          <a href="#" className="navbar-item">
            Privacy Policy
          </a>
          
        </div>
      </div>
    </nav>
  );
}


export default Header