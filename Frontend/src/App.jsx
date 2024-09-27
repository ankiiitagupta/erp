import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
// import SelectProfile from './Components/SelectProfile';
import Login from './Components/Login.jsx';
import AdminDashboard from './Components/AdminDashboard.jsx';
import FacultyDashboard from './Components/FacultyDashboard.jsx';
import Header from './Components/Header.jsx';
import StudentDashboard from './Components/StudentDashboard.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>

        <Route path="/admindashboard" element={<AdminDashboard/>}></Route>
        <Route path="/facultydashboard" element={<FacultyDashboard/>}></Route>
        <Route path="/studentdashboard/:RollNO" element={<StudentDashboard/>}></Route>
      </Routes>
    
    </BrowserRouter>
      
      {/* <Login/> */}
    </>
  )
}

export default App
