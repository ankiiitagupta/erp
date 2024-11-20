import React, { useState } from "react";
import "../stylesheets/AcademicsDashboard.css";
import markAttendanceIcon from "../../assets/AcademicDashboardsvg/meeting.png";
import showAttendanceIcon from "../../assets/AcademicDashboardsvg/meeting.png";
import MarkStudentAttendance from "./MarkStudentAttendance";

const StudentAttendance = ({ facultyID }) => {
  const [view, setView] = useState("dashboard"); // Manage different views
  const [selectedSubjectSection, setSelectedSubjectSection] = useState("");
  const [students, setStudents] = useState([]); // State for students list
  const [sortOption, setSortOption] = useState(""); // State for sorting

  // Mock data for students
  const mockStudents = [
    { id: 1, name: "John Doe", attendance: 92 },
    { id: 2, name: "Jane Smith", attendance: 85 },
    { id: 3, name: "Emily Johnson", attendance: 73 },
    { id: 4, name: "Michael Brown", attendance: 48 },
    { id: 5, name: "Sarah Davis", attendance: 67 },
    { id: 6, name: "David Wilson", attendance: 81 },
    { id: 7, name: "Laura Martinez", attendance: 55 },
    { id: 8, name: "James Taylor", attendance: 95 },
  ];

  const handleMarkAttendance = () => {
    setView("markAttendance");
  };

  const handleShowAttendance = () => {
    setView("showAttendance");
  };

  const handleSubjectSectionChange = (event) => {
    const subjectSection = event.target.value;
    setSelectedSubjectSection(subjectSection);

    if (subjectSection) {
      // Load mock data when subject-section is selected
      setStudents(mockStudents);
      setSortOption("All"); // Default sort option
    } else {
      setStudents([]);
      setSortOption("");
    }
  };

  const handleViewStudents = () => {
    if (selectedSubjectSection) {
      setView("studentsList");
    } else {
      alert("Please select a subject and section first!");
    }
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    if (option) {
      let sortedStudents;

      switch (option) {
        case "All":
          sortedStudents = mockStudents; // Show all students
          break;
        case "More than 90":
          sortedStudents = mockStudents.filter(
            (student) => student.attendance > 90
          );
          break;
        case "Less than 90":
          sortedStudents = mockStudents.filter(
            (student) => student.attendance < 90
          );
          break;
        case "More than 75":
          sortedStudents = mockStudents.filter(
            (student) => student.attendance > 75
          );
          break;
        case "Less than 75":
          sortedStudents = mockStudents.filter(
            (student) => student.attendance < 75
          );
          break;
        case "More than 50":
          sortedStudents = mockStudents.filter(
            (student) => student.attendance > 50
          );
          break;
        case "Less than 50":
          sortedStudents = mockStudents.filter(
            (student) => student.attendance < 50
          );
          break;
        case "Low to High":
          sortedStudents = [...students].sort(
            (a, b) => a.attendance - b.attendance
          );
          break;
        case "High to Low":
          sortedStudents = [...students].sort(
            (a, b) => b.attendance - a.attendance
          );
          break;
        default:
          sortedStudents = students;
      }

      setStudents(sortedStudents);
    }
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
        <div className="show-attendance-page">
          <h2 className="content-title">Select Subject and Section</h2>
          <div className="dropdown-container">
            <label htmlFor="subjectSection">Subject & Section:</label>
            <select
              id="subjectSection"
              className="dropdown"
              value={selectedSubjectSection}
              onChange={handleSubjectSectionChange}
            >
              <option value="">Select Subject & Section</option>
              <option value="DSA (SEC-A)">DSA (SEC-A)</option>
              <option value="DSA (SEC-B)">DSA (SEC-B)</option>
              <option value="DSA (SEC-C)">DSA (SEC-C)</option>
              <option value="OS (SEC-B)">OS (SEC-B)</option>
              <option value="OS (SEC-C)">OS (SEC-C)</option>
              <option value="CN (SEC-A)">CN (SEC-A)</option>
            </select>
          </div>
          {selectedSubjectSection && (
            <>
              <p className="selected-section">
                Selected Subject & Section: {selectedSubjectSection}
              </p>
              <button className="btn-view" onClick={handleViewStudents}>
                View Students
              </button>
            </>
          )}
          <button className="btn-back" onClick={() => setView("dashboard")}>
            Back to Dashboard
          </button>
        </div>
      )}
      {view === "studentsList" && (
        <div className="students-list-page">
          <h2 className="content-title">
            LIST OF ALL STUDENTS - {selectedSubjectSection}
          </h2>
          <div className="sort-container">
            <label htmlFor="sort">Sort By Attendance:</label>
            <select
              id="sort"
              className="dropdown"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="All">All</option>
              <option value="More than 90">More than 90%</option>
              <option value="Less than 90">Less than 90%</option>
              <option value="More than 75">More than 75%</option>
              <option value="Less than 75">Less than 75%</option>
              <option value="More than 50">More than 50%</option>
              <option value="Less than 50">Less than 50%</option>
              <option value="Low to High">Low to High</option>
              <option value="High to Low">High to Low</option>
            </select>
          </div>
          <ul className="students-list">
            {students.map((student) => (
              <li key={student.id} className="student-item">
                {student.name} - {student.attendance}%
              </li>
            ))}
          </ul>
          <button className="btn-back" onClick={() => setView("showAttendance")}>
            Back to Subjects
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;