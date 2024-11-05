import React from "react";
import "../index.css";
import "../assets/students.svg";
import Login from "./Login.jsx";
import Header from "../Student/Components/Header.jsx";


const Home = () => {
  return (
    <>
      

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
