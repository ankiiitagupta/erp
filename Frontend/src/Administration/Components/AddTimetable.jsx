import React, { useState, useEffect } from "react";
import "../stylesheets/AddTimetable.css";

const AddDefaultTimetable = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [lectureDay, setLectureDay] = useState("Monday");
  const [lectureNumber, setLectureNumber] = useState(1);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [roomOptions, setRoomOptions] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    setCourseOptions(["B.Tech", "M.Tech", "MBA"]);
    setSectionOptions(["A", "B", "C", "D"]);
    setYearOptions([1, 2, 3, 4]);

    const generatedClassOptions = generateClassOptions(
      ["B.Tech", "M.Tech", "MBA"],
      ["A", "B", "C", "D"],
      [1, 2, 3, 4]
    );
    setClassOptions(generatedClassOptions);

    setSubjectOptions([
      { name: "Mathematics", code: "MTH101" },
      { name: "Physics", code: "PHY101" },
      { name: "Computer Science", code: "CS101" }
    ]);
    setFacultyOptions([
      { name: "Dr. A", id: "FAC001" },
      { name: "Prof. B", id: "FAC002" },
      { name: "Mr. C", id: "FAC003" }
    ]);
    setRoomOptions(["Room 101", "Room 102", "Room 103"]);
  }, []);

  const generateClassOptions = (courses, sections, years) => {
    let options = [];
    courses.forEach((course) => {
      sections.forEach((section) => {
        years.forEach((year) => {
          options.push(`${course}/${section}/${year}`);
        });
      });
    });
    return options;
  };

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setSelectedClass(selectedClass);
  };

  const handleAddTimetable = () => {
    const newTimetableEntry = {
      class: selectedClass,
      day: lectureDay,
      lectureNumber,
      subject: selectedSubject,
      faculty: selectedFaculty,
      startTime,
      endTime,
      room: selectedRoom,
    };

    setTimetable((prevTimetable) => [...prevTimetable, newTimetableEntry]);

    setLectureDay("Monday");
    setLectureNumber(1);
    setSelectedSubject("");
    setSelectedFaculty("");
    setStartTime("");
    setEndTime("");
    setSelectedRoom("");
  };

  const renderTimetable = () => {
    // Initialize a timetable structure with empty values for each day and timeslot
    const timeSlots = [
      "8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", 
      "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", 
      "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"
    ];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    // Initialize an empty timetable grid with "No lectures" as the default message
    const timetableGrid = days.map((day) => ({
      day,
      slots: timeSlots.map(() => "No lectures")
    }));

    // Populate timetable grid with added entries
    timetable.forEach((entry) => {
      const dayIndex = days.indexOf(entry.day);
      const slotIndex = entry.lectureNumber - 1; // assuming lectureNumber starts from 1
      timetableGrid[dayIndex].slots[slotIndex] = `${entry.subject} (${entry.faculty}) - ${entry.room} - ${entry.startTime} to ${entry.endTime}`;
    });

    return (
      <div className="timetable-grid">
        {timetableGrid.map((dayEntry, index) => (
          <div key={index} className="day-column">
            <h4>{dayEntry.day}</h4>
            {dayEntry.slots.map((slot, i) => (
              <div key={i} className="slot">
                <p>{timeSlots[i]}</p>
                <p>{slot}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="add-timetable-container">
      <h2>Add Timetable</h2>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="department-name">Department Name</label>
          <input
            type="text"
            id="department-name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter Department Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="class-selection">Course/Section/Year</label>
          <input
            list="class-options"
            id="class-selection"
            value={selectedClass}
            onChange={handleClassChange}
            placeholder="Search Course/Section/Year"
          />
          <datalist id="class-options">
            {classOptions.map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
        </div>

        <div className="form-group">
          <label htmlFor="lecture-day">Lecture Day</label>
          <select
            id="lecture-day"
            value={lectureDay}
            onChange={(e) => setLectureDay(e.target.value)}
          >
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              )
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lecture-number">Lecture Number</label>
          <select
            id="lecture-number"
            value={lectureNumber}
            onChange={(e) => setLectureNumber(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            list="subject-options"
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            placeholder="Search Subject"
          />
          <datalist id="subject-options">
            {subjectOptions.map((subject, index) => (
              <option key={index} value={`${subject.name} (${subject.code})`} />
            ))}
          </datalist>
        </div>

        <div className="form-group">
          <label htmlFor="faculty">Faculty</label>
          <input
            list="faculty-options"
            id="faculty"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            placeholder="Search Faculty"
          />
          <datalist id="faculty-options">
            {facultyOptions.map((faculty, index) => (
              <option key={index} value={`${faculty.name} (${faculty.id})`} />
            ))}
          </datalist>
        </div>

        <div className="form-group">
          <label htmlFor="start-time">Start Time</label>
          <input
            type="time"
            id="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="end-time">End Time</label>
          <input
            type="time"
            id="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="room">Room</label>
          <select
            id="room"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            {roomOptions.map((room, index) => (
              <option key={index} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <button onClick={handleAddTimetable}>Add Timetable</button>
        </div>
      </div>

      {/* Display Timetable */}
      <div className="timetable-display">
        <h3>Timetable</h3>
        {renderTimetable()}
      </div>
    </div>
  );
};

export default AddDefaultTimetable;
