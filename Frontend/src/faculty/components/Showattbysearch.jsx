import React, { useState } from "react";
import "../stylesheets/AcademicsDashboard.css"; // Same stylesheet for consistent styling
import * as XLSX from "xlsx"; // Import xlsx library for Excel generation
import { API_URL } from "../../axios";
import "../stylesheets/ShowAttBySearch.css"; 

const SearchStudents = () => {
  const [searchValue, setSearchValue] = useState("");
  const [students, setStudents] = useState([]);

  // Fetch matching students from the backend
  const fetchStudents = async (query) => {
    try {
      const response = await fetch(`${API_URL}/api/searchstudentsbyname?query=${query}`);
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

  // Function to generate and download Excel sheet
  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students); // Convert students data to a sheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Students"); // Append the sheet to the workbook
    XLSX.writeFile(wb, "students_data.xlsx"); // Trigger the file download
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
          {/* Button to generate Excel sheet */}
          <button onClick={generateExcel} className="download-button">
            Download as Excel
          </button>
        </div>
      )}
      {!students.length && searchValue && <p className="no-results">No students found.</p>}
    </div>
  );
};

export default SearchStudents;
