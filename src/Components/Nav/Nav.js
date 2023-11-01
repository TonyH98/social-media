import "./Nav.css"

import {IoIosNotifications} from "react-icons/io"

import {LuVerified} from "react-icons/lu"
import {BiHome} from "react-icons/bi"
import {CgProfile} from "react-icons/cg"
import {CiSearch} from "react-icons/ci"

import {  Link, useLocation, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import SearchModal from "../SearchModal/SearchModal"
import Verifications from "./Verifications";
import LogoutModal from "../Logout/LogoutModal"

function Nav({plan, mainUser, setIsLogged}){

    const [user, setUser] = useState();

    const [modal , setModal] = useState(false)

    const [modal2 , setModal2] = useState(false)

    const [modal3 , setModal3] = useState(false)

    let navigate = useNavigate()

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
  }, []);

  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active2' : ''
  }

  let inactivityTimeout

  const handleUserActivity = () => {
    clearTimeout(inactivityTimeout)

    inactivityTimeout = setTimeout(() => {
      localStorage.clear()
      setIsLogged(false)
      navigate("/")
    }, 3 * 24 * 60 * 60 * 1000)

  }

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    for(let event of events){
      window.addEventListener(event, handleUserActivity)
    }

    return () => {
      for(let event of events){
        window.removeEventListener(event, handleUserActivity)
      }
    }
  }, [])



return(
    <nav className={`${mainUser?.dark_mode ? 'nav_white_border' : 'nav_dark_border'}`} >

    <div className={`${mainUser?.dark_mode ? 'nav_med_white_border nav-background-med-black' : 'nav_med_dark_border nav-background-med-white'} nav-container`}>

        <div className="logo-container">
        <Link to="/home"
        className={`${isActive(`/home`)} ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>
        <div class="nav-content">
        <BiHome class="icon" size={30} />
        <h2 class="text">Hermes</h2>
        </div>

        </Link>
        </div>

        <div className="nav-content-container">

        <Link to="/home"
        className={`${isActive(`/home`)} ${mainUser?.dark_mode ? 'white_text' : 'dark_text'} nav-search`}>
        <div class="nav-content">
        <BiHome class="icon" size={30} />
        <span class="text">Home</span>
        </div>

        </Link>

        <Link to={`/profile/${user?.id}`} 
        className={`${isActive(`/profile/${user?.id}`)} ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>
        <div class="nav-content">
        <CgProfile class="icon" size={30} />
        <span class="text">Profile</span>
        </div>

        </Link>

        <Link to={`/notifications/${user?.id}`} 
        className={`${isActive(`/notifications/${user?.id}`)} ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>
        <div class="nav-content">
        <IoIosNotifications class="icon" size={30} />
        <span class="text">Notifications</span>
        </div>
        </Link>


        <div class="nav-content verification_nav" onClick={() => setModal(true)}>
        <LuVerified class="icon" size={30} className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}/>
        <span className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} text`}>Verified</span>
        </div>

        <Verifications open={modal} onClose={() => setModal(false)} user={user} plan={plan} mainUser={mainUser}/>

        <div className="nav-content nav-search" onClick={() => setModal2(true)}>
        <CiSearch class="icon" size={30} className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`} />
        <span className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} text`}>Search</span>
        </div>
        <SearchModal open={modal2} onClose={() => setModal2(false)} user={user} mainUser={mainUser} />

        <button   className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} logout nav-content`}onClick={() => setModal3(true)}>Logout</button>
        <LogoutModal open={modal3} onClose={() => setModal3(false)} user={user} mainUser={mainUser}/>
        </div>

    </div>

    </nav>
)

}

export default Nav