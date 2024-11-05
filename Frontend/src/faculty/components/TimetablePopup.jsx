import React, { useState, useEffect } from 'react';
import '../TimetablePopup.css';

const TimetablePopup = ({ timetable, onClose }) => {
  const dummyTimetable = [
    { Subject: "Mathematics", Period: "1", From: "09:00 AM", Till: "09:50 AM", RoomNo: "101" },
    { Subject: "Physics", Period: "2", From: "10:00 AM", Till: "10:50 AM", RoomNo: "102" },
    { Subject: "Chemistry", Period: "3", From: "11:00 AM", Till: "11:50 AM", RoomNo: "103" },
    { Subject: "Biology", Period: "4", From: "01:00 PM", Till: "01:50 PM", RoomNo: "104" },
  ];

  const currentTimetable = timetable.length > 0 ? timetable : dummyTimetable;

  const [nextClassIndex, setNextClassIndex] = useState(null);

  useEffect(() => {
    const fetchFacultyNames = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/faculty');
        if (!response.ok) {
          throw new Error('Failed to fetch faculty names');
        }
        const data = await response.json();
        setFacultyNames(data.map((faculty) => faculty.name));
      } catch (error) {
        console.error('Error fetching faculty names:', error);
      }
    };

    fetchFacultyNames();
  }, []);

  useEffect(() => {
    const now = new Date();
    const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

    // Find the next upcoming class
    const upcomingIndex = currentTimetable.findIndex((slot) => {
      const [startHour, startMinute] = slot.From.split(':');
      const startMeridian = slot.From.slice(-2);
      const startTotalMinutes = (parseInt(startHour) % 12 + (startMeridian === 'PM' ? 12 : 0)) * 60 + parseInt(startMinute);

      return startTotalMinutes > currentTotalMinutes;
    });

    setNextClassIndex(upcomingIndex);
  }, [currentTimetable]);

  const handleAssignClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleSubstituteSelect = (index, name) => {
    setAssignedSubstitute((prev) => ({ ...prev, [index]: name }));
    setOpenDropdown(null);
  };

  const handleOverlayClick = (event) => {
    if (event.target.className === 'popup-overlay') {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <h4>Today's Timetable</h4>
        <div className="timetable-header">
          <span>Period</span>
          <span>From</span>
          <span>Till</span>
          <span>Subjects</span>
          <span>Room Number</span>
          
        </div>
        {currentTimetable.length === 0 ? (
          <p>No classes scheduled for today.</p>
        ) : (
          currentTimetable.map((slot, index) => (
            <div
              key={index}
              className={`timetable-slot ${nextClassIndex === index ? 'highlight' : ''}`}
            >
              <span>{slot.Period}</span>
              <span>{slot.From}</span>
              <span>{slot.Till}</span>
              <span>{slot.Subject}</span>
              <span>{slot.RoomNo}</span>
              
                
            </div>
          ))
        )}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TimetablePopup;
