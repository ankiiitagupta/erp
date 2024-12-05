import React, { useState } from "react";
import "../stylesheets/CoursePage.css";
import addcourseimg from "../../assets/Admin/addcourseadmin.jpg";
import removecourseimg from "../../assets/Admin/Remocecourseadmin.jpg";

const CoursePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const courses = [{ id: 1, name: "B.Tech - CSE" }];

  const handleSearch = () => {
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
    <div className="course-page-container">
      <h1 className="course-page-header">MANAGE COURSE</h1>

      <div className="course-page-actions">
        <div className="action-card" onClick={handleAddCourse}>
          <img src={addcourseimg} alt="Add Course" />
          <h3>ADD COURSE</h3>
        </div>
        <div className="action-card" onClick={handleRemoveCourse}>
          <img src={removecourseimg} alt="Remove Course" />
          <h3>REMOVE COURSE</h3>
        </div>
      </div>
      <div className="course-page-details">

      <div className="course-page-search">
        <input
          type="text"
          placeholder="Enter Course Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="course-page-searchbtn" onClick={handleSearch}>SEARCH</button>
      </div>

      <div className="course-page-list">
        <table>
          <thead>
            <tr>
              <th>COURSE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>
                  <button onClick={() => handleEditCourse(course.id)}>
                    EDIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default CoursePage;
