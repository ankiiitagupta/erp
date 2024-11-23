import React, { useState } from "react";
import "../stylesheets/AcademicsDashboard.css";
import markAttendanceIcon from "../../assets/AcademicDashboardsvg/Markatt1.png";
import showAttendanceBySubjectIcon from "../../assets/AcademicDashboardsvg/Markatt2.png";
import showAttendanceByClassIcon from "../../assets/AcademicDashboardsvg/markatt6.png"; // Placeholder icon
import showAttendanceBySearchIcon from "../../assets/AcademicDashboardsvg/Markatt4.png"; // Placeholder for search icon
import MarkStudentAttendance from "./MarkStudentAttendance"; // Import the component
import ShowAttBySub from "./showattbysub"; // Corrected import
import ShowAttByClass from "./Showattbyclass"; // New component import
import ShowAttBySearch from "./Showattbysearch"; // New search page component import

const StudentAttendance = ({ facultyID }) => {
  const [view, setView] = useState("dashboard");

  const handleMarkAttendance = () => {
    setView("markAttendance");
  };

  const handleShowAttendanceBySubject = () => {
    setView("showAttendanceBySubject");
  };

  const handleShowAttendanceByClass = () => {
    setView("showAttendanceByClass");
  };

  const handleShowAttendanceBySearch = () => {
    setView("showAttendanceBySearch");
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
            <div className="icon-card" onClick={handleShowAttendanceBySubject}>
              <img
                src={showAttendanceBySubjectIcon}
                alt="Show Attendance by Subject"
                className="icon"
              />
              <p>Show Attendance by Subject</p>
            </div>
            <div className="icon-card" onClick={handleShowAttendanceByClass}>
              <img
                src={showAttendanceByClassIcon}
                alt="Show Attendance by Class"
                className="icon"
              />
              <p>Show Attendance by Class</p>
            </div>
            <div className="icon-card" onClick={handleShowAttendanceBySearch}>
              <img
                src={showAttendanceBySearchIcon}
                alt="Show Attendance by Search"
                className="icon"
              />
              <p>Show Attendance by Search</p>
            </div>
          </div>
        </>
      )}
      {view === "markAttendance" && (
        <MarkStudentAttendance facultyID={facultyID} />
      )}
      {view === "showAttendanceBySubject" && (
        <ShowAttBySub facultyID={facultyID} setView={setView} />
      )}
      {view === "showAttendanceByClass" && (
        <ShowAttByClass setView={setView} />
      )}
      {view === "showAttendanceBySearch" && (
        <ShowAttBySearch setView={setView} />
      )}
    </div>
  );
};

export default StudentAttendance;
