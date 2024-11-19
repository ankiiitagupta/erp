import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import FacultySidebar from "./FacultySidebar.jsx";
import Header from "../../Student/Components/Header.jsx";
import "../stylesheets/TodaysAttendance.css";

const TodaysAttendance = () => {
  const { lectureId } = useParams();  // Get the lecture ID from the URL
  const navigate = useNavigate();
  const location = useLocation();
  const [lecture, setLecture] = useState(location.state?.lecture || null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const setEmpdetailFlag = location.state?.setEmpdetailFlag;
  const setMarkAttendanceFlag = location.state?.setMarkAttendanceFlag;
  const setAcademicFlag = location.state?.setAcademicFlag;

  useEffect(() => {
    // Simulate fetching lecture details if not provided in state
    if (!lecture) {
      const dummyLecture = {
        SubjectName: "Mathematics 101",
        ClassName: "Math-A",
        RoomNumber: "Room 202",
        Lecture:"1",
      };
      setLecture(dummyLecture);
    }

    // Dummy student data
    const dummyStudents = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Alice Brown" },
      { id: 4, name: "Bob Johnson" },
    ];
    setStudents(dummyStudents);

    // Initialize attendance status for each student
    const initialAttendance = dummyStudents.reduce((acc, student) => {
      acc[student.id] = "Absent";
      return acc;
    }, {});
    setAttendance(initialAttendance);
  }, [lecture]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = () => {
    // Prepare data to display or send
    const attendanceData = {
      lectureId,
      attendance: students.map((student) => ({
        studentId: student.id,
        status: attendance[student.id],
      })),
    };

    console.log("Attendance Data:", attendanceData);
    alert("Attendance marked successfully!");

    // Example of how to use the flags after marking attendance
    if (setEmpdetailFlag) setEmpdetailFlag(true);
    if (setMarkAttendanceFlag) setMarkAttendanceFlag(false);
    if (setAcademicFlag) setAcademicFlag(true);

    navigate("/facultydashboard/1");  // Navigate back to the timetable
  };

  if (!lecture) return <div>Loading lecture data...</div>;

  return (
    <div className="todays-attendance-page">
      <FacultySidebar setEmpdetailFlag={setEmpdetailFlag}
        setMarkAttendanceFlag={setMarkAttendanceFlag}
        setAcademicFlag={setAcademicFlag} />
      <div className="main-content">
        <Header />
        <div className="mark-attendance">
          <h2>Mark Attendance for {lecture.SubjectName}</h2>
          <p>Course: {lecture.ClassName}</p>
          <p>Room: {lecture.RoomNumber}</p>
          <p>Lecture: {lecture.Lecture}</p>
          <div className="attendance-list">
            {students.map((student) => (
              <div key={student.id} className="student-attendance">
                <p>{student.name}</p>
                <div className="attendance-options">
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      checked={attendance[student.id] === "Present"}
                      onChange={() => handleAttendanceChange(student.id, "Present")}
                    />
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      checked={attendance[student.id] === "Absent"}
                      onChange={() => handleAttendanceChange(student.id, "Absent")}
                    />
                    Absent
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default TodaysAttendance;
