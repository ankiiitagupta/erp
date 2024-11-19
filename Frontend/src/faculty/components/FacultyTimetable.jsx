import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../axios";
import "../stylesheets/FacultyTimetable.css";

// const FacultyTimeTable = ({ facultyID }) => {
//   const navigate = useNavigate();
//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//   const [timetable, setTimetable] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const timeSlots = [
//     { start: "09:45:00", end: "10:35:00" },
//     { start: "10:35:00", end: "11:25:00" },
//     { start: "11:30:00", end: "12:20:00" },
//     { start: "12:20:00", end: "01:10:00" },
//     { start: "01:10:00", end: "02:05:00" },
//     { start: "02:05:00", end: "02:55:00" },
//     { start: "03:00:00", end: "03:50:00" },
//     { start: "03:55:00", end: "04:45:00" },
//   ];

//   // Fetch timetable data
//   useEffect(() => {
//     const fetchTimetable = async () => {
//       try {
//         const response = await axios.get(
//           `${API_URL}/api/facultyweekstimetable?facultyID=${facultyID}`
//         );
//         setTimetable(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching timetable:", err);
//         setError("Failed to fetch timetable data.");
//         setLoading(false);
//       }
//     };

//     fetchTimetable();
//   }, [facultyID]);


//   const isCurrentTimeInSlot = (startTime, endTime) => {
//     const now = new Date();
//     console.log("Current Time:", now);
  
//     const [startHours, startMinutes, startSeconds] = startTime
//       .split(":")
//       .map(Number);
//     const [endHours, endMinutes, endSeconds] = endTime.split(":").map(Number);
  
//     const startDateTime = new Date();
//     startDateTime.setHours(startHours, startMinutes, startSeconds);
  
//     const endDateTime = new Date();
//     endDateTime.setHours(endHours, endMinutes, endSeconds);
  
//     console.log("Slot Start:", startDateTime, "Slot End:", endDateTime);
//     const result = now >= startDateTime && now <= endDateTime;
//     console.log("Is Current Slot:", result);
//     return result;
//   };
  
  

//   // Handle attendance button click
//   const handleAttendance = (lecture) => {
//     navigate("/todaysattendance", { state: { lecture } });
//   };

//   const today = new Date().toLocaleString("en-us", { weekday: "long" }).toLowerCase();


//   if (loading) return <div className="loading-message">Loading...</div>;
//   if (error) return <div className="error-message">{error}</div>;

//   return (
//     <div className="faculty-timetable">
//       <table className="timetable-table">
//         <thead>
//           <tr>
//             <th>Day</th>
//             {timeSlots.map((slot, index) => (
//               <th key={index}>
//                 {slot.start} - {slot.end}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {daysOfWeek.map((day) => {
//            const lecturesForDay = timetable.filter(
//             (lecture) => lecture.DayOfWeek.toLowerCase() === day.toLowerCase()
//           );
          

//             const lectureSlots = new Array(timeSlots.length).fill(null);

//             // Adjust logic to handle time slot alignment issues
//             lecturesForDay.forEach((lecture) => {
//               const slotIndex = timeSlots.findIndex(
//                 (slot) =>
//                   // Check if the lecture overlaps the slot
//                   lecture.StartTime >= slot.start && lecture.EndTime <= slot.end
//               );
//               if (slotIndex !== -1) lectureSlots[slotIndex] = lecture;
//             });

//             return (
//               <tr key={day} className={day.toLowerCase() === today ? "today-highlight" : ""}>
//                 <td>{day}</td>
//                 {lectureSlots.map((lecture, index) => {
//                   const isCurrentSlot =
//                   day.toLowerCase() === today &&
//                   lecture &&
//                   isCurrentTimeInSlot(lecture.StartTime, lecture.EndTime);
                
//                   return (
//                     <td
//                       key={index}
//                       className={lecture ? "lecture-cell" : "empty-cell"}
//                     >
//                       {lecture ? (
//                         <>
//                           <div>{lecture.SubjectName}</div>
//                           <div>Room: {lecture.RoomNumber}</div>
//                           <div>Course: {lecture.CourseName}</div>
//                           {isCurrentSlot && (
//                             <button
//                               onClick={() => handleAttendance(lecture)}
//                               className="attendance-button"
//                             >
//                               Mark Attendance
//                             </button>
//                           )}
//                         </>
//                       ) : (
//                         <div>No Lecture</div>
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FacultyTimeTable;


const FacultyTimeTable = ({ facultyID }) => {
  const navigate = useNavigate();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/facultyweekstimetable?facultyID=${facultyID}`
        );
        setTimetable(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timetable:", err);
        setError("Failed to fetch timetable data.");
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [facultyID]);

  const isCurrentTimeInSlot = (startTime, endTime) => {
    const now = new Date();
    console.log("Current Time:", now);

    const [startHours, startMinutes, startSeconds] = startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes, endSeconds] = endTime.split(":").map(Number);

    const startDateTime = new Date();
    startDateTime.setHours(startHours, startMinutes, startSeconds);

    const endDateTime = new Date();
    endDateTime.setHours(endHours, endMinutes, endSeconds);

    console.log("Slot Start:", startDateTime, "Slot End:", endDateTime);
    const result = now >= startDateTime && now <= endDateTime;
    console.log("Is Current Slot:", result);
    return result;
  };

  const handleAttendance = (lecture) => {
    console.log("Mark Attendance for Lecture:", lecture);
    navigate("/todaysattendance", { state: { lecture } });
  };

  const today = new Date().toLocaleString("en-us", { weekday: "long" }).toLowerCase();
  console.log("Today:", today);

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
            console.log("Lectures for", day, ":", lecturesForDay);

            const lectureSlots = new Array(timeSlots.length).fill(null);

            lecturesForDay.forEach((lecture) => {
              const slotIndex = timeSlots.findIndex(
                (slot) =>
                  lecture.StartTime >= slot.start && lecture.EndTime <= slot.end
              );
              if (slotIndex !== -1) lectureSlots[slotIndex] = lecture;
            });

            return (
              <tr key={day} className={day.toLowerCase() === today ? "today-highlight" : ""}>
                <td>{day}</td>
                {lectureSlots.map((lecture, index) => {
                  const isCurrentSlot =
                    day.toLowerCase() === today &&
                    lecture &&
                    isCurrentTimeInSlot(lecture.StartTime, lecture.EndTime);
                  console.log("Is Current Slot for Lecture:", isCurrentSlot, lecture);

                  return (
                    <td
                      key={index}
                      className={lecture ? "lecture-cell" : "empty-cell"}
                    >
                      {lecture ? (
                        <>
                          <div>{lecture.SubjectName}</div>
                          <div>Room: {lecture.RoomNumber}</div>
                          <div>Course: {lecture.CourseName}</div>
                          {isCurrentSlot && (
                            <button
                              onClick={() => handleAttendance(lecture)}
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
