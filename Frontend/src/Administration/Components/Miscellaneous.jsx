import React, { useState } from "react";
import "../stylesheets/Miscellaneous.css";

const Miscellaneous = () => {
  const options = [
    { title: "TIME TABLE", image: "/images/timetable.png" },
    { title: "DEPARTMENT", image: "/images/department.png" },
    { title: "SUBJECT", image: "/images/subject.png" },
    { title: "COURSE", image: "/images/course.png" },
    { title: "EVENTS", image: "/images/event.png" },
    { title: "ROOM", image: "/images/room.png" },
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
