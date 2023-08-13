import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';


import axios from 'axios';

const API = process.env.REACT_APP_API_URL;


function Login({ newLogin }){

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
            navigate("/");
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

      return (
        <div className='login-form-container'>
          
          <form onSubmit={handleSubmit} className="login-form">
       
          <h1>Login</h1>
            <label htmlFor="email" className='label-signup'>Email:</label>
        
            <input
              id="email"
              value={login.email}
              type="text"
              onChange={handleTextChange}
              required
            />
          
            <label htmlFor="password" className='label-signup'>Password:</label>
       
            <input
              id="password"
              type={type}
              required
              value={login.password}
              placeholder="******"
              onChange={handleTextChange}
            />
    
    
            <input
            type="checkbox"
            onClick={handleType}
            />
            <span style={{color: "white"}}>{type === "password" ? "Show Password" : "Hide Password"}</span>
          
           <input  type='submit'/>
         
          <Link to="/signup">
            <button className='registory-btn'>Sign Up</button>
          </Link>
          </form>
        </div>
      );



}

export default Login