import React, { useState } from "react";

const FacultywiseTimetable = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const[ faculty,setfaculty] = useState([" "])
  const timetableData = [
    {
      faculty: "Dr. Smith",
      date: "2024-11-22",
      slots: [
        { time: "10:00 AM - 11:00 AM", subject: "Maths" },
        { time: "2:00 PM - 3:00 PM", subject: "Physics" },
      ],
    },
    {
      faculty: "Ms. Johnson",
      date: "2024-11-22",
      slots: [
        { time: "11:00 AM - 12:00 PM", subject: "Chemistry" },
        { time: "3:00 PM - 4:00 PM", subject: "Biology" },
      ],
    },
    {
      faculty: "Dr. Patel",
      date: "2024-11-23",
      slots: [
        { time: "9:00 AM - 10:00 AM", subject: "Computer Science" },
        { time: "1:00 PM - 2:00 PM", subject: "Data Structures" },
      ],
    },
  ];

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const filteredTimetable = timetableData.filter(
    (entry) => entry.date === selectedDate
  );

   const renderTimetable = () => {
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
              const lecturesForDay = filteredTimetable.filter(
                (lecture) =>
                  lecture.DayOfWeek.toLowerCase() === day.toLowerCase()
              );

              const lectureSlots = new Array(timeSlots.length).fill(null);

              lecturesForDay.forEach((lecture) => {
                const slotIndex = timeSlots.findIndex(
                  (slot) =>
                    lecture.StartTime >= slot.start &&
                    lecture.EndTime <= slot.end
                );
                if (slotIndex !== -1) lectureSlots[slotIndex] = lecture;
              });

              return (
                <tr key={day}>
                  <td>{day}</td>
                  {lectureSlots.map((lecture, index) => (
                    <td
                      key={index}
                      className={`${lecture ? "lecture-cell" : "empty-cell"}`}
                    >
                      {lecture ? (
                        <>
                          <div>{lecture.SubjectName}</div>
                          <div style={{ fontSize: "1rem" }}>
                            Room: {lecture.RoomName}
                          </div>
                          <div>
                            Section: {lecture.CourseName}/{lecture.YearOfStudy}
                            year/{lecture.Section}
                          </div>
                          <div>Faculty: {lecture.faculty_alias}</div>
                          {lecture.Substitute && (
                            <div className="substitute-tag">Substitute</div>
                          )}
                        </>
                      ) : (
                        <div className="no-lecture-cell">No Lecture</div>
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

  // Function to render the filtered timetable (based on selected filters)
  const renderFilteredTimetable = () => {
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
              const lecturesForDay = filteredTimetable.filter(
                (lecture) =>
                  lecture.DayOfWeek.toLowerCase() === day.toLowerCase()
              );

              const lectureSlots = new Array(timeSlots.length).fill(null);

              lecturesForDay.forEach((lecture) => {
                const slotIndex = timeSlots.findIndex(
                  (slot) =>
                    lecture.StartTime >= slot.start &&
                    lecture.EndTime <= slot.end
                );
                if (slotIndex !== -1) lectureSlots[slotIndex] = lecture;
              });

              return (
                <tr key={day}>
                  <td>{day}</td>
                  {lectureSlots.map((lecture, index) => (
                    <td
                      key={index}
                      className={`${lecture ? "lecture-cell" : "empty-cell"}`}
                    >
                      {lecture ? (
                        <>
                          <div>{lecture.SubjectName}</div>
                          <div style={{ fontSize: "1rem" }}>
                            Room: {lecture.RoomName}
                          </div>
                          <div>
                            Section: {lecture.CourseName}/{lecture.YearOfStudy}
                            year/{lecture.Section}
                          </div>
                          <div>Faculty: {lecture.faculty_alias}</div>
                          {lecture.Substitute && (
                            <div className="substitute-tag">Substitute</div>
                          )}
                        </>
                      ) : (
                        <div className="no-lecture-cell">No Lecture</div>
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


  return (
    <div>
      <h1>Faculty Timetable</h1>
      <label htmlFor="date">Select Date: </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      {filteredTimetable.length > 0 ? (
        <div>
          {filteredTimetable.map((entry, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h2>{entry.faculty}</h2>
              <ul>
                {entry.slots.map((slot, idx) => (
                  <li key={idx}>
                    <strong>{slot.time}</strong> - {slot.subject}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No timetable available for the selected date.</p>
      )}
    </div>
  );
};

export default FacultywiseTimetable;
