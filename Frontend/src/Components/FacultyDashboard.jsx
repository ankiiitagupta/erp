import React,{useState} from 'react'
import facultyloginimg from '../assets/facultyloginimg.gif';

const FacultyLogin = () => {
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
         <img id="facultyloginimg" src={facultyloginimg} alt="login img" />
        </div>
        
  
      </div>
    );
}

export default FacultyLogin