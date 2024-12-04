import React, { useState } from "react";
import "../stylesheets/Miscellaneous.css";
import timetable from "../../assets/AcademicDashboardsvg/timetable.png";
import department from "../../assets/AcademicDashboardsvg/department.png";
import subject from "../../assets/AcademicDashboardsvg/subject.png";
import course from "../../assets/AcademicDashboardsvg/course.png";
import events from "../../assets/AcademicDashboardsvg/event.png";
import room from "../../assets/AcademicDashboardsvg/room.png";

const Miscellaneous = () => {
  const options = [
    { title: "TIME TABLE", image: timetable },
    { title: "DEPARTMENT", image: department },
    { title: "SUBJECT", image: subject },
    { title: "COURSE", image: course },
    { title: "EVENTS", image: events },
    { title: "ROOM", image: room },
  ];

  const handleClick = (title) => {
    console.log(`${title} clicked`);
    // Add any action you want to trigger on button click here
  };

  return (
    <div className="miscellaneous">
      <h1>Miscellaneous</h1>
      <div className="grid">
        {options.map((option, index) => (
          <button
            key={index}
            className="card"
            onClick={() => handleClick(option.title)}
          >
            <img src={option.image} alt={option.title} className="icon" />
            <div className="title">{option.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Miscellaneous;
