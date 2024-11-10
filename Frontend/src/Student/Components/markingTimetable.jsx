
import React, { useEffect, useState } from "react";
import axios from "axios";

function MarkingTimeTable({ RollNO }) {
  const [data, setData] = useState([]);
  const [ExamTypes, setExamTypes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3006/api/studentperformancerecord?RollNO=${RollNO}`)
      .then(response => {
        const records = response.data;
        const subjects = {};
        const uniqueExamTypes = new Set();

        records.forEach(record => {
          const { SubjectName, ExamType, MarksObtained, TotalMarks } = record;

          uniqueExamTypes.add(ExamType);

          if (!subjects[SubjectName]) {
            subjects[SubjectName] = {
              attendancePercentage: "",
              exams: {},
              assignments: ["-", "-", "-", "-", "-"]
            };
          }

          if (!subjects[SubjectName].exams[ExamType]) {
            subjects[SubjectName].exams[ExamType] = { obtained: "-", max: "-" };
          }

          subjects[SubjectName].exams[ExamType] = { obtained: MarksObtained, max: TotalMarks };
        });

        setExamTypes(Array.from(uniqueExamTypes));
        setData(
          Object.entries(subjects).map(([subjectName, exams], index) => ({
            id: index + 1,
            subjectName,
            ...exams
          }))
        );
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [RollNO]);

  // Calculate dynamic font size based on the number of exam columns
  const baseFontSize = 14;
  const minFontSize = 10;
  const fontSize = ExamTypes.length > 6
    ? `${Math.max(baseFontSize - (ExamTypes.length - 6), minFontSize)}px`
    : `${baseFontSize}px`;

  const baseFontSize2 = 18;
  const minFontSize2 = 14;
  const fontSize2 = ExamTypes.length > 6
    ? `${Math.max(baseFontSize2 - (ExamTypes.length - 6), minFontSize2)}px`
    : `${baseFontSize2}px`;

  return (
    <div className="performance-container">
      <h4>
        <b>Student Performance Record</b>
      </h4>
      <table className="performance-table">
        <thead>
          <tr>
            <th rowSpan="2" className="fixed-width">SR NO.</th>
            <th rowSpan="2" className="fixed-width">SUBJECT NAME</th>
            <th rowSpan="2" className="fixed-width">ATTENDANCE (%)</th>
            {ExamTypes.map((ExamType, index) => (
              <th
                key={index}
                className="dynamic-width"
                style={{ fontSize }}
              >
                {ExamType.toUpperCase()}
              </th>
            ))}
          </tr>
          <tr>
            {ExamTypes.map((ExamType, index) => (
              <th
                key={index}
                className="dynamic-width"
                style={{ fontSize }}
              >
                OBTAIN MARKS
              </th>
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
                <td
                  key={i}
                  className="cell-content"
                  style={{ fontSize2 }}
                >
                  {record.exams[ExamType]?.obtained || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarkingTimeTable;

