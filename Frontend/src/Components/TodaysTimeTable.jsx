import React from 'react'

const TodaysTimeTable = (props) => {
  return (
    <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>From</th>
              <th>Till</th>
              <th>Subjects</th>
              <th>Faculty</th>
              <th>Room Number</th>
              <th>Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {props.ttpass.map((lecture) => {
              let status = "Not Marked";
              let backgroundColor = ""; // For styling purposes

              if (lecture.AttendanceStatus === null) {
                status = "Not Marked";
                backgroundColor = "#fffacd"; // No specific color
              } else if (lecture.AttendanceStatus === 1) {
                status = "Present";
                backgroundColor = "rgba(75, 192, 192, 0.5)"; // Green
              } else {
                status = "Absent";
                backgroundColor = "rgba(255, 99, 132, 1)"; // Red
              }

              return (
                <tr key={lecture.TimetableID} style={{ backgroundColor }}>
                  <td>Period {lecture.LectureNumber}</td>
                  <td>{lecture.StartTime}</td>
                  <td>{lecture.EndTime}</td>
                  <td>{lecture.SubjectName}</td>
                  <td>{lecture.Faculty_Name}</td>
                  <td>{lecture.RoomNumber}</td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
  )
}

export default TodaysTimeTable