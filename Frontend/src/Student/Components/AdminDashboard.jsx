import React, { useState } from 'react';
import adminloginimg from '../assets/adminloginimg.gif';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Submit the form data to your backend
      console.log('Username:', username);
      console.log('Password:', password);
    };
  
    return (
      <div className="login-container poppins-regular">
        <div className="loginleft">
         <img src={adminloginimg} alt="login img" />
        </div>
        
  
      </div>
    );
}

export default AdminLogin