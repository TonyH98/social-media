import { useState, useEffect} from "react";
import "./Profile.css"
import {BsPencilSquare} from "react-icons/bs"
import Favorites from "../Favorites/Favorites"
import PostForm from "../PostForm/PostForm";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import AllReplies from "../ALLReplies/AllReplies";
import Poll from "../Poll/Poll";
import Posts from "../Posts/Posts";
import { useDispatch , useSelector } from "react-redux";
import { fetchUsers, fetchPosts, getTags, fetchUser, getFollowing, getFollower, getAllUsersReplies} from "../../Store/userActions";
import { Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Profile({user , plan}){



    let [option , setOption] = useState(0)
    const [modal , setModal] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [showGifPicker, setShowGifPicker] = useState(false)
    const [modal2 , setModal2] = useState(false)
    const [poll , setPoll] = useState([])
    const [favorites , setFavorites] = useState([])

    const [postFavorite , setPostFavorite] = useState([])

    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
  let getPosts = useSelector((state) => state.posts_get.posts)

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
      if (users?.username && users?.id) {
          dispatch(fetchPosts(users.username));
          
          dispatch(getAllUsersReplies(users.username, users.id));
      }
  }, [dispatch, users?.username, users?.id]);
  
    
  useEffect(() => {

    axios.get(`${API}/favorites/${user.id}/all`)
    .then((res) => {
      setFavorites(res.data)
    })

    axios.get(`${API}/poll/${user.id}`)
    .then((res) => {
      setPoll(res.data)
    })

  }, [user.id])

  useEffect(() => {
    axios.get(`${API}/favorites/${user.id}`)
    .then((res) => {
      setPostFavorite(res.data)
    })

  }, [user.id])

    let options = ["Posts", "Replies", "Favorites", "Poll"]


  getPosts = getPosts.sort((a , b) => {
    if(a.pin && !b.pin) return -1
    if(!a.pin && b.pin) return 1

    return new Date(b.time) - new Date(a.time)
  })

    function optionContent(selected) {
      if (selected === 0) {
        return (
          <div className={`option-content-holder ${users.dark_mode ? "light_border_post" : "dark_border_post"}`}>
            {getPosts.map((posts) => (
              <div key={posts.id} className="posts-border-container">
                <Posts posts={posts}  users={user} mainUser={users} favorites={postFavorite} setPostFavorite={setPostFavorite} plan={plan} />
              </div>
            ))}
          </div>
        );
      }
      if (selected === 1) {
        return (
          <div className={`option-content-holder ${users.dark_mode ? "light_border_post" : "dark_border_post"}`}>
            {replies.map((reply) => (
              <div key={reply.id} className="posts-border-container">
                <AllReplies posts={reply} users={user} mainUser={users} favorites={favorites} plan={plan} />
              </div>
            ))}
          </div>
        );
      }
      if (selected === 2) {
        return (
          <div className={`option-content-holder ${users.dark_mode ? "light_border_post" : "dark_border_post"}`}>
            {favorites.map((fav) => (
              <div key={fav.id} className="posts-border-container">
                <Favorites fav={fav} users={user} mainUser={users} plan={plan}  />
              </div>
            ))}
          </div>
        );
      }
      if (selected === 3) {
        return (
          <div className={`option-content-holder ${users.dark_mode ? "light_border_post" : "dark_border_post"}`}>
          {poll.map((singlePoll) => (
            <div key={singlePoll.id} className="posts-border-container">
              <Poll poll={singlePoll} mainUser={user} plan={plan} setPoll={setPoll} />
            </div>
          ))}
        </div>
        
        );
      }
      return null; // Add a default return value if none of the conditions are met
    }
    
      




    const parseBio = (bio) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return bio?.replace(urlRegex, (url) => {
          return `<a href="${url}" target="_blank" style="color: blue;">${url}</a>`;
        });
      };

 
    

    return(
        <div className="profile">


        <div className="profile_banner_container">
      

        <img src={users?.banner_img} 
        alt={users?.banner_img} 
        className="profile_banner_img"/>

     
        </div>

      
        <ProfileEdit open2={modal2} fetchUsers={fetchUsers} onClose={() => {setModal2(false); setShowEmojiPicker(false)}} showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} users={users}/>

        <PostForm open={modal} onClose={() => {setModal(false); setShowEmojiPicker(false); setShowGifPicker(false)}} setShowGifPicker={setShowGifPicker} showGifPicker={showGifPicker} showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} users={users} plan={plan}/>

      <div className="profile_second_section">
       

          <div className="profile_info_first"> 
        <div className="profile_img_container">

        <img src={users?.profile_img}  className={`${users?.dark_mode ? 'profile_img_white_border' : 'profile_img_dark_border'} profile_img`}/>

        </div>
        
        <div className="profile_names_container">

            <div className="profile_name">
           <h3 className={`${users?.dark_mode ? 'white_text' : 'dark_text'}`}>{users?.profile_name}</h3> 
            {plan?.images ? <img src={plan.images} alt={plan.images} className="member_badge"/> : null}
            </div>

            <div className={`${users?.dark_mode ? 'white_text' : 'dark_text'}`}>@{users?.username}</div>

        </div>

        <div className="profile_bio_container">
      <p className={`${users?.dark_mode ? 'white_text' : 'dark_text'}`}
        dangerouslySetInnerHTML={{
          __html: users ? parseBio(users.bio) : '',
        }}
      />
    </div>


        <div className="profile_followers_container">

            <Link to={`/${user?.id}/following`} onClick={window.scrollTo(0 , 0)}>
            <div className={`${users?.dark_mode ? 'white_text' : 'dark_text'}`}>{following.length} Following</div>
            </Link>

            <Link to={`/${user?.id}/follower`} onClick={window.scrollTo(0 , 0)}>
            <div className={`${users?.dark_mode ? 'white_text' : 'dark_text'}`}>{follower.length} Followers</div>
            </Link>
            

        </div>
          
          </div>

          <div className="profile_btns_container">

          <button className="create_post_btns" 
          onClick={() => setModal(true)}
          >Post</button>

          <button className="profile-edit-btns"  onClick={() => setModal2(true)}>
          <BsPencilSquare size={20}/></button>
          </div>

    

      </div>

        <div className="profile_third_section">
        <div className="profile_selected_options">

        <div className="three_options_container">
        {options.map((opt , index) => {
            return(
                <button onClick={() => setOption(index)} className={`${index === option ? `active options` : 'options'} ${users?.dark_mode ? 'white_text' : 'dark_text'}`} key={index}>{opt}</button>
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
