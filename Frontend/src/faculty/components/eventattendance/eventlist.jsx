import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "./createEvent";
import { API_URL } from "../../../axios"; // Update the path if necessary
import EventTimeTable from "./EventTimeTable";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EventList = ({ facultyID }) => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState("list");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [year, setYear] = useState("");
    const [section, setSection] = useState("");
    const [course, setCourse] = useState("");
    const [timeTable, setTimeTable] = useState([]);
    const [selectedLectures, setSelectedLectures] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);


    // Fetch year and section for the coordinator
    useEffect(() => {
        axios
            .get(`${API_URL}/api/yearandsectionofcoordinator?facultyID=${facultyID}`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const { AssignedYear, AssignedSection, AssignedCourse } = response.data[0];
                    setYear(AssignedYear);
                    setSection(AssignedSection);
                    setCourse(AssignedCourse);
                } else {
                    console.error("No data returned for year and section");
                }
            })
            .catch((error) => console.error("Error fetching year and section:", error));
    }, [facultyID]);

    // Fetch events from the API on component mount
    useEffect(() => {
        axios
            .get(`${API_URL}/api/showeventsofcoordinator?facultyID=${facultyID}`)
            .then((response) => {
                setEvents(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    }, [facultyID]);


    // Fetch timetable on event selection
    useEffect(() => {
        if (selectedEvent) {
            const eventDate = new Date(selectedEvent.EventDate);
            const formattedDate = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
            axios
                .get(`${API_URL}/api/Eventtimetable?date=${formattedDate}&yearOfStudy=${selectedEvent.YearOfStudy}&Section=${selectedEvent.Section}&Course=${selectedEvent.Course}`)
                .then((response) => {
                    setTimeTable(response.data);
                    console.log(response.data)

                })
                .catch((error) => {
                    console.error("Error fetching timetable:", error);
                });
        }
    }, [selectedEvent]);


    // Fetch students on timetable load
    useEffect(() => {
        if (selectedEvent) {
            axios
                .get(`${API_URL}/api/getstudents?year=${selectedEvent.YearOfStudy}&section=${selectedEvent.Section}&course=${selectedEvent.Course}`)
                .then((response) => {
                    setStudents(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error("Error fetching students:", error);
                });
        }
    }, [selectedEvent]);

    // Handle student selection
    const handleStudentSelection = (RollNO) => {
        setSelectedStudents((prev) =>
            prev.includes(RollNO)
                ? prev.filter((id) => id !== RollNO)
                : [...prev, RollNO]
        );
    };

    // Select all students
    const handleSelectAllStudents = () => {
        if (selectedStudents.length === students.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(students.map((student) => student.RollNO));
        }
    };



    // Handle switching to the create event form
    const handleCreateEvent = () => {
        setView("create");
    };

    // Handle selecting an event
    const handleSelectEvent = (eventId) => {
        const event = events.find((e) => e.EventID === eventId);
        setSelectedEvent(event);
    };

    // Handle lecture selection
    const handleLectureSelection = (lectureId) => {
        setSelectedLectures((prev) =>
            prev.includes(lectureId)
                ? prev.filter((id) => id !== lectureId)
                : [...prev, lectureId]
        );
    };

    // Select all lectures
    const handleSelectAll = () => {
        if (selectedLectures.length === timeTable.length) {
            setSelectedLectures([]);
        } else {
            setSelectedLectures(timeTable.map((lecture) => lecture.TimetableID));
        }
    };

    const handleMarkAttendance = () => {
        if (selectedEvent && selectedLectures.length > 0 && selectedStudents.length > 0) {
            const attendanceData = selectedStudents.flatMap((rollNo) => {
                return selectedLectures.map((lectureId) => {
                    const lectureDetails = timeTable.find(
                        (lecture) => lecture.TimetableID === lectureId
                    );
                    const eventDate = new Date(selectedEvent.EventDate);
                    const formattedDate = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
        
                    if (lectureDetails) {
                        return {
                            RollNO: rollNo,
                            FacultyID: facultyID,
                            AttendanceStatus: 1, // Mark as present
                            LectureNumber: lectureDetails.LectureNumber,
                            LectureDate: formattedDate,
                            EventID: selectedEvent.EventID, // Include EventID in attendance
                        };
                    } else {
                        console.error(`No lecture details found for TimetableID: ${lectureId}`);
                        return null;
                    }
                }).filter(Boolean); // Remove null entries if any lectureDetails are missing
            });
        
            console.log("Attendance Data:", attendanceData);  // Log the data to check the structure
        
            axios
                .post(`${API_URL}/api/markeventattendance`, attendanceData)
                .then((response) => {
                    alert("Attendance marked successfully!");
                    generatePDF();
                    setSelectedLectures([]);
                    setSelectedStudents([]);
                })
                .catch((error) => {
                    console.error("Error marking attendance:", error.response ? error.response.data : error);
                    alert("Failed to mark attendance. Please try again.");
                });
                
        } else {
            alert("Please select an event, lectures, and students.");
        }
    };
    
    
    
    
    
    
    
    
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
    
        // Header
        doc.text("HOD Sir,", 10, 10);
        doc.text(
            "With your permission, I have marked the attendance for the following students in the selected lectures:",
            10,
            20
        );
    
        // Event Details
        doc.text("Event Details:", 10, 30);
        doc.text(`Event Name: ${selectedEvent.EventName}`, 10, 40);
        doc.text(`Course: ${selectedEvent.Course}`, 10, 50);
        doc.text(`Section: ${selectedEvent.Section}`, 10, 60);
        doc.text(`Year of Study: ${selectedEvent.YearOfStudy}`, 10, 70);
        doc.text(`Faculty Name: ${facultyID}`, 10, 80);
    
        // Lectures Table
        doc.text("Selected Lectures:", 10, 90);
        const lecturesData = timeTable
            .filter((lecture) => selectedLectures.includes(lecture.TimetableID))
            .map((lecture) => [lecture.LectureNumber, lecture.SubjectName, lecture.Faculty_Name]);
        doc.autoTable({
            startY: 100,
            head: [["Period No", "Lecture Name", "Faculty Name"]],
            body: lecturesData,
        });
    
        // Students Table
        doc.text("Selected Students:", 10, doc.autoTable.previous.finalY + 10);
        const studentsData = students
            .filter((student) => selectedStudents.includes(student.RollNO))
            .map((student) => [student.RollNO, student.Stud_name]);
        doc.autoTable({
            startY: doc.autoTable.previous.finalY + 20,
            head: [["Roll No", "Student Name"]],
            body: studentsData,
        });
    
        // Save PDF
        doc.save(`Attendance_Report_${selectedEvent.EventName}.pdf`);
    };
    


    return (
        <div>
            <h2>Events</h2>
            {view === "list" && (
                <>
                    <button onClick={handleCreateEvent}>+ Create Event</button>

                    {/* Dropdown for selecting an event */}
                    <div>
                        <label>Select Event:</label>
                        <select
                            value={selectedEvent ? selectedEvent.EventID : ""}
                            onChange={(e) => handleSelectEvent(parseInt(e.target.value))}
                        >
                            <option value="" disabled>
                                Select an event
                            </option>
                            {events.map((event) => (
                                <option key={event.EventID} value={event.EventID}>
                                    {`${event.EventName} -Course:${event.Course} Section: ${event.Section}, Year: ${event.YearOfStudy} Date:${new Date(event.EventDate).toLocaleDateString()}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Show details for selected event */}
                    {selectedEvent && (
                        <div style={{ marginTop: "20px" }}>
                            <h3>Event Details</h3>
                            <p><strong>Event Name:</strong> {selectedEvent.EventName}</p>
                            <p><strong>Section:</strong> {selectedEvent.Section}</p>
                            <p><strong>Year of Study:</strong> {selectedEvent.YearOfStudy}</p>
                            <p><strong>Course:</strong> {selectedEvent.YearOfStudy}</p>
                            <p><strong>Date:</strong> {new Date(selectedEvent.EventDate).toLocaleDateString()}</p>
                        </div>
                    )}

                    {/* Timetable rendering */}
                    {(
                        <>
                            <EventTimeTable
                                ttpass={timeTable}
                                handleLectureSelection={handleLectureSelection}
                                selectedLectures={selectedLectures}
                                handleSelectAll={handleSelectAll}
                            />
                        </>
                    )}
                    {/* Students list */}
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAllStudents}
                                        checked={selectedStudents.length === students.length}
                                    />
                                </th>
                                <th>Roll No</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.RollNO}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.includes(student.RollNO)}
                                            onChange={() => handleStudentSelection(student.RollNO)}
                                        />
                                    </td>
                                    <td>{student.RollNO}</td>
                                    <td>{student.Stud_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </>
            )}

            {view === "create" && (
                <CreateEvent
                    facultyID={facultyID}
                    setView={setView}
                    setEvents={setEvents}
                    year={year}
                    section={section}
                    course={course}
                />
            )}

            {selectedEvent && selectedLectures.length > 0 && selectedStudents.length > 0 && (
                <button onClick={handleMarkAttendance} style={{ marginTop: "20px" }}>
                    Submit Attendance
                </button>
            )}

        </div>
    );
};

export default EventList;
