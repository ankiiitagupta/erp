const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const moment = require("moment");

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
  const isFaculty = LoginID.startsWith("f");
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
    t.LectureNumber;
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
            t.LectureDate, t.LectureNumber;`,
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
              AND t.LectureDate = ?  -- Replace with dynamic date input
            
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
      AND S2.RollNO != ?
      And S2.Section = S1.Section;
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

// Faculty Roles

// Extract FacultyID from the query parameter

app.get("/api/roles", (req, res) => {
  const { facultyID } = req.query;

  db.query(
    `
      
      SELECT 
      f.FacultyID, 
       r.role_ID,
      r.role_name
    FROM 
      faculty f
    JOIN 
      role_assignments ra ON f.FacultyID = ra.FacultyID
    JOIN 
      roles r ON ra.role_id = r.role_id
    WHERE 
      f.FacultyID = ?
  ;`,

    [facultyID],
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
    tt.Section, 
    tt.YearOfStudy, 
    tt.StartTime,
    tt.EndTime,
    tt.LectureDate, 
    tt.LectureNumber, 
    s.SubjectName, 
    c.CourseName,
    f.Faculty_Name, 
    f.faculty_alias,
    r.RoomName,
    DAYNAME(tt.LectureDate) AS DayOfWeek
FROM 
    timetable tt
JOIN 
    subject s ON s.SubjectID = tt.SubjectID
JOIN 
    faculty f ON f.FacultyID = s.FacultyID
JOIN 
    course c ON c.CourseID = s.CourseID
JOIN 
    room AS r ON tt.RoomID = r.RoomID  
WHERE 
    f.FacultyID = ?
    AND tt.LectureDate BETWEEN '2024-11-18' AND '2024-11-23'
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
        t.LectureNumber;

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

//on selection the lecture for marking attendance
app.get("/api/facultyondateselectionattendance", (req, res) => {
  const { facultyID, LectureDate } = req.query;

  // Check if LectureDate is provided and is a valid date
  if (!LectureDate || isNaN(Date.parse(LectureDate))) {
    return res.status(400).json({ error: "Invalid or missing LectureDate" });
  }

  // Ensure the LectureDate is in the correct format (YYYY-MM-DD)
  const formattedDate = new Date(LectureDate).toISOString().split("T")[0];

  // Query to get timetable details for the specific faculty
  const query = `
    SELECT DISTINCT
      s.SubjectName,
      c.CourseName,
     
      s.SubjectID,
      t.StartTime,
      t.EndTime,
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
      t.LectureNumber;
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
        res
          .status(500)
          .json({ error: "Failed to fetch students with attendance" });
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
      ${attendanceData
      .map(
        (item) =>
          `(${db.escape(item.studentID)}, ${db.escape(
            item.lectureDate
          )}, ${db.escape(item.lectureNumber)}, ${db.escape(
            item.status
          )}, ${db.escape(item.subjectID)}, ${db.escape(item.facultyID)})`
      )
      .join(", ")}
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

// Subjects taught by faculty
app.get("/api/subjectoffaculty", (req, res) => {
  const { facultyID } = req.query;

  db.query(
    `
        SELECT SubjectName from subject where FacultyID=?;
`,
    [facultyID],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Subjects and in sections taught by faculty
app.get("/api/subjectandsectionofaculty", (req, res) => {
  const { facultyID } = req.query;

  db.query(
    `
    SELECT 
    s.SubjectName, 
    st.Section
FROM 
    Subject s
JOIN 
    Enrollment e ON s.CourseID = e.CourseID
JOIN 
    Student st ON e.RollNO = st.RollNO
WHERE 
    s.FacultyID = ?  -- Pass FacultyID here
    AND (
        (st.Stud_YearOfStudy = 1 AND s.Semester IN (1, 2)) OR
        (st.Stud_YearOfStudy = 2 AND s.Semester IN (3, 4)) OR
        (st.Stud_YearOfStudy = 3 AND s.Semester IN (5, 6)) OR
        (st.Stud_YearOfStudy = 4 AND s.Semester IN (7, 8))
    )
GROUP BY 
    s.SubjectName, st.Section
ORDER BY 
    s.SubjectName, st.Section;


    `,
    [facultyID],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});




// list of students their section and the attendance of particaular subject
app.get("/api/listofstudentsandattendanceofsubject", (req, res) => {
  const { facultyID, SubjectName, Section } = req.query;

  db.query(
    `
    SELECT 
    st.Stud_name,
    st.RollNO,
    s.SubjectName,
    SUM(CASE WHEN at.AttendanceStatus = 1 THEN 1 ELSE 0 END) AS TotalPresent,
    SUM(CASE WHEN at.AttendanceStatus = 0 THEN 1 ELSE 0 END) AS TotalAbsent
    FROM 
        Faculty f
    JOIN 
        Subject s ON f.FacultyID = s.FacultyID
    JOIN 
        Enrollment e ON s.CourseID = e.CourseID
    JOIN 
        Student st ON st.RollNO = e.RollNO
    LEFT JOIN 
        Attendance at ON at.RollNO = st.RollNO 
                      AND at.SubjectID = s.SubjectID 
                      AND at.FacultyID = f.FacultyID
    WHERE 
        f.FacultyID = ?  -- Replace with the faculty you are targeting
        AND s.SubjectName = ?  -- Replace with the SubjectName you are targeting
        AND st.Section = ?  -- Replace with the section you are targeting
        AND CEIL(s.Semester / 2) = st.Stud_YearOfStudy  -- Match semester to year of study
    GROUP BY 
        st.Stud_name, st.RollNO, s.SubjectName
    ORDER BY 
        st.Stud_name;


    `,
    [facultyID, SubjectName, Section],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// get all course and duration
app.get("/api/courseandduration", (req, res) => {
  const { facultyID, SubjectName, Section } = req.query;

  db.query(
    `
    select CourseName,Duration from course;
    `,
    [facultyID, SubjectName, Section],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// get all course and duration
app.get("/api/courseandduration", (req, res) => {
  db.query(
    `
    select CourseName,Duration from course;
    `,
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// get all section of year
app.get("/api/getsectionsofYear", (req, res) => {
  const { yearofstudy } = req.query;

  db.query(
    `
    SELECT DISTINCT Section
    FROM Student
    WHERE Stud_YearOfStudy = ?;
    `,
    [yearofstudy],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});
// get all the attendance and list of students of a section
app.get("/api/attendanceofallstudentsofsection", (req, res) => {
  const { CourseName, yearofstudy, section } = req.query;

  db.query(
    `
        SELECT 
    S.RollNO,
    S.Stud_name,
    S.Stud_Email,
    S.Stud_Contact,
    S.Stud_YearOfStudy,
    S.Section,
    CO.CourseName,
    SUM(A.AttendanceStatus) AS TotalAttendance,
    COUNT(A.AttendanceStatus) AS TotalLectures,
    (SUM(A.AttendanceStatus) / COUNT(A.AttendanceStatus)) * 100 AS AttendancePercentage
    FROM 
        Student S
    JOIN 
        Enrollment E ON S.RollNO = E.RollNO
    JOIN 
        Course CO ON E.CourseID = CO.CourseID
    JOIN 
        Attendance A ON S.RollNO = A.RollNO
    WHERE 
        CO.CourseName = ?  -- Specify the course name if needed
        AND S.Stud_YearOfStudy = ? 
        AND S.Section = ?
    GROUP BY 
        S.RollNO;

    `,
    [CourseName, yearofstudy, section],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// This API fetches the students by name along with their attendance
app.get("/api/searchstudentsbyname", (req, res) => {
  const { query } = req.query; // Capture search input from the request query parameter

  db.query(
    `
    SELECT 
      S.RollNO,
      S.Stud_name,
      S.Stud_Contact,
      S.Stud_YearOfStudy,
      S.Section,
      CO.CourseName,
      SUM(A.AttendanceStatus) AS TotalAttendance,
      COUNT(A.AttendanceStatus) AS TotalLectures,
      (SUM(A.AttendanceStatus) / COUNT(A.AttendanceStatus)) * 100 AS AttendancePercentage
    FROM 
      Student S
    JOIN 
      Enrollment E ON S.RollNO = E.RollNO
    JOIN 
      Course CO ON E.CourseID = CO.CourseID
    LEFT JOIN 
      Attendance A ON S.RollNO = A.RollNO
    WHERE 
      S.Stud_name LIKE CONCAT( ?, '%')  -- Match partially with the name
    GROUP BY 
      S.RollNO, S.Stud_name, S.Stud_Email, S.Stud_Contact, S.Stud_YearOfStudy, S.Section, CO.CourseName
    ORDER BY 
      S.Stud_name ASC;
    `,
    [query],
    (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Server error" });
      }
      res.json(results); // Return matching results with attendance data
    }
  );
});

//get rooms
app.get("/api/rooms", (req, res) => {
  const query = "SELECT RoomName FROM room order by RoomDomain"; // Your SQL query to fetch room names

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching room data: ", err);
      return res.status(500).json({ error: "Failed to fetch room data" });
    }
    res.json(results);
  });
});

app.get("/api/facultyList", (req, res) => {
  const query = "SELECT FacultyID, Faculty_Name FROM Faculty;";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error faculty list data: ", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch faculty list data" });
    }
    res.json(results);
  });
});

app.get("/api/perdaytimetable", (req, res) => {
  const { FacultyID, startDate, endDate } = req.query;

  // Check for missing parameters
  if (!FacultyID || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // Format dates to YYYY-MM-DD
  const formattedStartDate = moment(startDate, [
    "YYYY-MM-DD",
    "DD-MM-YYYY",
  ]).format("YYYY-MM-DD");
  const formattedEndDate = moment(endDate, ["YYYY-MM-DD", "DD-MM-YYYY"]).format(
    "YYYY-MM-DD"
  );

  // SQL query
  const query = `
    SELECT DISTINCT
  s.SubjectName,
  c.CourseName,
  t.Section, 
  t.YearOfStudy,
  t.StartTime,
  t.EndTime,
  t.LectureNumber,
  t.DayOfWeek,
  DATE(t.LectureDate) AS LectureDate, -- Include the date in SELECT
  f.Faculty_Name, 
  f.faculty_alias,
  r.RoomName
FROM 
  timetable AS t
JOIN 
  subject AS s ON t.SubjectID = s.SubjectID
JOIN 
  course AS c ON t.CourseID = c.CourseID
JOIN 
  faculty AS f ON t.FacultyID = f.FacultyID
JOIN 
  room AS r ON t.RoomID = r.RoomID
WHERE 
  t.FacultyID = ?
  AND DATE(t.LectureDate) BETWEEN ? AND ?
ORDER BY 
  LectureDate,  -- Use the alias here
  t.LectureNumber;

  `;

  // Execute the query
  db.query(
    query,
    [FacultyID, formattedStartDate, formattedEndDate],
    (err, results) => {
      if (err) {
        console.error("Error fetching timetable:", err);
        return res.status(500).json({ error: "Error fetching timetable" });
      }

      results = results.map((row) => {
        row.LectureDate = moment(row.LectureDate).format("YYYY-MM-DD");
        return row;
      });
      res.json(results);

    }
  );
});

app.get("/api/allfacultyperdaytimetable", (req, res) => {
  const { inputDate } = req.query;

  // Check for missing parameters
  if (!inputDate) {
    return res.status(400).json({ error: "Missing required inputDate parameter" });
  }

  // Format date to YYYY-MM-DD
  const formattedInputDate = moment(inputDate, ["YYYY-MM-DD", "DD-MM-YYYY"]).format("YYYY-MM-DD");

  // SQL query
  const query = `
    SELECT 
      t.FacultyID,
      f.Faculty_Name,
      t.LectureDate,
      t.StartTime,
      t.EndTime,
      s.SubjectName
    FROM 
      Timetable t
    JOIN 
      Faculty f ON t.FacultyID = f.FacultyID
    JOIN 
      Subject s ON t.SubjectID = s.SubjectID
    WHERE 
      t.LectureDate = ?
    ORDER BY 
      t.FacultyID;
  `;

  // Execute the query
  db.query(query, [formattedInputDate], (err, results) => {
    if (err) {
      console.error("Error fetching timetable:", err);
      return res.status(500).json({ error: "Error fetching timetable" });
    }

    // Map results to format LectureDate
    const formattedResults = results.map((row) => ({
      ...row,
      LectureDate: moment(row.LectureDate).format("YYYY-MM-DD"),
    }));

    // Send response
    res.json(formattedResults);
  });
});

app.get('/api/student-one-data', (req, res) => {
  const { courseName, year, section } = req.query;

  // Check if all required query parameters are provided
  if (!courseName || !year || !section) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  // SQL query to fetch student details
  const query = `
    SELECT s.RollNO,s.stud_name
    FROM student s
    JOIN enrollment e ON s.RollNO = e.RollNO
    JOIN course c ON e.CourseID = c.CourseID
    WHERE c.CourseName = ? 
    AND s.Stud_YearOfStudy = ? 
    AND s.section = ?
    LIMIT 1;
  `;

  // Execute the query
  db.query(query, [courseName, year, section], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed', details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No student found' });
    }

    // Return the student details
    return res.status(200).json(results[0]);
  });
});


app.get("/api/student-interval-timetable", (req, res) => {
  const { RollNO, course, startDate, endDate, yearOfStudy, section } = req.query;

  // Ensure required fields are provided
  if (!RollNO || !course || !startDate || !endDate || !yearOfStudy || !section) {
    return res.status(400).send("All parameters (RollNO, course, startDate, endDate, yearOfStudy, section) are required.");
  }

  // Format the date string for consistency
  const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
  const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

  db.query(
    `SELECT 
        t.TimetableID,
        s.SubjectName, 
        f.Faculty_Name, 
        t.StartTime, 
        t.EndTime,
        t.LectureNumber,
        t.LectureDate,
        t.DayOfWeek,
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
        st.RollNO = ? 
        AND c.CourseName = ?  -- Filter by course name
        AND t.YearOfStudy = ?  -- Filter by yearOfStudy
        AND t.Section = ?  -- Filter by section
        AND t.LectureDate BETWEEN ? AND ?  -- Filter by the date range
    ORDER BY 
        t.LectureDate, t.LectureNumber;`,
    [RollNO, course, yearOfStudy, section, formattedStartDate, formattedEndDate],
    (err, results) => {
      if (err) {
        res.status(500).send("Database query failed");
        return;
      }
      res.json(results);
    }
  );
});

//get exams
app.get("/api/getexams", (req, res) => {
  const query = `
    SELECT DISTINCT 
    ExamType,
    TotalMarks
FROM
    exam
WHERE 
    ExamType NOT LIKE 'A%';`

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching exam data: ", err);
      return res.status(500).json({ error: "Failed to fetch exam data" });
    }
    res.json(results);
  });
});



// get the list of student's exam result to upload using section and subject
app.get("/api/listofstudentwithresultformarksupload", (req, res) => {
  const { facultyID, SubjectName, examType, section } = req.query;

  db.query(
    `
    SELECT 
    st.RollNO,
    st.Stud_name,
    st.Section,
    s.SubjectName,
    ex.ExamType,
    IFNULL(r.MarksObtained, 'N/A') AS MarksObtained,
    ex.TotalMarks
FROM 
    Faculty f
JOIN 
    Subject s ON f.FacultyID = s.FacultyID
JOIN 
    Enrollment e ON s.CourseID = e.CourseID
JOIN 
    Student st ON st.RollNO = e.RollNO
JOIN 
    Exam ex ON ex.SubjectID = s.SubjectID  -- Removed ex.FacultyID
LEFT JOIN 
    Result r ON r.StudentID = st.RollNO AND r.SubjectID = s.SubjectID AND r.ExamID = ex.ExamID
WHERE 
    f.FacultyID = ?  -- Replace with the target FacultyID
    AND s.SubjectName = ?  -- Replace with the target SubjectName
    AND ex.ExamType = ?  -- Replace with the target ExamType
    AND st.Section = ?  -- Replace with the target Section
    AND CEIL(s.Semester / 2) = st.Stud_YearOfStudy
ORDER BY 
    st.Stud_name;


    `,
    [facultyID, SubjectName, examType, section],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});


app.post("/api/uploadmarks", (req, res) => {
  const marksData = req.body; // Array of marks data from frontend

  let processedCount = 0; // Counter to track processed entries
  let isError = false;

  marksData.forEach((student) => {
    const { RollNO, SubjectName, ExamType, MarksObtained, ResultStatus } = student;

    let validMarks = null;
    if (MarksObtained !== 'N/A' && !isNaN(MarksObtained)) {
      validMarks = parseFloat(MarksObtained); // Convert to number
    }

    // Step 1: Find SubjectID
    const getSubjectQuery = `SELECT SubjectID FROM subject WHERE SubjectName = ?`;
    db.query(getSubjectQuery, [SubjectName], (err, subjectResult) => {
      if (err || subjectResult.length === 0) {
        console.error("Error fetching subject:", err || `Subject ${SubjectName} not found.`);
        isError = true;
        checkCompletion();
        return;
      }

      const SubjectID = subjectResult[0].SubjectID;

      // Step 2: Find ExamID
      const getExamQuery = `SELECT ExamID FROM exam WHERE ExamType = ? AND SubjectID = ?`;
      db.query(getExamQuery, [ExamType, SubjectID], (err, examResult) => {
        if (err || examResult.length === 0) {
          console.error("Error fetching exam:", err || `Exam type ${ExamType} not found.`);
          isError = true;
          checkCompletion();
          return;
        }

        const ExamID = examResult[0].ExamID;

        // Step 3: Check if result exists
        const checkResultQuery = `SELECT ResultID FROM result WHERE StudentID = ? AND SubjectID = ? AND ExamID = ?`;
        db.query(checkResultQuery, [RollNO, SubjectID, ExamID], (err, result) => {
          if (err) {
            console.error("Error checking result:", err);
            isError = true;
            checkCompletion();
            return;
          }

          if (result.length > 0) {
            // Step 4: Update existing result
            const updateResultQuery = `UPDATE result SET MarksObtained = ?, ResultStatus = ? WHERE ResultID = ?`;
            db.query(updateResultQuery, [validMarks, ResultStatus, result[0].ResultID], (err) => {
              if (err) {
                console.error("Error updating result:", err);
                isError = true;
              }
              checkCompletion();
            });
          } else {
            // Step 5: Insert new result
            const insertResultQuery = `INSERT INTO result (StudentID, SubjectID, ExamID, MarksObtained, ResultStatus) VALUES (?, ?, ?, ?, ?)`;
            db.query(insertResultQuery, [RollNO, SubjectID, ExamID, validMarks, ResultStatus], (err) => {
              if (err) {
                console.error("Error inserting result:", err);
                isError = true;
              }
              checkCompletion();
            });
          }
        });
      });
    });
  });

  function checkCompletion() {
    processedCount++;
    if (processedCount === marksData.length) {
      if (isError) {
        return res.status(500).json({ message: "Some errors occurred while processing marks." });
      }
      res.status(200).json({ message: "Marks processed successfully!" });
    }
  }
});



// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
