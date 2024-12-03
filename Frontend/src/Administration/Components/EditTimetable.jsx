import React, { useState } from 'react';
import '../stylesheets/EditTimetable.css'; // Import CSS for styling

const EditTimetable = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCell, setSelectedCell] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Sample courses and timetable data
  const courses = ['B.Tech/1/A', 'B.Tech/1/B', 'BCA/1/A', 'BCA/2/B'];
  const timetableData = {
    'B.Tech/1/A': {
      Monday: Array(8).fill({
        lecture: 'No Lecture',
        subject: '',
        faculty: '',
        room: '',
      }),
      Tuesday: Array(8).fill({
        lecture: 'No Lecture',
        subject: '',
        faculty: '',
        room: '',
      }),
      Wednesday: Array(8).fill({
        lecture: 'No Lecture',
        subject: '',
        faculty: '',
        room: '',
      }),
      Thursday: Array(8).fill({
        lecture: 'No Lecture',
        subject: '',
        faculty: '',
        room: '',
      }),
      Friday: Array(8).fill({
        lecture: 'No Lecture',
        subject: '',
        faculty: '',
        room: '',
      }),
    },
    'B.Tech/1/B': {
      Monday: [
        { lecture: 'Maths', subject: 'MATH101', faculty: 'Dr. Smith', room: '101' },
        { lecture: 'Physics', subject: 'PHYS102', faculty: 'Dr. Doe', room: '102' },
        ...Array(6).fill({
          lecture: 'No Lecture',
          subject: '',
          faculty: '',
          room: '',
        }),
      ],
      Tuesday: Array(8).fill({
        lecture: 'No Lecture',
        subject: '',
        faculty: '',
        room: '',
      }),
    },
  };

  const [timetable, setTimetable] = useState({});

  const timeSlots = [
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
  ];

  const handleCourseChange = (e) => {
    const course = e.target.value;
    setSelectedCourse(course);
    setTimetable(timetableData[course]);
  };

  const handleCellClick = (day, timeSlotIndex) => {
    setSelectedCell({ day, timeSlotIndex });
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const lectureName = e.target.lectureName.value || 'No Lecture';
    const subject = e.target.subject.value || '';
    const faculty = e.target.faculty.value || '';
    const room = e.target.room.value || '';

    // Update timetable
    setTimetable((prev) => {
      const updated = { ...prev };
      updated[selectedCell.day][selectedCell.timeSlotIndex] = {
        lecture: lectureName,
        subject,
        faculty,
        room,
      };
      return updated;
    });

    setShowForm(false);
  };

  return (
    <div>
      <h2 className="edit-timetable-title">Edit Timetable</h2>

      {/* Dropdown to select course/section/year */}
      <div className="edit-timetable-dropdown">
        <label htmlFor="courseDropdown">Select Course/Section/Year:</label>
        <select
          id="courseDropdown"
          className="edit-timetable-select"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="" disabled>
            -- Select --
          </option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {/* Timetable Table */}
      {selectedCourse && (
        <div className="edit-timetable-container">
          <table className="edit-timetable-table">
            <thead>
              <tr>
                <th>DAY/TIME</th>
                {timeSlots.map((slot, index) => (
                  <th key={index}>{slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(timetable).map(([day, lectures], dayIndex) => (
                <tr key={dayIndex}>
                  <td className="edit-timetable-day">{day}</td>
                  {lectures.map((lectureData, timeSlotIndex) => (
                    <td
                      key={timeSlotIndex}
                      className="edit-timetable-cell"
                      onClick={() => handleCellClick(day, timeSlotIndex)}
                    >
                      <div>{lectureData.lecture}</div>
                      {lectureData.subject && <div>({lectureData.subject})</div>}
                      {lectureData.faculty && <div>{lectureData.faculty}</div>}
                      {lectureData.room && <div>{lectureData.room}</div>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Timetable Form */}
      {showForm && selectedCell && (
        <div className="edit-timetable-form-container">
          <h3 className="edit-timetable-form-title">
            Edit Timetable for {selectedCell.day} at {timeSlots[selectedCell.timeSlotIndex]}
          </h3>
          <form onSubmit={handleFormSubmit} className="edit-timetable-form">
            <div className="edit-timetable-form-group">
              <label>Lecture Name:</label>
              <input
                type="text"
                name="lectureName"
                className="edit-timetable-input"
                placeholder="Enter Lecture Name"
                defaultValue={
                  timetable[selectedCell.day][selectedCell.timeSlotIndex].lecture !== 'No Lecture'
                    ? timetable[selectedCell.day][selectedCell.timeSlotIndex].lecture
                    : ''
                }
              />
            </div>
            <div className="edit-timetable-form-group">
              <label>Subject/Code:</label>
              <input
                type="text"
                name="subject"
                className="edit-timetable-input"
                placeholder="Enter Subject/Code"
                defaultValue={
                  timetable[selectedCell.day][selectedCell.timeSlotIndex].subject
                }
              />
            </div>
            <div className="edit-timetable-form-group">
              <label>Faculty:</label>
              <input
                type="text"
                name="faculty"
                className="edit-timetable-input"
                placeholder="Enter Faculty Name"
                defaultValue={
                  timetable[selectedCell.day][selectedCell.timeSlotIndex].faculty
                }
              />
            </div>
            <div className="edit-timetable-form-group">
              <label>Room No.:</label>
              <input
                type="text"
                name="room"
                className="edit-timetable-input"
                placeholder="Enter Room No."
                defaultValue={
                  timetable[selectedCell.day][selectedCell.timeSlotIndex].room
                }
              />
            </div>
            <button type="submit" className="edit-timetable-submit-btn">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditTimetable;
