import React, { useState } from "react";
//import "../stylesheets/Marks.css";
import "../stylesheets/AcademicsDashboard.css";

const Marks = ({
  marksData,
  setMarksData,
  isEditing,
  setIsEditing,
  handleInputChange,
  toggleEditMode,
  handleSubmit,
}) => {
  const courses = ["BTECH-CSE", "BTECH-IT", "BTECH-ECE"];
  const exams = ["Midterm", "Finals", "Class Test"];
  const sections = ["A", "B", "C"];
  const subjects = ["Mathematics", "Physics", "Chemistry"];
  const years = ["2021", "2022", "2023"];

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const allFieldsSelected =
    selectedCourse &&
    selectedExam &&
    selectedSection &&
    selectedSubject &&
    selectedYear;

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="marks-section">
          <h2 className="content-title">MARKS</h2>
          <div className="marks-form">
            <div className="marks-placeholder">
              <div className="form-group">
                <label>COURSE:</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">SELECT</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>EXAM: </label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                >
                  <option value="">SELECT</option>
                  {exams.map((exam, index) => (
                    <option key={index} value={exam}>
                      {exam}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>SECTION:</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="">SELECT</option>
                  {sections.map((section, index) => (
                    <option key={index} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>SUBJECT:</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">SELECT</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>YEAR:</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">SELECT</option>
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {allFieldsSelected && isEditing && (
              <>
                <table className="marks-table">
                  <thead>
                    <tr>
                      <th>ROLL NO.</th>
                      <th>STUDENT</th>
                      <th>SUBJECT</th>
                      <th>MARKS</th>
                      <th>OUT OF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marksData.map((student, index) => (
                      <tr key={index}>
                        <td>{student.rollNo}</td>
                        <td>{student.name}</td>
                        <td>{student.subject}</td>
                        <td>
                          <input
                            type="number"
                            value={student.marks}
                            onChange={(e) =>
                              handleInputChange(index, "marks", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={student.outOf}
                            onChange={(e) =>
                              handleInputChange(index, "outOf", e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="buttons">
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </>
            )}

            {!isEditing && (
              <div className="buttons">
                <button onClick={toggleEditMode}>Edit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marks;
