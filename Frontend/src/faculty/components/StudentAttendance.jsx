import React, { useState, useEffect } from "react";
import "../stylesheets/AcademicsDashboard.css";
import markAttendanceIcon from "../../assets/AcademicDashboardsvg/Markatt1.png";
import showAttendanceBySubjectIcon from "../../assets/AcademicDashboardsvg/Markatt2.png";
import showAttendanceByClassIcon from "../../assets/AcademicDashboardsvg/markatt6.png";
import showAttendanceBySearchIcon from "../../assets/AcademicDashboardsvg/Markatt4.png";
import MarkStudentAttendance from "./MarkStudentAttendance";
import ShowAttBySub from "./showattbysub";
import ShowAttByClass from "./Showattbyclass";
import ShowAttBySearch from "./Showattbysearch";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../RoleContext.jsx";

import EventList from "./eventattendance/eventlist.jsx";

const StudentAttendance = ({ facultyID, resetFlags }) => {
  const [view, setView] = useState("Attendance");
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useRole();

  useEffect(() => {
    const handlePopState = (event) => {
      const viewFromHistory = event.state?.view || "Attendance";
      console.log("Current View:", view);
      console.log("History View:", viewFromHistory);
      if (viewFromHistory === "Attendance" && view === "Attendance") {
        resetFlags();
        navigate(`/facultydashboard/${facultyID}`);
      } else {
        setView(() => {
          console.log("Updated View:", viewFromHistory);
          return viewFromHistory;
        });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [view, facultyID]);

  const updateView = (newView) => {
    setView(newView);
    window.history.pushState({ view: newView }, "", newView.toLowerCase());
  };

  return (
    <div className="academics-dashboard">
      {view === "Attendance" && (
        <>
          <h2 className="content-title">Attendance</h2>
          <div className="icon-grid-2">
            <div className="icon-card" onClick={() => updateView("markAttendance")}>
              <img src={markAttendanceIcon} alt="Mark Attendance" className="icon" />
              <p>Mark Attendance</p>
            </div>
            <div className="icon-card" onClick={() => updateView("showAttendanceBySubject")}>
              <img src={showAttendanceBySubjectIcon} alt="Show Attendance by Subject" className="icon" />
              <p>Show Attendance by Subject</p>
            </div>
            {selectedRole === "hod" && (
              <>
                <div className="icon-card" onClick={() => updateView("showAttendanceByClass")}>
                  <img src={showAttendanceByClassIcon} alt="Show Attendance by Class" className="icon" />
                  <p>Show Attendance by Class</p>
                </div>
                <div className="icon-card" onClick={() => updateView("showAttendanceBySearch")}>
                  <img src={showAttendanceBySearchIcon} alt="Show Attendance by Search" className="icon" />
                  <p>Show Attendance by Search</p>
                </div>
              </>
            )}
            {selectedRole === "coordinator" && (
              <>
                <div className="icon-card" onClick={() => updateView("eventAttendance")}>
                  <img src={showAttendanceByClassIcon} alt="Event Attendance" className="icon" />
                  <p>Event Attendance</p>

                </div>
              </>
            )}



          </div>
        </>
      )}
      {view === "markAttendance" && <MarkStudentAttendance facultyID={facultyID} />}
      {view === "showAttendanceBySubject" && (
        <ShowAttBySub facultyID={facultyID} setView={setView} />
      )}
      {view === "showAttendanceByClass" && <ShowAttByClass setView={setView} />}
      {view === "showAttendanceBySearch" && <ShowAttBySearch setView={setView} />}
      {view === "eventAttendance" && <EventList facultyID={facultyID} />}

    </div>
  );
};

export default StudentAttendance;
