import { useState , useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../Store/userActions';
import axios from "axios";
import "./Signup.css"

const API = process.env.REACT_APP_API_URL;
function Signup(){

    const navigate = useNavigate()

   const dispatch = useDispatch();

    const [type, setType]=useState('password');

    const [passwordError, setPasswordError] = useState("");

    const [emailError, setEmailError] = useState("");

    let [userError , setUserError] = useState("")
     
    let [emailError2 , setEmailError2] = useState("")

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

      useEffect(() => {
        setUser((prevUser) => ({
          ...prevUser,
          profile_name: prevUser.firstname + " " + prevUser.lastname, // Combine firstname and lastname
        }));
      }, [user.firstname, user.lastname]); // Run this effect whenever firstname or lastname changes
      
      const handleTextChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value });
      };


      function validatePassword(){
        const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#!%*?&])[0-9a-zA-Z@$!%*?&]{8,}$/
 
        return validate.test(user.password)
       }
 
       function validateEmail(){
         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
         if(!regex.test(user.email)){
           return false
         }
         return true
       }


       function checkUserName() {
        return axios.get(`${API}/users?username=${user.username}`)
          .then((res) => {
            return res.data.length === 0;
          })
          .catch((error) => {
            console.error(error);
            return false;
          });
      }

      function checkEmail(){
        return axios.get(`${API}/users?email=${user.email}`)
        .then((res) => {
          return res.data.length === 0;
        })
        .catch((error) => {
          console.error(error);
          return false;
        });
      }

      const handleSubmit = (event) => {
        event.preventDefault();

        let isValid = true

        if(!validateEmail){
          setEmailError("Please enter a valid email address")
          isValid = false
        }
        if(!validatePassword){
          setPasswordError("Password must have at least 8 characters long, 1 uppercase letter, 1 lowercase letter, 1 number, and a special character ");
          isValid = false;
        }
  Promise.all([checkUserName(), checkEmail()]).then(([isUsernameAvailable, isEmailAvailable]) => {
    if (!isUsernameAvailable) {
      setUserError("Username was already taken");
      isValid = false;
    }

    if (!isEmailAvailable) {
      setEmailError2("Email was already taken");
      isValid = false;
    }

    if (isValid) {
      dispatch(createUser(user))
      navigate('/')
      
    }
  }).catch((error) => {
    console.error(error);
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

      console.log(user)


      return(
        <div className="signup-section">
    
            
          <form onSubmit={handleSubmit} className="signup-form">

          <h1>Sign Up Form</h1>

          <div className='input-container'>
            
            <label htmlFor="firstname" className='label-signup'>First Name:
            <input
              id="firstname"
              className='signup-input'
              type="text"
              required
              value={user.firstname}
              onChange={handleTextChange}
            />
            
            </label>
      
      
             <label htmlFor="lastname" className='label-signup'>Last Name:
             
            <input
              id="lastname"
              type="text"
              className='signup-input'
              required
              value={user.lastname}
              onChange={handleTextChange}
            />
             </label>
     

            <label htmlFor="username" className='label-signup'>Username:
            
            <input
              id="username"
              className='signup-input'
              value={user.username}
              type="text"
              onChange={handleTextChange}
              required
            />
            {userError && <p style={{color:"red"}}>{userError}</p>}
            </label>
            
          
           
         
             <label htmlFor="email" className='label-signup'>Email:
             
            <input
              id="email"
              type="email"
              className='signup-input'
              required
              value={user.email}
              onChange={handleTextChange}
            />
             {emailError && <p style={{color:"red"}}>{emailError}</p>}
             {emailError2 && <p style={{color:"red"}}>{emailError2}</p>}
             </label>
       
          <label htmlFor='DOB' className='label-signup'>Date of Birth:
          <input
              id="DOB"
              type="date"
              className='signup-input'
              required
              value={user.DOB}
              onChange={handleTextChange}
            />
          </label>
   
            <label htmlFor="password" className='label-signup'>Password:
     
            <input
              id="password"
              className='signup-input'
              type={type}
              required
              value={user.password}
              placeholder="******"
              onChange={handleTextChange}
              />
             {passwordError && <p style={{color:"red"}}>{passwordError}</p>}
            </label>
              

          </div>
          
    
            <div className='show-password-container'>

            <input
            type="checkbox"
            onClick={handleType}
            />

            <span >{type === "password" ? "Show Password" : "Hide Password"}</span>

            </div>


            <button type='submit' className='login-submit'>Signup</button>
      
          <Link to="/">
          <button className='sign-btn'>Sign In</button>
          </Link>
    
          </form>
        </div>
    )



}

export default Signup