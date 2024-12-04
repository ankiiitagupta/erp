import React, { useState } from "react";
import "../stylesheets/CoursePage.css";
import addcourseimg from "../../assets/Admin/addcourseadmin.jpg";
import removecourseimg from "../../assets/Admin/Remocecourseadmin.jpg";
const CoursePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const courses = [{ id: 1, name: "B.Tech - CSE" }];

  const handleSearch = () => {
    // Filter courses by searchQuery
    console.log("Search query:", searchQuery);
  };

  const handleEditCourse = (courseId) => {
    console.log("Edit course:", courseId);
  };

  const handleAddCourse = () => {
    console.log("Navigate to Add Course page");
  };

  const handleRemoveCourse = () => {
    console.log("Navigate to Remove Course page");
  };

  return (
    <div className="managecourse-container">
      <h1 className="managecourse-header">MANAGE COURSE</h1>
      <div className="managecourse-actions">
        <div className="managecourse-action-card" onClick={handleAddCourse}>
          <img
            src={addcourseimg}
            alt="Add Course"
          />
          <h3>Add Course</h3>
        </div>
        <div className="managecourse-action-card" onClick={handleRemoveCourse}>
          <img
            src={removecourseimg}
            alt="Remove Course"
          />
          <h3>Remove Course</h3>
        </div>
      </div>
      <div className="managecourse-search">
        <input
          type="text"
          placeholder="Enter Course Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
           className="managecourse-search-input"
        />
        <button className="managecourse-search-btn" onClick={handleSearch}>Search</button>
      </div>
      <div className="managecourse-list">
        {courses.map((course) => (
          <div className="managecourse-item" key={course.id}>
            <span>{course.name}</span>
            <button onClick={() => handleEditCourse(course.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
