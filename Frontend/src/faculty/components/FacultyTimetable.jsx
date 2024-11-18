// FacultyTimetable.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../axios";
import axios from "axios";
import '../stylesheets/FacultyTimetable.css'; // Ensure the CSS file is imported

const FacultyTimeTable = ({ facultyID, setEmpdetailFlag , setMarkAttendanceFlag, setAcademicFlag}) => {
  const navigate = useNavigate();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [periods, setPeriods] = useState(null);
  const [error, setError] = useState(null);

  const timeSlots = [
    "09:45 AM - 10:35 AM",
    "10:35 AM - 11:25 AM",
    "11:25 AM - 12:20 PM",
    "12:20 PM - 01:10 PM",
    "02:05 PM - 02:55 PM",
    "03:00 PM - 03:50 PM",
    "03:55 PM - 04:45 PM",
  ];

  useEffect(() => {
    axios
      .get(`${API_URL}/api/facultytimetable?facultyID=${facultyID}`)
      .then((response) => {
        console.log(response.data);
        setPeriods(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch timetable data");
        console.error(error);
      });
  }, [facultyID]);

  const getPeriodForLecture = (startTime) => {
    switch (startTime) {
      case "09:00:00": return 0;
      case "10:00:00": return 1;
      case "11:00:00": return 2;
      case "12:00:00": return 3;
      case "14:00:00": return 4;
      case "15:00:00": return 5;
      case "16:00:00": return 6;
      default: return -1;
    }
  };

  const handleTodaysAttendance = (lecture ,setEmpdetailFlag , setMarkAttendanceFlag, setAcademicFlag) => {
    navigate(`/todaysattendance`, { state: { lecture ,setEmpdetailFlag , setMarkAttendanceFlag, setAcademicFlag  } });
  };

  const today = new Date().toLocaleString("en-us", { weekday: "long" });

  if (error) return <div className="error-message">{error}</div>;
  if (!periods) return <div className="loading-message">Loading...</div>;

  return (
    <div className="faculty-timetable">
      <table className="timetable-table">
        <thead>
          <tr className="table-header">
            <th>Day</th>
            {timeSlots.map((slot, index) => (
              <th key={index} className="time-slot-header">{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => {
            const lecturesForDay = periods.filter(
              (lecture) => lecture.DayOfWeek === day
            );
            const lecturePeriods = new Array(timeSlots.length).fill(null);

            lecturesForDay.forEach((lecture) => {
              const periodIndex = getPeriodForLecture(lecture.StartTime);
              if (periodIndex !== -1) lecturePeriods[periodIndex] = lecture;
            });

            return (
              <tr
                key={day}
                className={`day-row ${day === today ? "today-highlight" : ""}`}
              >
                <td className="day-name">{day}</td>
                {lecturePeriods.map((lecture, index) => (
                  <td key={index} className={`lecture-cell ${lecture ? "has-lecture" : "no-lecture"}`}>
                    {lecture ? (
                      <>
                        <div className="subject-name"><strong>{lecture.SubjectName}</strong></div>
                        <div className="course-name">Course: {lecture.ClassName}</div>
                        <div className="room-name">Room: {lecture.RoomNumber}</div>
                        <button
                          className="attendance-button"
                          onClick={() => handleTodaysAttendance(lecture)}
                        >
                          Mark Attendance
                        </button>
                      </>
                    ) : (
                      <div className="no-lecture-message" onClick={() => handleTodaysAttendance(lecture)}>No Lecture</div>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyTimeTable;
