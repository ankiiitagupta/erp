import React, { useState, useEffect } from "react";
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
  // Mock data for subjects with sections and exams, including subject code
  const mockSubjectsWithSections = [
    { subject: "DSA", code: "KCS-101", section: "Sec-A" },
    { subject: "DSA", code: "KCS-101", section: "Sec-B" },
    { subject: "Compiler", code: "KOE-201", section: "Sec-A" },
    { subject: "Compiler", code: "KOE-201", section: "Sec-B" },
    { subject: "OS", code: "KCS-102", section: "Sec-A" },
    { subject: "OS", code: "KCS-102", section: "Sec-B" }
  ];
  
  const mockExams = ["Midterm", "Finals", "Class Test"];

  const [subjectsWithSections, setSubjectsWithSections] = useState([]);
  const [exams, setExams] = useState([]);

  const [selectedSubjectWithSection, setSelectedSubjectWithSection] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  const allFieldsSelected = selectedSubjectWithSection && selectedExam;

  // Simulate fetching data by using mock data
  useEffect(() => {
    // Simulate API call with mock data
    const fetchSubjectsWithSections = () => {
      setSubjectsWithSections(mockSubjectsWithSections);
    };

    const fetchExams = () => {
      setExams(mockExams);
    };

    fetchSubjectsWithSections();
    fetchExams();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="marks-section">
          <h2 className="content-title">MARKS</h2>
          <div className="marks-form">
            <div className="marks-placeholder">
              <div className="form-group">
                <label>SUBJECT & SECTION:</label>
                <select
                  value={selectedSubjectWithSection}
                  onChange={(e) => setSelectedSubjectWithSection(e.target.value)}
                >
                  <option value="">SELECT</option>
                  {subjectsWithSections.map((subject, index) => (
                    <option key={index} value={`${subject.subject} (${subject.code}) (${subject.section})`}>
                      {`${subject.subject} (${subject.code}) (${subject.section})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>EXAM:</label>
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
