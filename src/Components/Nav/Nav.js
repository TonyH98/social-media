import "./Nav.css"

import {IoIosNotifications} from "react-icons/io"

import {LuVerified} from "react-icons/lu"

import {CgProfile} from "react-icons/cg"
import {CiSearch} from "react-icons/ci"

import {  Link, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import SearchModal from "../SearchModal/SearchModal"
import Verifications from "./Verifications";
import LogoutModal from "../Logout/LogoutModal"

function Nav({plan}){

    const [user, setUser] = useState();

    const [modal , setModal] = useState(false)

    const [modal2 , setModal2] = useState(false)

    const [modal3 , setModal3] = useState(false)



  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
  }, []);

  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active2' : ''
  }


return(
    <nav>

    <div className="nav-container">

        <div className="logo-container">
        <h2>Hermes</h2>
        </div>

        <div className="nav-content-container">

        <Link to={`/profile/${user?.id}`} className={isActive(`/profile/${user?.id}`)}>
        <div class="nav-content">
        <CgProfile class="icon" size={30} />
        <span class="text">Profile</span>
        </div>

        </Link>

        <Link to={`/notifications/${user?.id}`} className={isActive(`/notifications/${user?.id}`)}>
        <div class="nav-content">
        <IoIosNotifications class="icon" size={30} />
        <span class="text">Notifications</span>
        </div>
        </Link>


        <div class="nav-content" onClick={() => setModal(true)}>
        <LuVerified class="icon" size={30} />
        <span class="text">Verified</span>
        </div>

        <Verifications open={modal} onClose={() => setModal(false)} user={user} plan={plan}/>

        <div className="nav-content nav-search" onClick={() => setModal2(true)}>
        <CiSearch class="icon" size={30} />
        <span class="text">Search</span>
        </div>
        <SearchModal open={modal2} onClose={() => setModal2(false)} user={user} />

        <button className="logout nav-content" onClick={() => setModal3(true)}>Logout</button>
        <LogoutModal open={modal3} onClose={() => setModal3(false)} user={user}/>
        </div>

    </div>

    </nav>
)

}

export default Nav