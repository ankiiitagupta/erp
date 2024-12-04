import React, { useState } from "react";
import "../stylesheets/EditStudent.css";

const EditStudent = () => {
  const [studentList, setStudentList] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      contact: "1234567890",
      rollNumber: "CS101",
      course: "Computer Science",
      section: "A",
      year: "1",
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob.williams@example.com",
      contact: "0987654321",
      rollNumber: "MT202",
      course: "Mathematics",
      section: "B",
      year: "2",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      contact: "1230984567",
      rollNumber: "CS102",
      course: "Computer Science",
      section: "A",
      year: "2",
    },
  ]);

  const [filteredStudents, setFilteredStudents] = useState(studentList);
  const [searchQuery, setSearchQuery] = useState("");
  const [editData, setEditData] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    course: "",
    yearSection: "",
  });

  // Filter students dynamically based on criteria
  const filterStudents = (criteria) => {
    const filtered = studentList.filter((student) =>
      Object.keys(criteria).every(
        (key) =>
          criteria[key] === "" ||
          (key === "yearSection"
            ? `${student.year}/${student.section}` === criteria[key]
            : student[key] === criteria[key])
      )
    );
    setFilteredStudents(filtered);
  };

  // Update filter criteria and trigger filtering
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedCriteria = { ...filterCriteria, [name]: value };
    setFilterCriteria(updatedCriteria);
    filterStudents(updatedCriteria);
  };

  // Handle search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = studentList.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.rollNumber.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  // Handle edit functionality
  const handleEdit = (id) => {
    const student = studentList.find((item) => item.id === id);
    setEditData(student);
  };

  // Save updated data
  const handleSave = () => {
    setStudentList((prev) =>
      prev.map((student) =>
        student.id === editData.id ? { ...student, ...editData } : student
      )
    );
    filterStudents(filterCriteria); // Update filtered list
    setEditData(null); // Close edit form
  };

  // Remove student from the list
  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudentList((prev) => prev.filter((student) => student.id !== id));
      setFilteredStudents((prev) =>
        prev.filter((student) => student.id !== id)
      );
    }
  };

  // Handle form change during editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="edit-student-container">
      <h2 className="edit-student-header">Student List</h2>

      {/* Filters - Course, Year/Section, and Search on the same row */}
      <div className="edit-student-filter-container">
        <div className="edit-student-dropdowns">
          <select
            name="course"
            className="edit-student-select"
            value={filterCriteria.course}
            onChange={handleFilterChange}
          >
            <option value="">All Courses</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
          </select>

          <select
            name="yearSection"
            className="edit-student-select"
            value={filterCriteria.yearSection}
            onChange={handleFilterChange}
          >
            <option value="">All Year/Sections</option>
            <option value="1/A">1/A</option>
            <option value="2/B">2/B</option>
            <option value="2/A">2/A</option>
          </select>

          <div className="edit-student-searchbar-container">
            <i className="edit-student-searchbar-icon">🔍</i>
            <input
              type="text"
              className="edit-student-searchbar-input"
              placeholder="Search by name or roll number"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
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
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.contact}</td>
              <td>{student.rollNumber}</td>
              <td>{student.course}</td>
              <td>{student.section}</td>
              <td>{student.year}</td>
              <td>
                <button
                  className="edit-student-edit-btn"
                  onClick={() => handleEdit(student.id)}
                >
                  Edit
                </button>
                <button
                  className="edit-student-remove-btn"
                  onClick={() => handleRemove(student.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editData && (
        <div className="edit-student-edit-form-container">
          <h3>Edit Student</h3>
          <form className="edit-student-edit-form">
            {Object.keys(editData).map((key) =>
              key !== "id" ? (
                <label key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                  <input
                    type="text"
                    name={key}
                    value={editData[key]}
                    onChange={handleChange}
                  />
                </label>
              ) : null
            )}
            <button
              className="edit-student-save-btn"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="edit-student-cancel-btn"
              type="button"
              onClick={() => setEditData(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditStudent;
