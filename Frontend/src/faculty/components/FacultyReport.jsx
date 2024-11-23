import React, { useState } from "react";
import FacultyOccupency from './FacultyOccupency'; 
import '../stylesheets/facultyreport.css'; 


const FacultyReport = () => {
  const [selectedDate, setSelectedDate] = useState(""); // State for the selected date

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="faculty-report-container">
      {/* Faculty Report Heading */}
      <div className="faculty-report-heading">
        <h1>Faculty Report</h1>
      </div>

      

      {/* Date Selector */}
      <div className="date-selector">
        <label htmlFor="report-date" className="date-label">Select Date: </label>
        <input
          type="date"
          id="report-date"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-input"
        />
      </div>

      {/* Display the report for the selected date */}
      {selectedDate ? (
        <div className="selected-date-report">
          <h2>Report for {selectedDate}</h2>
          {/* Pass the selected date to FacultyOccupency to fetch the relevant report */}
          <FacultyOccupency inputDate={selectedDate} />
        </div>
      ) : (
        <p>Please select a date to view the report.</p>
      )}
    </div>
  );
};

export default FacultyReport;
