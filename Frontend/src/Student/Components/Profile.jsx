import React, { useState } from 'react';

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

  const [exams, setExams] = useState([
    {
      examType: '',
      medium: '',
      institute: '',
      board: '',
      yearOfPassing: '',
      rollNo: '',
      percentage: '',
      division: '',
    },
  ]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [documents, setDocuments] = useState({
    "12thStandardMarksheet": null,
    "AadharCard": null,
    "CasteCertificate": null,
    "Domicile": null,
    "GraduationMarksheet": null,
    "HighSchoolCertificate": null,
    "HighSchoolMarksheet": null,
    "IncomeCertificate": null,
    "MigrationCertificate": null,
    "TransferCertificate": null,
  });

  


  // Function to handle changes in the examination details section
  const handleExamChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExams = [...exams];
    updatedExams[index][name] = value;
    setExams(updatedExams);
  };

  // Function to add a new row in examination details
  const addNewExam = () => {
    setExams([
      ...exams,
      {
        examType: '',
        medium: '',
        institute: '',
        board: '',
        yearOfPassing: '',
        rollNo: '',
        percentage: '',
        division: '',
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Registration form submitted successfully!');
  };

  const handleDocumentChange = (e, documentName) => {
    const file = e.target.files[0];
    setDocuments({
      ...documents,
      [documentName]: file,
    });
  };

  return (
    <div className="form-container">
      <h1 id="form-heading">My Profile</h1>
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
                <td><input type="text" name="student Status" value={formData.studentStatus} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Blood Group</label></td>
                <td><input type="text" name="blood Group" value={formData.bloodGroup} onChange={handleChange} required /></td>
                <td><label>Mobile No</label></td>
                <td><input type="text" name="mobile no" value={formData.mobileNo} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label> Caste Category:</label></td>
                <td><input type="text" name=" caste category:" value={formData. casteCategory} onChange={handleChange} required /></td>
                <td><label>Subcaste category: </label></td>
                <td><input type="text" name="Subcaste category: " value={formData.Subcastecategory} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Caste application no:</label></td>
                <td><input type="text" name=" caste application no:" value={formData.  casteApplicationNo} onChange={handleChange} required /></td>
                <td><label>Caste Certificate no: </label></td>
                <td><input type="text" name=" caste Certificate no: " value={formData.  casteCertificateNo} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label> Domicile application no:</label></td>
                <td><input type="text" name=" domicile application no:" value={formData. domicileapplicationNo} onChange={handleChange} required /></td>
                <td><label>Domicile certificate no: </label></td>
                <td><input type="text" name="domicile certificate no:" value={formData.domicilecertificateNo} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label> <Input:btn></Input:btn>Income application no:</label></td>
                <td><input type="text" name=" income application no: " value={formData.  incomeApplicationNo} onChange={handleChange} required /></td>
                <td><label>Income certificate no:</label></td>
                <td><input type="text" name=" income certificate no:" value={formData. incomeCertificateNo} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>  Transfer certificate no:</label></td>
                <td><input type="text" name=" transfer certificate no: " value={formData. transferCertificateNo} onChange={handleChange} required /></td>
                <td><label>Aadhar no:</label></td>
                <td><input type="text" name="aadhar no:" value={formData.aadharNo} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Bank Name: </label></td>
                <td><input type="text" name="  Bank Name:  " value={formData.  BankName} onChange={handleChange} required /></td>
                <td><label>Branch Name</label></td>
                <td><input type="text" name="IFSC code" value={formData. IFSCcode} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label> Account no. :</label></td>
                <td><input type="text" name="  Account no. " value={formData.  Accountno} onChange={handleChange} required /></td>
                <td><label>IFSC code</label></td>
                <td><input type="text" name="IFSC code" value={formData. IFSCcode} onChange={handleChange} required /></td>
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

         {/* Examination Details Section */}
<fieldset className="form-section">
  <legend>Examination Passed</legend>
  <div className="table-responsive">
    <table className="form-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Examination</th>
          <th>Medium of Education</th>
          <th>Institute Attended</th>
          <th>Board/University</th>
          <th>Year of Passing</th>
          <th>Roll No.</th>
          <th>% / CGPA</th>
          <th>Division</th>
        </tr>
      </thead>
      <tbody>
        {exams.map((exam, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <select
                name="examType"
                value={exam.examType}
                onChange={(e) => handleExamChange(index, e)}
                required
              >
                <option value="">Select</option>
                <option value="High School">High School</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Graduation">Graduation</option>
              </select>
            </td>
            <td><input type="text" name="medium" value={exam.medium} onChange={(e) => handleExamChange(index, e)} required /></td>
            <td><input type="text" name="institute" value={exam.institute} onChange={(e) => handleExamChange(index, e)} required /></td>
            <td><input type="text" name="board" value={exam.board} onChange={(e) => handleExamChange(index, e)} required /></td>
            <td><input type="number" name="yearOfPassing" value={exam.yearOfPassing} onChange={(e) => handleExamChange(index, e)} required /></td>
            <td><input type="text" name="rollNo" value={exam.rollNo} onChange={(e) => handleExamChange(index, e)} required /></td>
            <td><input type="number" name="percentage" value={exam.percentage} onChange={(e) => handleExamChange(index, e)} required /></td>
            <td>
              <select name="division" value={exam.division} onChange={(e) => handleExamChange(index, e)} required>
                <option value="">Select</option>
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <button type="button" onClick={addNewExam}>Add More Exams</button>
</fieldset>

        {/* Required Documents Section */}
        <fieldset className="form-section">
          <legend>Required Documents</legend>
          <table className="form-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Document</th>
                <th>Required</th>
                <th>Upload</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(documents).map((doc, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{doc.replace(/([A-Z])/g, ' $1').trim()}</td>
                  <td>YES</td>
                  <td>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleDocumentChange(e, doc)}
                    />
                  </td>
                  <td>{documents[doc] ? 'Uploaded' : 'Not Uploaded'}</td>
                </tr>
              ))}
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
