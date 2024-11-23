import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/facultyoccupency.css"; // Changed to a unique stylesheet name
import { API_URL } from "../../axios";

const FacultyOccupency = ({ inputDate }) => {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const timeSlots = [
    "09:45 - 10:35",
    "10:35 - 11:25",
    "11:30 - 12:20",
    "12:20 - 01:10",
    "01:10 - 02:05",
    "02:05 - 02:55",
    "03:00 - 03:50",
    "03:55 - 04:45",
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from /allfacultyperdaytimetable...");
        const response = await axios.get(`${API_URL}/api/allfacultyperdaytimetable`, {
          params: { inputDate },
        });

        if (response.data && Array.isArray(response.data)) {
          console.log("API Response:", response.data);
          setData(response.data);
          setLoading(false);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [inputDate]);

  // Group data by FacultyID
  useEffect(() => {
    const groupByFaculty = (data) => {
      if (!Array.isArray(data)) {
        console.error("Expected an array, received:", data);
        return {};
      }

      const grouped = {};
      data.forEach((item) => {
        if (!grouped[item.FacultyID]) {
          grouped[item.FacultyID] = {
            name: item.Faculty_Name,
            lectures: [],
          };
        }
        grouped[item.FacultyID].lectures.push(item);
      });
      return grouped;
    };

    setGroupedData(groupByFaculty(data));
  }, [data]);

  // Map lectures to time slots
  const mapLecturesToSlots = (lectures) => {
    return timeSlots.map((slot) => {
      const [start, end] = slot.split(" - ");
      const lecture = lectures.find(
        (lec) => lec.StartTime >= start && lec.StartTime < end
      );
      return lecture ? lecture.SubjectName : "Free";
    });
  };

  return (
    <div className="faculty-occupency-container">
      {loading ? (
        <p className="faculty-occupency-loading">Loading...</p>
      ) : error ? (
        <p className="faculty-occupency-error">{error}</p>
      ) : (
        <table className="faculty-occupency-table">
          <thead>
            <tr>
              <th>Faculty (ID & Name)</th>
              {timeSlots.map((slot, index) => (
                <th key={index}>{slot}</th>
              ))}
              <th>Faculty Load</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedData).map((facultyID) => {
              const faculty = groupedData[facultyID];
              const lectureCount = faculty.lectures.length;

              const slots = mapLecturesToSlots(faculty.lectures);

              return (
                <tr key={facultyID}>
                  <td>{`${facultyID} - ${faculty.name}`}</td>
                  {slots.map((slot, index) => (
                    <td key={index} className={slot === "Free" ? "faculty-occupency-slot-free" : "faculty-occupency-slot-filled"}>
                      {slot}
                    </td>
                  ))}
                  <td>{`${lectureCount} Lecture${lectureCount > 1 ? "s" : ""}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultyOccupency;
