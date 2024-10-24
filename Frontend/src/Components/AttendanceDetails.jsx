import React, { useState, useEffect } from "react";
import Select from "react-select";
import pieClip from "../assets/pieclip.png";
import PieChart from "./PieChart.jsx";
import TodaysTimeTable from "./TodaysTimeTable";


const AttendanceDetails = ({ RollNO, students = [], error }) => {
  const [activeBox, setActiveBox] = useState(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [subject, setSubject] = useState("");

  const [selectedDate, setSelectedDate] = useState(""); // Renamed from Date to selectedDate
  const [showPieChart, setShowPieChart] = useState(false);
  const [subjectOptions, setSubjectOptions] = useState([]);


  const mockStudents = [
    {
      rollNo: "001",
      studName: "Alice Smith",
      section: "A",
      enrollmentID: "EN12345",
      studGender: "Female",
      studDOB: "2001-05-15",
      courseName: "Computer Science",
      program: "B.tech",
    },
  ];

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    setCurrentMonth(`${year}-${month}`);
  }, []);

  useEffect(() => {
    // Fetch subjects from the API
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`/api/subjectofStud?RollNO=${RollNO}`);
        const data = await response.json();
        console.log("Fetched subjects:", data); // Check if the data is being fetched correctly

        const options = data.map((item) => ({
          value: item.SubjectName,
          label: item.SubjectName,
        }));
        setSubjectOptions(options);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [RollNO]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
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

  const handledailySubmit = (e) => {
    e.preventDefault();
    setShowPieChart(true); // Show pie chart on submit
    alert(`Submitted: Subject - ${subject}, Date - ${selectedDate}`);
  };

  const handledailyReset = () => {
    setCurrentMonth(new Date().toISOString().slice(0, 7));
    setSubject("");
    setShowPieChart(false); 
  };

  const renderAttendanceDetails = () => {
    const studentList = students.length > 0 ? students : mockStudents;

    return students.map((student) => (
      <div key={student.rollNo} className="student-detail-myatt">
        <div className="name-box-myatt">
          <p className="left-section-myatt">
            <span className="label">Roll No:</span>{" "}
            <span className="value">{student.RollNO}</span>
            <br />
            
            <span className="label">Gender:</span>{" "}
            <span className="value">{student.Stud_Gender}</span>
            <form className="formsub">

              <label htmlFor="month" className="form-label"></label>

              <label htmlFor="Subject" className="form-label">

                Subject:
              </label>
              <Select
                className="form-value"
                options={subjectOptions}
                placeholder="Select"
                value={subjectOptions.find(
                  (option) => option.value === subject
                )}
                onChange={(selectedOption) => setSubject(selectedOption.value)}
              />
            </form>
          </p>

          <p className="right-section-myatt">
            <span className="label">Course:</span>
            <span className="value">{student.CourseName}</span>
            <br />
            <span className="label">Section:</span>
            <span className="value">{student.Section}</span>
            <form>
              <label htmlFor="month" className="form-label">
                Month:
              </label>
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

  const renderDailyAttendance = () => {
    const studentList = students.length > 0 ? students : mockStudents;

    return studentList.map((student) => (
      <div key={student.rollNo} className="student-detail-dailyatt">
        <div className="dailyatt">
            <span className="label">Roll No:</span>{" "}
            <span className="value">{student.rollNo}</span>
            <br />
            <form>
              <label htmlFor="Subject" className="form-label">
              Date:
              </label>
              <input
                type="date"
                className="form-value"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </form>
        </div>
        <div className="daily-att-buttons">
                <button className="daily-att-submit" onClick={handledailySubmit}>Submit</button>
                <button className="daily-att-reset" onClick={handledailyReset}>Reset</button>
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
                <img
                  src={pieClip}
                  alt="My Daily Attendance"
                  className="attpie"
                />
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
            <div className="top-section">{renderAttendanceDetails()}</div>
            {error && <p className="error-message">{error}</p>}
            <div className="form-button">
              <button className="myatt-button" onClick={handleSubmit}>
                Submit
              </button>
              <button className="myatt-button" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        )}

        {activeBox === "daily" && (
          <>
            <div
              className="box-active top-left main-content"
              onClick={toggleDailyAtt}
            >
              <div className="attboxdata">
                <img
                  src={pieClip}
                  alt="My Daily Attendance"
                  className="attpie"
                />
                <h6>My Daily Attendance</h6>
              </div>
            </div>
            <div className="dailyattcontainer">
            <div className="daily-topsection">{renderDailyAttendance()}</div>
            <div className="dailyattpiechartcontainer">
              <div className="mydailyattchart">
              {showPieChart && (
                <>
                <div className="dailyattpiechart">
                <PieChart total="50" present="30" />
              </div>
              <div className="dailyattdetail">
            <ul>
              <li>Total lectures: 50</li>
              <li>Present:30</li>
              <li>Absent:20</li>
              <li>
                Percentage:{" "}
                {(
                  (30 / 50) *
                  100
                ).toFixed(2)}
                %
              </li>
            </ul>
          </div>
              </>
              
              
            )}
              </div>
            
            </div>
            </div>
            
           
            
          </>
        )}
      </div>
      
    </div>
  );
};

export default AttendanceDetails;