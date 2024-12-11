import React, { useState } from "react";
import "../stylesheets/ManageRooms.css";

const ManageRooms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingRoom, setIsAddingRoom] = useState(false); // State to toggle Add Room form
  const rooms = [{ id: 1, name: "B.Tech-1 Year-Section A" }];

  const handleAddRoom = () => {
    setIsAddingRoom(true); // Show the Add Room form
  };

  const handleEditRoom = () => {
    console.log("Navigate to Edit Room page");
  };

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Room added!");
    setIsAddingRoom(false); // Hide form after submission
  };

  return (
    <div className="manage-rooms-container">
      <h1 className="manage-rooms-title">MANAGE ROOMS</h1>

      {/* Add and Edit Event Sections in the Same Row */}
      <div className="manage-rooms-actions-row">
        <div className={`manage-rooms-section manage-rooms-card ${isAddingRoom ? "highlight" : ""}`}>
          <button
            className="manage-rooms-button manage-rooms-button--add"
            onClick={handleAddRoom}
          >
            ADD ROOM
          </button>
        </div>

        <div className="manage-rooms-section manage-rooms-card">
          <button
            className="manage-rooms-button manage-rooms-button--edit"
            onClick={handleEditRoom}
          >
            EDIT ROOM
          </button>
        </div>
      </div>

      

      {/* Conditional Rendering for Add Room Form */}
      {isAddingRoom ? (
        <div className="manage-rooms-section manage-rooms-card">
          <form onSubmit={handleFormSubmit}>
            <div className="manage-rooms-form-group">
              <label htmlFor="course">COURSE:</label>
              <input
                type="text"
                id="course"
                className="manage-rooms-form-input"
                placeholder="ENTER THE NAME OF COURSE"
                required
              />
            </div>
            <div className="manage-rooms-form-group">
              <label htmlFor="year">YEAR:</label>
              <input
                type="text"
                id="year"
                className="manage-rooms-form-input"
                placeholder="ENTER THE YEAR"
                required
              />
            </div>
            <div className="manage-rooms-form-group">
              <label htmlFor="section">SECTION:</label>
              <input
                type="text"
                id="section"
                className="manage-rooms-form-input"
                placeholder="ENTER THE DESCRIPTION"
                required
              />
            </div>
            <div className="manage-rooms-form-group">
              <label htmlFor="section">ROOM NO.:</label>
              <input
                type="text"
                id="section"
                className="manage-rooms-form-input"
                placeholder="ENTER THE DESCRIPTION"
                required
              />
            </div>
            <button type="submit" className="manage-rooms-button manage-rooms-button--add">
              + ADD
            </button>
          </form>
        </div>
      ) : (
        <div className="manage-rooms-section manage-rooms-card">
          {/* Search Table */}
          <div className="manage-rooms-section manage-rooms-card">
        <div className="manage-rooms-search-section">
          <label htmlFor="search-event" className="manage-rooms-search-label">
            SEARCH ROOM:
          </label>
          <input
            id="search-event"
            type="text"
            className="manage-rooms-search-input"
            placeholder="ENTER THE NAME OF ROOM"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="manage-rooms-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </div>
          <div className="manage-rooms-list-section">
            <table className="manage-rooms-table">
              <thead>
                <tr>
                  <th className="manage-rooms-table-header">ROOM</th>
                  <th className="manage-rooms-table-header">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td className="manage-rooms-table-cell">{room.name}</td>
                    <td className="manage-rooms-table-cell">
                      <button className="manage-rooms-search-button">SEARCH</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;
