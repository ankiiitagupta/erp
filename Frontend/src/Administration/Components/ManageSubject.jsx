import React, { useState } from "react";
import "../stylesheets/ManageSubject.css";
import addSubjectimg from "../../assets/Admin/AddSubject.jpg";
import removeSubjectimg from "../../assets/Admin/RemoveSubject.jpg";

const ManageSubject = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const subjects = [{ id: 1, name: "Mathematics" }];

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  const handleEditSubject = (subjectId) => {
    console.log("Edit Subject:", subjectId);
  };

  const handleAddSubject = () => {
    console.log("Navigate to Add Subject page");
  };

  const handleRemoveSubject = () => {
    console.log("Navigate to Remove Subject page");
  };

  return (
    <div className="manage-subject-container">
      <h1 className="manage-subject-header">MANAGE SUBJECT</h1>

      <div className="manage-subject-actions">
        <div className="action-card" onClick={handleAddSubject}>
          <img src={addSubjectimg} alt="Add Subject" />
          <h3>ADD SUBJECT</h3>
        </div>
        <div className="action-card" onClick={handleRemoveSubject}>
          <img src={removeSubjectimg} alt="Remove Subject" />
          <h3>REMOVE SUBJECT</h3>
        </div>
      </div>
      <div className="manage-subject-details">

      <div className="manage-subject-search">
        <input
          type="text"
          placeholder="Enter Subject Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="manage-subject-searchbtn" onClick={handleSearch}>SEARCH</button>
      </div>

      <div className="manage-subject-list">
        <table>
          <thead>
            <tr>
              <th>COURSE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.name}</td>
                <td>
                  <button onClick={() => handleEditSubject(subject.id)}>
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

export default ManageSubject;
