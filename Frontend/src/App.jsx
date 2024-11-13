
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import FacultyDashboard from './faculty/components/FacultyDashboard';
import StudentDashboard from './Student/Components/StudentDashboard';
import Profile from './Student/Components/Profile';
import Sidebar from './Student/Components/Sidebar';

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
          <Route path="/studentdashboard/:RollNO" element={<StudentDashboard />} />
          <Route path="/studentdashboard/:RollNO" element={<StudentDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



