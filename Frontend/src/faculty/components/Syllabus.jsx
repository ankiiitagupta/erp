import React, { useState } from "react";
//import "../stylesheets/Syllabus.css";
import "../stylesheets/AcademicsDashboard.css";

const Syllabus = () => {
  const subjects = [
    {
      name: "MATHEMATICS",
      subjectCode: "(SUBJECT CODE)",
      course: "BTECH-CSE",
      progress: 50,
    },
    {
      name: "PHYSICS",
      subjectCode: "(SUBJECT CODE)",
      course: "BTECH-CSE",
      progress: 40,
    },
    {
      name: "CHEMISTRY",
      subjectCode: "(SUBJECT CODE)",
      course: "BTECH-CSE",
      progress: 60,
    },
    {
      name: "ENGLISH",
      subjectCode: "(SUBJECT CODE)",
      course: "BTECH-CSE",
      progress: 70,
    },
  ];

  return (
    <div className="syllabus-dashboard">
      <div className="syllabus-content">
        <h1 className="syllabus-title">SYLLABUS</h1>
        {subjects.map((subject, index) => (
          <div key={index} className="subject-card">
            <div className="subject-details">
              <span className="subject-name">{subject.name}</span>
              <span className="subject-code">{subject.subjectCode}</span>
              <span className="course-code">{subject.course}</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
            <button className="update-progress-button">Update</button>
            <span className="progress-percentage">{subject.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Syllabus;
