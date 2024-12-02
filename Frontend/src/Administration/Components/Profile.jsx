import React from "react";
import "../stylesheets/Adminprofile.css";

const Profile = () => {
  return (
    <div className="adprofile-container">
      <div className="adprofile-header">
        <div className="adprofile-picture"></div>
        <div className="adprofile-info">
          <h3>Name</h3>
          <p>Mail ID</p>
          <p>Position</p>
        </div>
      </div>
      <div className="adprofile-body">
        <div className="tabs">
          <button className="active">Personal</button>
          <button>Academic</button>
        </div>
        <div className="adpersonal-details">
          <div className="edit-btn">
            <button>Edit</button>
          </div>
          <form>
            <div className="adform-row">
              <label>First Name:</label>
              <input type="text" placeholder="Enter First Name" />
              <label>Last Name:</label>
              <input type="text" placeholder="Enter Last Name" />
            </div>
            <div className="adform-group">
              <label>Mail ID:</label>
              <input type="email" placeholder="Enter Mail ID" />
            </div>
            <div className="adform-group">
              <label>Phone Number:</label>
              <input type="tel" placeholder="Enter Phone Number" />
            </div>
            <div className="adform-group">
              <label>Address:</label>
              <input type="text" placeholder="Enter Address" />
            </div>
            <div className="adform-group">
              <label>Date of Birth:</label>
              <input type="date" />
            </div>
            <div className="adform-group">
              <label>Bio:</label>
              <textarea placeholder="Enter Bio"></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
