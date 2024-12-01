import React, { useState } from "react";
import "../stylesheets/AcademicsDashboard.css";
import Syllabus from "./Syllabus"; // Import the Syllabus component
import Marks from "./Marks"; // Import the Marks component
import Notes from "./Notes"; // Import the Notes component
import Assignments from "./Assignments"; // Import the Assignments component
import Projects from "./Projects"; // Import the Projects component
import Meetings from "./Meetings"; // Import the Meetings component
import noteclip from "../../assets/AcademicDashboardsvg/noteclip.png";
import syllabus from "../../assets/AcademicDashboardsvg/syllabus.png";
import Marksclip from "../../assets/AcademicDashboardsvg/Markclip.png";
import Assignment from "../../assets/AcademicDashboardsvg/Assignment.png";
import ProjectsIcon from "../../assets/AcademicDashboardsvg/Projects.png"; // Project Icon
import meeting from "../../assets/AcademicDashboardsvg/meeting.png";
import MarksOverALL from "./Marksoverall";

const AcademicsDashboard = ({facultyID}) => {
  const [showMarks, setShowMarks] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showMeetings, setShowMeetings] = useState(false);

  return (
    <div className="academics-dashboard">
      {showMarks ? (
        <MarksOverALL facultyID={facultyID}/>
      ) : showSyllabus ? (
        <Syllabus />
      ) : showNotes ? (
        <Notes />
      ) : showAssignments ? (
        <Assignments />
      ) : showProjects ? (
        <Projects />
      ) : showMeetings ? (
        <Meetings />
      ) : (
        <div className="main-contentfac">
          <h2 className="content-title">ACADEMICS</h2>
          <div className="icon-grid">
            <div className="icon-card" onClick={() => setShowMarks(true)}>
              <img src={Marksclip} alt="Marks" className="icon" />
              <p>MARKS</p>
              <span className="tooltip">
                View and update Student marks for each course
              </span>
            </div>

            <div className="icon-card" onClick={() => setShowSyllabus(true)}>
              <img src={syllabus} alt="Syllabus" className="icon" />
              <p>SYLLABUS</p>
              <span className="tooltip">
                Access syllabus and update completed Syllabus
              </span>
            </div>

            <div className="icon-card" onClick={() => setShowNotes(true)}>
              <img src={noteclip} alt="Notes" className="icon" />
              <p>NOTES</p>
              <span className="tooltip">Download and Provide class notes</span>
            </div>

            <div className="icon-card" onClick={() => setShowAssignments(true)}>
              <img src={Assignment} alt="Assignments" className="icon" />
              <p>ASSIGNMENTS</p>
              <span className="tooltip">Give and review assignments</span>
            </div>

            <div className="icon-card" onClick={() => setShowProjects(true)}>
              <img src={ProjectsIcon} alt="Projects" className="icon" />
              <p>PROJECTS</p>
              <span className="tooltip">
                Guide and track project deliverables
              </span>
            </div>

            <div className="icon-card" onClick={() => setShowMeetings(true)}>
              <img src={meeting} alt="Meetings" className="icon" />
              <p>MEETINGS</p>
              <span className="tooltip">
                Schedule or view upcoming meetings with faculty, parents or
                students.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicsDashboard;
