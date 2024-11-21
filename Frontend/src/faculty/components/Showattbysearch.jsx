import React, { useState } from "react";
import "../stylesheets/AcademicsDashboard.css"; // Same stylesheet for consistent styling

const SearchStudents = () => {
  const [searchValue, setSearchValue] = useState("");
  const [students, setStudents] = useState([]);

  // Fetch matching students from the backend
  const fetchStudents = async (query) => {
    try {
      const response = await fetch(`http://localhost:3006/api/searchstudentsbyname?query=${query}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Handle input change and fetch results dynamically
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchValue(query);

    if (query) {
      fetchStudents(query);
    } else {
      setStudents([]); // Clear results when input is empty
    }
  };

  return (
    <div className="show-attendance-page">
      <h2 className="content-title">Search Students</h2>
      <div className="search-bar-container">
        <label htmlFor="searchInput">Student Name:</label>
        <input
          id="searchInput"
          className="dropdown"
          type="text"
          placeholder="Enter student name"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      {students.length > 0 && (
        <div className="students-list">
          <h3>Search Results</h3>
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Contact</th>
                <th>Year</th>
                <th>Section</th>
                <th>Course</th>
                <th>Attendance (%)</th> {/* Added Attendance Column */}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.RollNO}>
                  <td>{student.Stud_name}</td>
                  <td>{student.RollNO}</td>
                  <td>{student.Stud_Contact}</td>
                  <td>{student.Stud_YearOfStudy}</td>
                  <td>{student.Section}</td>
                  <td>{student.CourseName}</td>
                  <td>
                    {student.AttendancePercentage
                      ? `${student.AttendancePercentage.toFixed(2)}%`
                      : "N/A"}
                  </td> {/* Display Attendance Percentage */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!students.length && searchValue && <p className="no-results">No students found.</p>}
    </div>
  );
};

export default SearchStudents;
