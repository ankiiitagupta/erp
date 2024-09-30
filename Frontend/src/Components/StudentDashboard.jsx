import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';


const StudentDashboard = () => {
  const { RollNO } = useParams(); // Get Roll number from URL
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Mock data for students
    // const studentsData = [
    //   { id: 1, name: 'John Doe', rollNo: '12345', college: 'ABC College', section: 'A', email: 'john@example.com', profilePic: 'https://via.placeholder.com/150' },
    // ];
    // setStudents(studentsData);

    // Mock data for attendance
    const attendanceData = [
      { name: 'Present', value: 100 },
      { name: 'Absent', value: 0 },
    ];
    setAttendance(attendanceData);
  }, []);

  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch student data using the Roll number
    console.log("roll no is =" + RollNO);
    axios.get(`http://localhost:3006/api/data?RollNO=${RollNO}`)
      .then(response => {
        console.log(response.data); // Check the actual data structure
        setStudents(response.data);
      })
      .catch(error => {
        setError('Failed to fetch student data');
        console.error(error);
      });
  }, [RollNO]);
  


  const COLORS = ['#0088FE', '#FF8042'];  // Colors for the pie chart

  const renderStudentDetails = () => {
    return students.map((student) => (
      <div key={student.RollNO} className="student-detail">
        <div className="profile-section">
          {/* <img src="https://via.placeholder.com/150" alt={`${student.Stud_name} profile`} className="profile-pic" /> */}
          <div className="name-box">
            <h3>{student.Stud_name}</h3>
            <p>Roll No: {student.RollNO}</p>
            <p>Email: {student.Stud_Email}</p>
            <p>Section: {student.Section}</p>
          </div>
  

          {error && <p>{error}</p>}
        </div>
      </div>
    ));
  };
  

  const renderPieChart = () => {
    return (
      <div className="piechart">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={attendance} dataKey="value" cx="50%" cy="50%" outerRadius={80} label={(entry) => entry.name}>
              {attendance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="attendance-data">
          <h4>Attendance Details</h4>
          <ul>
            <li>Total lectures: 100</li>
            <li>Total absent: 0</li>
            <li>Total present: 100</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderTimetable = () => {
    return (
      <div className="timetable">
        <h4>Timetable</h4>
        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>From</th>
              <th>Till</th>
              <th>Subjects</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Period 1</td>
              <td>08:00</td>
              <td>09:00</td>
              <td>SS</td>
              <td>Sini</td>
            </tr>
            <tr>
              <td>Period 2</td>
              <td>09:00</td>
              <td>10:00</td>
              <td>SS</td>
              <td>Sini</td>
            </tr>
            <tr>
              <td>Period 3</td>
              <td>10:00</td>
              <td>11:00</td>
              <td>Science</td>
              <td>Biji</td>
            </tr>
            <tr>
              <td>Period 4</td>
              <td>11:00</td>
              <td>12:00</td>
              <td>Computer</td>
              <td>Siji</td>
            </tr>
            <tr>
              <td>Period 5</td>
              <td>01:00</td>
              <td>02:00</td>
              <td>Maths</td>
              <td>Benoy</td>
            </tr>
            <tr>
              <td>Period 6</td>
              <td>02:00</td>
              <td>03:00</td>
              <td>Maths</td>
              <td>Benoy</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li>Dashboard</li>
          <li>Attendance</li>
          <li>Timetable</li>
          <li>Marks</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-section">
          {renderStudentDetails()}
        </div>
        <div className="middle-section">
          <div className="pie-chart-section">
            {renderPieChart()}
          </div>
        </div>
        <div className="timetable-section">
          {renderTimetable()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;