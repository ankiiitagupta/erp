import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/MarkStudentAttendance.css";

const MarkStudentAttendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLecture, setSelectedLecture] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const students = [
    { name: "ALICE", id: "214452200035" , fname:"Ram"},
    { name: "BECCA", id: "214452200036", fname:"Sunny" },
  ];

  const course = ["Btech-CS-A1", "BTech-CS-A2", "BTech-AIML"];
  const lectures = Array.from({ length: 8 }, (_, i) => i + 1);
  const subjects=["english","physics","computer"]

  // Filter students based on the search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.includes(searchTerm)
  );

  return (
    <div className="attendance-container">
      <div className="attendance-inner">
        <h2 className="attendance-title">STUDENT ATTENDANCE</h2>
        <div className="components-select">
          <label>
            Lecture Number:
            <select
              className="select-dropdown"
              value={selectedLecture}
              onChange={(e) => setSelectedLecture(e.target.value)}
            >
              <option value="">SELECT</option>
              {lectures.map((lec, index) => (
                <option key={index} value={lec}>{lec}</option>
              ))}
            </select>
          </label>
          <label classname='date-container'>
            <p>Date:</p>
            <input
              type="date"
              className="form-value"
              onChange={(e) => setSelectedDate(e.target.value)}
              value={selectedDate} // Bind the selected date value
            />
          </label>
          <label>
            Course & Section:
            <select
              className="select-dropdown"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">SELECT</option>
              {course.map((crse, index) => (
                <option key={index} value={crse}>{crse}</option>
              ))}
            </select>
          </label>
          <label>
            Subject:
            <select
              className="select-dropdown"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">SELECT</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="search-bar" style={{ textAlign: 'right' }}>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="student-list">
          <h3>STUDENT LIST:</h3>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <div key={index} className="student-item">
                <div className="avatar"></div>
                <div className="student-info">
                  <p className="student-name">{student.name}</p>
                  <p className="student-id">{student.id}</p>
                  <p className="student-fname">{student.fname}</p>

                </div>
                <div className="attendance-options">
                  <label>
                    <input type="radio" name={`attendance-${index}`} value="present" /> Present
                  </label>
                  <label>
                    <input type="radio" name={`attendance-${index}`} value="absent" defaultChecked /> Absent
                  </label>
                </div>
              </div>
            ))
          ) : (
            <p>No students found</p>
          )}
        </div>
        <div className="btns">
        <button className="reset">Reset</button>
        <button className="edit">Edit</button>
        <button className="submit" type="submit">Submit</button>
        </div>
        
        
      </div>
    </div>
  );
};

export default MarkStudentAttendance;
