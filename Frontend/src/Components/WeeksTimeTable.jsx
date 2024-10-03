import React from "react";

const WeeksTimeTable = (props) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; // Assuming the timetable runs from Monday to Friday

  return (
    <div className="timetable">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time Slot</th>
            <th>Lecture Number</th>
            <th>Subject</th>
            <th>Faculty</th>
            <th>Room</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => (
            <React.Fragment key={day}>
              {props.ttpass
                .filter((lecture) => lecture.Day === day) // Filter lectures by day
                .map((lecture) => {
                  let status = "Not Marked";
                  let backgroundColor = ""; // Default background color

                  if (lecture.AttendanceStatus === null) {
                    status = "Not Marked";
                    backgroundColor = "#fffacd"; // Light yellow for not marked
                  } else if (lecture.AttendanceStatus === 1) {
                    status = "Present";
                    backgroundColor = "rgba(75, 192, 192, 0.5)"; // Light green for present
                  } else {
                    status = "Absent";
                    backgroundColor = "rgba(255, 99, 132, 1)"; // Red for absent
                  }

                  return (
                    <tr key={lecture.TimetableID} style={{ backgroundColor }}>
                      <td>{day}</td>
                      <td>{lecture.StartTime + " - " + lecture.EndTime}</td>
                      <td>Period {lecture.LectureNumber}</td>
                      <td>{lecture.SubjectName}</td>
                      <td>{lecture.Faculty_Name}</td>
                      <td>{lecture.RoomNumber}</td>
                    </tr>
                  );
                })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeksTimeTable;
