import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../axios.js";
import Header from "./Header.jsx";
import PieChart from "./PieChart.jsx";
import Sidebar from "./Sidebar.jsx";

const StudentDashboard = () => {
  const { RollNO } = useParams(); // Get Roll number from URL
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [timetable, setTimetable] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch student data using the Roll number
    console.log("roll no is =" + RollNO);
    axios
      .get(`${API_URL}/api/data?RollNO=${RollNO}`)
      .then((response) => {
        console.log(response.data); // Check the actual data structure
        setStudents(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch student data");
        console.error(error);
      });
    //fetch attendance data
    console.log(attendance.TotalLectures);
    axios
      .get(`${API_URL}/api/totalattendence?RollNO=${RollNO}`)
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch attendence");
        console.error(error);
      });

    //fetch timetable data
    console.log(timetable);
    axios
      .get(`${API_URL}/api/todaystimetable?RollNO=${RollNO}`)
      .then((response) => {
        console.log(response.data);
        setTimetable(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch attendence");
        console.error(error);
      });
  }, [RollNO]);

  const COLORS = ["#0088FE", "#FF8042"]; // Colors for the pie chart

  const renderStudentDetails = () => {
    return students.map((student) => (
      <div key={student.RollNO} className="student-detail">
        <div className="profile-section">
          <img
            src="https://via.placeholder.com/150"
            alt={`${student.Stud_name} profile`}
            className="profile-pic"
          />

          <div className="name-box">
            <p className="left-section">
              <h3>{student.Stud_name}</h3>
              Roll No: {student.RollNO}
              <br />
              Section: {student.Section}
              <br />
              Enrollment ID: {student.DepartmentName}
              <br />
              Gender: {student.Stud_Gender}
            </p>
            <p className="right-section">
              DOB: {student.Stud_DOB}
              <br />
              Course: {student.CourseName}
              <br />
              Department: {student.DepartmentName}
            </p>
          </div>

          {error && <p>{error}</p>}
        </div>
      </div>
    ));
  };

  const renderPieChart = () => {
    return attendance.map((attend) => (
      <div className="piechart">
        <h4>Attendance Details</h4>

        <div key={attend.RollNO} className="attendance-data">
          <div className="piechartrow">
            <PieChart
              total={attend.TotalLectures}
              present={attend.PresentLectures}
            />
          </div>
          <div className="attdetail">
            <ul>
              <li>Total lectures: {attend.TotalLectures}</li>
              <li>Present: {attend.PresentLectures}</li>
              <li>Absent: {attend.TotalLectures - attend.PresentLectures}</li>
              <li>
                Percentage:{" "}
                {(attend.PresentLectures / attend.TotalLectures) * 100}
              </li>
            </ul>
          </div>
        </div>
      </div>
    ));
  };
  const renderTimetable = () => {
    return (
      <div className="timetable">
        
        <div className="ttbtn" onClick={renderFullTimetable}>
         <h4>Timetable</h4>
          <button className="btnshowmore" >Show More</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>From</th>
              <th>Till</th>
              <th>Subjects</th>
              <th>Faculty</th>
              <th>Room Number</th>
              <th>Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((lecture) => {
              let status = "Not Marked";
              let backgroundColor = ""; // For styling purposes

              if (lecture.AttendanceStatus === null) {
                status = "Not Marked";
                backgroundColor = "#fffacd"; // No specific color
              } else if (lecture.AttendanceStatus === 1) {
                status = "Present";
                backgroundColor = "rgba(75, 192, 192, 0.5)"; // Green
              } else {
                status = "Absent";
                backgroundColor = "rgba(255, 99, 132, 1)"; // Red
              }

              return (
                <tr key={lecture.TimetableID} style={{ backgroundColor }}>
                  <td>Period {lecture.LectureNumber}</td>
                  <td>{lecture.StartTime}</td>
                  <td>{lecture.EndTime}</td>
                  <td>{lecture.SubjectName}</td>
                  <td>{lecture.Faculty_Name}</td>
                  <td>{lecture.RoomNumber}</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFullTimetable = () => {
    return (
      <div className="timetable">
        
        <div className="ttbtn">
         <h4>Timetable</h4>
          <button className="btnshowmore" >Show More</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Days</th>
            
              
            </tr>
          </thead>
          <tbody>
            {timetable.map((lecture) => {
              let status = "Not Marked";
              let backgroundColor = ""; // For styling purposes

              if (lecture.AttendanceStatus === null) {
                status = "Not Marked";
                backgroundColor = "#fffacd"; // No specific color
              } else if (lecture.AttendanceStatus === 1) {
                status = "Present";
                backgroundColor = "rgba(75, 192, 192, 0.5)"; // Green
              } else {
                status = "Absent";
                backgroundColor = "rgba(255, 99, 132, 1)"; // Red
              }

              return (
                <tr key={lecture.TimetableID} style={{ backgroundColor }}>
                  <th>{lecture.StartTime + "-" + lecture.EndTime}</th>
                  <td>Period {lecture.LectureNumber}</td>
                  <td>{lecture.StartTime}</td>
                  <td>{lecture.EndTime}</td>
                  <td>{lecture.SubjectName}</td>
                  <td>{lecture.Faculty_Name}</td>
                  <td>{lecture.RoomNumber}</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };


  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar />

      <Header />
      {/* Main Content */}
      <div className="main-content">
        <div className="top-section">{renderStudentDetails()}</div>
        <div className="middle-section">
          <div className="pie-chart-section">{renderPieChart()}</div>
        </div>
        <div className="timetable-section">{renderTimetable()}</div>
      </div>
    </div>
  );
};

export default StudentDashboard;
