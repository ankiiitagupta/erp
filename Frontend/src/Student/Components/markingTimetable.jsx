import React from 'react';



function MarkingTimeTable() {
  return (
    <div className="performance-container">
      <h4><b>Student Performance Record</b></h4>
      <table className="performance-table">
        <thead>
          <tr>
            <th rowSpan="2">SR NO.</th>
            <th rowSpan="2">SUBJECT NAME</th>
            <th rowSpan="2">ATTENDANCE (%)</th>
            <th colSpan="2">MID SEM 1</th>
            <th colSpan="2">MID SEM 2</th>
            <th colSpan="2">PUT</th>
            <th colSpan="5">ASSIGNMENTS</th>
          </tr>
          <tr>
            <th>OBTAIN MARKS</th>
            <th>MAX. MARKS</th>
            <th>OBTAIN MARKS</th>
            <th>MAX. MARKS</th>
            <th>OBTAIN MARKS</th>
            <th>MAX. MARKS</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mathematics</td>
            <td>85%</td>
            <td>30</td>
            <td>50</td>
            <td>28</td>
            <td>50</td>
            <td>40</td>
            <td>50</td>
            <td>9</td>
            <td>8</td>
            <td>10</td>
            <td>9</td>
            <td>7</td>
          </tr>
          {/* Add more rows as necessary */}
        </tbody>
      </table>
    </div>
  );
}

export default MarkingTimeTable;
