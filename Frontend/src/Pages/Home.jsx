import React from "react";
import "../index.css";
import "../assets/students.svg";
import Login from "../Components/Login.jsx";
import Header from "../Components/Header.jsx";

const Home = () => {
  return (
    <>
      <div className="main">
        <Header />

        <div className="container poppins-regular">

            <Login />
         
        </div>
      </div>
    </>
  );
};

export default Home;
