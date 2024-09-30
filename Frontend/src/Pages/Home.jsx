import React from 'react';
import '../index.css';
import '../assets/students.svg';
import Login from '../Components/Login.jsx';
import Welcome from '../Components/Welcome';


const Home = () => {
  return (
    <>
    <div className="container poppins-regular">
      {/* <div className="intro">
        <Welcome/>
      </div> */}
      <div className="content">
        <Login/>
      </div>
      
      </div>
    </>
  )
}

export default Home

