import React, { useState } from 'react';
import studentloginimg from '../assets/studentloginimg.gif';
import { useNavigate} from 'react-router-dom';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [focused, setFocused] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to your backend
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value.trim());
    setError(null); 
  };

  const handleButtonClick = (event, buttonType) => {
    setFocused(true);
    setActiveButton(buttonType);
    let prefix;
    switch (buttonType) {
      case 'Admin':
        prefix = 'AD';
        break;
      case 'Faculty':
        prefix = 'FAC';
        break;
      case 'Student':
        prefix = 'ST';
        break;
      default:
        prefix = '';
    }
    if (username.startsWith(prefix)) {
      // Login logic here
      if (buttonType === 'Admin') {
        if (username === 'AD123' && password === 'admin123') {
          navigate('/admindashboard');
        } else {
          setError('Invalid username or password');
        }
      } else if (buttonType === 'Faculty') {
        if (username === 'FAC123' && password === 'faculty123') {
          navigate('/facultydashboard');
        } else {
          setError('Invalid username or password');
        }
      } else if (buttonType === 'Student') {
        if (username === 'ST123' && password === 'student123') {
          navigate('/studentdashboard');
        } else {
          setError('Invalid username or password');
        }
      }
    } else {
      setError(`Invalid username. Please enter a username starting with ${prefix}.`);
    }
  };

  const handleLogin = () => {
    handleButtonClick(null, activeButton);
  };

  return (
  
      <div className="login-form">
        
      <form onSubmit={handleSubmit}>
        <div className="profilebtn">
            <button className="fbtn" 
             onClick={(event) => handleButtonClick(event, 'Admin')}
             style={{
               textDecoration: activeButton === 'Admin' ? 'underline' : 'none',
             }}>Admin</button>
            <button className="fbtn" onClick={(event) => handleButtonClick(event, 'Faculty')}
            style={{
              textDecoration: activeButton === 'Faculty' ? 'underline' : 'none',
            }}>Faculty</button>
            <button className="fbtn" onClick={(event) => handleButtonClick(event, 'Student')}
            style={{
              textDecoration: activeButton === 'Student' ? 'underline' : 'none',
            }}>Student</button>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username"
        
          />
           {error && (
            <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="loginbtn" type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    

    </div>
    
  );
}

export default Login;