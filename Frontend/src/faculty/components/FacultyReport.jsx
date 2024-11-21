import React, { useState, useEffect } from "react";
import FacultyOccupency from './FacultyOccupency'; // Adjust the path accordingly
import '../stylesheets/facultyreport.css';

const FacultyReport = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [facultyList, setFacultyList] = useState([]);

  // Mock data for facultyList
  const mockFacultyList = [
    {
      name: "John Doe",
      schedule: [
        { date: "2024-11-21", time: "09:00 AM", status: "free" },
        { date: "2024-11-21", time: "10:00 AM", status: "occupied" },
        { date: "2024-11-21", time: "11:00 AM", status: "occupied" },
      ],
    },
    {
      name: "Jane Smith",
      schedule: [
        { date: "2024-11-21", time: "09:00 AM", status: "occupied" },
        { date: "2024-11-21", time: "10:00 AM", status: "free" },
        { date: "2024-11-21", time: "02:00 PM", status: "occupied" },
      ],
    },
    {
      name: "Emily Johnson",
      schedule: [
        { date: "2024-11-21", time: "08:00 AM", status: "free" },
        { date: "2024-11-21", time: "01:00 PM", status: "occupied" },
      ],
    },
  ];

  useEffect(() => {
    setFacultyList(mockFacultyList);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="report-container">
      <h1 className="facultyheading">Faculty Report</h1>

      {/* Faculty Occupancy Container */}
      <div className="faculty-occupancy-container">
        <h2 >Faculty Occupancy</h2>

        {/* Date Selector within Faculty Occupancy */}
        <div className="date-selector">
          <label htmlFor="report-date">Select Date: </label>
          <input
            type="date"
            id="report-date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        {selectedDate && facultyList.length > 0 ? (
        <FacultyOccupency facultyList={facultyList} selectedDate={selectedDate} />
      ) : (
        <p>No data available for the selected date.</p>
      )}
      </div>

      {/* If a date is selected, show the occupancy report */}
      
    </div>
  );
};

export default FacultyReport;
