import React from "react";

const EventTimeTable = ({ ttpass, handleLectureSelection, selectedLectures ,handleSelectAll}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selectedLectures.length === ttpass.length ? "Deselect All" : "Select All"}
                        />
                    </th>
                    <th>Period</th>
                    <th>From</th>
                    <th>Till</th>
                    <th>Subjects</th>
                    <th>Faculty</th>
                    <th>Room Number</th>
                </tr>
            </thead>
            <tbody>
                {ttpass.map((lecture) => (
                    <tr key={lecture.TimetableID}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedLectures.includes(lecture.TimetableID)}
                                onChange={() => handleLectureSelection(lecture.TimetableID)}
                            />
                        </td>
                        <td>Period {lecture.LectureNumber}</td>
                        <td>{lecture.StartTime}</td>
                        <td>{lecture.EndTime}</td>
                        <td>{lecture.SubjectName}</td>
                        <td>{lecture.Faculty_Name}</td>
                        <td>{lecture.RoomNumber}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EventTimeTable;
