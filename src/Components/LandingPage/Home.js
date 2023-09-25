import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { loginUser } from '../../Store/userActions';

import "./Home.css"

function Home({ newLogin, user, isLogged, setUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUsers = useSelector((state) => state.login.loginSuccess); 
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [type, setType] = useState('password');
  let [error , setError] = useState(null)

  const handleTextChange = (event) => {
    setLogin({ ...login, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(login, newLogin))
      .then((redirectUrl) => {
        window.location.href = redirectUrl;
      })
      .catch((error) => {
        if(error.response.status === 401){
          setError("Wrong Email or Password")
        }
      });
  };
  
  


  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
    
  }, [isLogged]);


  const handleType = () => {
    setType(type === 'password' ? 'text' : 'password');
  };


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
    
    <button  disabled={error} type='submit' className='login-submit'>Login</button>

   {error && <p style={{color: "red"}}>{error}</p>}

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