import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/MarkStudentAttendance.css";


const MarkStudentAttendance = () => {
  return (
    <div className="attendance-container">
      <div className="attendance-inner">
        <h2 className="attendance-title">STUDENT ATTENDANCE</h2>
        <div className="components-select">
          <label>
            component1:
            <select className="select-dropdown">
              <option>SELECT</option>
            </select>
          </label>
          <label>
            component2:
            <select className="select-dropdown">
              <option>SELECT</option>
            </select>
          </label>
          <label>
            component3:
            <select className="select-dropdown">
              <option>SELECT</option>
            </select>
          </label>
          <label>
            component4:
            <select className="select-dropdown">
              <option>SELECT</option>
            </select>
          </label>
        </div>
        <div className="student-list">
          <h3>STUDENT LIST:</h3>
          {['ALICE', 'BECCA'].map((name, index) => (
            <div key={index} className="student-item">
              <div className="avatar"></div>
              <div className="student-info">
                <p className="student-name">{name}</p>
                <p className="student-id">{`2144522000${35 + index}`}</p>
              </div>
              <button className="mark-button">MARK ATTENDANCE</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarkStudentAttendance;
