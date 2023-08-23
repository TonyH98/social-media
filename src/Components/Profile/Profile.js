import { useState, useEffect } from "react";
import "./Profile.css"
import {BsPencilSquare} from "react-icons/bs"

import PostForm from "../PostForm/PostForm";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import Post from "../PostForm/PostForm";
import Posts from "../Posts/Posts";
import { useDispatch , useSelector } from "react-redux";
import { fetchUsers, fetchPosts } from "../../Store/userActions";
const API = process.env.REACT_APP_API_URL;

function Profile({user}){

    let [following , setFollowering] = useState([])
    let [option , setOption] = useState(0)
    const [modal , setModal] = useState(false)

    const [modal2 , setModal2] = useState(false)

    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const getPosts = useSelector((state) => state.posts_get.posts)

    useEffect(() => {
       dispatch(fetchUsers(user?.id))
    }, [dispatch])


    useEffect(() => {
    if(users){
        dispatch(fetchPosts(users?.username))
    }
    }, [dispatch, users])


    console.log(getPosts)

   

    let options = ["Posts", "Replies", "Favorites"]

    function optionContent (selected){

    if(selected === 0){
        return(

        <div className="option-content-holder">
            {getPosts.map((posts) => {
                return(
                    <div key={posts.id} className="posts-border-container">
                        <Posts posts={posts} />
                    </div>
                )
            })}

        </div>
        )
    }

    }
    

    console.log(option)


    return(
        <div className="profile">

        <div className="profile_first_half">

        <div className="profile_banner_container">

        <img src={users?.banner_img} 
        alt={users?.banner_img} 
        className="profile_banner_img"/>

        <div className="profile_btns_container">

        <button className="create_post_btns" 
        onClick={() => setModal(true)}
        >Post</button>

        <button className="profile-edit-btns"  onClick={() => setModal2(true)}>
        <BsPencilSquare size={20}/></button>
        </div>

        </div>

        <ProfileEdit open2={modal2} fetchUsers={fetchUsers} onClose={() => setModal2(false)} users={users}/>

        <PostForm open={modal} onClose={() => setModal(false)} users={users}/>


        <div className="profile_info_container">

        <div className="profile_img_container">

        <img src={users?.profile_img} className="profile_img"/>

        </div>
        
        <div className="profile_names_container">
            <h3>{users?.profile_name}</h3>
            <div>@{users?.username}</div>

        </div>

        <div className="profile_bio_container">

            <p>{users?.bio}</p>

        </div>


        <div className="profile_followers_container">

            <div>{following.length} Following</div>
            <div>{following.length} Followers</div>
            

        </div>

        </div>

        <div className="profile_selected_options">

        <div className="three_options_container">
        {options.map((option , index) => {
            return(
                <div onClick={() => setOption(index)} className="options" key={index}>{option}</div>
            )
        })}

        </div>

{optionContent(option)}
        </div>


        </div>


       

        <div className="profile_search_input_container">

        <input type="text" className="profile_search_bar" placeholder="Search"/>

        </div>

        </div>


    )
}

export default Profile