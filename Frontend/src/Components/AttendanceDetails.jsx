import React, { useState, useEffect } from "react";
import Select from "react-select";
import pieClip from "../assets/pieclip.png";

const AttendanceDetails = ({ RollNO, students = [], error }) => {
  const [activeBox, setActiveBox] = useState(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [subject, setSubject] = useState("");

  // Sample mock data for testing
  const mockStudents = [
    {
      RollNO: "001",
      Stud_name: "Alice Smith",
      Section: "A",
      EnrollmentID: "EN12345",
      Stud_Gender: "Female",
      Stud_DOB: "2001-05-15",
      CourseName: "Computer Science",
      Program: "B.tech",
    },
  ];

  // Mock subjects for the select dropdown
  const subjectOptions = [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Biology", label: "Biology" },
  ];

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    setCurrentMonth(`${year}-${month}`);
  }, []);

  const toggleMyAtt = () => {
    setActiveBox(activeBox === "attendance" ? null : "attendance");
  };

  const toggleDailyAtt = () => {
    setActiveBox(activeBox === "daily" ? null : "daily");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: Subject - ${subject}, Month - ${currentMonth}`);
  };

  const handleReset = () => {
    setCurrentMonth(new Date().toISOString().slice(0, 7));
    setSubject("");
  };

  const renderStudentDetails = () => {
    const studentList = students.length > 0 ? students : mockStudents;

    return studentList.map((student) => (
      <div key={student.RollNO} className="student-detail-myatt">
        <div className="name-box-myatt">
          <div className="left-section-myatt">
            <p>
              <span className="label">Roll No:</span>{" "}
              <span className="value">{student.RollNO}</span>
              <br /><span className="label">Program:</span>{" "}
              <span className="value">{student.Program}</span>
              <br /><span className="label">Gender:</span>{" "}
              <span className="value">{student.Stud_Gender}</span>
              
                <div className="subform">
                <form>
                <label htmlFor="subject" className="form-label">Subject:</label>
                <Select
                  className="form-value"
                  options={subjectOptions} // Updated with mock subjects
                  placeholder="Selected"
                  value={subjectOptions.find(option => option.value === subject)}
                  onChange={(selectedOption) => setSubject(selectedOption.value)}
                />
              </form>
                </div>
                
            </p>
          </div>

          <p className="right-section-myatt">
            <span className="label">Course:</span>{" "}
            <span className="value">{student.CourseName}</span>
            <br />
            <span className="label">Section:</span>{" "}
            <span className="value">{student.Section}</span>
            <form>
              <label htmlFor="month" className="form-label">Month:</label>
              <input
                type="month"
                className="form-value"
                id="month"
                name="month"
                min="2018-03"
                value={currentMonth} 
                onChange={(e) => setCurrentMonth(e.target.value)} 
              />
            </form>
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="attddetex">
      <div className="attbox">
        {activeBox === null && (
          <>
            <div className="box" onClick={toggleMyAtt}>
              <div className="attboxdata">
                <img src={pieClip} alt="My Attendance" className="attpie" />
                <h4>My Attendance</h4>
              </div>
              <p>
                Students can view their attendance month-wise or cumulative.
              </p>
            </div>

            <div className="box" onClick={toggleDailyAtt}>
              <div className="attboxdata">
                <img src={pieClip} alt="My Daily Attendance" className="attpie" />
                <h4>My Daily Attendance</h4>
              </div>
              <p>Students can view their daily attendance.</p>
            </div>
          </>
        )}

        {activeBox === "attendance" && (
          <div className="box-active top-left">
            <div className="attboxdata">
              <img src={pieClip} alt="My Attendance" className="attpie" />
              <h6>My Attendance</h6>
            </div>
            <div className="top-section">{renderStudentDetails()}</div>
            {error && <p className="error-message">{error}</p>}
            <div className="form-button">
              <button className="myatt-button" onClick={handleSubmit}>Submit</button>
              <button className="myatt-button" onClick={handleReset}>Reset</button>
            </div>
          </div>
        )}

        {activeBox === "daily" && (
          <>
            <div className="box-active top-left main-content" onClick={toggleDailyAtt}>
              <div className="attboxdata">
                <img src={pieClip} alt="My Daily Attendance" className="attpie" />
                <h6>My Daily Attendance</h6>
              </div>
            </div>
            <div className="top-section">{renderStudentDetails()}</div>
            {error && <p className="error-message">{error}</p>}
            <div className="form-button">
              <button className="myatt-button" onClick={handleSubmit}>Submit</button>
              <button className="myatt-button" onClick={handleReset}>Reset</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AttendanceDetails;
