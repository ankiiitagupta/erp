import React, { useState } from "react";
import "../stylesheets/AcademicsDashboard.css";
import markAttendanceIcon from "../../assets/AcademicDashboardsvg/meeting.png";
import showAttendanceIcon from "../../assets/AcademicDashboardsvg/meeting.png";
import MarkStudentAttendance from "./MarkStudentAttendance"; // Import the component

const StudentAttendance = ({ facultyID }) => {
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);

  const handleMarkAttendance = () => {
    setShowMarkAttendance(true); // Show the MarkStudentAttendance component
  };

  const handleShowAttendance = () => {
    alert("Show Attendance clicked!");
  };

  return (
    <div className="academics-dashboard">
      {showMarkAttendance ? (
        <MarkStudentAttendance facultyID={facultyID} />
      ) : (
        <>
          <h2 className="content-title">Attendance</h2>
          <div className="icon-grid">
            <div className="icon-card" onClick={handleMarkAttendance}>
              <img
                src={markAttendanceIcon}
                alt="Mark Attendance"
                className="icon"
              />
              <p>Mark Attendance</p>
            </div>
            <div className="icon-card" onClick={handleShowAttendance}>
              <img
                src={showAttendanceIcon}
                alt="Show Attendance"
                className="icon"
              />
              <p>Show Attendance</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentAttendance;
