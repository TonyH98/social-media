import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import "./Home.css"

import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function Home({newLogin}){

    const [login, setLogin] = useState({
        email: '',
        password: '',
      });

      let navigate = useNavigate()


      const [type, setType]=useState('password');

      const handleTextChange = (event) => {
        setLogin({ ...login, [event.target.id]: event.target.value });
      };


      const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .post(`${API}/users/login`, login)
          .then((res) => {
            newLogin();
            window.localStorage.setItem(
              'user',
              JSON.stringify({ email: res.data.email, id: res.data.id })
            );
            navigate(`/profile/${res.data.id}`);
          })
          .catch((err) => {
           console.log(err)
          });
      };



      const handleType =() => {
        if(type === 'password'){
          setType('text')
        }
        else if (type === "text"){
          setType('password')
        }
      }




return(

    <div className='Home-Page'>
    

    <div className='app-blurb'>

    <h1>Join Us Today</h1>

    <p className='app-short'>
    Ignite conversations and amplify your 
    influence with Hermes - 
    the ultimate social media app 
    for sharing ideas and engaging discussions.
     Elevate your digital presence today.
    </p>

    </div>



    <form onSubmit={handleSubmit} className="login-form">
 
    <h1>Whats Happening Now</h1>
    <h3 className='login-h3'>Log Back In</h3>

    <div className='input-container'>
      <label htmlFor="email" className='label-signup'>Email:
      <input
        id="email"
        value={login.email}
        type="text"
        onChange={handleTextChange}
        className="input-login"
        required
      />
      </label>
  
      <label htmlFor="password" className='label-signup'>Password:
      <input
        id="password"
        type={type}
        required
        value={login.password}
        className="input-login"
        placeholder="******"
        onChange={handleTextChange}
      />
      </label>

    </div>
 

    <div className='show-password-container'>

      <input
      type="checkbox"
      onClick={handleType}
      />

      <span >{type === "password" ? "Show Password" : "Hide Password"}</span>

    </div>
    
    <button type='submit' className='login-submit'>Login</button>
   
   <div className='signup-option'>
    <p>Don't Have an Account</p>
    <Link to="/signup">
      <button className='registory-btn'>Sign Up</button>
    </Link>
   </div>

    </form>
  </div>

)

}


export default Home