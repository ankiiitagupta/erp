import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FacultySidebar from "./FacultySidebar.jsx";
import Header from "../../Student/Components/Header.jsx";
import { API_URL } from "../../axios.js";
import FacultyTimeTable from "./FacultyTimetable.jsx";
import TimetablePopup from "./TimetablePopup.jsx";
import EmployeeDetail from "./EmployeeDetail.jsx";
import MarkStudentAttendance from "./MarkStudentAttendance.jsx";
import AcademicsDashboard from "./AcademicDashbooard.jsx";
import FacultyallTimeTable from "./facultyalltimetable.jsx";
import StudentAttendance from "./StudentAttendance.jsx";
import FacultyReport from "./FacultyReport.jsx"; // Import the Reports page

// Inline style for name box layout
const namebox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "25rem",
};

const FacultyDashboard = ({ roles = "faculty" }) => {
  const { FacultyID } = useParams(); // Get Faculty ID from URL parameters
  const [faculty, setFaculty] = useState([]); // State for faculty details
  const [timetable, setTimetable] = useState([]); // State for faculty timetable
  const [todayTimetable, setTodayTimetable] = useState([]); // State for today's timetable
  const [error, setError] = useState(null); // State for error messages
  const [showPopup, setShowPopup] = useState(false); // State for timetable popup visibility
  const [EmpdetailFlag, setEmpdetailFlag] = useState(false); // Flag for showing employee details
  const [MarkAttendanceFlag, setMarkAttendanceFlag] = useState(false); // Flag for showing attendance mark section
  const [AcademicFlag, setAcademicFlag] = useState(false);
  const [AllTimetableFlag, setAllTimetableFlag] = useState(false);
  const [StudAttendanceFlag, setStudAttendanceFlag] = useState(false);
  const [reportsFlag, setReportsFlag] = useState(false); // Flag for showing the Reports section

  // Reset all flags
  const resetFlags = () => {
    setStudAttendanceFlag(false);
    setAcademicFlag(false);
    setEmpdetailFlag(false);
    setShowPopup(false);
    setAllTimetableFlag(false);
    setReportsFlag(false); // Reset Reports flag
  };

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
      .get(`${API_URL}/api/facultyTimetable?facultyID=${FacultyID}`)
      .then((response) => {
        setTimetable(response.data);
        console.log(response.data)
        filterTodayTimetable(response.data); // Filter timetable for today's classes
      })
      .catch((error) => {
        setError("Failed to fetch timetable data");
        console.error(error);
      });
  }, [FacultyID]);

  // Filter classes for today from timetable data
  const filterTodayTimetable = (data) => {
    const today = new Date().toLocaleString("en-us", { weekday: "long" });
    const todayClasses = data.filter((slot) => slot.Day === today);
    setTodayTimetable(todayClasses);
  };

  // Function to close the timetable popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Render faculty details section
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

  // Render timetable section
  const renderTimetable = () => {
    if (timetable.length === 0) return <p>No timetable data available.</p>;

    return (
      <div className="timetable">
        <h4>Faculty Timetable</h4>
        <FacultyTimeTable
          FacultyID={FacultyID}         
        />
      </div>
    );
  };

  return (
    <div className="dashboard">
      <FacultySidebar
        setEmpdetailFlag={setEmpdetailFlag}
        setStudAttendanceFlag={setStudAttendanceFlag}
        setAcademicFlag={setAcademicFlag}
        setAllTimetableFlag={setAllTimetableFlag}
        setReportsFlag={setReportsFlag} // Pass the Reports flag setter
        FacultyID={FacultyID}
        resetFlags={resetFlags}
      />
      <div className="main-content">
        <Header facultyID={FacultyID} />
        {AllTimetableFlag ? (
          <FacultyallTimeTable facultyID={FacultyID} roles={roles} />
        ) : AcademicFlag ? (
          <AcademicsDashboard facultyID={FacultyID} />
        ) : StudAttendanceFlag ? (
          <div className="MarkAttendance-Detail">
            <StudentAttendance facultyID={FacultyID} resetFlags={resetFlags}/>
          </div>
        ) : EmpdetailFlag ? (
          <div className="Employee-Detail">
            <EmployeeDetail FacultyID={FacultyID} />
          </div>
        ) : reportsFlag ? ( // Conditionally render the Reports page
          <div className="reports">
            <FacultyReport /> {/* Render the Reports component */}
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
