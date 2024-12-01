import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import FacultySidebar from "./FacultySidebar.jsx";
import Header from "../../Student/Components/Header.jsx";
import "../stylesheets/TodaysAttendance.css";
import { API_URL } from "../../axios"; // Add your API URL config

const TodaysAttendance = ({}) => {

  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);
  const [students, setStudents] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentStudents, setPresentStudents] = useState(0);
  const [absentStudents, setAbsentStudents] = useState(0);
  const today = new Date().toISOString().split('T')[0];
  const location = useLocation();

  const { facultyID, lectureID } = location.state || {};
 
  
    
  useEffect(() => {

    axios
      .get(`${API_URL}/api/facultyondateselectionattendance?facultyID=${facultyID}&LectureDate=${today}`)
      .then((response) => {
        setLecture(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lecture data", error);
      });


    // Fetch students of today's lecture
    axios
      .get(`${API_URL}/api/getstudentsoflectureondate?facultyID=${facultyID}&LectureDate=${today}&LectureNumber=${lectureID}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setStudents(response.data);
          setTotalStudents(response.data.length);
          // Initialize attendance state
          const initialAttendance = response.data.map((student) => ({
            studentId: student.RollNO,
            status: null, // Default attendance status
          }));
          setAttendance(initialAttendance);
        }
      })
      .catch((error) => {
        console.error("Error fetching student data", error);
      });
  }, [lectureID, facultyID]);

  const handleAttendanceChange = (studentId, status) => {
    const updatedAttendance = attendance.map((att) =>
      att.studentId === studentId ? { ...att, status } : att
    );
    setAttendance(updatedAttendance);

    // Update present and absent counts
    const updatedPresentCount = updatedAttendance.filter((att) => att.status === "Present").length;
    const updatedAbsentCount = updatedAttendance.filter((att) => att.status === "Absent").length;
    setPresentStudents(updatedPresentCount);
    setAbsentStudents(updatedAbsentCount);
  };

  

  const handleSubmit = () => {
    const attendanceData = students.map((student, index) => ({
      studentID: student.RollNO,
      lectureDate: today,
      lectureNumber: lectureID,
      status: attendance[index]?.status ?? null,
      facultyID: Number(facultyID),
      subjectID: lecture.find((lec) => lec.LectureNumber == lectureID)?.SubjectID,
    }));
    console.log(attendanceData)

    axios
      .post(`${API_URL}/api/markattendance`, { attendanceData })
      .then(() => {
        setShowSuccessPopup(true);
        setStudents([]);
        setAttendance([]);
        setTotalStudents(0); // Reset total students after submission
        setPresentStudents(0); // Reset present students after submission
        setAbsentStudents(0); // Reset absent students after submission
      })
      .catch((error) => {
        console.error("Failed to mark attendance", error);
      });
  };

  if (!lecture) return <div>Loading lecture data...</div>;

  return (
    <div className="todays-attendance-page">
      <FacultySidebar />
      <div className="main-contenttatt">
        <Header />
        <div className="mark-attendance">
          <h2>Mark Attendance for {lecture.SubjectName}</h2>
          <p>Course: {lecture.ClassName}</p>
          <p>Room: {lecture.RoomNumber}</p>
          <p>Lecture: {lecture.LectureNumber}</p>
          <div className="attendance-list">
            {students.map((student) => (
              <div key={student.RollNO} className="student-attendance">
                <p>{student.Stud_name}</p>
                <div className="attendance-options">
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student.RollNO}`}
                      value="Present"
                      onChange={() => handleAttendanceChange(student.RollNO, 1)}
                      checked={attendance.find((att) => att.studentId === student.RollNO)?.status === 1}
                    />
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student.RollNO}`}
                      value="Absent"
                      onChange={() => handleAttendanceChange(student.RollNO, 0)}
                      checked={attendance.find((att) => att.studentId === student.RollNO)?.status === 0}
                    />
                    Absent
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="summary">
            <p>Total Students: {totalStudents}</p>
            <p>Present: {presentStudents}</p>
            <p>Absent: {absentStudents}</p>
          </div>
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodaysAttendance;
