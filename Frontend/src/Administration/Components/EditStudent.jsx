import React, { useState, useEffect } from "react";
import "../stylesheets/EditStudent.css";
import axios from "axios";

const EditStudent = () => {
  const [studentList, setStudentList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [years] = useState(["1", "2", "3", "4"]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editData, setEditData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const [filterCriteria, setFilterCriteria] = useState({
    course: "",
    year: "",
    section: "",
  });

  // Calculate paginated data
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

   // Handle page change
   const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3006/api/courseandduration");
        setCourseList(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Fetch sections dynamically based on course and year
  useEffect(() => {
    const { course, year } = filterCriteria;
    if (course && year) {
      const fetchSections = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3006/api/getsectionsofYear?course=${course}&yearofstudy=${year}`
          );
          setSectionList(response.data);
        } catch (error) {
          console.error("Error fetching sections:", error);
        }
      };
      fetchSections();
    } else {
      setSectionList([]);
    }
  }, [filterCriteria.course, filterCriteria.year]);

  // Fetch students when search query changes
  useEffect(() => {
    if (searchQuery) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3006/api/searchstudentsbyname?query=${searchQuery}`
          );
          setStudentList(response.data);
          setFilteredStudents(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };
      fetchStudents();
    } else {
      setStudentList([]);
      setFilteredStudents([]);
    }
  }, [searchQuery]);

  // Apply filters to students
  const filterStudents = () => {
    const filtered = studentList.filter((student) => {
      const matchesCourse = filterCriteria.course ? student.CourseName === filterCriteria.course : true;
      const matchesYear = filterCriteria.year ? student.Stud_YearOfStudy.toString() === filterCriteria.year : true;
      const matchesSection = filterCriteria.section ? student.Section === filterCriteria.section : true;
      return matchesCourse && matchesYear && matchesSection;
    });
    setFilteredStudents(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    const updatedCriteria = { ...filterCriteria, [type]: value };

    if (type === "course" || type === "year") updatedCriteria.section = ""; // Reset section if course/year changes

    setFilterCriteria(updatedCriteria);
    filterStudents();
  };

  // Handle edit form input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited student
const handleSave = async () => {
  try {
    if (editData.Stud_DOB) {
      const dob = new Date(editData.Stud_DOB);
      editData.Stud_DOB = dob.toISOString().split('T')[0]; // Converts to 'YYYY-MM-DD'
    }
    // Filter out only editable fields based on the allowed keys in the API
    const allowedKeys = [
      "Stud_name",
      "Stud_Email",
      "Stud_Contact",
      "Stud_DOB",
      "Stud_Address",
      "Stud_EnrollmentStatus",
      "Stud_Gender",
      "Stud_GuardianDetails",
      "Stud_YearOfStudy",
      "Section",
    ];
    const updatedData = Object.fromEntries(
      Object.entries(editData).filter(([key]) => allowedKeys.includes(key))
    );

    await axios.put(
      `http://localhost:3006/api/updatestudent/${editData.RollNO}`,
      updatedData
    );

    alert("Student updated successfully!");
    setEditData(null);
    filterStudents();
  } catch (error) {
    console.error("Error saving student:", error);
    console.log(editData);
  }
};


// Remove a student
const handleRemove = async (rollNo) => {
  if (window.confirm("Are you sure you want to delete this student?")) {
    try {
      await axios.delete(`http://localhost:3006/api/deletestudent/${rollNo}`);
      setStudentList((prev) => prev.filter((student) => student.RollNO !== rollNo));
      filterStudents(); // Apply the filter again to refresh the displayed list
      alert("Student removed successfully!");
    } catch (error) {
      console.error("Error removing student:", error);
      alert("Failed to remove student. Please try again.");
    }
  }
};


  return (
    <div className="edit-student-container">
      <h2 className="edit-student-header">Student List</h2>

      {/* Filters */}
      <div className="edit-student-filters">
        <select
          className="edit-student-select"
          value={filterCriteria.course}
          onChange={(e) => handleFilterChange("course", e.target.value)}
        >
          <option value="">All Courses</option>
          {courseList.map((course) => (
            <option key={course.CourseName} value={course.CourseName}>
              {course.CourseName}
            </option>
          ))}
        </select>

        <select
          className="edit-student-select"
          value={filterCriteria.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          className="edit-student-select"
          value={filterCriteria.section}
          onChange={(e) => handleFilterChange("section", e.target.value)}
        >
          <option value="">All Sections</option>
          {sectionList.map((section) => (
            <option key={section.Section} value={section.Section}>
              {section.Section}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="edit-student-search"
          placeholder="Search by name or roll number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Student Table */}
      <table className="edit-student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Roll Number</th>
            <th>Course</th>
            <th>Section</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.map((student) => (
            <tr key={student.RollNO}>
              <td>{student.Stud_name}</td>
              <td>{student.Stud_Email}</td>
              <td>{student.Stud_Contact}</td>
              <td>{student.RollNO}</td>
              <td>{student.CourseName}</td>
              <td>{student.Section}</td>
              <td>{student.Stud_YearOfStudy}</td>
              <td>
                <button onClick={() => setEditData(student)}>Edit</button>
                <button onClick={() => handleRemove(student.RollNO)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={page === currentPage ? "active" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Edit Form */}
      {editData && (
        <div className="edit-student-form">
          <h3>Edit Student</h3>
          <form>
            {Object.keys(editData).map((key) =>
              key != "TotalAttendance" && key!= "TotalLectures" && key!= "AttendancePercentage" ? (
                <label key={key}>
                  {key}:
                  <input
                    type="text"
                    name={key}
                    value={editData[key]}
                    onChange={handleEditChange}
                  />
                </label>
              ) : null
            )}
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={() => setEditData(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditStudent;
