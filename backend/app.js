const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3006; // Make sure to use the same port here

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "erp",
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
    return;
  }
  console.log("Connected to MySQL DB");
});
//login Login
app.get("/api/login", (req, res) => {
  const { LoginID, PasswordHash } = req.query;
  db.query("SELECT * FROM student WHERE LoginID = ? AND PasswordHash = ?", [LoginID, PasswordHash], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, student: results[0] });
    } else {
      res.json({ success: false });
    }
  });
});

//Student data
app.get("/api/data", (req, res) => {
  const { RollNO } = req.query;
  db.query(`
    SELECT student.RollNo, 
       student.Stud_name,
       student.Stud_Gender, 
       student.Stud_DOB, 
       enrollment.EnrollmentID, 
       student.Section, 
       course.CourseName, 
       department.DepartmentName
FROM student 
JOIN enrollment ON student.RollNo = enrollment.RollNo
JOIN course ON enrollment.CourseID = course.CourseID
JOIN department ON course.DepartmentID = department.DepartmentID
WHERE student.RollNo = 2;
`, [RollNO], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Total attendence of student
app.get("/api/totalattendence", (req, res) => {
  const { RollNO } = req.query;
  db.query("SELECT COUNT(LectureNumber) AS TotalLectures, SUM(CASE WHEN AttendanceStatus = 1 THEN 1 ELSE 0 END) AS PresentLectures FROM Attendance WHERE RollNO = ? GROUP BY ?;", [RollNO, RollNO], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Time Table of current date
app.get("/api/todaystimetable", (req, res) => {
  const { RollNO } = req.query;
  const today = new Date();
  const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });

  db.query(
    `SELECT DISTINCT t.TimetableID, t.SubjectID, s.SubjectName, f.Faculty_Name, t.DayOfWeek, t.StartTime, t.EndTime, t.RoomNumber, t.LectureNumber, s.SubjectID AS SubjectCode 
     FROM Student AS st 
     JOIN Enrollment AS e ON st.RollNO = e.RollNO 
     JOIN Course AS c ON e.CourseID = c.CourseID 
     JOIN Timetable AS t ON c.DepartmentID = t.DepartmentID 
        AND t.YearOfStudy = st.Stud_YearOfStudy 
        AND t.Section = st.Section 
     JOIN Subject AS s ON t.SubjectID = s.SubjectID 
     JOIN Faculty AS f ON s.FacultyID = f.FacultyID 
     WHERE st.RollNO = ? AND t.DayOfWeek = ? 
     ORDER BY t.StartTime;`,
    [RollNO, dayOfWeek],
    (err, results) => {
      if (err) {
        res.status(500).send("Database query failed");
        return;
      }
      res.json(results);
    }
  );
});




// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
