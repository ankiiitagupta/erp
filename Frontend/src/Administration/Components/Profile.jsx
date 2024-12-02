import React from "react";
import "../stylesheets/Adminprofile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture"></div>
        <div className="profile-info">
          <h3>Name</h3>
          <p>Mail ID</p>
          <p>Position</p>
        </div>
      </div>
      <div className="profile-body">
        <div className="tabs">
          <button className="active">Personal</button>
          <button>Academic</button>
        </div>
        <div className="personal-details">
          <div className="edit-btn">
            <button>Edit</button>
          </div>
          <form>
            <div className="form-row">
              <label>First Name:</label>
              <input type="text" placeholder="Enter First Name" />
              <label>Last Name:</label>
              <input type="text" placeholder="Enter Last Name" />
            </div>
            <div className="form-group">
              <label>Mail ID:</label>
              <input type="email" placeholder="Enter Mail ID" />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="tel" placeholder="Enter Phone Number" />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input type="text" placeholder="Enter Address" />
            </div>
            <div className="form-group">
              <label>Date of Birth:</label>
              <input type="date" />
            </div>
            <div className="form-group">
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
