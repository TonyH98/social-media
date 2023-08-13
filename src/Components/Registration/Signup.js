import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function Signup(){

    const [type, setType]=useState('password');

    let navigate = useNavigate()

    const addUser = (newUser) => {
        axios
      .post(`${API}/users/signup`, newUser)
      .then(
        () => {
          navigate(`/login`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn('catch', c));
    }


    const [user, setUser] = useState({
       username: "",
       firstname: "",
       lastname: "",
       email: "",
       profile_img: "https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg",
       banner_img: "https://img.freepik.com/premium-photo/abstract-white-paper-background-texture-watercolor-marbled-painting-chalkboard_364465-65.jpg",
       DOB: "",
       bio: "I am",
       profile_name: "",
       password: ""
      });



      const handleTextChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value });
      };


      const handleSubmit = (event) => {
        event.preventDefault();
         addUser(user);
      };


      const handleType =() => {
        if(type === 'password'){
          setType('text')
        }
        else if (type === "text"){
          setType('password')
        }
      }

console.log(user)


      return(
        <div className="signup-section">
    
            
          <form onSubmit={handleSubmit} className="signup-form">
          <h1>Sign Up Form</h1>
            <label htmlFor="username" className='label-signup'>Username:</label>
            
            <input
              id="username"
              className='signup-input'
              value={user.username}
              type="text"
              onChange={handleTextChange}
              required
            />
          
           
            <label htmlFor="firstname" className='label-signup'>First Name:</label>
      
            <input
              id="firstname"
              className='signup-input'
              type="text"
              required
              value={user.firstname}
              onChange={handleTextChange}
            />
      
             <label htmlFor="lastname" className='label-signup'>Last Name:</label>
     
            <input
              id="lastname"
              type="text"
              className='signup-input'
              required
              value={user.lastname}
              onChange={handleTextChange}
            />
         
             <label htmlFor="email" className='label-signup'>Email:</label>
       
            <input
              id="email"
              type="email"
              className='signup-input'
              required
              value={user.email}
              onChange={handleTextChange}
            />
          <label htmlFor='DOB' className='label-signup'>Date of Birth:</label>
    
          <input
              id="DOB"
              type="date"
              className='signup-input'
              required
              value={user.DOB}
              onChange={handleTextChange}
            />


        <label htmlFor='profile_name' className='label-signup'>Profile Name:</label>
            
            <input
                id="profile_name"
                type="text"
                className='signup-input'
                required
                value={user.profile_name}
                onChange={handleTextChange}
            />
            
            <label htmlFor="password" className='label-signup'>Password:</label>
     
            <input
              id="password"
              className='signup-input'
              type={type}
              required
              value={user.password}
              placeholder="******"
              onChange={handleTextChange}
              />
              
          
    
            <input
            type="checkbox"
            onClick={handleType}
            />
            <span style={{color: "white"}}>{type === "password" ? "Show Password" : "Hide Password"} </span>
            <input type="submit" />
      
          <Link to="/login">
          <button className='sign-btn'>Sign In</button>
          </Link>
    
          </form>
        </div>
    )



}

export default Signup