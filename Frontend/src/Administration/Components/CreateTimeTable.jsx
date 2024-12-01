import React, { useState, useEffect } from 'react';
import '../stylesheets/CreateTimeTable.css';
import AddDefaultTimetable from './AddTimetable';
import EditTimetable from './EditTimetable';

const AddTimetable = () => {
    const [activeTab, setActiveTab] = useState('add'); 
  
    // Function to render the create timetable tabs and content
    const renderCreateTimetableTabs = () => {
      return (
        <div className="timetable-container">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
              onClick={() => setActiveTab('add')}
            >
              Add Timetable
            </button>
            <button
              className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
              onClick={() => setActiveTab('edit')}
            >
              Edit Timetable
            </button>
          </div>
  
          <div className="tab-content">
            {activeTab === 'add' ? (
              <div className="tab-panel">
                {/* Add Timetable content goes here */}
                <AddDefaultTimetable/>
              </div>
            ) : (
              <div className="tab-panel">
                {/* Edit Timetable content goes here */}
                <EditTimetable/>
              </div>
            )}
          </div>
        </div>
      );
    };
  
    return (
      <div>
        {renderCreateTimetableTabs()} {/* Rendering the tabs and content */}
      </div>
    );
  };

export default AddTimetable;
