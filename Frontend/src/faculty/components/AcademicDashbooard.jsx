import React, { useState } from "react";
import "../stylesheets/AcademicsDashboard.css";
import noteclip from "../../assets/AcademicDashboardsvg/noteclip.png";
import Marksclip from "../../assets/AcademicDashboardsvg/Markclip.png";
import syllabus from "../../assets/AcademicDashboardsvg/syllabus.png";
import Assignment from "../../assets/AcademicDashboardsvg/Assignment.png";
import Projects from "../../assets/AcademicDashboardsvg/Projects.png";
import meeting from "../../assets/AcademicDashboardsvg/meeting.png";

const AcademicsDashboard = (FacultyID) => {
  const [showMarks, setShowMarks] = useState(false);
  const [applyOutOfToAll, setApplyOutOfToAll] = useState(false);
  const [marksData, setMarksData] = useState([
    {
      rollNo: "12345",
      name: "Student Name",
      subject: "Subject",
      marks: "",
      outOf: "",
    },
    // Add more students as needed
  ]);

  // State for placeholder selections
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // Handler to update the "Out of" field
  const handleOutOfChange = (index, value) => {
    const updatedMarksData = [...marksData];
    updatedMarksData[index].outOf = value;
    setMarksData(updatedMarksData);
  };

  // Copy the first "Out of" value to all rows when checkbox is checked
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setApplyOutOfToAll(isChecked);

    if (isChecked) {
      const firstOutOf = marksData[0].outOf;
      const updatedMarksData = marksData.map((data) => ({
        ...data,
        outOf: firstOutOf,
      }));
      setMarksData(updatedMarksData);
    }
  };

  const renderMarksStudent = () => {
    // Condition to check if all dropdowns are selected
    const allFieldsSelected =
      selectedCourse && selectedExam && selectedSection && selectedSubject;

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
                    {/* Add course options here */}
                  </select>
                </div>
                <div className="form-group">
                  <label>EXAM: </label>
                  <select
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                  >
                    <option value="">SELECT</option>
                    {/* Add exam options here */}
                  </select>
                </div>
                <div className="form-group">
                  <label>SECTION:</label>
                  <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                  >
                    <option value="">SELECT</option>
                    {/* Add section options here */}
                  </select>
                </div>
                <div className="form-group">
                  <label>SUBJECT:</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">SELECT</option>
                    {/* Add subject options here */}
                  </select>
                </div>
              </div>

              {allFieldsSelected && (
                <table className="marks-table">
                  <thead>
                    <tr>
                      <th>ROLL NO.</th>
                      <th>STUDENT</th>
                      <th>SUBJECT</th>
                      <th>INPUT MARKS</th>
                      <th>
                        OUT OF
                        <input
                          type="checkbox"
                          checked={applyOutOfToAll}
                          onChange={handleCheckboxChange}
                          className="apply-to-all-checkbox"
                        />
                      </th>
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
                            type="text"
                            placeholder="Marks"
                            value={student.marks}
                            onChange={(e) => {
                              const updatedMarksData = [...marksData];
                              updatedMarksData[index].marks = e.target.value;
                              setMarksData(updatedMarksData);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Out of"
                            value={student.outOf}
                            onChange={(e) =>
                              handleOutOfChange(index, e.target.value)
                            }
                            disabled={applyOutOfToAll && index !== 0}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="buttons">
                <button>Edit</button>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="academics-dashboard">
      {showMarks ? (
        renderMarksStudent()
      ) : (
        <div className="main-content">
          <h2 className="content-title">ACADEMICS</h2>
          <div className="icon-grid">
            <div className="icon-card" onClick={() => setShowMarks(true)}>
              <img src={Marksclip} alt="Marks" className="icon" />
              <p>MARKS</p>
              <span className="tooltip">
                View and update Student marks for each course
              </span>
            </div>

            <div className="icon-card">
              <img src={syllabus} alt="Syllabus" className="icon" />
              <p>SYLLABUS</p>
              <span className="tooltip">
                Access syllabus and update completed Syllabus
              </span>
            </div>

            <div className="icon-card">
              <img src={noteclip} alt="Notes" className="icon" />
              <p>NOTES</p>
              <span className="tooltip">Download and Provide class notes</span>
            </div>

            <div className="icon-card">
              <img src={Assignment} alt="Assignment" className="icon" />
              <p>ASSIGNMENT</p>
              <span className="tooltip">Give and review assignments</span>
            </div>

            <div className="icon-card">
              <img src={Projects} alt="Projects" className="icon" />
              <p>PROJECTS</p>
              <span className="tooltip">
                Guide and Track project deliverables
              </span>
            </div>

            <div className="icon-card">
              <img src={meeting} alt="Meetings" className="icon" />
              <p>MEETINGS</p>
              <span className="tooltip">
                Schedule or view upcoming meetings with faculty, parents or
                students.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicsDashboard;
