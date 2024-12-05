import React, { useState } from "react";
import "../stylesheets/ManageDepartment.css";
import adddepartmentimg from "../../assets/Admin/AddDepartment.jpg";
import removedepartmentimg from "../../assets/Admin/AddDepartment2.jpg";

const ManageDepartment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const departments = [
    { id: 1, name: "IT" },
    { id: 2, name: "Non Tech" },
  ];

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  const handleEditDepartment = (departmentId) => {
    console.log("Edit department:", departmentId);
  };

  const handleAddDepartment = () => {
    console.log("Navigate to Add Department page");
  };

  const handleRemoveDepartment = () => {
    console.log("Navigate to Remove Department page");
  };

  return (
    <div className="manage-department-container">
      <h1 className="manage-department-header">MANAGE DEPARTMENT</h1>

      {/* Action Buttons */}
      <div className="manage-department-actions">
        <div className="action-card" onClick={handleAddDepartment}>
          <img src={adddepartmentimg} alt="Add Department" />
          <h3>ADD DEPARTMENT</h3>
        </div>
        <div className="action-card" onClick={handleRemoveDepartment}>
          <img src={removedepartmentimg} alt="Remove Department" />
          <h3>REMOVE DEPARTMENT</h3>
        </div>
      </div>

      {/* Search Section */}
      <div className="manage-department-details">
        <div className="manage-department-search">
          <label htmlFor="search">Search by Name</label>
          <input
            id="search"
            type="text"
            placeholder="Enter Department Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="manage-department-search-input"
          />
          <button
            className="manage-department-searchbtn"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Department List */}
        <div className="manage-department-list">
          <table>
            <thead>
              <tr>
                <th>DEPARTMENT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.id}>
                  <td>{department.name}</td>
                  <td>
                    <button
                      onClick={() => handleEditDepartment(department.id)}
                    >
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

export default ManageDepartment;
