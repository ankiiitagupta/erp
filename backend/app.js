const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3006; // Make sure to use the same port here

app.use(cors());

const db = mysql.createConnection({
  host: "mpgierp.c7iaoikio1yt.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: "mpgiroot",
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
          SELECT student.RollNO, 
            student.Stud_name,
            student.Stud_Gender, 
            student.Stud_DOB, 
            enrollment.EnrollmentID, 
            student.Section, 
            course.CourseName, 
            department.DepartmentName
      FROM student 
      JOIN enrollment ON student.RollNO = enrollment.RollNO
      JOIN course ON enrollment.CourseID = course.CourseID
      JOIN department ON course.DepartmentID = department.DepartmentID
      WHERE student.RollNO = ?;
      `, [RollNO], (err, results) => {
          if (err) throw err;
          res.json(results);
        });
});

//Total attendence of student
app.get("/api/totalattendence", (req, res) => {
  const { RollNO } = req.query;
  db.query("SELECT COUNT(LectureNumber) AS TotalLectures, SUM(CASE WHEN AttendanceStatus = 1 THEN 1 ELSE 0 END) AS PresentLectures FROM attendance WHERE RollNO = ? GROUP BY ?;", [RollNO, RollNO], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
//Per subject attendence
app.get("/api/subjectattendance", (req, res) => {
  const { RollNO } = req.query;

  // Update the SQL query to join with the Subject table and include SubjectName
  db.query(`
    SELECT 
      s.SubjectName,
      COUNT(a.LectureNumber) AS TotalLectures, 
      SUM(CASE WHEN a.AttendanceStatus = 1 THEN 1 ELSE 0 END) AS PresentLectures 
    FROM 
      attendance a
    JOIN 
      subject s ON a.SubjectID = s.SubjectID  
    WHERE 
      a.RollNO = ? 
    GROUP BY 
      s.SubjectName;
  `, [RollNO], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Time Table of current date
app.get("/api/todaystimetable", (req, res) => {
  const { RollNO } = req.query;
  const today = new Date();
  const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });
  const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  db.query(
    `SELECT DISTINCT t.TimetableID, t.SubjectID, s.SubjectName, f.Faculty_Name, t.DayOfWeek, t.StartTime, t.EndTime, t.RoomNumber, t.LectureNumber, s.SubjectID AS SubjectCode, 
       a.AttendanceStatus
    FROM student AS st
    JOIN enrollment AS e ON st.RollNO = e.RollNO
    JOIN course AS c ON e.CourseID = c.CourseID
    JOIN timetable AS t ON c.DepartmentID = t.DepartmentID
       AND t.YearOfStudy = st.Stud_YearOfStudy
       AND t.Section = st.Section
    JOIN subject AS s ON t.SubjectID = s.SubjectID
    JOIN faculty AS f ON s.FacultyID = f.FacultyID
    LEFT JOIN attendance AS a ON st.RollNO = a.RollNO 
       AND t.SubjectID = a.SubjectID 
       AND t.LectureNumber = a.LectureNumber 
       AND a.LectureDate = ?
    WHERE st.RollNO = ? 
    AND t.DayOfWeek = ?
    ORDER BY t.StartTime;`,
    [formattedDate, RollNO, dayOfWeek],
    (err, results) => {
      if (err) {
        res.status(500).send("Database query failed");
        return;
      }
      res.json(results);
    }
  );
});

//Time Table of current Week
app.get("/api/weekstimetable", (req, res) => {
  const { RollNO } = req.query;
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  db.query(
    `SELECT DISTINCT 
            t.TimetableID, 
            t.SubjectID, 
            s.SubjectName, 
            f.Faculty_Name, 
            t.DayOfWeek, 
            t.StartTime, 
            t.EndTime, 
            t.RoomNumber, 
            t.LectureNumber, 
            s.SubjectID AS SubjectCode,
            t.LectureDate  
        FROM 
            student AS st 
        JOIN 
            enrollment AS e ON st.RollNO = e.RollNO 
        JOIN 
            course AS c ON e.CourseID = c.CourseID 
        JOIN 
            timetable AS t ON c.DepartmentID = t.DepartmentID 
                          AND t.YearOfStudy = st.Stud_YearOfStudy 
                          AND t.Section = st.Section 
        JOIN 
            subject AS s ON t.SubjectID = s.SubjectID 
        JOIN 
            faculty AS f ON s.FacultyID = f.FacultyID  
        WHERE 
            st.RollNO = ? 
            AND t.LectureDate BETWEEN 
                DATE_SUB(?, INTERVAL WEEKDAY(?) DAY)  
                AND DATE_ADD(DATE_SUB(?, INTERVAL WEEKDAY(?) DAY), INTERVAL 6 DAY) 
        ORDER BY 
            t.LectureDate, t.StartTime;`,
    [RollNO, formattedDate, formattedDate, formattedDate, formattedDate],
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
