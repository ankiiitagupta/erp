import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../axios";
import Header from "./Header.jsx";
import PieChart from "./PieChart.jsx";
import Sidebar from "./Sidebar.jsx";
import WeeksTimeTable from "./WeeksTimeTable.jsx";
import TodaysTimeTable from "./TodaysTimeTable.jsx";
import AttendanceDetails from "./AttendanceDetails.jsx"; // Ensure to import your AttendanceDetails component
import MarkingTimeTable from "./markingTimetable.jsx";
import Notices from "./Notices.jsx";

const StudentDashboard = () => {
  const { RollNO } = useParams(); // Get Roll number from URL
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState(null);
  const [tFlag, setTFlag] = useState(false); // Manage timetable flag
  const [attFlag, setAttFlag] = useState(false); // Manage attendance flag
  const [noticeFlag, setNoticeFlag]= useState(false);

  const resetFlags = () => {
    setAttFlag(false);
    setNoticeFlag(false);
  };

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

    // Fetch attendance data
    axios
      .get(`${API_URL}/api/totalattendence?RollNO=${RollNO}`)
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch attendance data");
        console.error(error);
      });

    // Fetch timetable data
    axios
      .get(`${API_URL}/api/todaystimetable?RollNO=${RollNO}`)
      .then((response) => {
        console.log(response.data);
        setTimetable(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch timetable data");
        console.error(error);
      });
  }, [RollNO]);

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
      <div className="piechart" key={attend.RollNO}>
        <h4>Attendance Details</h4>
        <div className="attendance-data">
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
                {(
                  (attend.PresentLectures / attend.TotalLectures) *
                  100
                ).toFixed(2)}
                %
              </li>
            </ul>
          </div>
        </div>
      </div>
    ));
  };

  const renderTimetable= () => {
    return (
      <div className="timetable">
        <div className="ttbtn" onClick={() => setTFlag(!tFlag)}>
          <h4>Timetable</h4>
          <button className="btnshowmore">Show More</button>
        </div>

        {tFlag ? (
          <WeeksTimeTable RollNO={RollNO} />
        ) : (
          <TodaysTimeTable ttpass={timetable} />
        )}
      </div>
    );
  };
  
  const renderMarkingTimeTable = () => {
    return (
      <div className="timetable">
        
        <MarkingTimeTable/>

      </div>
    );
  };

  const renderFaculty = () => {
    const faculty = [
      { name: "Dr. Smith", subject: "Mathematics" },
      { name: "Prof. Johnson", subject: "Physics" },
    ];
  
    return (
      <div className="info-container faculty-container">
        <h4>Faculty Teaching</h4>
        <ul>
          {faculty.map((teacher, index) => (
            <li key={index} id="faccontainer">
              <strong>Name:</strong> {teacher.name}
              <br />
              <strong>Subject:</strong> {teacher.subject}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderClassmates = () => {
    const classmates = [
      { name: "Alice", rollNo: "01" },
      { name: "Bob", rollNo: "02" },
    ];
  
    return (
      <div className="info-container classmates-container">
        <h4>Classmates</h4>
        <ul >
          {classmates.map((classmate, index) => (
            <li key={index} id="matecontainer">
              <strong>Name:</strong> {classmate.name}
              <br />
              <strong>Roll No:</strong> {classmate.rollNo}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const renderSubjects = () => {
    const subjects = [
      { name: "Mathematics", code: "MATH101" },
      { name: "Physics", code: "PHY102" },
    ];
  
    return (
      <div className="info-container subjects-container">
        <h4>Subjects</h4>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index} id="subcontainer">
              <strong>Subject Name:</strong> {subject.name}
              <br />
              <strong>Code:</strong> {subject.code}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

  return (
    <div className="dashboard">
      <Sidebar setAttFlag={setAttFlag}  setNoticeFlag={setNoticeFlag} resetFlags={resetFlags}/>
      <div className="main-content">
        <Header />
        

        {/* Conditional rendering based on noticeFlag */}
        {noticeFlag ? (
          <div className="notice-section">
            <Notices />
          </div>
        ) : (
          <>
            {attFlag ? (
              <div className="attendance-section">
                <AttendanceDetails RollNO={RollNO} students={students}/>
              </div>
            ) : (
              <>
                <div className="top-section">{renderStudentDetails()}</div>
                <div className="middle-section">
                  <div className="pie-chart-section">{renderPieChart()}</div>
                  <div className="timetable-section">{renderTimetable()}</div>
                  <div className="markingTimetable">
                    {renderMarkingTimeTable()}

                  </div>
                  <div className="additional-info">
                  {renderFaculty()}
                  {renderClassmates()}
                  {renderSubjects()}
                </div>
                </div>
              </>
            )}
          </>
        )}

      
       
      </div>
    </div>
  );
};


export default StudentDashboard;
