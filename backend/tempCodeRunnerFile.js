ON f.FacultyID = s.FacultyID
      JOIN course c ON c.CourseID = s.CourseID
      JOIN room r ON r.RoomID = tt.RoomID
      WHERE f.FacultyID = ?
      ORDER BY tt.LectureDate, tt.LectureNumber;
    `;