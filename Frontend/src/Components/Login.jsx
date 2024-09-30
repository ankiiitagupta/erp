import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import { API_URL } from '../axios.js'; 
=======
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
>>>>>>> Stashed changes

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
    // <div className="login-form">
    //   <form onSubmit={handleLogin}>
    //     <div className="form-group">
    //       <label htmlFor="username">Username</label>
    //       <input
    //         type="text"
    //         id="username"
    //         value={username}
    //         onChange={handleUsernameChange}
    //         placeholder="Enter username"
    //       />
    //       {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         placeholder="Enter password"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <button id="loginbtn" type="submit">
    //       Login
    //     </button>
    //   </form>
    // </div>
    <MDBContainer className="my-5 gradient-form poppins-regular">
      <MDBRow className="poppins-regular">

        <MDBCol col='6' className="mb-5 ">
          <div className="d-flex flex-column ms-5">

            <div className="text-center poppins-regular">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
            </div>

            <p>Please login to your account</p>


            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn outline className='mx-2' color='danger'>
                Danger
              </MDBBtn>
            </div>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-1
          
          0 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are more than just a company</h4>
              <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
