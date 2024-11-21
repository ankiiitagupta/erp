import React, { useState } from "react";

const studentsData = [
  { name: "John Doe", rollNumber: "101", attendancePercentage: 85 },
  { name: "Jane Smith", rollNumber: "102", attendancePercentage: 90 },
  { name: "John Doe", rollNumber: "103", attendancePercentage: 75 },
  { name: "Alice Johnson", rollNumber: "104", attendancePercentage: 95 },
  { name: "John Doe", rollNumber: "105", attendancePercentage: 80 },
];

const ShowAttBySearch = ({ setView }) => {
  const [searchOption, setSearchOption] = useState(""); // To track dropdown selection
  const [searchValue, setSearchValue] = useState(""); // To track the input value for search
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Handle dropdown change (Search by Name or Roll Number)
  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
    setSearchValue(""); // Clear previous search results
    setFilteredStudents([]); // Reset filtered students when dropdown changes
  };

  // Handle search value change
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Handle search functionality
  const handleSearch = () => {
    let results = [];

    if (searchOption === "name") {
      results = studentsData.filter((student) =>
        student.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else if (searchOption === "rollNumber") {
      results = studentsData.filter((student) =>
        student.rollNumber.includes(searchValue)
      );
    }

    setFilteredStudents(results);
  };

  return (
    <div className="search-attendance-page">
      <h2 className="content-title">Show Attendance by Search</h2>

      <div className="search-options">
        <label htmlFor="searchBy">Search by:</label>
        <select id="searchBy" value={searchOption} onChange={handleSearchOptionChange}>
          <option value="">Select an option</option>
          <option value="name">By Name</option>
          <option value="rollNumber">By Roll Number</option>
        </select>
      </div>

      {searchOption && (
        <div className="search-input">
          <label htmlFor="searchInput">{searchOption === "name" ? "Enter Name:" : "Enter Roll Number:"}</label>
          <input
            type="text"
            id="searchInput"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={searchOption === "name" ? "Enter student's name" : "Enter roll number"}
          />
        </div>
      )}

      <button onClick={handleSearch}>Search</button>

      {filteredStudents.length > 0 ? (
        <div className="student-list">
          <h3>Search Results:</h3>
          <ul>
            {filteredStudents.map((student, index) => (
              <li key={index}>
                <strong>{student.name}</strong> (Roll No: {student.rollNumber}) - 
                Attendance: {student.attendancePercentage}%
              </li>
            ))}
          </ul>
        </div>
      ) : (
        searchValue && <p>No students found with the {searchOption === "name" ? "name" : "roll number"} "{searchValue}".</p>
      )}

      <button onClick={() => setView("dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default ShowAttBySearch;
