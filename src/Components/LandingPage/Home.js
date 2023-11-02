import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { loginUser } from '../../Store/userActions';

import "./Home.css"

function Home({ newLogin, user, isLogged, setUser }) {
  const dispatch = useDispatch();

  
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [type, setType] = useState('password');
  let [error , setError] = useState(null)
  let [capsLockOn, setCapsLockOn] = useState(false)

  const handleTextChange = (event) => {
    setLogin({ ...login, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    if(!capsLockOn){
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
    }
  };
  
  


  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
    
  }, [isLogged]);


  const handleType = () => {
    setType(type === 'password' ? 'text' : 'password');
  };


  const checkCapsLock = (event) => {
    const key = event.key;
    const isCapsLockOn = key === key.toUpperCase() && key !== key.toLowerCase() && !event.getModifierState('Shift');
    setCapsLockOn(isCapsLockOn);
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
        onKeyDown={checkCapsLock} 
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
        onKeyDown={checkCapsLock} 
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
    
    {login.email.length === 0 || login.password.length === 0 ?
      <button className="login_submit gray_button" disabled>Login</button> :
      <button className="login_submit" disabled={error} type='submit'>login</button>
  }
  {capsLockOn && <p style={{ color: 'red' }}>Caps Lock is ON</p>}

   {error && <p style={{color: "red"}}>{error}</p>}

   <div className='signup-option'>
    <p>Don't Have an Account</p>
    <Link to="/signup">
      <button type='submit' className='login-btn'>Sign Up</button>
    </Link>
   </div>

    </form>
  </div>

)

}


export default Home