import { useState, useEffect} from "react";
import "./Profile.css"
import {BsPencilSquare} from "react-icons/bs"
import Favorites from "../Favorites/Favorites"
import PostForm from "../PostForm/PostForm";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import AllReplies from "../ALLReplies/AllReplies";
import Posts from "../Posts/Posts";
import { useDispatch , useSelector } from "react-redux";
import { fetchUsers, fetchPosts, getTags, getFavorites ,  fetchUser, getFollowing, getFollower, getAllUsersReplies} from "../../Store/userActions";
import { Link } from "react-router-dom";


function Profile({user , plan}){


    let [option , setOption] = useState(0)
    const [modal , setModal] = useState(false)

    const [modal2 , setModal2] = useState(false)

    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const getPosts = useSelector((state) => state.posts_get.posts)
    const favorites = useSelector((state) => state.favorites.fav)
    let following = useSelector((state) => state.follow.fol)
    let follower = useSelector((state) => state.follower.fol)
    let replies = useSelector((state) => state.userReplies.replies)

  
    useEffect(() => {
       dispatch(fetchUsers(user?.id))
       dispatch(getTags())
       dispatch(fetchUser())
       dispatch(getFollowing(user?.id))
       dispatch(getFollower(user?.id))
      
    }, [dispatch])
    



    useEffect(() => {
        if(users && users?.id){
            dispatch(fetchPosts(users?.username))
            dispatch(getFavorites(users?.id))
            dispatch(getAllUsersReplies(users?.username , users?.id))
        }

    }, [dispatch , users])
    

    console.log(replies)

    let options = ["Posts", "Replies", "Favorites"]

    function optionContent(selected) {
        if (selected === 0) {
          return (
            <div className="option-content-holder">
              {getPosts.map((posts) => {
                return (
                  <div key={posts.id} className="posts-border-container">
                    <Posts posts={posts} users={user} favorites={favorites} plan={plan} />
                  </div>
                );
              })}
            </div>
          );
        }
        if (selected === 1) {
          return (
            <div className="option-content-holder">
              {replies.map((reply) => {
                return (
                  <div key={reply.id} className="posts-border-container">
                    <AllReplies posts={reply} users={user}/>
                  </div>
                );
              })}
            </div>
          );
        }
        if (selected === 2) {
          return ( 
            <div className="option-content-holder">
              {favorites.map((fav) => {
                return (
                  <div key={fav.id} className="posts-border-container">
                    <Favorites fav={fav} users={users} />
                  </div>
                );
              })}
            </div>
          );
        }
 
      }
      


    const parseBio = (bio) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return bio?.replace(urlRegex, (url) => {
          return `<a href="${url}" target="_blank" style="color: blue;">${url}</a>`;
        });
      };

 
      console.log(plan)

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

        <PostForm open={modal} onClose={() => setModal(false)} users={users} plan={plan}/>


        <div className="profile_info_container">

        <div className="profile_img_container">

        <img src={users?.profile_img} className="profile_img"/>

        </div>
        
        <div className="profile_names_container">

            <div className="profile_name">
           <h3>{users?.profile_name}</h3> 
            {plan?.images ? <img src={plan.images} alt={plan.images} className="member_badge"/> : null}
            </div>

            <div>@{users?.username}</div>

        </div>

        <div className="profile_bio_container">
      <p
        dangerouslySetInnerHTML={{
          __html: users ? parseBio(users.bio) : '',
        }}
      />
    </div>


        <div className="profile_followers_container">

            <Link to={`/${user?.id}/following`}>
            <div>{following.length} Following</div>
            </Link>

            <Link to={`/${user?.id}/follower`}>
            <div>{follower.length} Followers</div>
            </Link>
            

        </div>

        </div>

        <div className="profile_selected_options">

        <div className="three_options_container">
        {options.map((opt , index) => {
            return(
                <button onClick={() => setOption(index)} className={index === option ? `active options` : 'options'} key={index}>{opt}</button>
            )
        })}

        </div>

{optionContent(option)}
        </div>


        </div>

        </div>


    )
}

export default Profile