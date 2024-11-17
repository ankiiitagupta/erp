
import React, { useState, useEffect } from 'react';
import { API_URL } from "../../axios";
import '../stylesheets/TimetablePopup.css';
import axios from "axios";
import PropTypes from 'prop-types';

const TimetablePopup = ({ facultyID, onClose }) => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextClassIndex, setNextClassIndex] = useState(null);

  // Fetch timetable data
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/facultytodaystimetable?facultyID=${facultyID}`
        );
        if (Array.isArray(response.data)) {
          setTimetable(response.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError('Failed to fetch timetable data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [facultyID]);

  // Calculate the next class
  useEffect(() => {
    if (timetable.length > 0) {
      const now = new Date();
      const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

      const upcomingIndex = timetable.findIndex((slot) => {
        const [startHour, startMinute] = slot.StartTime.split(':').map(Number);
        const startTotalMinutes = startHour * 60 + startMinute;
        return startTotalMinutes > currentTotalMinutes;
      });

      setNextClassIndex(upcomingIndex);
    }
  }, [timetable]);

  return (
    <div className="popup-overlay" onClick={() => onClose()}>
      <div className="popup-content">
        {/* Heading for the popup */}
        <h4 className="popup-heading">Today's Timetable</h4>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : timetable.length === 0 ? (
          <p>No classes scheduled for today.</p>
        ) : (
          <>
            <div className="timetable-header">
              <span>Period</span>
              <span>From</span>
              <span>Till</span>
              <span>Subjects</span>
              <span>Room Number</span>
              <span>Year</span>
              <span>Section</span>
            </div>
            {timetable.map((slot, index) => (
              <div
                key={index}
                className={`timetable-slot ${nextClassIndex === index ? 'highlight' : ''}`}
              >
                <span>{slot.LectureNumber}</span>
                <span>{slot.StartTime}</span>
                <span>{slot.EndTime}</span>
                <span>{slot.SubjectName}</span>
                <span>{slot.RoomNumber}</span>
                <span>{slot.Stud_YearOfStudy}</span>
                <span>{slot.Section}</span>
              </div>
            ))}
          </>
        )}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

TimetablePopup.propTypes = {
  facultyID: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TimetablePopup;

