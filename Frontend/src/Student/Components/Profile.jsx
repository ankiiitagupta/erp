import React, { useState } from 'react';
//import './Form.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    course: '',
    branch: '',
    year: '',
    semester: '',
    studentStatus: '',
    nameEnglish: '',
    nameHindi: '',
    fatherName: '',
    fatherNameHindi: '',
    motherName: '',
    motherNameHindi: '',
    occupation: '',
    mobileNo: '',
    bloodGroup: '',
    casteCategory: '',
    subCasteCategory: '',
    casteApplicationNo: '',
    casteCertificateNo: '',
    domicileApplicationNo: '',
    domicileCertificateNo: '',
    incomeApplicationNo: '',
    incomeCertificateNo: '',
    transferCertificateNo: '',
    aadharNo: '',
    dateOfIssue1: '',
    dateOfIssue2: '',
    dateOfIssue3: '',
    bankName: '',
    accountNo: '',
    branchName: '',
    ifscCode: '',
    guardianFatherName: '',
    guardianFatherNameHindi: '',
    guardianMotherName: '',
    guardianMotherNameHindi: '',
    guardianOccupation: '',
    guardianMobileNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Registration form submitted successfully!');
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">College Registration Form</h1>
      <form className="registration-form" onSubmit={handleSubmit}>

        {/* Personal Information Section */}
        <fieldset className="form-section">
          <legend>Personal Information</legend>
          <table className="form-table">
            <tbody>
              <tr>
                <td><label>Roll No</label></td>
                <td><input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required /></td>
                <td><label>Course</label></td>
                <td><input type="text" name="course" value={formData.course} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Branch</label></td>
                <td><input type="text" name="branch" value={formData.branch} onChange={handleChange} required /></td>
                <td><label>Year</label></td>
                <td><input type="text" name="year" value={formData.year} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Semester</label></td>
                <td><input type="text" name="semester" value={formData.semester} onChange={handleChange} required /></td>
                <td><label>Student Status</label></td>
                <td><input type="text" name="studentStatus" value={formData.studentStatus} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Blood Group</label></td>
                <td><input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required /></td>
                <td><label>Mobile No</label></td>
                <td><input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required /></td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        {/* Guardian Information Section */}
        <fieldset className="form-section">
          <legend>Guardian Information</legend>
          <table className="form-table">
            <tbody>
              <tr>
                <td><label>Guardian Father Name (English)</label></td>
                <td><input type="text" name="guardianFatherName" value={formData.guardianFatherName} onChange={handleChange} required /></td>
                <td><label>Guardian Father Name (Hindi)</label></td>
                <td><input type="text" name="guardianFatherNameHindi" value={formData.guardianFatherNameHindi} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td><label>Guardian Mother Name (English)</label></td>
                <td><input type="text" name="guardianMotherName" value={formData.guardianMotherName} onChange={handleChange} required /></td>
                <td><label>Guardian Mother Name (Hindi)</label></td>
                <td><input type="text" name="guardianMotherNameHindi" value={formData.guardianMotherNameHindi} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td><label>Guardian Occupation</label></td>
                <td><input type="text" name="guardianOccupation" value={formData.guardianOccupation} onChange={handleChange} required /></td>
                <td><label>Guardian Mobile No.</label></td>
                <td><input type="text" name="guardianMobileNo" value={formData.guardianMobileNo} onChange={handleChange} required /></td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        {/* Submit Button */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Profile;
