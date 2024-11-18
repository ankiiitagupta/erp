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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State to show success popup

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
          } else {
            setError("Invalid response format");
          }
        })
        .catch((error) => {
          setError("Failed to fetch timetable data");
          console.error(error);
        });
    } else {
      setLectures([]);
    }
  }, [facultyID, selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleLectureChange = async (e) => {
    const selectedLectureId = e.target.value;
    setSelectedLecture(selectedLectureId);

    try {
      const response = await axios.get(
        `${API_URL}/api/getstudentsoflectureondate?facultyID=${facultyID}&LectureDate=${selectedDate}&LectureNumber=${selectedLectureId}`
      );

      if (Array.isArray(response.data)) {
        setStudents(response.data);

        // Set attendance state based on AttendanceStatus
        const initialAttendance = response.data.map((student) => ({
          status: student.AttendanceStatus === 1 ? 1 : student.AttendanceStatus === 0 ? 0 : null,
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
  };

  const handleSubmit = () => {
    const attendanceData = students.map((student, index) => ({
      studentID: student.RollNO,
      lectureDate: selectedDate,
      lectureNumber: selectedLecture,
      status: attendance[index].status,
      facultyID: facultyID,
      subjectID: lectures.find(lec => lec.LectureNumber == selectedLecture)?.SubjectID, // Get SubjectID for the selected lecture
    }));

    console.log(attendanceData); // Log the data being sent to the server

    axios
      .post(`${API_URL}/api/markattendance`, { attendanceData })
      .then((response) => {
        console.log("Attendance marked successfully:", response);
        setShowSuccessPopup(true);
        setStudents([]);
        setAttendance([]);
        setSelectedDate("");
        setSelectedLecture("");
      })
      .catch((error) => {
        console.error("Failed to mark attendance", error);
      });

  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false); // Close the success popup
  };

  return (
    <div className="attendance-container">
      <div className="attendance-inner">
        <h2 className="attendance-title">STUDENT ATTENDANCE</h2>

        {/* Date Selection */}
        <div className="components-select">
          <label>
            Date:
            <input
              type="date"
              className="form-value"
              onChange={handleDateChange}
              value={selectedDate}
            />
          </label>
        </div>

        {selectedDate && lectures.length === 0 && (
          <p>No lecture on the selected date.</p>
        )}

        {selectedDate && lectures.length > 0 && (
          <div className="components-select">
            <label>
              Select Lecture:
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
            </label>
          </div>
        )}

        {/* Display Students for Selected Lecture */}
        <div className="student-list">
          <h3>STUDENT LIST:</h3>
          {students.length > 0 ? (
            students.map((student, index) => (
              <div key={index} className="student-item">
                <div className="avatar"></div>
                <div className="student-info">
                  <p className="student-name">{student.Stud_name}</p>
                  <p className="student-id">{student.RollNO}</p>
                </div>
                <div className="attendance-options">
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${index}`}
                      value="present"
                      onChange={() => handleAttendanceChange(index, 1)}
                      checked={students[index]?.AttendanceStatus == 1} // Check if status is 1
                    />{" "}
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${index}`}
                      value="absent"
                      onChange={() => handleAttendanceChange(index, 0)}
                      checked={students[index]?.AttendanceStatus == 0} // Check if status is 0
                    />{" "}
                    Absent
                  </label>

                </div>
              </div>
            ))
          ) : (
            <p>No students found for this lecture</p>
          )}
        </div>

        {/* Buttons */}
        <div className="btns">
          <button className="reset">Reset</button>
          <button className="edit">Edit</button>
          <button className="submit" type="button" onClick={handleSubmit}>
            Submit
          </button>
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
