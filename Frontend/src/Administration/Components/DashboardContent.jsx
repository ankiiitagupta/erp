import React, { useState ,useEffect} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../stylesheets/DashboardContent.css"; // CSS for the new component

const DashboardContent = () => {
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const [value, onChange] = useState(new Date());
  // State for total counts
  const [studentCount, setStudentCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);

  const dataCounts = [
    { label: "Faculty", count: facultyCount },
    { label: "Students", count: studentCount },
    { label: "Admins", count: adminCount },
    { label: "Departments", count: departmentCount },
  ];

  const notices = [
    { title: "Exam Schedule Released", details: "Details about exams." },
    { title: "Holiday Announcement", details: "Details about holidays." },
  ];

  const [faculty, setFaculty] = useState([
    { name: "John Doe", department: "BTech", subject: "DSA" },
    { name: "Jane Smith", department: "BTech", subject: "DSA" },
    { name: "Michael Brown", department: "BTech", subject: "DSA" },
    { name: "Sara White", department: "BTech", subject: "DSA" },
  ]);

  const students = [
    { name: "Alice Green", course: "Btech", Phone: "1223456" },
    { name: "Bob Blue", course: "Btech", Phone: "1223456" },
    { name: "Charlie Red", course: "BBA", Phone: "1223456" },
    { name: "David Yellow", course: "MBA", Phone: "1223456" },
    { name: "Eva Black", course: "BCA", Phone: "1223456" },
    { name: "Frank White", course: "BBA", Phone: "1223456" },
  ];

  const addFaculty = (newFaculty) => {
    setFaculty((prevFaculty) => [...prevFaculty, newFaculty]);
  };

  const handleLogout = () => {
    // Add your logout logic here
    alert("Logged out!");
  };

  // Group students by course
  const groupStudentsByCourse = () => {
    return students.reduce((groups, student) => {
      const { course } = student;
      if (!groups[course]) {
        groups[course] = [];
      }
      groups[course].push(student);
      return groups;
    }, {});
  };

  const groupedStudents = groupStudentsByCourse();
  
  const fetchCounts = async () => {
    try {
      const studentResponse = await fetch("http://localhost:3006/api/studentCount");
      const facultyResponse = await fetch("http://localhost:3006/api/facultyCount");
      const adminResponse = await fetch("http://localhost:3006/api/adminCount");
      const departmentResponse = await fetch("http://localhost:3006/api/departmentCount");
      if (studentResponse.ok) {
        const studentData = await studentResponse.json();
        setStudentCount(studentData.totalstudents);
      } else {
        console.error("Failed to fetch student count");
      }

      if (facultyResponse.ok) {
        const facultyData = await facultyResponse.json();
        setFacultyCount(facultyData.totalfaculties);
      } else {
        console.error("Failed to fetch faculty count");
      }
      if (adminResponse.ok) {
        const adminData = await adminResponse.json();
        setAdminCount(adminData.totaladmins);
      } else {
        console.error("Failed to fetch admin count");
      }
      if (departmentResponse.ok) {
        const departmentData = await departmentResponse.json();
        setDepartmentCount(departmentData.totaldepartment);
      } else {
        console.error("Failed to fetch department count");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Call fetchCounts when component mounts
  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Welcome to Admin Dashboard</h1>

        {/* Logout Icon */}
        <div className="logout-container" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt logout-icon"></i>
        </div>
      </div>

      {/* Data Cards */}
      <div className="data-cards">
        {dataCounts.map((item, index) => (
          <div key={index} className="data-card">
            <div className="data-icon">{item.label.charAt(0)}</div>
            <div className="data-info">
              <h2>{item.label}</h2>
              <p>{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Calendar */}
        

        {/* Notices */}
        <div className="notices-container">
          <div className="notices-header">
            {open && (
              <span className="back-button" onClick={() => setOpen(false)}>
                ↩ Back
              </span>
            )}
            <h1>Notices</h1>
          </div>
          <div className="notices-content">
            {!open ? (
              notices.map((notice, idx) => (
                <div
                  key={idx}
                  className="notice-item"
                  onClick={() => {
                    setOpen(true);
                    setOpenNotice(notice);
                  }}
                >
                  <h2>{notice.title}</h2>
                </div>
              ))
            ) : (
              <div className="notice-details">
                <h2>{openNotice.title}</h2>
                <p>{openNotice.details}</p>
              </div>
            )}
          </div>
        </div>

        {/* Faculty and Students Sections */}
        <div className="faculty-students-wrapper">
          {/* Faculty Section */}
          <div className="faculty-section">
            <h2>Faculty</h2>
            <ul className="faculty-list">
              {faculty.map((member, idx) => (
                <li key={idx} className="faculty-item">
                  <p>{member.name} </p>
                  <p> {member.department}</p>
                 
                </li>
              ))}
            </ul>
          </div>

          {/* Students Section */}
          <div className="students-section">
            <h2>Students</h2>
            {Object.keys(groupedStudents).map((course, idx) => (
              <div key={idx} className="course-section">
                <h3>{course}</h3>
                <ul className="students-list">
                  {groupedStudents[course].map((student, idx) => (
                    <li key={idx} className="student-item">
                      <p>{student.name}</p>
                      <p>{student.course}</p>
                      <p>{student.Phone}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="calendar-container">
          <h1>Academic Calendar</h1>
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
