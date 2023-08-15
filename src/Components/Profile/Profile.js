import { useState, useEffect } from "react";
import "./Profile.css"

import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Profile({user}){

    let [profile , setProfile] = useState({})
    let [following , setFollowering] = useState([])


    useEffect(() => {
        if(user)
        axios.get(`${API}/users/${user?.id}`)
        .then((res) => {
            setProfile(res.data)
        })
    }, [user])



    useEffect(() => {
        if(user){
            axios.get(`${API}/follow/${user?.id}`)
            .then((res) => {
                setFollowering(res.data)
            })
        }
    }, [user])



    

    return(
        <div className="profile">

        <div className="profile_first_half">

        <div className="profile_banner_container">

        <img src={profile?.banner_img} 
        alt={profile?.banner_img} 
        className="profile_banner_img"/>

        </div>

        <div className="profile_info_container">

        <div className="profile_img_container">

        <img src={profile?.profile_img} className="profile_img"/>

        </div>
        
        <div className="profile_names_container">
            <h3>{profile?.profile_name}</h3>
            <div>@{profile?.username}</div>

        </div>

        <div className="profile_bio_container">

            <p>{profile?.bio}</p>

        </div>


        <div className="profile_followers_container">

            <div>{following.length} Following</div>
            <div>{following.length} Following</div>
            

        </div>

        </div>

        <div className="profile_selected_options">

        <div className="options">Posts</div>
        <div className="options">Replies</div>
        <div className="options">Favorites</div>

        </div>


        </div>


        <div className="profile_second_half"></div>

        <div className="profile_search_input_container">

        <input type="text" className="profile_search_bar" placeholder="Search"/>

        </div>

        </div>
      


    )
}

export default Profile