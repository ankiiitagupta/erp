import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import FacultyDashboard from './faculty/components/facultyDashboard';
import TodaysAttendance from './faculty/components/TodaysAttendance';
import StudentDashboard from './Student/Components/StudentDashboard';
import AdminDashboard from './Administration/Components/AdminDashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Optional Sidebar */}
        {/* <Sidebar /> */}

        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Dashboards */}
          <Route path="/facultydashboard/:FacultyID" element={<FacultyDashboard />} />
          <Route path="/todaysattendance" element={<TodaysAttendance />} />
          <Route path="/AdminDashboard/:admin_id" element={<AdminDashboard />} />
          <Route path="/studentdashboard/:RollNO" element={<StudentDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
