import React, { useState, useEffect } from "react";
import "../stylesheets/AcademicsDashboard.css";
import { API_URL } from "../../axios";

const Marks = ({ facultyID }) => {
  const [marksData, setMarksData] = useState([]);
  const [subjectsWithSections, setSubjectsWithSections] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedSubjectWithSection, setSelectedSubjectWithSection] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [allFieldsSelected, setAllFieldsSelected] = useState(false);

  // Fetch subjects and sections based on facultyID
  useEffect(() => {
    const fetchSubjectSections = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/subjectandsectionofaculty?facultyID=${facultyID}`
        );
        const data = await response.json();
        setSubjectsWithSections(data);
      } catch (error) {
        console.error("Error fetching subject sections:", error);
      }
    };

    fetchSubjectSections();
  }, [facultyID]);

  // Fetching exams for the faculty
  useEffect(() => {
    fetch(`${API_URL}/api/getexams`)
      .then((response) => response.json())
      .then((data) => {
        setExams(data);
      })
      .catch((err) => console.error("Error fetching exams:", err));
  }, []);
 

  useEffect(() => {
    if (selectedSubjectWithSection && selectedExam) {
      const fetchMarksData = async () => {
        try {
          // Log the selectedSubjectWithSection to inspect its format
          console.log("selectedSubjectWithSection:", selectedSubjectWithSection);
  
          // Correctly split based on the first occurrence of " ("
          const parts = selectedSubjectWithSection.split(" (");
          if (parts.length === 2) {
            const subjectName = parts[0].trim();
            const section = parts[1].replace(")", "").trim();  // Remove closing parenthesis
  
            // Log to check the values
            console.log("Subject Name:", subjectName);
            console.log("Section:", section);
  
            // Fetch data based on the extracted subject and section
            const response = await fetch(
              `${API_URL}/api/listofstudentwithresultformarksupload?facultyID=${facultyID}&SubjectName=${subjectName}&examType=${selectedExam}&section=${section}`
            );
            const data = await response.json();
            setMarksData(data);
          } else {
            console.error("Invalid format for selectedSubjectWithSection:", selectedSubjectWithSection);
          }
        } catch (err) {
          console.error("Error fetching marks data:", err);
        }
      };
  
      fetchMarksData();
    }
  }, [selectedSubjectWithSection, selectedExam, facultyID]);
  

  // Handle subject & section change
  const handleSubjectWithSectionChange = (e) => {
    setSelectedSubjectWithSection(e.target.value);
    setAllFieldsSelected(e.target.value && selectedExam);
  };

  // Handle exam change
  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
    setAllFieldsSelected(selectedSubjectWithSection && e.target.value);
  };

  // Toggle editing mode
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  // Handle input changes for marks and other fields
  const handleInputChange = (index, field, value) => {
    const updatedMarksData = [...marksData];
    const student = updatedMarksData[index];
    
    // Ensure the marks cannot exceed the total marks
    if (field === "MarksObtained" && Number(value) > Number(student.TotalMarks)) {
      alert("Marks obtained cannot exceed the total marks.");
      return; // Do not update if the validation fails
    }
    
    student[field] = value;
    setMarksData(updatedMarksData);
  };
  

  // Handle form submission
const handleSubmit = async () => {
  console.log(marksData);
  try {
    const response = await fetch(`${API_URL}/api/uploadmarks`, {
      method: "POST",  // Or "PUT" depending on your API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(marksData),  // Send the updated marks data
    });
    
    if (response.ok) {
      alert("Marks uploaded successfully!");
    } else {
      alert("Failed to upload marks. Please try again.");
    }
  } catch (error) {
    alert("Error submitting marks: " + error.message);
  }
};


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
                  onChange={handleSubjectWithSectionChange}
                >
                  <option value="">SELECT</option>
                  {subjectsWithSections.map((subject, index) => (
                    <option key={index} value={`${subject.SubjectName} (${subject.Section})`}>
                      {`${subject.SubjectName} (${subject.Section})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>EXAM:</label>
                <select value={selectedExam} onChange={handleExamChange}>
                  <option value="">SELECT</option>
                  {exams.map((exam, index) => (
                    <option key={index} value={exam.ExamType}>
                      {exam.ExamType}
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
                      <th>SECTION</th>
                      <th>MARKS</th>
                      <th>OUT OF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marksData.map((student, index) => (
                      <tr key={index}>
                        <td>{student.RollNO}</td>
                        <td>{student.Stud_name}</td>
                        <td>{student.SubjectName}</td>
                        <td>{student.Section}</td>
                        <td>
                          <input
                            type="number"
                            value={student.MarksObtained === "N/A" ? "" : student.MarksObtained}
                            onChange={(e) =>
                              handleInputChange(index, "MarksObtained", e.target.value)
                            }
                          />
                        </td>
                        <td>{student.TotalMarks}</td>
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
