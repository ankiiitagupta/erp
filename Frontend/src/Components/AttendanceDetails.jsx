import React, { useState, useEffect } from "react";
import Select from "react-select";
import pieClip from "../assets/pieclip.png";
import PieChart from "./PieChart.jsx";
import TodaysTimeTable from "./TodaysTimeTable";
import { API_URL } from "../axios.js";

const AttendanceDetails = ({ RollNO, students = [], error }) => {
  const [activeBox, setActiveBox] = useState(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [subject, setSubject] = useState("");
  const [attendanceData, setAttendanceData] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // Renamed from Date to selectedDate
  const [showPieChart, setShowPieChart] = useState(false);
  const [subjectOptions, setSubjectOptions] = useState([]);

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
        const response = await fetch(
          `${API_URL}/api/subjectofStud?RollNO=${RollNO}`
        );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch attendance data from the API
      const response = await fetch(
        `${API_URL}/api/attendencebymonthforsub?RollNO=${RollNO}&SubjectName=${subject}&MonthNumber=${
          new Date(currentMonth).getMonth() + 1
        }`
      );
      const data = await response.json();
      console.log("Fetched attendance data:", data); // Log to check the response

      // Set the fetched data into state
      setAttendanceData(data[0]); // Assuming only one result per subject and month
      setShowPieChart(true); // Show the pie chart after fetching data
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const handleReset = () => {
    setCurrentMonth(new Date().toISOString().slice(0, 7));
    setSubject("");
    setShowPieChart(false);
    setAttendanceData(null);
  };

  const handledailySubmit = (e) => {
    e.preventDefault();
    // Show pie chart on submit
  };

  const handledailyReset = () => {
    setCurrentMonth(new Date().toISOString().slice(0, 7));
    setSubject("");
    setShowPieChart(false);
  };

  const renderAttendanceDetails = () => {
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
                value={
                  subjectOptions.find((option) => option.value === subject) ||
                  null
                } // Add || null to handle empty state
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

    return students.map((student) => (
      <div key={student.rollNo} className="student-detail-dailyatt">
        <div className="dailyatt">
          <span className="label">Roll No:</span>{" "}
          <span className="value">{student.RollNO}</span>
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
          <button className="daily-att-submit" onClick={handledailySubmit}>
            Submit
          </button>
          <button className="daily-att-reset" onClick={handledailyReset}>
            Reset
          </button>
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
            <div className="dailyattpiechartcontainer">
              <div className="mydailyattchart">
                {showPieChart && (
                  <>
                    <div className="dailyattpiechart">
                      <PieChart
                        total={attendanceData.TotalLectures}
                        present={attendanceData.TotalLectures}
                      />
                    </div>
                    <div className="dailyattdetail">
                      <ul>
                        <li>Total lectures: {attendanceData.TotalLectures}</li>
                        <li>Present:{attendanceData.TotalPresent}</li>
                        <li>
                          Absent:
                          {attendanceData.TotalLectures -
                            attendanceData.TotalPresent}
                        </li>
                        <li>
                          Percentage:{" "}
                          {(
                            (attendanceData.TotalPresent /
                              attendanceData.TotalLectures) *
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AttendanceDetails;
