import React from 'react';
import pieClip from '../assets/pieclip.png';

const AttendanceDetails = ({ RollNO }) => {
  // Example function for handling attendance toggle (you can customize this)
  const toggleMyAtt = () => {
    console.log("Toggling My Attendance");
    // Add your logic here
  };

  return (
    <div className="attddetex">
      <div className="attbox">
        <div className="box">
          <div className="attboxdata">
            <img src={pieClip} alt="My Attendance" className="attpie" />
            <a href="#" onClick={toggleMyAtt}>
              <h4>My Attendance</h4>
            </a>
          </div>
          <p>Students can view their attendance month-wise or cumulative.</p>
        </div>
        <div className="box">
          <div className="attboxdata">
            <img src={pieClip} alt="My Daily Attendance" className="attpie" />
            <a href="#">
              <h4>My Daily Attendance</h4>
            </a>
          </div>
          <p>Students can view their daily attendance.</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetails;
