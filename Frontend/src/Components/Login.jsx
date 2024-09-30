import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    event.preventDefault(); // Prevent form submission
  
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3006/api/login?LoginID=${username}&PasswordHash=${password}`);
      const result = await response.json();
      if (result.success) {
        // Assume the response includes the Roll number
        const RollNO = result.student.RollNO; // Make sure your API sends back the Roll number
        navigate(`/studentdashboard/${RollNO}`); // Pass the Roll number in the URL
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username"
          />
          {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
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
        <button id="loginbtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
