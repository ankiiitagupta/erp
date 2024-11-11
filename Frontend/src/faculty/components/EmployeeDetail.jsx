import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/EmployeeDetail.css";
import { API_URL } from "../../axios.js"; // Ensure this path is correct

import PieChart from "../../Student/Components/PieChart.jsx";
import Payroll from "./Payroll.jsx"

const EmployeeDetail = ({ FacultyID }) => {
  const [employee, setEmployee] = useState(null);  
  const [fetchError, setFetchError] = useState(null);
  const [attendance, setAttendance] = useState([
    {
      FacultyID: 1,
      TotalLectures: 50,
      PresentLectures: 45,
    },
   
   
  ]); // Dummy data for attendance
  const [salaryData] = useState({
    basicSalary: 50000,
    bonus: 10000,
  });

  const [allowances] = useState([
    { name: 'House Rent Allowance (HRA)', amount: 20000 },
    { name: 'Dearness Allowance (DA)', amount: 5000 },
  ]);

  const [deductions] = useState([
    { name: 'Provident Fund (PF)', amount: 6000 },
    { name: 'Professional Tax', amount: 200 },
    { name: 'Tax Deducted at Source (TDS)', amount: 3000 },
  ]);

  useEffect(() => {
    if (!FacultyID) return;

    axios
      .get(`${API_URL}/api/EmployeeDetails?FacultyID=${FacultyID}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => {
        setFetchError("Failed to fetch faculty data");
        console.error(error);
      });
  }, [FacultyID]);

  //  axios
  //     .get(`${API_URL}/api/totalFacultyattendence?FacultyId=${FacultyId}`)
  //     .then((response) => {
  //       setAttendance(response.data);
  //     })
  //     .catch((error) => {
  //       setError("Failed to fetch attendance data");
  //       console.error(error);
  //     });


  const renderFacultyAllDetail = () => {
    if (!employee) return <p>No employee data available</p>;

    const {
      fullName,
      employeeId,
      department,
      designation,
      joiningDate,
      contactDetails,
      profilePicture,
      employeeStatus,
    } = employee;

    const statusText = employeeStatus ? "Active" : "Inactive";
    const statusClass = employeeStatus ? "status-active" : "status-inactive";

    return (
      <div className="employee-details-container">
        <div className="employee-card">
          <div className="employee-profile-section">
            <img
              src={profilePicture || "https://via.placeholder.com/150"}
              alt={`${fullName}'s profile`}
              className="employee-profile-picture"
            />
            <div className="employee-info-section">
              <span className={`employee-status ${statusClass}`}>
                <span className="status-indicator"></span>
                {statusText}
              </span>
            </div>
          </div>

          <div className="employee-info-details">
            <div className="employee-basic-info-details">
              <h2 className="employee-full-name">{fullName}</h2>
              <p>
                <strong>Employee ID:</strong> {employeeId}
              </p>
              <p>
                <strong>Department:</strong> {department}
              </p>
              <p>
                <strong>Designation:</strong> {designation}
              </p>
              <p>
                <strong>Joining Date:</strong>{" "}
                {joiningDate ? new Date(joiningDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div className="employee-contact-info">
              <p>
                <strong>Contact:</strong>
              </p>
              <p>
                <strong>Email:</strong> {contactDetails?.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {contactDetails?.phone || "N/A"}
              </p>
              <p>
                <strong>Office Address:</strong>{" "}
                {contactDetails?.officeAddress || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPieChart = () => {
    return attendance.map((attend) => (
      <div className="piechart" key={attend.FacultyID}>
        <h4>Attendance Details</h4>
        <div className="attendance-data">
          <div className="piechartrow">
            {/* Dummy PieChart component rendering */}
            <div className="dummy-piechart">
              {/* Replace this with actual PieChart component logic */}
              <PieChart/>
            </div>
          </div>
          <div className="attdetail">
            <ul>
              <li>Total lectures: {attend.TotalLectures}</li>
              <li>Present: {attend.PresentLectures}</li>
              <li>Absent: {attend.TotalLectures - attend.PresentLectures}</li>
              <li>
                Percentage:{" "}
                {(
                  (attend.PresentLectures / attend.TotalLectures) *
                  100
                ).toFixed(2)}
                %
              </li>
            </ul>
          </div>
        </div>
      </div>
    ));
  };

  const renderPayroll = () => {
    return (
      <Payroll
        salaryData={salaryData}
        allowances={allowances}
        deductions={deductions}
      />
    );
  };


  if (fetchError) {
    return <p>{fetchError}</p>;
  }

  return (
    <div className="EmpDetails">
        <div className="Employee-All-Detail">{renderFacultyAllDetail()}</div>
        <div className="pie-chart-section">{renderPieChart()}</div>
        <div className="Payroll-section">{renderPayroll()}</div>
    </div>
  );
};

export default EmployeeDetail;
