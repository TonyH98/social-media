import { useState , useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../Store/userActions';
import Condition from './Condition';
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

    let [ageError , setAgeError] = useState("")

    let[conditionError, setConditionError] = useState("")

    let [capsLockOn, setCapsLockOn] = useState(false)

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
       notifications: false,
       dark_mode: false,
       password: ""
      });


    const [condition , setCondition] = useState(false)

    const [modal , setModal] = useState(false)


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
      const checkCapsLock = (event) => {
        const key = event.key;
        const isCapsLockOn = key === key.toUpperCase() && key !== key.toLowerCase() && !event.getModifierState('Shift');
        console.log(isCapsLockOn)
        if(isCapsLockOn){
          setCapsLockOn(isCapsLockOn);
          return true
        }
      };



      console.log(checkCapsLock)
      function getAge(){
        const dateOfBirth = new Date(user.DOB)
        const currentDate = new Date();
        const age = currentDate.getFullYear() - dateOfBirth.getFullYear()

        if (
          currentDate.getMonth() < dateOfBirth.getMonth() ||
          (currentDate.getMonth() === dateOfBirth.getMonth() &&
            currentDate.getDate() < dateOfBirth.getDate())
        ) {
          age--;
        }
        
        return age 

      }

      function checkAge(){
        if(getAge() < 15){
          return false
        }
        else{
          return true
        }
      }

      
      
      function handleCondition(){
        setCondition(!condition)
      }
      
      
      function checkCondition(){
        if(condition){
          return true
        }
        else{
          return false
        }
      }

      console.log(checkCondition())

      const handleSubmit = (event) => {
        event.preventDefault();

        let isValid = true

        if(!validateEmail){
          setEmailError("Please enter a valid email address")
          isValid = false
        }
        if(!checkCondition()){
          setConditionError("Check Terms of Condition")
          isValid = false
        }
        if(!validatePassword){
          setPasswordError("Password must have at least 8 characters long, 1 uppercase letter, 1 lowercase letter, 1 number, and a special character ");
          isValid = false;
        }
        if(!checkAge()){
          setAgeError("Has to be 15 years or older")
          isValid = false
        }
        if(!checkCapsLock){
          isValid = false
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

    if (isValid && condition) {
      dispatch(createUser(user))
      navigate('/verify')
      
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




      return(
        <div className="signup-section">
    
            
          <form onSubmit={handleSubmit} className="signup-form">

          <h1>Sign Up Form</h1>

          <div className='input-container'>
            
            <div className='users_name_input_container'>
            <label htmlFor="firstname" className='label-signup'>First Name:
            <input
              id="firstname"
              className='signup-input'
              type="text"
              required
              value={user.firstname}
              onChange={handleTextChange}
              onKeyDown={checkCapsLock} 
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
              onKeyDown={checkCapsLock} 
            />
             </label>

            </div>
      
      
     
            <div className='users_name_input_container'>
            <label htmlFor="username" className='label-signup'>Username:
            
            <input
              id="username"
              className='signup-input'
              value={user.username}
              type="text"
              onChange={handleTextChange}
              onKeyDown={checkCapsLock} 
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
              onKeyDown={checkCapsLock} 
            />
             {emailError && <p style={{color:"red"}}>{emailError}</p>}
             {emailError2 && <p style={{color:"red"}}>{emailError2}</p>}
             </label>
            </div>
            
          
           
         <div className='users_name_input_container'>
          <label htmlFor='DOB' className='label-signup'>Date of Birth:
          <input
              id="DOB"
              type="date"
              className='signup-input'
              required
              value={user.DOB}
              onChange={handleTextChange}
              onKeyDown={checkCapsLock} 
            />
            {ageError && <p style={{color:"red"}}>{ageError}</p>}
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
              onKeyDown={checkCapsLock} 
              />
             {passwordError && <p style={{color:"red"}}>{passwordError}</p>}
            </label>

         </div>
       
              

          </div>
          
    
            <div className='show-password-container'>

            <input
            type="checkbox"
            onClick={handleType}
            />

            <span >{type === "password" ? "Show Password" : "Hide Password"}</span>

            </div>

            <div className='termsOfCondition'>
              <input
              type='checkbox'
              value={condition}
              onClick={handleCondition}
              />
              <span className="condition_modal_btn" onClick={() => setModal(true)}>Terms of Condition</span>

            </div>
            {conditionError && <p style={{color:"red"}}>{conditionError}</p>}
            <Condition open={modal} onClose={() => setModal(false)}/>
            {capsLockOn && <p style={{ color: 'red' }}>Caps Lock is ON</p>}
            <br/>
            <div className='sign-up-form-btn-container'>
            
            {user.firstname.length === 0 || user.lastname.length === 0 || user.username.length === 0
    && user.email.length === 0 || user.DOB.length === 0 || user.password.length === 0 ?
      <button className="login_submit gray_button" disabled>Post</button> :
      <button className="login_submit" type='submit'>Post</button>
  }
      
          <Link to="/">
          <button className='sign-btn'>Sign In</button>
          </Link>

            </div>
    
          </form>
        </div>
    )



}

export default Signup