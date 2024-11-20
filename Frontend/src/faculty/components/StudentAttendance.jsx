import React, { useState } from "react";
import "../stylesheets/AcademicsDashboard.css";
import markAttendanceIcon from "../../assets/AcademicDashboardsvg/meeting.png";
import showAttendanceIcon from "../../assets/AcademicDashboardsvg/meeting.png";
import MarkStudentAttendance from "./MarkStudentAttendance"; // Import the component
import ShowAttBySub from "./showattbysub"; // Corrected import

const StudentAttendance = ({ facultyID }) => {
  const [view, setView] = useState("dashboard");

  const handleMarkAttendance = () => {
    setView("markAttendance");
  };

  const handleShowAttendance = () => {
    setView("showAttendance");
  };

  return (
    <div className="academics-dashboard">
      {view === "dashboard" && (
        <>
          <h2 className="content-title">Attendance</h2>
          <div className="icon-grid-2">
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
      {view === "markAttendance" && (
        <MarkStudentAttendance facultyID={facultyID} />
      )}
      {view === "showAttendance" && (
        <ShowAttBySub facultyID={facultyID} setView={setView} /> // Corrected component name
      )}
    </div>
  );
};

export default StudentAttendance;
