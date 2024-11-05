import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FacultyDashboard = () => {
  const { FacultyID } = useParams(); // Get Faculty ID from URL
  const [faculty, setFaculty] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch faculty basic details using Faculty ID
    axios
      .get(`${API_URL}/api/facultyDetails?FacultyID=${FacultyID}`)
      .then((response) => {
        setFaculty(response.data);
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
      })
      .catch((error) => {
        setError("Failed to fetch timetable data");
        console.error(error);
      });
  }, [FacultyID]);

  const renderFacultyDetails = () => {
    return faculty.map((facultyMember) => (
      <div key={facultyMember.FacultyID} className="faculty-detail">
        <div className="profile-section">
          <img
            src="https://via.placeholder.com/150"
            alt={`${facultyMember.Name} profile`}
            className="profile-pic"
          />
          <div className="name-box">
            <h3>{facultyMember.Name}</h3>
            <p>Faculty ID: {facultyMember.FacultyID}</p>
            <p>Department: {facultyMember.Department}</p>
            <p>Email: {facultyMember.Email}</p>
            <p>Phone: {facultyMember.Phone}</p>
          </div>
        </div>
      </div>
    ));
  };

  const renderTimetable = () => {
    return (
      <div className="timetable">
        <h4>Faculty Timetable</h4>
        {timetable.map((slot, index) => (
          <div key={index} className="timetable-slot">
            <p><strong>Subject:</strong> {slot.Subject}</p>
            <p><strong>Day:</strong> {slot.Day}</p>
            <p><strong>Time:</strong> {slot.Time}</p>
            <p><strong>Location:</strong> {slot.Location}</p>
          </div>
        ))}
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
          <div className="faculty-details-section">{renderFacultyDetails()}</div>
          <div className="timetable-section">{renderTimetable()}</div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
