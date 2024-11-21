import React, { useState, useEffect } from "react";

const ShowAttByClass = ({ setView }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Fetching courses and durations
    fetch("http://localhost:3006/api/courseandduration")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  useEffect(() => {
    // Fetching sections for the selected year
    if (selectedYear) {
      fetch(`http://localhost:3006/api/getsectionsofYear?yearofstudy=${selectedYear}`)
        .then((response) => response.json())
        .then((data) => setSections(data))
        .catch((err) => console.error("Error fetching sections:", err));
    }
  }, [selectedYear]);

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
    // Call the API to get the student attendance data based on selected parameters
    fetch(
      `http://localhost:3006/api/attendanceofallstudentsofsection?CourseName=${selectedCourse}&yearofstudy=${selectedYear}&section=${selectedSection}`
    )
      .then((response) => response.json())
      .then((data) => {
        setStudentList(data);
        console.log("Filtered Students:", data); // Debugging to check the fetched students
      })
      .catch((err) => console.error("Error fetching student data:", err));
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
          {courses.map((course) => (
            <option key={course.CourseName} value={course.CourseName}>
              {course.CourseName} ({course.Duration} Years)
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
            {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((year) => (
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
            {sections.map((section) => (
              <option key={section.Section} value={section.Section}>
                {section.Section}
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
              <li key={student.RollNO}>
                {student.RollNO}. {student.Stud_name} - Attendance: {student.AttendancePercentage}%
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
