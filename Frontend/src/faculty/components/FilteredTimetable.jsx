import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/facultyalltimetable.css";
import { API_URL } from "../../axios";

const FilteredTimetable = ({
  timeSlots,
  daysOfWeek,
  timetable,
  facultyID,
}) => {
  const [filters, setFilters] = useState({
    course: "",
    year: "",
    section: "",
    room: "",
    subject: "",
  });
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [displayTimetable, setDisplayTimetable] = useState([]);

  // Fetch Subjects for Faculty
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/subjectoffaculty?facultyID=${facultyID}`
          
        );
        console.log(timetable)
        setSubjects(response.data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, [facultyID]);

  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/courseandduration`);
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // Fetch Sections based on Year
  useEffect(() => {
    if (filters.year) {
      const fetchSections = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/api/getsectionsofYear?yearofstudy=${filters.year}`
          );
          setSections(response.data);
        } catch (err) {
          console.error("Error fetching sections:", err);
        }
      };
      fetchSections();
    }
  }, [filters.year]);

  // Fetch Rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/rooms`);
        setRooms(response.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  // Filter Timetable
  useEffect(() => {
    let filtered = timetable;

    if (filters.course) {
      filtered = filtered.filter(
        (lecture) =>
          lecture.CourseName &&
          lecture.CourseName.toLowerCase().includes(filters.course.toLowerCase())
      );
    }

    if (filters.year) {
      filtered = filtered.filter(
        (lecture) => lecture.YearOfStudy === parseInt(filters.year, 10)
      );
    }

    if (filters.section) {
      filtered = filtered.filter(
        (lecture) =>
          lecture.Section &&
          lecture.Section.toLowerCase().includes(filters.section.toLowerCase())
      );
    }

    if (filters.room) {
      filtered = filtered.filter(
        (lecture) =>
          lecture.RoomName &&
          lecture.RoomName.toLowerCase().includes(filters.room.toLowerCase())
      );
    }

    if (filters.subject) {
      filtered = filtered.filter(
        (lecture) =>
          lecture.SubjectName &&
          lecture.SubjectName.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }

    setDisplayTimetable(filtered);
  }, [filters, timetable]);

  return (
    <div className="faculty-timetable">
      {/* Filters */}
      
      <div className="filter-options">
        <p>Select Filter:</p>
        <div className="dropdown-container">
          
          <select
            id="courseFilter"
            value={filters.course}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, course: e.target.value }))
            }
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.CourseName} value={course.CourseName}>
                {course.CourseName}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-container">
          
          <select
            id="yearFilter"
            value={filters.year}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, year: e.target.value }))
            }
          >
            <option value="">Select Year</option>
            {[1, 2, 3, 4].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-container">
          
          <select
            id="sectionFilter"
            value={filters.section}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, section: e.target.value }))
            }
          >
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section.Section} value={section.Section}>
                {section.Section}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-container">
          
          <select
            id="roomFilter"
            value={filters.room}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, room: e.target.value }))
            }
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.RoomName} value={room.RoomName}>
                {room.RoomName}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-container">
          
          <select
            id="subjectFilter"
            value={filters.subject}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, subject: e.target.value }))
            }
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.SubjectName} value={subject.SubjectName}>
                {subject.SubjectName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable */}
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
            const lecturesForDay = displayTimetable.filter(
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
                <td className="lecture-block">{day}</td>
                {lectureSlots.map((lecture, index) => (
                  <td
                    key={index}
                    className={`${lecture ? "lecture-cell" : "empty-cell"}`}
                  >
                    {lecture ? (
                      <>
                        <div>{lecture.SubjectName}</div>
                        <div style={{ fontSize: "1rem" }}>
                           {lecture.RoomName}
                        </div>
                        <div>
                         {lecture.CourseName}/{lecture.YearOfStudy} year/
                          {lecture.Section}
                        </div>
                        
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

export default FilteredTimetable;
