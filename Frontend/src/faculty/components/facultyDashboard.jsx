import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FacultySidebar from "./FacultySidebar.jsx";
import Header from "../../Student/Components/Header.jsx";
import { API_URL } from "../../axios.js";
import FacultyTimeTable from "./FacultyTimetable.jsx";
import TimetablePopup from "./TimetablePopup.jsx"; // Import the TimetablePopup component

const namebox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "25rem", // Adjusted gap as needed
};

const FacultyDashboard = () => {
  const { FacultyID } = useParams(); // Get Faculty ID from URL
  const [faculty, setFaculty] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [todayTimetable, setTodayTimetable] = useState([]);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for pop-up visibility

  useEffect(() => {
    // Fetch faculty basic details using Faculty ID
    axios
      .get(`${API_URL}/api/facultyDetails?FacultyID=${FacultyID}`)
      .then((response) => {
        setFaculty(response.data);
        setShowPopup(true); // Show pop-up on faculty data fetch
      })
      .catch((error) => {
        setError("Failed to fetch faculty data");
        console.error(error);
      });

    // Fetch faculty timetable data
    axios
      .get(`${API_URL}/api/facultyTimetable?FacultyID=${FacultyID}`)
      .then((response) => {
        setTimetable(response.data);
        filterTodayTimetable(response.data); // Filter today's timetable
      })
      .catch((error) => {
        setError("Failed to fetch timetable data");
        console.error(error);
      });
  }, [FacultyID]);

  const filterTodayTimetable = (data) => {
    const today = new Date().toLocaleString("en-us", { weekday: "long" });
    const todayClasses = data.filter(slot => slot.Day === today);
    setTodayTimetable(todayClasses);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const renderFacultyDetails = () => {
    if (faculty.length === 0) return <p>No faculty data available.</p>;

    return faculty.map((facultyMember) => (
      <div key={facultyMember.FacultyID} className="faculty-detail">
        <div className="profile-section">
          <img
            src="https://via.placeholder.com/150"
            alt={`${facultyMember.Faculty_Name} profile`}
            className="profile-pic"
          />
          <div style={namebox}>
            <div style={{ margin: '0', lineHeight: '1rem' }}>
              <h3>{facultyMember.Faculty_Name}</h3>
              <p style={{ marginTop: '0' }}>Faculty ID: {facultyMember.FacultyID}</p>
              <p>Department: {facultyMember.DepartmentName}</p>
            </div>
            <div style={{ marginTop: "2rem", lineHeight: '1rem' }}>
              <p>Email: {facultyMember.Faculty_Email}</p>
              <p>Designation: {facultyMember.Faculty_Designation}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderTimetable = () => {
    if (timetable.length === 0) return <p>No timetable data available.</p>;

    return (
      <div className="timetable">
        <h4>Faculty Timetable</h4>
        <FacultyTimeTable />
      </div>
    );
  };

  return (
    <div className="dashboard">
      <FacultySidebar />
      <div className="main-content">
        <Header />
        <div className="faculty-section">
          {error && <p className="error">{error}</p>}
          <div className="faculty-details-section">
            {renderFacultyDetails()}
          </div>
          <div className="timetable-section">{renderTimetable()}</div>
        </div>
      </div>
      {showPopup && (
        <TimetablePopup timetable={todayTimetable} onClose={closePopup} />
      )}
    </div>
  );
};

export default FacultyDashboard;
