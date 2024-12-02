import React, { useState } from "react";
// import "../stylesheets/EditStudent.css";

const EditStudent = () => {
  // Sample student data
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
  const [editData, setEditData] = useState(null); // Stores the data being edited

  const [filterCriteria, setFilterCriteria] = useState({
    course: "",
    section: "",
    year: "",
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prev) => ({ ...prev, [name]: value }));

    // Filter students based on selected criteria
    const filtered = studentList.filter(
      (student) =>
        (value === "" || student[name] === value) &&
        (name === "course" || filterCriteria.course === "" || student.course === filterCriteria.course) &&
        (name === "section" || filterCriteria.section === "" || student.section === filterCriteria.section) &&
        (name === "year" || filterCriteria.year === "" || student.year === filterCriteria.year)
    );
    setFilteredStudents(filtered);
  };

  // Handle Edit
  const handleEdit = (id) => {
    const student = studentList.find((item) => item.id === id);
    setEditData(student);
  };

  // Handle Save after editing
  const handleSave = () => {
    setStudentList((prevList) =>
      prevList.map((item) =>
        item.id === editData.id ? { ...item, ...editData } : item
      )
    );
    setFilteredStudents((prevList) =>
      prevList.map((item) =>
        item.id === editData.id ? { ...item, ...editData } : item
      )
    );
    setEditData(null); // Clear the edit form
  };

  // Handle Remove
  const handleRemove = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (confirmed) {
      setStudentList((prevList) => prevList.filter((item) => item.id !== id));
      setFilteredStudents((prevList) =>
        prevList.filter((item) => item.id !== id)
      );
    }
  };

  // Handle Change in Edit Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="student-table-container">
      <h2>Student List</h2>

      <div className="filter-container">
        <label>Department:</label>
        <select
          name="course"
          value={filterCriteria.course}
          onChange={handleFilterChange}
        >
          <option value="">All Courses</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
        </select>

        <select
          name="section"
          value={filterCriteria.section}
          onChange={handleFilterChange}
        >
          <option value="">All Sections</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <select
          name="year"
          value={filterCriteria.year}
          onChange={handleFilterChange}
        >
          <option value="">All Years</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>

      <table className="student-table">
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
                  className="edit-btn"
                  onClick={() => handleEdit(student.id)}
                >
                  Edit
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(student.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editData && (
        <div className="edit-form-container">
          <h3>Edit Student</h3>
          <form className="edit-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Contact:
              <input
                type="text"
                name="contact"
                value={editData.contact}
                onChange={handleChange}
              />
            </label>
            <label>
              Roll Number:
              <input
                type="text"
                name="rollNumber"
                value={editData.rollNumber}
                onChange={handleChange}
              />
            </label>
            <label>
              Course:
              <input
                type="text"
                name="course"
                value={editData.course}
                onChange={handleChange}
              />
            </label>
            <label>
              Section:
              <input
                type="text"
                name="section"
                value={editData.section}
                onChange={handleChange}
              />
            </label>
            <label>
              Year:
              <input
                type="text"
                name="year"
                value={editData.year}
                onChange={handleChange}
              />
            </label>
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
