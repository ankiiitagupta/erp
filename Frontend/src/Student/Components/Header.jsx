// import React from 'react'
// import logo from '../../assets/logo.png';


// // Function to handle search
// const handleSearch = (e) => {
//   e.preventDefault();
//   const section = document.getElementById(searchTerm.toLowerCase());
//   if (section) {
//     section.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   } else {
//     alert('Section not found');
//   }
//   setSearchTerm('');
// };

// const Header = () => {
//   return (
//     <nav className="navbar poppins-regular">
//       <div className="navbar-brand">
//         <a href="#" className="navbar-item">
//           {/* <img src={logo} alt="Logo" /> */}
//         </a>
//       </div>
//       <div className="navbar-menu">
//         <div className="navbar-start">
//           <a href="/" className="navbar-item">
//             Home
//           </a>
//           <a href="https://www.mpgi.edu.in/" className="navbar-item">
//             About
//           </a>
//           <a href="#" className="navbar-item">
//             Contact
//           </a>
//         </div>
//         <div className="navbar-end">
//           <a href="#" className="navbar-item">
//             Privacy Policy
//           </a>
          
//         </div>
//       </div>
//     </nav>
//   );
// }


// export default Header






import React, { useState } from 'react';
import logo from '../../assets/logo.png';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
      </div>

      {/* Right side: Navigation links */}
      <div className="navbar-menu">
        <div className="navbar-end">
          <a href="/" className="navbar-item">Home</a>
          <a href="https://www.mpgi.edu.in/" className="navbar-item">About</a>
          <a href="#contact" className="navbar-item">Contact</a>
          <a href="#" className="navbar-item">Privacy Policy</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
