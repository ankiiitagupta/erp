import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../stylesheets/DashboardContent.css"; // CSS for the new component

const DashboardContent = () => {
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const [value, onChange] = useState(new Date());

  const dataCounts = [
    { label: "Faculty", count: 10 },
    { label: "Students", count: 120 },
    { label: "Admins", count: 5 },
    { label: "Departments", count: 8 },
  ];

  const notices = [
    { title: "Exam Schedule Released", details: "Details about exams." },
    { title: "Holiday Announcement", details: "Details about holidays." },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    alert("Logged out!");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Welcome to Admin Dashboard</h1>

        {/* Logout Icon */}
        <div className="logout-container" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt logout-icon"></i>
          
        </div>
      </div>

      {/* Data Cards */}
      <div className="data-cards">
        {dataCounts.map((item, index) => (
          <div key={index} className="data-card">
            <div className="data-icon">{item.label.charAt(0)}</div>
            <div className="data-info">
              <h2>{item.label}</h2>
              <p>{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Calendar */}
        <div className="calendar-container">
          <Calendar onChange={onChange} value={value} />
        </div>

        {/* Notices */}
        <div className="notices-container">
          <div className="notices-header">
            {open && (
              <span className="back-button" onClick={() => setOpen(false)}>
                ↩ Back
              </span>
            )}
            <h1>Notices</h1>
          </div>
          <div className="notices-content">
            {!open ? (
              notices.map((notice, idx) => (
                <div
                  key={idx}
                  className="notice-item"
                  onClick={() => {
                    setOpen(true);
                    setOpenNotice(notice);
                  }}
                >
                  <h2>{notice.title}</h2>
                </div>
              ))
            ) : (
              <div className="notice-details">
                <h2>{openNotice.title}</h2>
                <p>{openNotice.details}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
