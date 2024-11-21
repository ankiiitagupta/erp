
import React, { useState, useEffect } from "react";
import '../stylesheets/facultyreport.css';

const FacultyOccupency = ({ facultyList, selectedDate }) => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    if (selectedDate && facultyList) {
      // Filter faculty data for the selected date and prepare the report
      const filteredData = facultyList.map((faculty) => {
        const filteredSchedule = faculty.schedule.filter(
          (lecture) => lecture.date === selectedDate
        );
        return {
          name: faculty.name,
          schedule: filteredSchedule,
        };
      });

      setReportData(filteredData);
    }
  }, [selectedDate, facultyList]);

  // Function to get all unique times for the selected date
  const getUniqueTimes = () => {
    const allTimes = facultyList
      .flatMap(faculty => faculty.schedule)
      .filter(lecture => lecture.date === selectedDate)
      .map(lecture => lecture.time);

    return [...new Set(allTimes)].sort();
  };

  return (
    <div className="report-table-container">
      <h3>Report for {selectedDate}</h3>
      {reportData.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>Faculty Name</th>
              {/* Generate table columns based on unique times */}
              {getUniqueTimes().map((time, index) => (
                <th key={index}>{time}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportData.map((faculty, index) => (
              <tr key={index}>
                <td>{faculty.name}</td>
                {/* For each time, find the matching schedule for the faculty */}
                {getUniqueTimes().map((time, idx) => {
                  const lecture = faculty.schedule.find(
                    (lecture) => lecture.time === time
                  );
                  return (
                    <td key={idx}>
                      {lecture ? lecture.status : "No Class"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available for the selected date.</p>
      )}
    </div>
  );
};

export default FacultyOccupency;
