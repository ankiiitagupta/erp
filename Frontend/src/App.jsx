
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import FacultyDashboard from './faculty/components/facultyDashboard';
import TodaysAttendance from './faculty/components/TodaysAttendance';
import StudentDashboard from './Student/Components/StudentDashboard';


function App() {
  return (
    <>
      <BrowserRouter>
        {/* Sidebar will persist across all routes */}
        {/* <Sidebar /> */}
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Dashboards */}
          <Route path="/facultydashboard/:FacultyID" element={<FacultyDashboard />} />
          <Route path="/todaysattendance" element={<TodaysAttendance />} />
          <Route path="/studentdashboard/:RollNO" element={<StudentDashboard />} />
          <Route path="/studentdashboard/:RollNO" element={<StudentDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



