import React, { useEffect, useState } from "react";
import axios from "axios";

function MarkingTimeTable({ RollNO }) {
  const [data, setData] = useState([]);
  const [ExamTypes, setExamTypes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3006/api/studentperformancerecord?RollNO=${RollNO}`)
      .then(response => {
        const records = response.data;
        const subjects = {};
        const uniqueExamTypes = new Set();

        records.forEach(record => {
          const { SubjectName, ExamType, MarksObtained, TotalMarks } = record;

          // Track unique exam types
          uniqueExamTypes.add(ExamType);

          if (!subjects[SubjectName]) {
            subjects[SubjectName] = {
              attendancePercentage: "", // Default value
              exams: {}, // Store exam data dynamically
              assignments: ["-", "-", "-", "-", "-"] // Default assignments
            };
          }

          if (!subjects[SubjectName].exams[ExamType]) {
            subjects[SubjectName].exams[ExamType] = { obtained: "-", max: "-" };
          }

          subjects[SubjectName].exams[ExamType] = { obtained: MarksObtained, max: TotalMarks };
        });

        setExamTypes(Array.from(uniqueExamTypes)); // Set the unique exam types
        setData(Object.entries(subjects).map(([subjectName, exams], index) => ({
          id: index + 1,
          subjectName,
          ...exams
        })));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [RollNO]);

  return (
    <div className="performance-container">
      <h4><b>Student Performance Record</b></h4>
      <table className="performance-table">
        <thead>
          <tr>
            <th rowSpan="2">SR NO.</th>
            <th rowSpan="2">SUBJECT NAME</th>
            <th rowSpan="2">ATTENDANCE (%)</th>
            {ExamTypes.map((ExamType, index) => (
              <th key={index} colSpan="1">{ExamType.toUpperCase()}</th>
            ))}
          </tr>
          <tr>
            {ExamTypes.map((ExamType, index) => (
              <React.Fragment key={index}>
                <th>OBTAIN MARKS</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index}>
              <td>{record.id}</td>
              <td>{record.subjectName}</td>
              <td>{record.attendancePercentage || "-"}</td>
              {ExamTypes.map((ExamType, i) => (
                <React.Fragment key={i}>
                  <td>{record.exams[ExamType]?.obtained || "-"}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarkingTimeTable;
