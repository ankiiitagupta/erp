import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "../stylesheets/AcademicsDashboard.css";
import "../stylesheets/ShowAttByClass.css";
import { API_URL } from "../../axios";

const exportToExcel = (students) => {
  const formattedData = students.map((student) => {
    return {
      Name: student.Stud_name,
      "Roll Number": student.RollNO,
      "Year of Study": student.Stud_YearOfStudy,
      Section: student.Section,
      "Attendance %": student.AttendancePercentage,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students Attendance");

  XLSX.writeFile(workbook, "Students_Attendance.xlsx");
};

const ShowAttByClass = ({ setView }) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseDuration, setSelectedCourseDuration] = useState(0); // New state for course duration
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [sortOption, setSortOption] = useState("");

  // Fetching courses
  useEffect(() => {
    fetch(`${API_URL}/api/courseandduration`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Fetching sections for selected year
  useEffect(() => {
    if (selectedYear) {
      fetch(`${API_URL}/api/getsectionsofYear?yearofstudy=${selectedYear}`)
        .then((response) => response.json())
        .then((data) => setSections(data))
        .catch((err) => console.error("Error fetching sections:", err));
    }
  }, [selectedYear]);

  // Fetch students whenever course, year, or section changes
  useEffect(() => {
    if (selectedCourse && selectedYear && selectedSection) {
      fetch(
        `${API_URL}/api/attendanceofallstudentsofsection?CourseName=${selectedCourse}&yearofstudy=${selectedYear}&section=${selectedSection}`
      )
        .then((response) => response.json())
        .then((data) => setStudents(data))
        .catch((err) => console.error("Error fetching students:", err));
    }
  }, [selectedCourse, selectedYear, selectedSection]);

  const handleCourseChange = (event) => {
    const courseName = event.target.value;
    setSelectedCourse(courseName);
    setSelectedYear("");
    setSelectedSection("");

    const course = courses.find((c) => c.CourseName === courseName);
    setSelectedCourseDuration(course ? course.Duration : 0); // Update course duration
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedSection("");
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedStudents = [...students];
    switch (option) {
      case "More than 90":
        sortedStudents = students.filter(
          (student) => student.AttendancePercentage > 90
        );
        break;
      case "Less than 90":
        sortedStudents = students.filter(
          (student) => student.AttendancePercentage < 90
        );
        break;
      case "Low to High":
        sortedStudents = sortedStudents.sort(
          (a, b) => a.AttendancePercentage - b.AttendancePercentage
        );
        break;
      case "High to Low":
        sortedStudents = sortedStudents.sort(
          (a, b) => b.AttendancePercentage - a.AttendancePercentage
        );
        break;
      default:
        sortedStudents = students;
    }

    setStudents(sortedStudents);
  };

  return (
    <div className="show-attendance-by-class">
      <h2 class="txt-showatt">Show Attendance by Class</h2>

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
            {Array.from({ length: selectedCourseDuration }, (_, i) => `${i + 1} Year`).map((year) => (
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

      {/* Display Student List */}
      {students.length > 0 ? (
        <div className="students-list">
          <div className="students-list-header">
            <h3>Student List</h3>
            <div className="sort-container">
              <label htmlFor="sort" className="sr-only">
                Sort By:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="sort-dropdown"
              >
                <option value="">sort by</option>
                <option value="More than 90">More than 90% Attendance</option>
                <option value="Less than 90">Less than 90% Attendance</option>
                <option value="Low to High">Attendance (Low to High)</option>
                <option value="High to Low">Attendance (High to Low)</option>
              </select>
            </div>
          </div>
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Year</th>
                <th>Section</th>
                <th>Attendance (%)</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.RollNO}>
                  <td>{student.Stud_name}</td>
                  <td>{student.RollNO}</td>
                  <td>{student.Stud_YearOfStudy}</td>
                  <td>{student.Section}</td>
                  <td>{student.AttendancePercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        selectedSection &&
        students.length === 0 && <p>No students found for this selection.</p>
      )}

      {/* Button Container */}
      <div className="button-container">
      <button onClick={() => exportToExcel(students)} className="export-btn">
            Export to Excel
          </button>
        <button onClick={() => setView("dashboard")} className="back-button">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ShowAttByClass;
