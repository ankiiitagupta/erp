import React, { useState, useEffect } from "react";
import {API_URL} from "../../axios"; // Add this import
import axios from "axios";

const WeeksTimeTable = ({ RollNO }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [periods, setPeriods] = useState(null);
  const [error, setError] = useState(null); // Declare error state
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
    // Fetch timetable data
    axios
      .get(`${API_URL}/api/weekstimetable?RollNO=${RollNO}`)
      .then((response) => {
        console.log(response.data);
        setPeriods(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch timetable data");
        console.error(error);
      });
  }, [RollNO]);

  // Function to map lecture start time to the appropriate period
  const getPeriodForLecture = (startTime) => {
    switch (startTime) {
      case "09:00:00":
        return 0;
      case "10:00:00":
        return 1;
      case "11:00:00":
        return 2;
      case "12:00:00":
        return 3;
      case "14:00:00":
        return 4;
      case "15:00:00":
        return 5;
        case "16:00:00":
        return 6;
      default:
        return -1; // Return invalid if no match
    }
  };

  if (error) return <div>{error}</div>; // Render error message if any
  if (!periods) return <div>Loading...</div>; // Render loading message until data is fetched

  return (
    <div className="timetable">
      <table>
        <thead>
          <tr style={{ border: "1px solid #000"  }}>
            <th >Day</th>
            {timeSlots.map((slot, index) => (
              <th key={index}>{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => {
            const lecturesForDay = periods.filter(
              (lecture) => lecture.DayOfWeek === day
            );
            const lecturePeriods = new Array(timeSlots.length).fill(null); // Rename local variable

            // Place each lecture into the correct period based on its StartTime
            lecturesForDay.forEach((lecture) => {
              const periodIndex = getPeriodForLecture(lecture.StartTime);
              if (periodIndex !== -1) lecturePeriods[periodIndex] = lecture;
            });

            return (
              <tr key={day} style={{ border: "1px solid #000"  }}>
                <td>{day}</td>
                {lecturePeriods.map((lecture, index) => (
                  <td
                    key={index}
                    style={{ backgroundColor: lecture ? "#f0f8ff" : "#fff" , border: "1px solid #000"  }}
                  >
                    {lecture ? (
                      <>
                        <div>{lecture.SubjectName}</div>
                        <div>{lecture.Faculty_Name}</div>
                        <div>{lecture.RoomNumber}</div>
                      </>
                    ) : (
                      <div>No Lecture</div>
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

export default WeeksTimeTable;
