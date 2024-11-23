import React, { useState } from "react";
//import "../stylesheets/Notes.css";
import "../stylesheets/AcademicsDashboard.css";

const Notes = () => {
  const [notes, setNotes] = useState([
    { subject: "Mathematics", topic: "Algebra Basics", link: "#" },
    { subject: "Physics", topic: "Newton's Laws", link: "#" },
    { subject: "Chemistry", topic: "Periodic Table", link: "#" },
    { subject: "English", topic: "Grammar Rules", link: "#" },
  ]);

  const handleUpload = () => {
    alert("Upload functionality will be implemented here!");
  };

  return (
    <div className="notes-dashboard">
      <div className="notes-content">
        <h1 className="notes-title">NOTES</h1>
        <div className="upload-section">
          <button onClick={handleUpload} className="upload-button">
            Upload Notes
          </button>
        </div>
        <div className="notes-list">
          {notes.map((note, index) => (
            <div key={index} className="note-card">
              <div className="note-details">
                <span className="note-subject">{note.subject}</span>
                <span className="note-topic">{note.topic}</span>
              </div>
              <a href={note.link} className="download-link">
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
