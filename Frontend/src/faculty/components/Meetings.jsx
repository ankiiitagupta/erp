import React, { useState } from "react";
//import "../stylesheets/Meetings.css";
import "../stylesheets/AcademicsDashboard.css";

const Meetings = () => {
  const [meetings, setMeetings] = useState([
    {
      meetingTitle: "Project Discussion",
      date: "2024-12-01",
      time: "10:00 AM",
      location: "Room 201",
      link: "#",
    },
    {
      meetingTitle: "Parent-Teacher Conference",
      date: "2024-12-05",
      time: "2:00 PM",
      location: "Online",
      link: "#",
    },
    {
      meetingTitle: "Team Meeting",
      date: "2024-12-10",
      time: "3:30 PM",
      location: "Room 305",
      link: "#",
    },
  ]);

  const handleScheduleMeeting = () => {
    alert("Meeting scheduling functionality will be implemented here!");
  };

  return (
    <div className="meetings-dashboard">
      <div className="meetings-content">
        <h1 className="meetings-title">MEETINGS</h1>
        <div className="schedule-section">
          <button onClick={handleScheduleMeeting} className="schedule-button">
            Schedule a Meeting
          </button>
        </div>
        <div className="meetings-list">
          {meetings.map((meeting, index) => (
            <div key={index} className="meeting-card">
              <div className="meeting-details">
                <span className="meeting-title">{meeting.meetingTitle}</span>
                <p className="meeting-date-time">
                  {meeting.date} at {meeting.time}
                </p>
                <span className="meeting-location">Location: {meeting.location}</span>
              </div>
              <a href={meeting.link} className="view-link">
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meetings;
