import React, { useState } from "react";
//import "../stylesheets/ShowAttByClass.css";

const ShowAttByClass = ({ setView }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [studentList, setStudentList] = useState([]);

  // Mock student data with attendance
  const mockStudentData = [
    { id: 1, name: "Alice Johnson", course: "B.TECH", year: "1st Year", section: "A", attendance: "95%" },
    { id: 2, name: "Bob Smith", course: "B.TECH", year: "1st Year", section: "A", attendance: "85%" },
    { id: 3, name: "Charlie Brown", course: "B.TECH", year: "2nd Year", section: "B", attendance: "90%" },
    { id: 4, name: "David Miller", course: "BBA", year: "2nd Year", section: "C", attendance: "88%" },
    { id: 5, name: "Eve Davis", course: "MCA", year: "2nd Year", section: "D", attendance: "92%" },
    { id: 6, name: "Frank Wilson", course: "BCA", year: "3rd Year", section: "B", attendance: "80%" },
    { id: 7, name: "Grace Lee", course: "MBA", year: "1st Year", section: "A", attendance: "75%" },
    { id: 8, name: "Hannah Moore", course: "BBA", year: "1st Year", section: "A", attendance: "85%" },
    { id: 9, name: "Isaac Wright", course: "B.TECH", year: "4th Year", section: "D", attendance: "89%" },
    { id: 10, name: "Jack Hill", course: "B.TECH", year: "3rd Year", section: "C", attendance: "82%" },
  ];

  const courseYearOptions = {
    "B.TECH": ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    BBA: ["1st Year", "2nd Year", "3rd Year"],
    BCA: ["1st Year", "2nd Year", "3rd Year"],
    MBA: ["1st Year", "2nd Year"],
    MCA: ["1st Year", "2nd Year"],
  };

  const sectionOptions = ["A", "B", "C", "D"];

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setSelectedYear("");
    setSelectedSection("");
    setStudentList([]);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedSection("");
    setStudentList([]);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleShowList = () => {
    const filteredStudents = mockStudentData.filter(
      (student) =>
        student.course === selectedCourse &&
        student.year === selectedYear &&
        student.section === selectedSection
    );
    setStudentList(filteredStudents);

    console.log("Filtered Students:", filteredStudents); // Debugging to check the matched students
    console.log("Selected Course:", selectedCourse);
    console.log("Selected Year:", selectedYear);
    console.log("Selected Section:", selectedSection);
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
  };

  return (
    <div className="show-attendance-by-class">
      <h2>Show Attendance by Class</h2>

      {/* Course Dropdown */}
      <div className="dropdown-container">
        <label htmlFor="courseDropdown">Select Course:</label>
        <select
          id="courseDropdown"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="" disabled>
            Choose a course
          </option>
          {Object.keys(courseYearOptions).map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {/* Year Dropdown */}
      {selectedCourse && (
        <div className="dropdown-container">
          <label htmlFor="yearDropdown">Select Year:</label>
          <select
            id="yearDropdown"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="" disabled>
              Choose a year
            </option>
            {courseYearOptions[selectedCourse].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Section Dropdown */}
      {selectedYear && (
        <div className="dropdown-container">
          <label htmlFor="sectionDropdown">Select Section:</label>
          <select
            id="sectionDropdown"
            value={selectedSection}
            onChange={handleSectionChange}
          >
            <option value="" disabled>
              Choose a section
            </option>
            {sectionOptions.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Show List Button */}
      {selectedSection && (
        <button onClick={handleShowList} className="show-list-button">
          Show List
        </button>
      )}

      {/* Display Student List */}
      {studentList.length > 0 ? (
        <div className="student-list">
          <h3>Student List</h3>
          <ul>
            {studentList.map((student) => (
              <li key={student.id}>
                {student.id}. {student.name} - Attendance: {student.attendance}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        selectedSection &&
        studentList.length === 0 && <p>No students found for this selection.</p>
      )}

      <button onClick={handleBackToDashboard} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
};

export default ShowAttByClass;
