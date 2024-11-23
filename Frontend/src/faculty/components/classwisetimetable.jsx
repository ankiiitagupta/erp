import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../axios";
import WeeksTimeTable from "../../Student/Components/WeeksTimetable";

const ClasswiseTimetable = () => {
  const [filters, setFilters] = useState({
    course: "",
    year: "",
    section: "",
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rollNo, setRollNo] = useState(null); // For WeeksTimeTable
  const [timetable, setTimetable] = useState([]); // For displaying timetable
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);

  // Fetch courses from the API
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

  // Fetch sections based on selected year
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

  // Fetch RollNo using filters
  useEffect(() => {
    if (filters.course && filters.year && filters.section) {
      const fetchRollNo = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/student-one-data`, {
            params: {
              courseName: filters.course,
              year: filters.year,
              section: filters.section,
            },
          });

          if (response.data && response.data.RollNO) {
            setRollNo(response.data.RollNO);
          } else {
            setRollNo(null);
          }
        } catch (err) {
          console.error("Error fetching RollNo:", err);
        }
      };
      fetchRollNo();
    }
  }, [filters]);

  // Fetch timetable data for the selected filters
  // Fetch timetable data for the selected filters
useEffect(() => {
    if (rollNo &&
      filters.course &&
      filters.year &&
      filters.section &&
      startDate &&
      endDate
    ) {
      const fetchTimetable = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/api/student-interval-timetable`,
            {
              params: {
                RollNO: rollNo,
                courseName: filters.course,
                year: filters.year,
                section: filters.section,
                startDate,
                endDate,
              },
            }
          );
  
          if (response.data) {
            setTimetable(response.data);
            console.log("Fetched Timetable:", response.data); // Log the fetched data
          } else {
            setTimetable([]);
            console.log("No timetable data found");
          }
        } catch (err) {
          console.error("Error fetching timetable:", err);
        }
      };
      fetchTimetable();
    }
  }, [rollNo,filters, startDate, endDate]);
  
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div>
      <h1>ClassWise Timetable</h1>
      <div className="filter-options">
        {/* Course Dropdown */}
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

        {/* Year Dropdown */}
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

        {/* Section Dropdown */}
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

        {/* Start Date Input */}
        <div className="date-container">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>

        {/* End Date Input */}
        <div className="date-container">
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={handleEndDateChange} />
        </div>
      </div>

      {/* Pass RollNo to WeeksTimeTable */}
      {rollNo ? (
        <WeeksTimeTable rollNo={rollNo} />
      ) : (
        <p>No student found for the selected filters.</p>
      )}

     
      
    </div>
  );
};

export default ClasswiseTimetable;
