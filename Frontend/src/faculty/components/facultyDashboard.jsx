import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FacultySidebar from "./FacultySidebar.jsx";
import Header from "../../Student/Components/Header.jsx";
import { API_URL } from "../../axios.js";
import FacultyTimeTable from "./FacultyTimetable.jsx";
import TimetablePopup from "./TimetablePopup.jsx";
import EmployeeDetail from "./EmployeeDetail.jsx";
import MarkStudentAttendance from "./MarkStudentAttendance.jsx"; // Ensure this component is correctly imported
import AcademicsDashboard from "./AcademicDashbooard.jsx";

// Inline style for name box layout
const namebox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "25rem",
};

const FacultyDashboard = () => {
  const { FacultyID } = useParams(); // Get Faculty ID from URL parameters
  const [faculty, setFaculty] = useState([]); // State for faculty details
  const [timetable, setTimetable] = useState([]); // State for faculty timetable
  const [todayTimetable, setTodayTimetable] = useState([]); // State for today's timetable
  const [error, setError] = useState(null); // State for error messages
  const [showPopup, setShowPopup] = useState(false); // State for timetable popup visibility
  const [EmpdetailFlag, setEmpdetailFlag] = useState(false); // Flag for showing employee details
  const [MarkAttendanceFlag, setMarkAttendanceFlag] = useState(false); // Flag for showing attendance mark section
  const [AcademicFlag, setAcademicFlag] = useState(false);
  useEffect(() => {
    // Fetch faculty details using Faculty ID
    axios
      .get(`${API_URL}/api/EmployeeDetails?FacultyID=${FacultyID}`)
      .then((response) => {
        setFaculty(response.data);
        setShowPopup(true); // Show popup after fetching faculty data
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
        filterTodayTimetable(response.data); // Filter timetable for today's classes
      })
      .catch((error) => {
        setError("Failed to fetch timetable data");
        console.error(error);
      });
  }, [FacultyID]);

  // Function to filter classes for today from timetable data
  const filterTodayTimetable = (data) => {
    const today = new Date().toLocaleString("en-us", { weekday: "long" });
    const todayClasses = data.filter((slot) => slot.Day === today);
    setTodayTimetable(todayClasses);
  };

  // Function to close the timetable popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Function to render faculty details section
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
            <div style={{ margin: "0", lineHeight: "1rem" }}>
              <h3>{facultyMember.Faculty_Name}</h3>
              <p style={{ marginTop: "0" }}>
                Faculty ID: {facultyMember.FacultyID}
              </p>
              <p>Department: {facultyMember.DepartmentName}</p>
            </div>
            <div style={{ marginTop: "2rem", lineHeight: "1rem" }}>
              <p>Email: {facultyMember.Faculty_Email}</p>
              <p>Designation: {facultyMember.Faculty_Designation}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  // Function to render the timetable section
  const renderTimetable = () => {
    if (timetable.length === 0) return <p>No timetable data available.</p>;

    return (
      <div className="timetable">
        <h4>Faculty Timetable</h4>
        <FacultyTimeTable timetable={timetable} />
      </div>
    );
  };

  return (
    <div className="dashboard">
      <FacultySidebar
        setEmpdetailFlag={setEmpdetailFlag}
        setMarkAttendanceFlag={setMarkAttendanceFlag}
        setAcademicFlag={setAcademicFlag}
      />
      <div className="main-content">
        <Header />
        {AcademicFlag ? (
          <AcademicsDashboard FacultyID={FacultyID} />
          
        ) : MarkAttendanceFlag ? (
          <div className="MarkAttendance-Detail">
            <MarkStudentAttendance FacultyID={FacultyID} />
          </div>
        ) : EmpdetailFlag ? (
          <div className="Employee-Detail">
            <EmployeeDetail FacultyID={FacultyID} />
          </div>
        ) : (
          <div className="faculty-section">
            {showPopup && (
              <TimetablePopup facultyID={FacultyID} onClose={closePopup} />
            )}
            {error && <p className="error">{error}</p>}
            <div className="faculty-details-section">
              {renderFacultyDetails()}
            </div>
            <div className="timetable-section">{renderTimetable()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
