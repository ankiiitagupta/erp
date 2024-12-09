import React, { useState } from "react";
import "../stylesheets/AdminEvent.css";

const AdminEvent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const events = [{ id: 1, name: "Fresher's PF B.Tech" }];

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  const handleAddEvent = () => {
    console.log("Navigate to Add Event page");
  };

  const handleEditEvent = () => {
    console.log("Navigate to Edit Event page");
  };

  return (
    <div className="admin-event-container">
      <h1 className="admin-event-title">MANAGE EVENT</h1>

      {/* Add and Edit Event Sections in the Same Row */}
      <div className="admin-event-actions-row">
        <div className="admin-event-section admin-event-card">
          <button className="admin-event-button admin-event-button--add" onClick={handleAddEvent}>
            ADD EVENT
          </button>
        </div>

        <div className="admin-event-section admin-event-card">
          <button className="admin-event-button admin-event-button--edit" onClick={handleEditEvent}>
            EDIT EVENT
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="admin-event-section admin-event-card">
        <div className="admin-event-search-section">
          <label htmlFor="search-event" className="admin-event-search-label">
            SEARCH EVENT:
          </label>
          <input
            id="search-event"
            type="text"
            className="admin-event-search-input"
            placeholder="ENTER THE NAME OF EVENT"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="admin-event-search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </div>

      {/* Event List Section */}
      <div className="admin-event-section admin-event-card">
        <div className="admin-event-list-section">
          <table className="admin-event-table">
            <thead>
              <tr>
                <th className="admin-event-table-header">EVENT</th>
                <th className="admin-event-table-header">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="admin-event-table-cell">{event.name}</td>
                  <td className="admin-event-table-cell">
                    <button className="admin-event-search-button">SEARCH</button>
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

export default AdminEvent;
