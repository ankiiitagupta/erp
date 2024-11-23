import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../axios";
import "../stylesheets/facultyalltimetable.css";

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

const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

const TimetableComponent = ({ facultyID, startDate, endDate }) => {
  const [timetable, setTimetable] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      if (!facultyID || !startDate || !endDate) {
        setError("Faculty ID, start date, and end date are required.");
        return;
      }

      try {
        setError(null);
        const response = await axios.get(`${API_URL}/api/perdaytimetable`, {
          params: {
            FacultyID: facultyID,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          },
        });

        const data = response.data;
        if (data.length === 0) {
          setError("No timetable found for the selected date range.");
          setTimetable({});
          return;
        }

        const organizedData = organizeByDate(data);
        setTimetable(organizedData);
      } catch (err) {
        setError("Error fetching timetable. Please try again.");
        console.error(err);
      }
    };

    fetchTimetable();
  }, [facultyID, startDate, endDate]);

  const organizeByDate = (data) => {
    const result = {};
    data.forEach((item) => {
      const { LectureDate, StartTime } = item;
      if (!result[LectureDate]) result[LectureDate] = [...timeSlots.map(() => null)];

      const slotIndex = timeSlots.findIndex(
        (slot) => StartTime >= slot.start && StartTime < slot.end
      );
      if (slotIndex !== -1) {
        result[LectureDate][slotIndex] = item; // Store the entire lecture data
      }
    });
    return result;
  };

  const formatDayAndDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="timetable-container">

      {error && <p className="error-message">{error}</p>}

      {Object.keys(timetable).length > 0 && (
        <table className="timetable">
          <thead>
            <tr>
              <th>Day & Date</th>
              {timeSlots.map((slot, index) => (
                <th key={index}>
                  {slot.start} - {slot.end}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(timetable)
              .filter(
                (date) =>
                  new Date(date) >= new Date(formatDate(startDate)) &&
                  new Date(date) <= new Date(formatDate(endDate))
              )
              .map((date) => (
                <tr key={date}>
                  <td className="date-column">{formatDayAndDate(date)}</td>
                  {timetable[date].map((lecture, index) => (
                    <td key={index} className={lecture ? "lecture-cell" : "free-slot"}>
                      {lecture ? (
                        <div>
                          <div><strong>{lecture.SubjectName}</strong></div>
                          <div>Alias: {lecture.faculty_alias}</div>
                          <div>Course: {lecture.CourseName}</div>
                          <div>Section: {lecture.CourseName}/{lecture.YearOfStudy}year/{lecture.Section}</div>
                          <div>Year: {lecture.YearOfStudy}</div>
                          <div>Room: {lecture.RoomName}</div>
                        </div>
                      ) : (
                        "Free"
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimetableComponent;
