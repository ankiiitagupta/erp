import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../axios";
import "../stylesheets/FacultyTimetable.css";

const FacultyTimeTable = ({ FacultyID }) => {
  const navigate = useNavigate();
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClick = (action) => {
    if (action) action();
  };

  const timeSlots = [
    { start: "09:45:00", end: "10:35:00" },
    { start: "10:35:00", end: "11:25:00" },
    { start: "11:30:00", end: "12:20:00" },
    { start: "12:20:00", end: "01:10:00" },
    { start: "01:10:00", end: "02:05:00" },
    { start: "02:05:00", end: "02:55:00" },
    { start: "03:00:00", end: "03:50:00" },
    { start: "03:55:00", end: "04:45:00" },
  ];

  // Fetch timetable data
  useEffect(() => {
    const fetchTimetable = async () => {
      if (!FacultyID) {
        console.error("facultyID is undefined");
        setError("Invalid faculty ID");
        setLoading(false);
        return;
      }

      try {
        const apiUrl = `${API_URL}/api/facultytimetable?facultyID=${FacultyID}`;

        const response = await axios.get(apiUrl);

        if (!Array.isArray(response.data)) {
          throw new Error("API returned invalid format");
        }

        setTimetable(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching timetable:", err.message);
        setError("Failed to fetch timetable data.");
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [FacultyID]);

  const isCurrentTimeInSlot = (startTime, endTime) => {
    const now = new Date();

    const [startHours12, startMinutes] = startTime.split(":").map(Number);
    const [endHours12, endMinutes] = endTime.split(":").map(Number);

    // Infer AM/PM and convert to 24-hour format
    const startHours = startHours12 < 12 && now.getHours() >= 12 ? startHours12 + 12 : startHours12;
    const endHours = endHours12 < 12 && now.getHours() >= 12 ? endHours12 + 12 : endHours12;

    const startDateTime = new Date();
    startDateTime.setHours(startHours, startMinutes, "00");

    const endDateTime = new Date();
    endDateTime.setHours(endHours, endMinutes, "00");

    console.log("now: " + now);
    console.log("StartDateTime: " + startDateTime);
    console.log("EndDateTime: " + endDateTime);

    const result = now >= startDateTime && now <= endDateTime;

    return result;
};



  // Handle attendance button click
  const handleAttendance = (lecture) => {
    console.log(lecture.LectureNumber); // Log to verify it's valid
    navigate("/todaysattendance", {
      state: {
        facultyID: FacultyID,
        lectureID: lecture.LectureNumber,
        lectureDetails: lecture,
      },
    });
  };

  const today = new Date()
    .toLocaleString("en-us", { weekday: "long" })
    .toLowerCase();

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="faculty-timetable">
      <table className="timetable-table">
        <thead>
          <tr>
            <th>Day</th>
            {timeSlots.map((slot, index) => (
              <th key={index}>
                {slot.start} - {slot.end}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => {
            const lecturesForDay = timetable.filter(
              (lecture) => lecture.DayOfWeek.toLowerCase() === day.toLowerCase()
            );

            const lectureSlots = new Array(timeSlots.length).fill(null);

            // Adjust logic to handle time slot alignment issues
            lecturesForDay.forEach((lecture) => {
              const slotIndex = timeSlots.findIndex(
                (slot) =>
                  // Check if the lecture overlaps the slot
                  lecture.StartTime >= slot.start && lecture.EndTime <= slot.end
              );
              if (slotIndex !== -1) lectureSlots[slotIndex] = lecture;
            });

            return (
              <tr
                key={day}
                className={day.toLowerCase() === today ? "today-highlight" : ""}
              >
                <td>{day}</td>
                {lectureSlots.map((lecture, index) => {
                  const isCurrentSlot =
                    day.toLowerCase() === today &&
                    lecture &&
                    isCurrentTimeInSlot(lecture.StartTime, lecture.EndTime);

                  return (
                    <td
                      key={index}
                      className={lecture ? "lecture-cell" : "empty-cell"}
                    >
                      {lecture ? (
                        <>
                          <div>{`${lecture.SubjectName} (${lecture.RoomName})`}</div>
                          <div>{`${lecture.CourseName} / ${lecture.YearOfStudy} Year / ${lecture.Section}`}</div>
                          {isCurrentSlot && (
                            <button
                              onClick={() =>
                                handleClick(() => handleAttendance(lecture))
                              }
                              className="attendance-button"
                            >
                              Mark Attendance
                            </button>
                          )}
                        </>
                      ) : (
                        <div>No Lecture</div>
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
