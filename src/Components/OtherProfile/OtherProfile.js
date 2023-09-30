import { useParams , Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import { addFollowing, getFollowing, deleteFol , getFollower, getFavorites } from "../../Store/userActions";
import Posts from "../Posts/Posts";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function OtherProfile({user}){

    let usersFollowing = useSelector((state) => state.follow.fol)
    let userFavorites = useSelector((state) => state.favorites.fav)
    let options = ["Posts", "Replies", "Favorites"]

    let [option , setOption] = useState(0)
    let [users , setUsers] = useState([])
    let [posts , setPosts] = useState([])
    let dispatch = useDispatch()
    const {id} = useParams()
 
    let [following , setFollowing] = useState([])
    let [follower , setFollower] = useState([])

useEffect(() => {
  axios.get(`${API}/users/${id}`)
  .then((res) => {
    setUsers(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
} , [id])
    

useEffect(() => {
  axios.get(`${API}/users/${users.username}/posts`)
  .then((res) => {
    setPosts(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
} , [users.username])


useEffect(() => {
  axios.get(`${API}/follow/${id}`)
  .then((res) => {
    setFollowing(res.data)
  })
  axios.get(`${API}/follow/${id}/followers`)
  .then((res) => {
    setFollower(res.data)
  })
}, [id])

useEffect(() => {
  dispatch(getFollowing(user?.id))
  dispatch(getFavorites(user?.id))
}, [dispatch, user])



console.log(posts)

    function optionContent(selected) {
      if (selected === 0) {
        return (
          <div className="option-content-holder">
            {posts.map((posts) => {
              return (
                <div key={posts.id} className="posts-border-container">
                  <Posts posts={posts} users={user} favorites={userFavorites} />
                </div>
              );
            })}
          </div>
        );
      }
      // if (selected === 2) {
      //   return ( 
      //     <div className="option-content-holder">
      //       {favorites.map((fav) => {
      //         return (
      //           <div key={fav.id} className="posts-border-container">
      //             <Favorites fav={fav} users={users} />
      //           </div>
      //         );
      //       })}
      //     </div>
      //   );
      // }

    }




    function handleFollow(e){
        e.preventDefault()
        dispatch(addFollowing(user?.id, users?.id))
    }


    function handleDeleteFollow(e){
        e.preventDefault()
        dispatch(deleteFol(user?.id, users?.id))
    }
     const inFav = Array.isArray(usersFollowing) ? usersFollowing.map(fol => fol?.following_id) : [];

   const parseBio = (bio) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return bio?.replace(urlRegex, (url) => {
          return `<a href="${url}" target="_blank" style="color: blue;">${url}</a>`;
        });
      };

return(
        <div className="profile">

        <div className="profile_first_half">

        <div className="profile_banner_container">

        <img src={users?.banner_img} 
        alt={users?.banner_img} 
        className="profile_banner_img"/>

        <div className="profile_btns_container">
            {user && inFav.includes(users?.id) ? 
            <button onClick={handleDeleteFollow} className="follow_btn">Unfollow</button>
            : <button onClick={handleFollow} className="follow_btn">Follow</button>}
        </div>

        </div>

        


        <div className="profile_info_container">

        <div className="profile_img_container">

        <img src={users?.profile_img} className="profile_img"/>

        </div>
        
        <div className="profile_names_container">
            <h3>{users?.profile_name}</h3>
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

            <Link to={`/${users?.id}/following`}>
            <div>{following.length} Following</div>
            </Link>

            <Link to={`/${users?.id}/follower`}>
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

export default OtherProfile
        