import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../axios";
import Header from "./Header.jsx";
import PieChart from "./PieChart.jsx";
import Sidebar from "./Sidebar.jsx";
import WeeksTimeTable from "./WeeksTimetable.jsx";
import TodaysTimeTable from "./TodaysTimeTable.jsx";
import AttendanceDetails from "./AttendanceDetails.jsx"; // Ensure to import your AttendanceDetails component
import MarkingTimeTable from "./markingTimetable.jsx";
import Notices from "./Notices.jsx";
import Profile from "./Profile.jsx";
import '../stylesheets/StudentDashboard.css';


const StudentDashboard = () => {
  const { RollNO } = useParams(); // Get Roll number from URL
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState(null);
  const [tFlag, setTFlag] = useState(false); // Manage timetable flag
  const [attFlag, setAttFlag] = useState(false); // Manage attendance flag
  const [profileFlag, setProfileFlag] = useState(false); // Manage attendance flag
  const [noticeFlag, setNoticeFlag] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [Faculties, setFaculty] = useState([]);
  const [classmates, setClassmates] = useState([]);

  const resetFlags = () => {
    setAttFlag(false);
    setNoticeFlag(false);
    setProfileFlag(false);
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

    //Fetch the subject of the Student
    axios.get(`http://localhost:3006/api/subjectandsubjectidofstud?RollNO=${RollNO}`)
      .then(response => {
        setSubjects(response.data); // Update with API response
      })
      .catch(error => {
        console.error("Error fetching subjects:", error);
      });

    //Fetch the Faculties of the Student
    axios.get(`http://localhost:3006/api/facultyofstudent?RollNO=${RollNO}`)
      .then(response => {
        setFaculty(response.data); // Update with API response
      })
      .catch(error => {
        console.error("Error fetching Faculties:", error);
      });

    //Fetch the Classmate of the Student
    axios.get(`http://localhost:3006/api/batchmateofstud?RollNO=${RollNO}`)
      .then(response => {
        setClassmates(response.data); // Update with API response
      })
      .catch(error => {
        console.error("Error fetching Faculties:", error);
      });
  }, [RollNO]);
  const renderStudentDetails = () => {
    const handleImageUpload = (e, RollNO) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result.split(",")[1];
        axios
          .post(`${API_URL}/api/uploadStudentPhoto`, {
            StudentID: RollNO,
            photoData: base64Image,
          })
          .then((res) => {
            if (res.data.message === "Photo uploaded successfully!") {
              // Reload the student's image
              const updatedStudents = students.map((student) =>
                student.RollNO === RollNO
                  ? { ...student, photoUrl: `${API_URL}/api/getStudentPhoto/${RollNO}` }
                  : student
              );
              setStudents(updatedStudents);
            }
          })
          .catch((err) => console.error("Error uploading photo:", err));
      };
      reader.readAsDataURL(file);
    };
  
    return students.map((student) => (
      <div key={student.RollNO} className="student-detail">
        <div className="profile-section">
          {/* Profile Image */}
          <div className="profile-container">
            <img
              src={`${API_URL}/api/getStudentPhoto/${student.RollNO}` || "https://via.placeholder.com/150"}
              alt={`${student.Stud_name} profile`}
              className="profile-pic"
            />
            <label htmlFor={`image-upload-${student.RollNO}`} className="upload-label">
              Upload Image
            </label>
            <input
              type="file"
              id={`image-upload-${student.RollNO}`}
              accept=".jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => handleImageUpload(e, student.RollNO)}
            />
          </div>
  
          {/* Student Details */}
          <div className="details-container">
            <div className="left-section">
              <h3>{student.Stud_name}</h3>
              Roll No: {student.RollNO}
              <br />
              Section: {student.Section}
              <br />
              Enrollment ID: {student.EnrollmentID}
              <br />
              Gender: {student.Stud_Gender}
            </div>
            <div className="right-section">
              DOB: {student.Stud_DOB}
              <br />
              Course: {student.CourseName}
              <br />
              Department: {student.DepartmentName}
            </div>
          </div>
        </div>
        {error && <p>{error}</p>}
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

  const renderTimetable = () => {
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

        <MarkingTimeTable RollNO={RollNO} />

      </div>
    );
  };

  const renderFaculty = () => {

    return (
      <div className="info-container faculty-container">
        <h4>Faculty Teaching</h4>
        <ul>
          {Faculties.map((teacher, index) => (
            <li key={index} id="faccontainer">
              <strong>Name:</strong> {teacher.Faculty_Name}
              <br />
              <strong>Subject:</strong> {teacher.SubjectName}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderClassmates = () => {
    return (
      <div className="info-container classmates-container">
        <h4>Classmates</h4>
        <ul >
          {classmates.map((classmate, index) => (
            <li key={index} id="matecontainer">
              <strong>Name:</strong> {classmate.BatchmateName}
              <br />
              <strong>Roll No:</strong> {classmate.RollNO}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSubjects = () => {
    return (
      <div className="info-container subjects-container">
        <h4>Subjects</h4>
        <ul>
          {subjects.map((subject, index) => (
            <li key={subject.SubjectID} id="subcontainer">
              <strong>Subject Name:</strong> {subject.SubjectName}
              <br />
              <strong>Subject ID:</strong> {subject.SubjectID}
            </li>
          ))}
        </ul>
      </div>
    );
  };


  return (
    <div className="dashboard">
      <Sidebar setAttFlag={setAttFlag} setProfileFlag={setProfileFlag} setNoticeFlag={setNoticeFlag} resetFlags={resetFlags} RollNO={RollNO} />
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
                <AttendanceDetails RollNO={RollNO} students={students} />
              </div>
            ) :
              (
                <>
                  {
                    profileFlag ? (
                      <div className="profile-section">
                        <Profile />
                      </div>
                    ) : (
                      (
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
                      )
                    )
                  }
                </>
              )
            }
          </>
        )}



      </div>
    </div>
  );
};


export default StudentDashboard;


