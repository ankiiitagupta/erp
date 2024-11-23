import React, { useState } from "react";
//import "../stylesheets/Assignments.css";
import "../stylesheets/AcademicsDashboard.css";

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    { subject: "Mathematics", assignmentTitle: "Algebra Assignment", dueDate: "2024-11-30", link: "#" },
    { subject: "Physics", assignmentTitle: "Newton's Laws Assignment", dueDate: "2024-12-05", link: "#" },
    { subject: "Chemistry", assignmentTitle: "Periodic Table Assignment", dueDate: "2024-12-10", link: "#" },
    { subject: "English", assignmentTitle: "Grammar Assignment", dueDate: "2024-12-15", link: "#" },
  ]);

  const handleUpload = () => {
    alert("Upload functionality will be implemented here!");
  };

  return (
    <div className="assignments-dashboard">
      <div className="assignments-content">
        <h1 className="assignments-title">ASSIGNMENTS</h1>
        <div className="upload-section">
          <button onClick={handleUpload} className="upload-button">
            Upload Assignment
          </button>
        </div>
        <div className="assignments-list">
          {assignments.map((assignment, index) => (
            <div key={index} className="assignment-card">
              <div className="assignment-details">
                <span className="assignment-subject">{assignment.subject}</span>
                <span className="assignment-title">{assignment.assignmentTitle}</span>
                <span className="assignment-due-date">Due: {assignment.dueDate}</span>
              </div>
              <a href={assignment.link} className="download-link">
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
