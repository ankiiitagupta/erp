const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3006; // Make sure to use the same port here

app.use(cors());
app.use(express.json()); 

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
//Login
app.get("/api/login", (req, res) => {
  const { LoginID, PasswordHash } = req.query;
  const isFaculty = LoginID.startsWith("f1");
  const isStudent = LoginID.startsWith("al");

  if (isFaculty) {
    db.query(
      "SELECT * FROM faculty WHERE LoginID = ? AND PasswordHash = ?",
      [LoginID, PasswordHash],
      (err, results) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, error: "Server error" });
        }
        if (results.length > 0) {
          res.json({ success: true, userType: "faculty", faculty: results[0] });
        } else {
          res.json({ success: false });
        }
      }
    );
  } else if (isStudent) {
    db.query(
      "SELECT * FROM student WHERE LoginID = ? AND PasswordHash = ?",
      [LoginID, PasswordHash],
      (err, results) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, error: "Server error" });
        }
        if (results.length > 0) {
          res.json({ success: true, userType: "student", student: results[0] });
        } else {
          res.json({ success: false });
        }
      }
    );
  } else {
    res.json({ success: false, error: "Invalid LoginID prefix" });
  }
});

//Student data
app.get("/api/data", (req, res) => {
  const { RollNO } = req.query;
  db.query(
    `
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
      `,
    [RollNO],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

//Api for Subject of a Student
app.get("/api/subjectofStud", (req, res) => {
  const { RollNO } = req.query;
  db.query(
    `
          SELECT s.RollNO, subj.SubjectName
            FROM student s
            JOIN enrollment e ON s.RollNO = e.RollNO
            JOIN course c ON e.CourseID = c.CourseID
            JOIN subject subj ON c.CourseID = subj.CourseID
            WHERE s.RollNO = ?;

      `,
    [RollNO],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

//Total attendence of student
app.get("/api/totalattendence", (req, res) => {
  const { RollNO } = req.query;
  db.query(
    "SELECT COUNT(LectureNumber) AS TotalLectures, SUM(CASE WHEN AttendanceStatus = 1 THEN 1 ELSE 0 END) AS PresentLectures FROM attendance WHERE RollNO = ? GROUP BY ?;",
    [RollNO, RollNO],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});
//Per subject attendence
app.get("/api/subjectattendance", (req, res) => {
  const { RollNO } = req.query;

  // Update the SQL query to join with the Subject table and include SubjectName
  db.query(
    `
    SELECT z
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
  `,
    [RollNO],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

//Time Table of current date
app.get("/api/todaystimetable", (req, res) => {
  const { RollNO } = req.query;
  const today = new Date();
  const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });
  const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  db.query(
    `SELECT 
    t.TimetableID,
    s.SubjectName, 
    f.Faculty_Name, 
    t.StartTime, 
    t.EndTime, 
    t.RoomNumber, 
    t.LectureNumber,
    COALESCE(a.AttendanceStatus, 'Not Marked') AS AttendanceStatus  -- If no attendance is marked, show 'Not Marked'
FROM 
    student AS st
JOIN 
    enrollment AS e ON st.RollNO = e.RollNO
JOIN 
    course AS c ON e.CourseID = c.CourseID
JOIN 
    timetable AS t ON t.CourseID = c.CourseID
        AND t.YearOfStudy = st.Stud_YearOfStudy
        AND t.Section = st.Section
        AND t.DepartmentID = c.DepartmentID
LEFT JOIN 
    subject AS s ON t.SubjectID = s.SubjectID
LEFT JOIN 
    faculty AS f ON s.FacultyID = f.FacultyID
LEFT JOIN 
    attendance AS a ON a.RollNo = st.RollNO
        AND a.LectureNumber = t.LectureNumber
        AND a.LectureDate = t.LectureDate
WHERE 
    st.RollNO = ?  -- Replace with dynamic input from API
    AND t.LectureDate = CURDATE()  -- Replace with dynamic date input
   
ORDER BY 
    t.StartTime;
`,
    [RollNO, formattedDate],
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
  const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

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
            s.SubjectID AS SubcdjectCode,
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

// Timetable and attendance of a student for a specific date
app.get("/api/timetablebydate", (req, res) => {
  const { RollNO, LectureDate } = req.query;

  db.query(
    ` 
          SELECT 
              t.TimetableID, 
              t.SubjectID, 
              s.SubjectName, 
              f.Faculty_Name, 
              t.DayOfWeek, 
              t.StartTime, 
              t.EndTime, 
              t.RoomNumber, 
              t.LectureNumber, 
              t.LectureDate,
              s.SubjectID AS SubjectCode, 
              a.AttendanceStatus
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
          LEFT JOIN 
              attendance AS a ON st.RollNO = a.RollNO 
                AND t.SubjectID = a.SubjectID 
                AND t.LectureNumber = a.LectureNumber 
                AND t.LectureDate = a.LectureDate  -- Ensure the date matches the attendance record
          WHERE 
              st.RollNO = ? 
              AND t.LectureDate = ?  
          ORDER BY 
              t.StartTime;`,
    [RollNO, LectureDate],
    (err, results) => {
      if (err) {
        res.status(500).send("Database query failed");
        return;
      }
      res.json(results);
    }
  );
});

//fetechs the student attendence by subject and month and if 0 then for all month
app.get("/api/attendencebymonthforsub", (req, res) => {
  const { RollNO, MonthNumber, SubjectName } = req.query;

  let monthCondition = "";
  let queryParams = [RollNO, SubjectName];

  // Add the month condition if MonthNumber is not 0
  if (MonthNumber != 0) {
    monthCondition = "AND MONTH(t.LectureDate) = ?";
    queryParams.push(MonthNumber);
  }

  const query = `
        SELECT 
            s.SubjectName, 
            MONTH(t.LectureDate) AS MonthNumber,  
            COUNT(*) AS TotalLectures,  
            SUM(CASE WHEN a.AttendanceStatus = 1 THEN 1 ELSE 0 END) AS TotalPresent  
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
        LEFT JOIN 
            attendance AS a ON st.RollNO = a.RollNO 
              AND t.SubjectID = a.SubjectID 
              AND t.LectureNumber = a.LectureNumber 
              AND t.LectureDate = a.LectureDate
        WHERE 
            st.RollNO = ? 
            AND s.SubjectName = ?
            ${monthCondition}   -- Month filter will be applied only if MonthNumber is not 0
        GROUP BY 
            MONTH(t.LectureDate)  
        ORDER BY 
            s.SubjectName, 
            MonthNumber;
  `;

  db.query(query, queryParams, (err, results) => {
    if (err) {
      res.status(500).send("Database query failed");
      return;
    }
    res.json(results);
  });
});



// Student Performance Record
app.get("/api/studentperformancerecord", (req, res) => {
  const { RollNO } = req.query;

  db.query(
    `
          SELECT 
          result.ResultID,
          result.StudentID AS RollNo,
          result.SubjectID,
          subject.SubjectName,  -- Include the subject name
          exam.ExamType,
          exam.ExamDate,
          exam.TotalMarks,
          result.MarksObtained,
          result.ResultStatus
      FROM 
          result
      JOIN 
          exam ON result.ExamID = exam.ExamID
      JOIN 
          subject ON result.SubjectID = subject.SubjectID  -- Join with the subject table
      WHERE 
          result.StudentID = ?;
`,
    [RollNO],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});



// Subjects and SubjectId of student
app.get("/api/subjectandsubjectidofstud", (req, res) => {
  const { RollNO } = req.query;

  db.query(
    `
        SELECT 
        s.SubjectID,
        s.SubjectName 
    FROM 
        Enrollment e
    JOIN 
        Subject s ON e.CourseID = s.CourseID
    WHERE 
        e.RollNO = ?;
`,
    [RollNO],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Faculties of the student
app.get("/api/facultyofstudent", (req, res) => {
  const { RollNO } = req.query;

  db.query(
    `
         SELECT 
    s.SubjectName,
    f.Faculty_Name
    FROM 
        Enrollment e
    JOIN 
        Subject s ON e.CourseID = s.CourseID
    JOIN 
        Faculty f ON s.FacultyID = f.FacultyID
    WHERE 
        e.RollNO = ?;
`,
    [RollNO],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Batchmate of the student
app.get("/api/batchmateofstud", (req, res) => {
  const { RollNO } = req.query;

  db.query(
    `
       SELECT S2.Stud_name AS BatchmateName, S2.RollNO 
      FROM student S1
      JOIN student S2 ON S1.Stud_YearOfStudy = S2.Stud_YearOfStudy
      WHERE S1.RollNO = ? 
      AND S2.RollNO != ?;
`,
    [RollNO, RollNO],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});




/*
 * ********************************************************************
 *                             Faculty                            *
 * ********************************************************************/


// Employee Detail api

app.get("/api/EmployeeDetails", (req, res) => {
  const { FacultyID } = req.query;
  db.query(
    `
                SELECT 
            faculty.FacultyID, 
            faculty.Faculty_Name, 
            faculty.Faculty_Email,
            faculty.Faculty_Contact, 
            faculty.Faculty_Salary,
            faculty.Faculty_JoiningDate,
            faculty.Faculty_EmployeeStatus,
            department.DepartmentName,  
            faculty.Faculty_Designation
        FROM 
            faculty
        JOIN 
            department ON faculty.Faculty_DepartmentID = department.DepartmentID
        WHERE 
            faculty.FacultyID = ?;  

      `,
    [FacultyID],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});


// Faculty Timetable

app.get("/api/facultytimetable", (req, res) => {
  const { facultyID } = req.query;

  // Query to get timetable details for the specific faculty
  const query = `
 SELECT 
    tt.LectureDate, 
    tt.LectureNumber, 
    s.SubjectName, 
    c.CourseName AS ClassName, 
    tt.RoomNumber, 
    DAYNAME(tt.LectureDate) AS DayOfWeek
FROM 
    timetable tt
JOIN 
    subject s ON s.SubjectID = tt.SubjectID
JOIN 
    faculty f ON f.FacultyID = s.FacultyID
JOIN 
    course c ON c.CourseID = s.CourseID
WHERE 
    f.FacultyID = 1
ORDER BY 
    tt.LectureDate, tt.LectureNumber;

`;

  db.query(query, [facultyID], (err, results) => {
    if (err) {
      console.error("Error fetching timetable data:", err);
      return res.status(500).json({ error: "Failed to fetch timetable data" });
    }

    // Send the timetable data to the frontend
    res.json(results);
  });
});

// Faculty Todays Timetable
app.get("/api/facultytodaystimetable", (req, res) => {
  const { facultyID } = req.query;

  // Query to get timetable details for the specific faculty
  const query = `
        SELECT DISTINCT
        t.TimetableID,
        s.SubjectName,
        c.CourseName, 
        t.StartTime,
        t.EndTime,
        t.RoomNumber,
        t.LectureNumber,
        t.DayOfWeek,
        t.LectureDate
    FROM 
        timetable AS t
    JOIN 
        subject AS s ON t.SubjectID = s.SubjectID
    JOIN 
        course AS c ON t.CourseID = c.CourseID  -- Join with the course table
    JOIN 
        student AS st ON st.Section = t.Section -- Join with the student table to get the section
    WHERE 
        t.FacultyID = ? -- Replace with the FacultyID of the desired faculty
        AND t.LectureDate = CURDATE() -- Filters for today’s date
    ORDER BY 
        t.StartTime;

        `;

  db.query(query, [facultyID], (err, results) => {
    if (err) {
      console.error("Error fetching timetable data:", err);
      return res.status(500).json({ error: "Failed to fetch timetable data" });
    }

    // Send the timetable data to the frontend
    res.json(results);
  });
});

//on selection the lecture
app.get("/api/facultyondateselectionattendance", (req, res) => {
  const { facultyID, LectureDate } = req.query;

  // Check if LectureDate is provided and is a valid date
  if (!LectureDate || isNaN(Date.parse(LectureDate))) {
    return res.status(400).json({ error: "Invalid or missing LectureDate" });
  }

  // Ensure the LectureDate is in the correct format (YYYY-MM-DD)
  const formattedDate = new Date(LectureDate).toISOString().split('T')[0];

  // Query to get timetable details for the specific faculty
  const query = `
    SELECT DISTINCT
      s.SubjectName,
      c.CourseName, 
      s.SubjectID,
      t.StartTime,
      t.EndTime,
      t.RoomNumber,
      t.LectureNumber,
      t.DayOfWeek
    FROM 
      timetable AS t
    JOIN 
      subject AS s ON t.SubjectID = s.SubjectID
    JOIN 
      course AS c ON t.CourseID = c.CourseID  -- Join with the course table
    JOIN 
      student AS st ON st.Section = t.Section -- Join with the student table to get the section
    WHERE 
      t.FacultyID = ? 
      AND t.LectureDate = ? -- Filters for the selected date
    ORDER BY 
      t.StartTime;
  `;

  db.query(query, [facultyID, formattedDate], (err, results) => {
    if (err) {
      console.error("Error fetching timetable data:", err);
      return res.status(500).json({ error: "Failed to fetch timetable data" });
    }

    // Send the timetable data to the frontend
    res.json(results);
  });
});

// Get students of the faculty on a selected date for attendance with their attendance status
app.get("/api/getstudentsoflectureondate", (req, res) => {
  const { facultyID, LectureDate, LectureNumber } = req.query;

  db.query(
    `
      SELECT 
        st.RollNO, 
        st.Stud_name, 
        COALESCE(a.AttendanceStatus, 'not marked') AS AttendanceStatus
      FROM 
        student AS st
      JOIN 
        timetable AS t 
        ON st.Section = t.Section
      LEFT JOIN 
        attendance AS a 
        ON st.RollNO = a.RollNO 
        AND t.LectureDate = a.LectureDate 
        AND t.LectureNumber = a.LectureNumber
      WHERE 
        t.FacultyID = ?
        AND t.LectureDate = ?
        AND t.LectureNumber = ?
      ORDER BY 
        st.RollNO;
    `,
    [facultyID, LectureDate, LectureNumber],
    (err, results) => {
      if (err) {
        console.error("Error fetching students with attendance:", err);
        res.status(500).json({ error: "Failed to fetch students with attendance" });
        return;
      }
      res.json(results);
    }
  );
});


// Update the attendance
app.post("/api/markattendance", (req, res) => {
  const { attendanceData } = req.body;

  if (!attendanceData || !Array.isArray(attendanceData)) {
    return res.status(400).json({ error: "Invalid attendance data" });
  }

  // Prepare the query to update attendance for all students
  const query = `
    INSERT INTO attendance (RollNO, LectureDate, LectureNumber, AttendanceStatus, SubjectID, FacultyID)
    VALUES
      ${attendanceData.map((item) => 
        `(${db.escape(item.studentID)}, ${db.escape(item.lectureDate)}, ${db.escape(item.lectureNumber)}, ${db.escape(item.status)}, ${db.escape(item.subjectID)}, ${db.escape(item.facultyID)})`
      ).join(', ')}
    AS attendance_data
    ON DUPLICATE KEY UPDATE 
      AttendanceStatus = attendance_data.AttendanceStatus
  `;

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error updating attendance:", err);
      return res.status(500).json({ error: "Failed to mark attendance" });
    }

    res.json({ message: "Attendance updated successfully" });
  });
});






// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
