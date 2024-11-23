import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../axios";
import "../stylesheets/facultyalltimetable.css";
import FilteredTimetable from "./FilteredTimetable";
import FacultywiseTimetable from "./facultywisett";
import FacultyTimeTable from "./FacultyTimetable";
import ClasswiseTimetable from "./classwisetimetable";

// (Rest of the existing code)

const FacultyallTimeTable = ({ facultyID, roles }) => {
  
  const [activeTab, setActiveTab] = useState("Timetable");
  const [timetable, setTimetable] = useState([]);
  // Fetch timetable data
  useEffect(() => {
    const fetchTimetable = async () => {
      if (!facultyID) {
        console.error("facultyID is undefined");
        setError("Invalid faculty ID");
        setLoading(false);
        return;
      }
  
      try {
        const apiUrl = `${API_URL}/api/facultytimetable?facultyID=${facultyID}`;
        console.log("Fetching timetable from:", apiUrl);
        const response = await axios.get(apiUrl);
  
        if (!Array.isArray(response.data)) {
          throw new Error("API returned invalid format");
        }
  
        setTimetable(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timetable:", err.message);
        setError("Failed to fetch timetable data.");
        setLoading(false);
      }
    };
  
    fetchTimetable();
  }, [facultyID]);


  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
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

  return (
    <div className="faculty-timetable-container">
      <div className="filter-tabs">
        <button
          className={activeTab === "Timetable" ? "active-tab" : "tab"}
          onClick={() => setActiveTab("Timetable")}
        >
          Timetable
        </button>
        <button
          className={activeTab === "Classroom" ? "active-tab" : "tab"}
          onClick={() => setActiveTab("Classroom")}
        >
          Filter Timetable
        </button>
        <button
          className={activeTab === "facultywisett" ? "active-tab" : "tab"}
          onClick={() => setActiveTab("facultywisett")}
        >
          Facultywise Timetable
        </button>
        <button
          className={activeTab === "classwisett" ? "active-tab" : "tab"}
          onClick={() => setActiveTab("classwisett")}
        >
          Classwise Timetable
        </button>
      </div>

      {activeTab === "Classroom" &&  (
        <FilteredTimetable
          timeSlots={timeSlots}
          daysOfWeek={daysOfWeek}
          timetable={timetable}
          facultyID={facultyID}
        />
      )}

      {activeTab === "Timetable" && <FacultyTimeTable FacultyID={facultyID}/>}

      {activeTab === "facultywisett" && <FacultywiseTimetable facultyID={facultyID}/>}
      {activeTab === "classwisett" && <ClasswiseTimetable/>}
    </div>
  );
};

export default FacultyallTimeTable;
