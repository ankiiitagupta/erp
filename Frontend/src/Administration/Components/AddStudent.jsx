import React, { useState } from "react";
import "../stylesheets/AddStudent.css";

const AddStudent = () => {
  const [formData, setFormData] = useState({
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
    photo: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const response = await fetch("/api/addStudent", {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        setSuccessMessage("Student added successfully!");
        setErrorMessage("");
        setFormData({
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
          photo: null,
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
    <div className="form-container">
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            name="studName"
            value={formData.studName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="studEmail"
            value={formData.studEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            name="studContact"
            value={formData.studContact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="studDOB"
            value={formData.studDOB}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="studAddress"
            value={formData.studAddress}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Enrollment Status</label>
          <input
            type="text"
            name="studEnrollmentStatus"
            value={formData.studEnrollmentStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <label>Year of Study</label>
          <input
            type="number"
            name="studYearOfStudy"
            value={formData.studYearOfStudy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Guardian Details</label>
          <textarea
            name="studGuardianDetails"
            value={formData.studGuardianDetails}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Section</label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Login ID</label>
          <input
            type="text"
            name="loginID"
            value={formData.loginID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="passwordHash"
            value={formData.passwordHash}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Photo</label>
          <input type="file" name="photo" onChange={handleChange} required />
        </div>
        <button type="submit">Add Student</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddStudent;