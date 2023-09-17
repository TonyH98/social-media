import "./Nav.css"

import {IoIosNotifications} from "react-icons/io"

import {LuVerified} from "react-icons/lu"

import {CgProfile} from "react-icons/cg"


import { useNavigate, Link } from "react-router-dom";

import { useState, useEffect } from "react";
import Verifications from "./Verifications";

function Nav(){

    const [user, setUser] = useState();

    const [modal , setModal] = useState(false)

    const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'));
    setUser(loggedUser);
  }, []);


  const handleLogout = () => {
    localStorage.clear();

    fetch("/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };



return(
    <nav>

    <div className="nav-container">

        <div className="logo-container">
        <h2>Hermes</h2>
        </div>

        <div className="nav-content-container">

        <Link to={`/profile/${user?.id}`}>
        <div class="nav-content">
        <CgProfile class="icon" size={30} />
        <span class="text">Profile</span>
        </div>

        </Link>

        <Link to={`/notifications/${user?.id}`}>
        <div class="nav-content">
        <IoIosNotifications class="icon" size={30} />
        <span class="text">Notifications</span>
        </div>
        </Link>


        <div class="nav-content" onClick={() => setModal(true)}>
        <LuVerified class="icon" size={30} />
        <span class="text">Verified</span>
        </div>

        <Verifications open={modal} onClose={() => setModal(false)} user={user}/>

        <button onClick={handleLogout} className="logout nav-content">Logout</button>

        </div>

    </div>

    </nav>
)

}

export default Nav