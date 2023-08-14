import { useState, useEffect } from "react";
import "./Profile.css"

import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Profile({user}){

    let [profile , setProfile] = useState({})

    useEffect(() => {
        if(user)
        axios.get(`${API}/users/${user?.id}`)
        .then((res) => {
            setProfile(res.data)
        })
    }, [user])

console.log(profile)

    return(

        <div className="profile_page">

      <div className="profile-first-container">

        <div className="banner-container">
            <img src={profile?.banner_img} alt={profile?.banner_img} className="banner_img"/>
        </div>

        <div className="profile_container">

            <div className="profile_info_container">
            <img src={profile?.profile_img} alt={profile?.profile_img} className="profile_img"/>

        <div className="profile_names_container">

        <p>{profile?.profile_name}</p>
        <p>@{profile?.username}</p>
        </div>


            </div>

        <div className="update_btns_container">
                <button className="update_profile_btns">Setup Profile</button>
            </div>

        </div>


      </div>


    <div className="profile_second_container">

        <div className="profile_search_container">
        <input type="text" className="search_section" placeholder="Search"/>

        </div>

    </div>

        </div>

    )
}

export default Profile