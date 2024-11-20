import React, { useState, useEffect } from "react";
import "../stylesheets/AcademicsDashboard.css";
import { API_URL } from "../../axios";
import axios from "axios";
import * as XLSX from "xlsx";

const exportToExcel = (students) => {
    const formattedData = students.map((student) => ({
        Name: student.Stud_name,
        "Roll Number": student.RollNO,
        Subject: student.SubjectName,
        "Total Present": student.TotalPresent,
        "Total Absent": student.TotalAbsent,
        "Attendance %": (
            (student.TotalPresent / (student.TotalPresent + student.TotalAbsent)) * 100
        ).toFixed(2),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students Attendance");

    XLSX.writeFile(workbook, "Students_Attendance.xlsx");
};


const ShowAttBySub = ({ setView, facultyID }) => {
    const [selectedSubjectSection, setSelectedSubjectSection] = useState("");
    const [subjectSections, setSubjectSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [sortOption, setSortOption] = useState("");

    // Fetch subject and section data
    useEffect(() => {
        const fetchSubjectSections = async () => {
            try {
                const response = await fetch(`${API_URL}/api/subjectandsectionofaculty?facultyID=${facultyID}`);
                const data = await response.json();
                setSubjectSections(data);
            } catch (error) {
                console.error("Error fetching subject sections:", error);
            }
        };

        fetchSubjectSections();
    }, [facultyID]);

    const handleSubjectSectionChange = (event) => {
        setSelectedSubjectSection(event.target.value);
        setStudents([]); // Clear students list when changing selection
    };

    const handleViewStudents = async () => {
        if (selectedSubjectSection) {
            const [SubjectName, Section] = selectedSubjectSection.split(" (SEC-");
            const cleanSection = Section.replace(")", ""); // Remove trailing parenthesis

            try {
                const response = await axios.get(`${API_URL}/api/listofstudentsandattendanceofsubject`, {
                    params: {
                        facultyID,
                        SubjectName,
                        Section: cleanSection,
                    },
                });
                setStudents(response.data); // Set students data from API
            } catch (error) {
                console.error("Error fetching students and attendance:", error);
            }
        } else {
            alert("Please select a subject and section first!");
        }
    };

    const handleSortChange = (event) => {
        const option = event.target.value;
        setSortOption(option);

        let sortedStudents = [...students];
        switch (option) {
            case "More than 90":
                sortedStudents = students.filter(
                    (student) => student.TotalPresent / (student.TotalPresent + student.TotalAbsent) * 100 > 90
                );
                break;
            case "Less than 90":
                sortedStudents = students.filter(
                    (student) => student.TotalPresent / (student.TotalPresent + student.TotalAbsent) * 100 < 90
                );
                break;
            case "Low to High":
                sortedStudents = sortedStudents.sort(
                    (a, b) => (a.TotalPresent / (a.TotalPresent + a.TotalAbsent)) - (b.TotalPresent / (b.TotalPresent + b.TotalAbsent))
                );
                break;
            case "High to Low":
                sortedStudents = sortedStudents.sort(
                    (a, b) => (b.TotalPresent / (b.TotalPresent + b.TotalAbsent)) - (a.TotalPresent / (a.TotalPresent + a.TotalAbsent))
                );
                break;
            default:
                sortedStudents = students;
        }

        setStudents(sortedStudents);
    };

    return (
        <div className="show-attendance-page">
            <h2 className="content-title">Select Subject and Section</h2>
            <div className="dropdown-container">
                <label htmlFor="subjectSection">Subject & Section:</label>
                <select
                    id="subjectSection"
                    className="dropdown"
                    value={selectedSubjectSection}
                    onChange={handleSubjectSectionChange}
                >
                    <option value="">Select Subject & Section</option>
                    {subjectSections.map((item) => (
                        <option key={`${item.SubjectName}-${item.Section}`} value={`${item.SubjectName} (SEC-${item.Section})`}>
                            {item.SubjectName} (SEC-{item.Section})
                        </option>
                    ))}
                </select>
            </div>
            {selectedSubjectSection && (
                <>
                    <p className="selected-section">
                        Selected Subject & Section: {selectedSubjectSection}
                    </p>
                    <button className="btn-view" onClick={handleViewStudents}>
                        View Students
                    </button>
                </>
            )}
            {students.length > 0 && (
                <div className="students-list">
                    <h3>Students and Attendance</h3>
                    <div className="sort-container">
                        <label htmlFor="sort">Sort By:</label>
                        <select id="sort" value={sortOption} onChange={handleSortChange}>
                            <option value="">Select Sorting Option</option>
                            <option value="More than 90">More than 90% Attendance</option>
                            <option value="Less than 90">Less than 90% Attendance</option>
                            <option value="Low to High">Attendance (Low to High)</option>
                            <option value="High to Low">Attendance (High to Low)</option>
                        </select>
                    </div>
                    <button className="btn-export" onClick={() => exportToExcel(students)}>
                        Export to Excel
                    </button>
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll Number</th>
                                <th>Subject</th>
                                <th>Total Present</th>
                                <th>Total Absent</th>
                                <th>Attendance %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.RollNO}>
                                    <td>{student.Stud_name}</td>
                                    <td>{student.RollNO}</td>
                                    <td>{student.SubjectName}</td>
                                    <td>{student.TotalPresent}</td>
                                    <td>{student.TotalAbsent}</td>
                                    <td>
                                        {(
                                            (student.TotalPresent / (student.TotalPresent + student.TotalAbsent)) * 100
                                        ).toFixed(2)}
                                        %
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button className="btn-back" onClick={() => setView("dashboard")}>
                Back to Dashboard
            </button>
        </div>
    );
};

export default ShowAttBySub;
