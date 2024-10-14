import React from "react";
import "../index.css";
import "../assets/students.svg";
import Login from "../Components/Login.jsx";
import Header from "../Components/Header.jsx";
import AttendenceDetails from "../Components/AttendenceDetails.jsx";

const Home = () => {
  return (
    <>
      {/* <AttendenceDetails/> */}

      <div className="main">
      <Header />
        <div className="loginbox">
          
          <div className="container poppins-regular">
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
