import React, { useState, useEffect } from 'react';
import "../stylesheets/MarkStudentAttendance.css";
import { API_URL } from "../../axios";
import axios from "axios";

const MarkStudentAttendance = ({ facultyID }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLecture, setSelectedLecture] = useState("");
  const [lectures, setLectures] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [totalStudents, setTotalStudents] = useState(0); // Total students state
  const [presentStudents, setPresentStudents] = useState(0); // Present students state
  const [absentStudents, setAbsentStudents] = useState(0); // Absent students state

  useEffect(() => {
    if (selectedDate !== "") {
      axios
        .get(`${API_URL}/api/facultyondateselectionattendance?facultyID=${facultyID}&LectureDate=${selectedDate}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setLectures(response.data);
            setStudents([]);
            setSelectedLecture("");
            setAttendance([]);
            setTotalStudents(0); // Reset total students when date changes
            setPresentStudents(0); // Reset present students when date changes
            setAbsentStudents(0); // Reset absent students when date changes
          } else {
            console.error("Invalid response format");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch timetable data", error);
        });
    } else {
      setLectures([]);
    }
  }, [facultyID, selectedDate]);

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const handleLectureChange = async (e) => {
    const selectedLectureId = e.target.value;
    setSelectedLecture(selectedLectureId);

    try {
      const response = await axios.get(
        `${API_URL}/api/getstudentsoflectureondate?facultyID=${facultyID}&LectureDate=${selectedDate}&LectureNumber=${selectedLectureId}`
      );

      if (Array.isArray(response.data)) {
        setStudents(response.data);
        setTotalStudents(response.data.length); // Set total students dynamically

        // Calculate present and absent students countS
        const presentCount = response.data.filter(student => student.AttendanceStatus == 1).length;
        const absentCount = response.data.filter(student => student.AttendanceStatus == 0).length;

        setPresentStudents(presentCount); // Set present students dynamically
        setAbsentStudents(absentCount); // Set absent students dynamically

        const initialAttendance = response.data.map((student) => ({
          status: student.AttendanceStatus,
        }));
        setAttendance(initialAttendance);
      } else {
        console.error("Invalid student data format");
      }
    } catch (err) {
      console.error("Failed to fetch students data", err);
    }
  };

  const handleAttendanceChange = (index, status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index].status = status;
    setAttendance(updatedAttendance);

    // Update present and absent student counts based on the updated attendance
    const updatedPresentCount = updatedAttendance.filter(att => att.status == 1).length;
    const updatedAbsentCount = updatedAttendance.filter(att => att.status == 0).length;

    setPresentStudents(updatedPresentCount);
    setAbsentStudents(updatedAbsentCount);
  };

  const handleSubmit = () => {
    const attendanceData = students.map((student, index) => ({
      studentID: student.RollNO,
      lectureDate: selectedDate,
      lectureNumber: selectedLecture,
      status: attendance[index]?.status ?? null,
      facultyID: facultyID,
      subjectID: lectures.find((lec) => lec.LectureNumber == selectedLecture)?.SubjectID,
    }));

    axios
      .post(`${API_URL}/api/markattendance`, { attendanceData })
      .then(() => {
        setShowSuccessPopup(true);
        setStudents([]);
        setAttendance([]);
        setSelectedDate("");
        setSelectedLecture("");
        setTotalStudents(0); // Reset total students after submission
        setPresentStudents(0); // Reset present students after submission
        setAbsentStudents(0); // Reset absent students after submission
      })
      .catch((error) => {
        console.error("Failed to mark attendance", error);
      });
  };

  const handleClosePopup = () => setShowSuccessPopup(false);

  return (
    <div className="attendance-container">
      {/* Left Section */}
      <div className="left-section">
        <h1 className="attendance-title">STUDENT ATTENDANCE</h1>
        {/* Date Selection */}
        <div className="form-container">
          <div className="form-item">
            <label>Date:</label>
            <input
              type="date"
              className="form-value"
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
        </div>

        {selectedDate && lectures.length === 0 && (
          <p className="info-text">No lecture on the selected date.</p>
        )}

        {selectedDate && lectures.length > 0 && (
          <div className="form-container">
            <div className="form-item">
              <label>Select Lecture:</label>
              <select
                className="select-dropdown"
                value={selectedLecture}
                onChange={handleLectureChange}
              >
                <option value="">SELECT</option>
                {lectures.map((lec) => (
                  <option key={lec.LectureNumber} value={lec.LectureNumber}>
                    {lec.SubjectName} - {lec.CourseName} ({lec.LectureNumber})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Student List */}
        <div className="student-list">
          <h3>Student List:</h3>
          {students.length > 0 ? (
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Present</th>
                  <th>Absent</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.RollNO}</td>
                    <td>{student.Stud_name}</td>
                    <td>
                      <input
                        type="radio"
                        name={`attendance-${index}`}
                        value="present"
                        onChange={() => handleAttendanceChange(index, 1)}
                        checked={attendance[index]?.status == 1}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name={`attendance-${index}`}
                        value="absent"
                        onChange={() => handleAttendanceChange(index, 0)}
                        checked={attendance[index]?.status == 0}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students found for this lecture.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="btns">
          <button className="reset">Reset</button>
          <button className="edit">Edit</button>
          <button className="submit" type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="card total-students">
          <span>{totalStudents} Total Students</span>
          <span className="icon">👨‍🎓</span>
        </div>
        <div className="card present-today">
          <span>{presentStudents} Present Today</span> {/* Dynamic present count */}
          <span className="icon">✅</span>
        </div>
        <div className="card absent-today">
          <span>{absentStudents} Absent Today</span> {/* Dynamic absent count */}
          <span className="icon">❌</span>
        </div>
        <div className="calendar">
          <h4>Calendar</h4>
          {/* Include calendar component or placeholder */}
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Attendance Marked Successfully!</h3>
            <button className="popup-close-btn" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkStudentAttendance;

