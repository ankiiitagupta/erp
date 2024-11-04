import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import { API_URL } from '../../axios.js';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value.trim());
    setError(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault(); 
  
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/api/login?LoginID=${username}&PasswordHash=${password}`);
      const result = await response.json();
      if (result.success) {
        
        const RollNO = result.student.RollNO; 
        navigate(`/studentdashboard/${RollNO}`); 
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <MDBContainer className="main">
      <MDBRow className="login-container">
        <MDBCol col='12'>
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <h4 className="mt-1 mb-5 pb-2">Welcome to MPGI</h4>
            </div>

            <p>Please login to your account</p>

            <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value={username} onChange={handleUsernameChange} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p style={{color: 'red'}}>{error}</p>}

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleLogin}>Login</MDBBtn>
              
            </div>

           
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
