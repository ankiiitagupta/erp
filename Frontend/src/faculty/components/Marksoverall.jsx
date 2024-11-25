import React, { useState } from "react";
import "../stylesheets/AcademicsDashboard.css";
import syllabus from "../../assets/AcademicDashboardsvg/syllabus.png";
import Marksclip from "../../assets/AcademicDashboardsvg/Markclip.png";
import Marks from "./Marks";
import ShowMarksByClass from "./showmarksbyclass";

const MarksOverALL = ({facultyID}) => {
    const [editMarks, setEditMarks] = useState(false);
    const [showMarks, setShowMarks] = useState(false);
    
  
    return (
      <div className="academics-dashboard">
        {editMarks ? (
          <Marks facultyID={facultyID}/>
        ) : showMarks ? (
          <ShowMarksByClass facultyID={facultyID}/>
        ) : (
          <div className="main-content">
            <h2 className="content-title">ACADEMICS</h2>
            <div className="icon-grid-2">
              <div className="icon-card" onClick={() => setEditMarks(true)}>
                <img src={Marksclip} alt="Marks" className="icon" />
                <p>Edit Marks</p>
                <span className="tooltip">
                  View and update Student marks for each course
                </span>
              </div>
  
              <div className="icon-card" onClick={() => setShowMarks(true)}>
                <img src={syllabus} alt="Syllabus" className="icon" />
                <p>Show Marks</p>
                <span className="tooltip">
                  Access syllabus and update completed Syllabus
                </span>
              </div>
  
              
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default  MarksOverALL;
  