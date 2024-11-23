import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../axios";

import TimetableComponent from "./Dayfacultytimetable";
import FacultyTimeTable from "./FacultyTimetable";
// import "../stylesheets/FacultywiseTimetable.css";

const FacultywiseTimetable = () => {
  const [faculty, setFaculty] = useState(""); // Selected faculty name
  const [facultyList, setFacultyList] = useState([]); // List of faculty
  const [facultyID, setFacultyID] = useState(null); // Selected faculty ID
  const [startDate, setStartDate] = useState(""); // Start date
  const [endDate, setEndDate] = useState(""); // End date

  useEffect(() => {
    const fetchFacultyList = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/facultyList`);
        setFacultyList(response.data);
      } catch (err) {
        console.error("Error fetching faculty list:", err);
      }
    };
    fetchFacultyList();
  }, []);

  const handleFacultyChange = (event) => {
    const selectedFacultyID = event.target.value;
    const selectedFaculty = facultyList.find(
      (faculty) => faculty.FacultyID === selectedFacultyID
    )?.Faculty_Name;
    setFaculty(selectedFaculty || "");
    setFacultyID(selectedFacultyID || null);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    console.log(startDate);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    console.log(endDate);
  };

  return (
    <div>
      <h1>Faculty Timetable</h1>
      <div className="filter-options">
        {/* Faculty Dropdown */}
        <select
          id="faculty"
          onChange={handleFacultyChange}
          value={facultyID || ""}
        >
          <option value="">Select Faculty</option>
          {facultyList.map((facultyItem) => (
            <option key={facultyItem.FacultyID} value={facultyItem.FacultyID}>
              {facultyItem.Faculty_Name}
            </option>
          ))}
        </select>

        {/* Date Inputs */}
        <div>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      {/* Display Selected Faculty */}
      <div>{faculty && <h2>Timetable for: {faculty}</h2>}</div>

      {/* Timetable */}
      <div>
        {facultyID && !(startDate && endDate) ? (
          <FacultyTimeTable FacultyID={facultyID} />
        ) : facultyID && startDate && endDate ? (
          <TimetableComponent
            facultyID={facultyID}
            startDate={startDate}
            endDate={endDate}
          />
        ) : (
          <p>Please select a faculty to view the timetable.</p>
        )}
      </div>
    </div>
  );
};

export default FacultywiseTimetable;
