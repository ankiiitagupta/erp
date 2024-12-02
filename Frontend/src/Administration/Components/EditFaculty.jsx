import React, { useState } from "react";
import "../stylesheets/EditFaculty.css";

const EditFaculty = () => {
  // Sample faculty data
  const [facultyList, setFacultyList] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "1234567890",
      department: "Computer Science",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      contact: "0987654321",
      department: "Mathematics",
    },
  ]);

  const [editData, setEditData] = useState(null); // Stores the data being edited

  // Handle Edit
  const handleEdit = (id) => {
    const faculty = facultyList.find((item) => item.id === id);
    setEditData(faculty);
  };

  // Handle Save after editing
  const handleSave = () => {
    setFacultyList((prevList) =>
      prevList.map((item) =>
        item.id === editData.id ? { ...item, ...editData } : item
      )
    );
    setEditData(null); // Clear the edit form
  };

  // Handle Remove
  const handleRemove = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this faculty?");
    if (confirmed) {
      setFacultyList((prevList) => prevList.filter((item) => item.id !== id));
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
    <div className="faculty-table-container">
      <h2>Faculty List</h2>
      <table className="faculty-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facultyList.map((faculty) => (
            <tr key={faculty.id}>
              <td>{faculty.name}</td>
              <td>{faculty.email}</td>
              <td>{faculty.contact}</td>
              <td>{faculty.department}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(faculty.id)}
                >
                  Edit
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(faculty.id)}
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
          <h3>Edit Faculty</h3>
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
              Department:
              <input
                type="text"
                name="department"
                value={editData.department}
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

export default EditFaculty;
