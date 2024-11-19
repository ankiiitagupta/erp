import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../axios";
import axios from "axios";
import "../stylesheets/FacultyTimetable.css";

const FacultyTimeTable = ({
  facultyID,
  setEmpdetailFlag,
  setMarkAttendanceFlag,
  setAcademicFlag,
}) => {
  const navigate = useNavigate();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [periods, setPeriods] = useState(null);
  const [error, setError] = useState(null);

  const timeSlots = [
    { start: "09:45 AM", end: "10:35 AM" },
    { start: "10:35 AM", end: "11:25 AM" },
    { start: "11:25 AM", end: "12:20 PM" },
    { start: "12:20 PM", end: "01:10 PM" },
    { start: "02:05 PM", end: "02:55 PM" },
    { start: "03:00 PM", end: "03:50 PM" },
    { start: "03:55 PM", end: "04:45 PM" },
  ];

  useEffect(() => {
    axios
      .get(`${API_URL}/api/facultytimetable?facultyID=${facultyID}`)
      .then((response) => {
        setPeriods(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch timetable data");
        console.error(error);
      });
  }, [facultyID]);

  const isCurrentTimeInSlot = (slot) => {
    const now = new Date();
    const [startHours, startMinutes] = parseTime(slot.start);
    const [endHours, endMinutes] = parseTime(slot.end);

    const startDateTime = new Date();
    startDateTime.setHours(startHours, startMinutes, 0);

    const endDateTime = new Date();
    endDateTime.setHours(endHours, endMinutes, 0);

    return now >= startDateTime && now <= endDateTime;
  };

  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return [hours, minutes];
  };

  const handleTodaysAttendance = (lecture, setEmpdetailFlag, setMarkAttendanceFlag, setAcademicFlag ) => {
    navigate(`/todaysattendance`, {
      state: { lecture, setEmpdetailFlag, setMarkAttendanceFlag, setAcademicFlag },
    });
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
              <th key={index} className="time-slot-header">
                {slot.start} - {slot.end}
              </th>
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
              const periodIndex = timeSlots.findIndex(
                (slot) =>
                  lecture.StartTime ===
                  `${parseTime(slot.start).join(":")}:00`
              );
              if (periodIndex !== -1) lecturePeriods[periodIndex] = lecture;
            });

            return (
              <tr
                key={day}
                className={`day-row ${day === today ? "today-highlight" : ""}`}
              >
                <td className="day-name">{day}</td>
                {lecturePeriods.map((lecture, index) => {
                  const isCurrentSlot =
                    day === today && isCurrentTimeInSlot(timeSlots[index]);
                  return (
                    <td
                      key={index}
                      className={`lecture-cell ${
                        lecture ? "has-lecture" : "no-lecture"
                      }`}
                    >
                      {lecture ? (
                        <>
                          <div className="subject-name">
                            <strong>{lecture.SubjectName}</strong>
                          </div>
                          <div className="course-name">
                            Course: {lecture.ClassName}
                          </div>
                          <div className="room-name">
                            Room: {lecture.RoomNumber}
                          </div>
                          {isCurrentSlot && (
                            <button
                              className="attendance-button"
                              onClick={() => handleTodaysAttendance(lecture)}
                            >
                              Mark Attendance
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="insidecontent">
                          <div className="no-lecture-message">No Lecture</div>
                          {isCurrentSlot && (
                            <button
                              className="attendance-button"
                              onClick={() => handleTodaysAttendance(lecture)}
                            >
                              Mark Attendance
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyTimeTable;
