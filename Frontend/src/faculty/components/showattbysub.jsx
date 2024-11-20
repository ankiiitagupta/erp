import React, { useState } from "react";
import "../stylesheets/AcademicsDashboard.css";

const ShowAttBySub = ({ setView }) => {  // Updated component name to match the import
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

  const handleSubjectSectionChange = (event) => {
    const subjectSection = event.target.value;
    setSelectedSubjectSection(subjectSection);

    if (subjectSection) {
      // Load mock data when subject-section is selected
      setStudents(mockStudents);
    } else {
      setStudents([]);
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

    let sortedStudents = [...students];
    switch (option) {
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
      case "Low to High":
        sortedStudents = sortedStudents.sort(
          (a, b) => a.attendance - b.attendance
        );
        break;
      case "High to Low":
        sortedStudents = sortedStudents.sort(
          (a, b) => b.attendance - a.attendance
        );
        break;
      default:
        sortedStudents = students;
    }

    setStudents(sortedStudents);
  };

  return (
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
  );
};

export default ShowAttBySub;
