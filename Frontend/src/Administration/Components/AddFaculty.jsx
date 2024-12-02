import React, { useState } from "react";
import "../stylesheets/AddFaculty.css";

const AddFaculty = ({ addFaculty }) => {
  const [formData, setFormData] = useState({
    facultyName: "",
    facultyEmail: "",
    facultyContact: "",
    facultyDepartmentID: "",
    facultyHireDate: "",
    facultyDesignation: "",
    facultySalary: "",
    facultyQualification: "",
    loginID: "",
    passwordHash: "",
    facultyJoiningDate: "",
    facultyEmployeeStatus: "",
    facultyAlias: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFaculty = {
      name: formData.facultyName,
      department: formData.facultyDepartmentID, // Assuming department ID is the department name
      subject: formData.facultyDesignation, // Assuming designation is the subject
    };
    addFaculty(newFaculty); // Add the new faculty to the list
    setFormData({
      facultyName: "",
      facultyEmail: "",
      facultyContact: "",
      facultyDepartmentID: "",
      facultyHireDate: "",
      facultyDesignation: "",
      facultySalary: "",
      facultyQualification: "",
      loginID: "",
      passwordHash: "",
      facultyJoiningDate: "",
      facultyEmployeeStatus: "",
      facultyAlias: "",
    }); // Clear form
  };

  return (
    <div className="add-faculty-container">
      <h2 className="add-faculty-title">Add Faculty</h2>
      <form className="add-faculty-form" onSubmit={handleSubmit}>
        {/* Faculty Name */}
        <div className="form-field">
          <label className="form-label">Faculty Name</label>
          <input
            type="text"
            className="form-input"
            name="facultyName"
            value={formData.facultyName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Faculty Email */}
        <div className="form-field">
          <label className="form-label">Faculty Email</label>
          <input
            type="email"
            className="form-input"
            name="facultyEmail"
            value={formData.facultyEmail}
            onChange={handleChange}
            required
          />
        </div>

        {/* Faculty Contact */}
        <div className="form-field">
          <label className="form-label">Faculty Contact</label>
          <input
            type="text"
            className="form-input"
            name="facultyContact"
            value={formData.facultyContact}
            onChange={handleChange}
            required
          />
        </div>

        {/* Faculty Department ID */}
        <div className="form-field">
          <label className="form-label">Faculty Department ID</label>
          <input
            type="number"
            className="form-input"
            name="facultyDepartmentID"
            value={formData.facultyDepartmentID}
            onChange={handleChange}
            required
          />
        </div>

        {/* Faculty Hire Date */}
        <div className="form-field">
          <label className="form-label">Faculty Hire Date</label>
          <input
            type="date"
            className="form-input"
            name="facultyHireDate"
            value={formData.facultyHireDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Faculty Designation */}
        <div className="form-field">
          <label className="form-label">Faculty Designation</label>
          <input
            type="text"
            className="form-input"
            name="facultyDesignation"
            value={formData.facultyDesignation}
            onChange={handleChange}
            required
          />
        </div>

        {/* Faculty Salary */}
        <div className="form-field">
          <label className="form-label">Faculty Salary</label>
          <input
            type="number"
            step="0.01"
            className="form-input"
            name="facultySalary"
            value={formData.facultySalary}
            onChange={handleChange}
            required
          />
        </div>

        {/* Faculty Qualification */}
        <div className="form-field">
          <label className="form-label">Faculty Qualification</label>
          <input
            type="text"
            className="form-input"
            name="facultyQualification"
            value={formData.facultyQualification}
            onChange={handleChange}
            required
          />
        </div>

        {/* Login ID */}
        <div className="form-field">
          <label className="form-label">Login ID</label>
          <input
            type="text"
            className="form-input"
            name="loginID"
            value={formData.loginID}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Hash */}
        <div className="form-field">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            name="passwordHash"
            value={formData.passwordHash}
            onChange={handleChange}
            required
          />
        </div>

        {/* Faculty Joining Date */}
        <div className="form-field">
          <label className="form-label">Faculty Joining Date</label>
          <input
            type="date"
            className="form-input"
            name="facultyJoiningDate"
            value={formData.facultyJoiningDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Faculty Employee Status */}
        <div className="form-field">
          <label className="form-label">Faculty Employee Status</label>
          <select
            className="form-input"
            name="facultyEmployeeStatus"
            value={formData.facultyEmployeeStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        {/* Faculty Alias */}
        <div className="form-field">
          <label className="form-label">Faculty Alias</label>
          <input
            type="text"
            className="form-input"
            name="facultyAlias"
            value={formData.facultyAlias}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="form-submit-btn">
          Add Faculty
        </button>
      </form>
    </div>
  );
};

export default AddFaculty;
