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

              if (lecture.AttendanceStatus == 0) {
                status = "Absent";
                backgroundColor = "rgba(255, 99, 132, 1)"; // Red
                
              }else if (lecture.AttendanceStatus == 1 && lecture.EventId != null) {
                status = "Event attendance Marked";
                backgroundColor = "rgba(245, 40, 145, 0.8)"; // Pink
              } else if (lecture.AttendanceStatus == 1) {
                status = "Present";
                backgroundColor = "rgba(75, 192, 192, 0.5)"; // Green
              } else {
                status = "Not Marked";
                backgroundColor = "#fffacd"; // No specific color
              }

              return (
                <tr key={lecture.TimetableID} style={{ backgroundColor , border: "1px solid #000" }}>
                  <td>Period {lecture.LectureNumber}</td>
                  <td style ={ { border: "1px solid #000"}}>{lecture.StartTime}</td>
                  <td style ={ { border: "1px solid #000"}}>{lecture.EndTime}</td>
                  <td style ={ { border: "1px solid #000"}}>{lecture.SubjectName}</td>
                  <td style ={ { border: "1px solid #000"}}>{lecture.Faculty_Name}</td>
                  <td style ={ { border: "1px solid #000"}}>{lecture.RoomNumber}</td>
                  <td style ={ { border: "1px solid #000"}}>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
  )
}

export default TodaysTimeTable