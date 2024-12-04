import React, { useState } from "react";
import "../stylesheets/AddStudent.css";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    rollNo: "", // Added RollNo field
    studName: "",
    studEmail: "",
    studContact: "",
    studDOB: "",
    studAddress: "",
    studEnrollmentStatus: "",
    studGender: "",
    studYearOfStudy: "",
    studGuardianDetails: "",
    section: "",
    loginID: "",
    passwordHash: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3006/api/addStudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Student added successfully!");
        setErrorMessage("");
        setFormData({
          rollNo: "", // Reset RollNo
          studName: "",
          studEmail: "",
          studContact: "",
          studDOB: "",
          studAddress: "",
          studEnrollmentStatus: "",
          studGender: "",
          studYearOfStudy: "",
          studGuardianDetails: "",
          section: "",
          loginID: "",
          passwordHash: "",
        });
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to add student.");
        setSuccessMessage("");
      }
    } catch (err) {
      setErrorMessage("An error occurred while submitting the form.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="addst-form-container">
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="addst-form-group">
          <label>Roll Number</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addst-form-group">
          <label>Student Name</label>
          <input
            type="text"
            name="studName"
            value={formData.studName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addst-form-group">
          <label>Email</label>
          <input
            type="email"
            name="studEmail"
            value={formData.studEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addst-form-group">
          <label>Contact</label>
          <input
            type="text"
            name="studContact"
            value={formData.studContact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addst-form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="studDOB"
            value={formData.studDOB}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addst-form-group">
          <label>Address</label>
          <textarea
            name="studAddress"
            value={formData.studAddress}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="addst-form-group">
          <label>Enrollment Status</label>
          <input
            type="text"
            name="studEnrollmentStatus"
            value={formData.studEnrollmentStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addst-form-group">
          <label>Gender</label>
          <select
            name="studGender"
            value={formData.studGender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="addst-form-group">
          <label>Year of Study</label>
          <input
            type="number"
            name="studYearOfStudy"
            value={formData.studYearOfStudy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addst-form-group">
          <label>Guardian Details</label>
          <textarea
            name="studGuardianDetails"
            value={formData.studGuardianDetails}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="addst-form-group">
          <label>Section</label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addst-form-group">
          <label>Login ID</label>
          <input
            type="text"
            name="loginID"
            value={formData.loginID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addst-form-group">
          <label>Password</label>
          <input
            type="password"
            name="passwordHash"
            value={formData.passwordHash}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
      {successMessage && <p className="addst-success-message">{successMessage}</p>}
      {errorMessage && <p className="addst-error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddStudent;
