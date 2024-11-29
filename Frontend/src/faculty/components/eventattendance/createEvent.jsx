import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../axios";

const CreateEvent = ({ setView, setEvents, facultyID ,year,section}) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  

  
  

  
const handleSubmit = (e) => {
    e.preventDefault();
  
    const newEvent = {
      EventName: eventName,
      EventDescription: eventDescription,
      EventDate: eventDate,
      StartTime: startTime,
      EndTime: endTime,
      OrganizedBy: facultyID,
      Section: section,
      YearOfStudy: year,
      CreatedAt: new Date().toISOString(),
    };
  
    axios
      .post(`${API_URL}/api/postevents`, newEvent)
      .then((response) => {
        console.log("Event created successfully:", response.data);
        setView("list"); // Navigate back to event list
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });

      setView("list");
  };

  return (
    <div>
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Event Date:</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Description:</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <p><strong>Year:</strong> {year || "Loading..."}</p>
          <p><strong>Section:</strong> {section || "Loading..."}</p>
        </div>
        <button type="submit" disabled={!year || !section}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
