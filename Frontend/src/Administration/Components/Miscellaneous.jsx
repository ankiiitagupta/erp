import React, { useState } from "react";
import "../stylesheets/Miscellaneous.css"; // Existing stylesheet for Miscellaneous


// Import assets
import timetable from "../../assets/AcademicDashboardsvg/timetable.png";
import department from "../../assets/AcademicDashboardsvg/department.png";
import subject from "../../assets/AcademicDashboardsvg/subject.png";
import course from "../../assets/AcademicDashboardsvg/course.png";
import events from "../../assets/AcademicDashboardsvg/event.png";
import room from "../../assets/AcademicDashboardsvg/room.png";

// Import components
import CoursePage from "./CoursePage";
import ManageDepartment from "./ManageDepartment";
import ManageSubject from "./ManageSubject";
import ManageRooms from "./ManageRooms";
import AdminEvent from "./AdminEvent"; // Import AdminEvent component

const Miscellaneous = () => {
  const [activePage, setActivePage] = useState("Miscellaneous"); // Manage the active page

  const options = [
    {
      title:"EXPENSES",
      image: timetable,
      className: "miscellaneous-card-expenses",
    },
    {
      title: "DEPARTMENT",
      image: department,
      className: "miscellaneous-card-department",
    },
    {
      title: "SUBJECT",
      image: subject,
      className: "miscellaneous-card-subject",
    },
    {
      title: "COURSE",
      image: course,
      className: "miscellaneous-card-course",
    },
    {
      title: "EVENTS",
      image: events,
      className: "miscellaneous-card-events",
    },
    {
      title: "ROOM",
      image: room,
      className: "miscellaneous-card-room",
    },
  ];

  const handleClick = (title) => {
    if (title === "COURSE") {
      setActivePage("CoursePage"); // Switch to CoursePage
    } else if (title === "DEPARTMENT") {
      setActivePage("ManageDepartment"); // Switch to ManageDepartment
    } else if (title === "SUBJECT") {
      setActivePage("ManageSubject"); // Switch to ManageSubject
    } else if (title === "EVENTS") {
      setActivePage("AdminEvent"); // Switch to AdminEvent
    } else if (title === "ROOM") {
      setActivePage("ManageRooms");
    }
      else {
      console.log(`${title} clicked`);
    }
  };

  // Render content based on the active page
  const renderContent = () => {
    if (activePage === "CoursePage") {
      return <CoursePage />;
    } else if (activePage === "ManageDepartment") {
      return <ManageDepartment />;
    } else if (activePage === "ManageSubject") {
      return <ManageSubject />;
    } else if (activePage === "AdminEvent") {
      return <AdminEvent />;
    }else if (activePage === "ManageRooms") {
      return <ManageRooms />;
    }

    // Default view: Miscellaneous grid
    return (
      <div className="miscellaneous-container">
        <h1 className="miscellaneous-heading">Miscellaneous</h1>
        <div className="miscellaneous-grid">
          {options.map((option, index) => (
            <button
              key={index}
              className={`miscellaneous-card ${option.className}`}
              onClick={() => handleClick(option.title)}
            >
              <img
                src={option.image}
                alt={option.title}
                className="miscellaneous-icon"
              />
              <div className="miscellaneous-title">{option.title}</div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return <>{renderContent()}</>;
};

export default Miscellaneous;
