
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import FacultyDashboard from './faculty/components/FacultyDashboard';
import StudentDashboard from './Student/Components/StudentDashboard';
import Form from './Student/Components/Form';
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

          {/* Form Page (Profile Page) */}
          <Route path="/profile" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



