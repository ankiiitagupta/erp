import React from 'react'
import pieClip from '../assets/pieclip.png';



const AttendenceDetails = () => {
    return (
        <div className="attddetex">
            <div className="attbox">
                <div className="box">
                    <div className="attboxdata">

                        <img src={pieClip} alt="reload" className="attpie" />

                        <a href="" onClick={togglemyatt}><h4>My Attendance</h4></a>
                    </div>
                    <p>Students can view their attendance month-wise or cummulative</p>
                </div>
                <div className="box">
                    <div className="attboxdata">

                        <img src={pieClip} alt="reload" className="attpie" />

                        <a href=""><h4>My Daily Attendance</h4> </a>
                    </div>
                    <p>Students can view their daily attendance</p>
                </div>
            </div>
        </div>
    )
}

export default AttendenceDetails
