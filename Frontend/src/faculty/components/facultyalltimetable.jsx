import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../axios";

import "../stylesheets/facultyalltimetable.css";
const FacultyallTimeTable = ({ facultyID, roles }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Timetable");
  const [timetable, setTimetable] = useState([]);
  const [filteredTimetable, setFilteredTimetable] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(""); // Add state for faculty filter

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
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

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/facultyweekstimetable?facultyID=${facultyID}`
        );
        setTimetable(response.data);
        setFilteredTimetable(response.data); // Set the filtered timetable initially as the full timetable
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timetable:", err);
        setError("Failed to fetch timetable data.");
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [facultyID]);

  // Function to filter timetable based on selected filter (Classroom, Subject, etc.)
  const filterTimetable = () => {
    let filtered = timetable;

    // Apply classroom filter
    if (selectedClassroom) {
      filtered = filtered.filter(
        (lecture) => lecture.RoomNumber === selectedClassroom
      );
    }

    // Apply subject filter
    if (selectedSubject) {
      filtered = filtered.filter(
        (lecture) =>
          lecture.SubjectName.toLowerCase() === selectedSubject.toLowerCase()
      );
    }

    // Apply location filter (Student Group)
    if (selectedLocation) {
      filtered = filtered.filter((lecture) => lecture.Location === selectedLocation);
    }

    // Apply faculty filter
    if (selectedFaculty) {
      filtered = filtered.filter(
        (lecture) => lecture.FacultyID && lecture.FacultyID === selectedFaculty
      );
    }

    setFilteredTimetable(filtered);
    renderTimetable();
  };

  useEffect(() => {
    filterTimetable(); // Re-filter timetable whenever a filter option is changed
  }, [selectedClassroom, selectedSubject, selectedLocation, selectedFaculty]);

  // Event handler to trigger filtering on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      filterTimetable();
    }
  };

  // Render Timetable
  const renderTimetable = () => {
    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
      <div className="faculty-timetable">
        <table className="timetable-table">
          <thead>
            <tr>
              <th>Day</th>
              {timeSlots.map((slot, index) => (
                <th key={index}>
                  {slot.start} - {slot.end}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day) => {
              const lecturesForDay = filteredTimetable.filter(
                (lecture) => lecture.DayOfWeek.toLowerCase() === day.toLowerCase()
              );

              const lectureSlots = new Array(timeSlots.length).fill(null);

              lecturesForDay.forEach((lecture) => {
                const slotIndex = timeSlots.findIndex(
                  (slot) =>
                    lecture.StartTime >= slot.start &&
                    lecture.EndTime <= slot.end
                );
                if (slotIndex !== -1) lectureSlots[slotIndex] = lecture;
              });

              return (
                <tr key={day}>
                  <td>{day}</td>
                  {lectureSlots.map((lecture, index) => (
                    <td
                      key={index}
                      className={lecture ? "lecture-cell" : "empty-cell"}
                    >
                      {lecture ? (
                        <>
                          <div className="highlighted">{lecture.SubjectName}</div>
                          <div>Room: {lecture.RoomNumber}</div>
                          <div>Course: {lecture.CourseName}</div>
                          {lecture.Substitute && (
                            <div className="substitute-tag">Substitute</div>
                          )}
                        </>
                      ) : (
                        <div className="no-lecture-cell">No Lecture</div>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="faculty-timetable-container">
      {/* Tabs for Filters */}
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
          Filter by Classroom
        </button>
        <button
          className={activeTab === "Subject" ? "active-tab" : "tab"}
          onClick={() => setActiveTab("Subject")}
        >
          Filter by Subject
        </button>
        <button
          className={activeTab === "Location" ? "active-tab" : "tab"}
          onClick={() => setActiveTab("Location")}
        >
          Filter by Location
        </button>
        <button
          className={activeTab === "Faculty" ? "active-tab" : "tab"}
          onClick={() => setActiveTab("Faculty")}
        >
          Facultywise Timetable
        </button>
      </div>

      {/* Filtered Content */}
      <div className="tab-content">
        {activeTab === "Timetable" && renderTimetable()}
        {activeTab === "Classroom" && (
          <div className="filter-options">
            <h2>Filter by Classroom</h2>
            <input
              type="text"
              value={selectedClassroom}
              onChange={(e) => setSelectedClassroom(e.target.value)}
              onKeyPress={handleKeyPress} // Trigger filter on Enter
              placeholder="Enter Classroom Number"
            />
            <button onClick={filterTimetable}>Search</button>{" "}
            {/* Search button */}
          </div>
        )}
        {activeTab === "Subject" && (
          <div className="filter-options">
            <h2>Filter by Subject</h2>
            <input
              type="text"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              onKeyPress={handleKeyPress} // Trigger filter on Enter
              placeholder="Enter Subject Name"
            />
            <button onClick={filterTimetable}>Search</button>{" "}
            {/* Search button */}
          </div>
        )}
        {activeTab === "Location" && (
          <div className="filter-options">
            <h2>Filter by Student Group</h2>
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              onKeyPress={handleKeyPress} // Trigger filter on Enter
              placeholder="Enter Room Number"
            />
            <button onClick={filterTimetable}>Search</button>{" "}
            {/* Search button */}
          </div>
        )}
        {activeTab === "Faculty" && (
          <div className="filter-options">
            <h2>Filter by Faculty</h2>
            <input
              type="text"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              onKeyPress={handleKeyPress} // Trigger filter on Enter
              placeholder="Enter Faculty ID"
            />
            <button onClick={filterTimetable}>Search</button>{" "}
            {/* Search button */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyallTimeTable;
