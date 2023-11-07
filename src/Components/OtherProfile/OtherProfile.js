import { useParams , Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import AllReplies from "../ALLReplies/AllReplies";
import { addFollowing, getFollowing, deleteFol , getFollower, getFavorites } from "../../Store/userActions";
import {CgUnblock} from "react-icons/cg"
import {BiBlock} from "react-icons/bi"
import Favorites from "../Favorites/Favorites"
import Posts from "../Posts/Posts";
import axios from "axios";
//HTL9878HTaL@1
const API = process.env.REACT_APP_API_URL;

function OtherProfile({user , plan, mainUser}){

    let usersFollowing = useSelector((state) => state.follow.fol)
    let userFavorites = useSelector((state) => state.favorites.fav)
    let options = ["Posts", "Replies", "Favorites"]

    let [option , setOption] = useState(0)
    let [users , setUsers] = useState([])
    let [posts , setPosts] = useState([])
    let [userReplies , setUserReplies] = useState([])
  

    let dispatch = useDispatch()

    const {id} = useParams()
 
    let [following , setFollowing] = useState([])
    let [follower , setFollower] = useState([])
    let [favorites , setFavorites] = useState([])
    let [block , setBlock] = useState([])
    let [otherBlock, setOtherBlock] = useState([])

useEffect(() => {
  axios.get(`${API}/block/${user?.id}`)
  .then((res) => {
    setBlock(res.data)
  })

  axios.get(`${API}/block/${users?.id}`)
  .then((res) => {
    setOtherBlock(res.data)
  })
}, [user?.id, users?.id])

console.log(otherBlock)

console.log(block)

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

  axios.get(`${API}/users/${users.username}/posts/${id}/replies`)
  .then((res) => {
    setUserReplies(res.data)
  })
} , [users.username , id])


useEffect(() => {
  axios.get(`${API}/follow/${id}`)
  .then((res) => {
    setFollowing(res.data)
  })
  axios.get(`${API}/follow/${id}/followers`)
  .then((res) => {
    setFollower(res.data)
  })
  axios.get(`${API}/favorites/${id}`)
  .then((res) => {
    setFavorites(res.data)
  })
}, [id])





useEffect(() => {
  dispatch(getFollowing(user?.id))
  dispatch(getFavorites(user?.id))
}, [dispatch, user])





    function optionContent(selected) {
      if (selected === 0) {
        return (
          <div className="option-content-holder">
            {posts.map((posts) => {
              return (
                <div key={posts.id} className="posts-border-container">
                  <Posts posts={posts} users={user} favorites={userFavorites} plan={plan} mainUser={mainUser}/>
                </div>
              );
            })}
          </div>
        );
      }
      if (selected === 1) {
        return (
          <div className="option-content-holder">
            {userReplies.map((reply) => {
              return (
                <div key={reply.id} className="posts-border-container">
                  <AllReplies posts={reply} users={user} mainUser={mainUser}/>
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
                  <Favorites fav={fav} users={users} mainUser={mainUser}/>
                </div>
              );
            })}
          </div>
        );
      }
    }


function addBlock(e){
  e.preventDefault()
  axios.post(`${API}/block/${user?.id}/block/${users?.id}`)
  .then(() => {
    axios.get(`${API}/block/${user?.id}`)
  .then((res) => {
    setBlock(res.data)
  })
  .then(() => {
    dispatch(deleteFol(user?.id, users?.id))
    dispatch(deleteFol(users.id, user?.id))
  })
  .then(() => {
    axios.get(`${API}/favorites/${id}`)
    .then((res) => {
      setFavorites(res.data)
    })

  })
  })
}

function removeBlock(e){
  e.preventDefault()
  axios.delete(`${API}/block/${user?.id}/deleteBlock/${users?.id}`)
  .then(() =>{

    axios.get(`${API}/block/${user?.id}`)
    .then((res) => {
      setBlock(res.data)
    })
  })
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

     const inBlock = Array.isArray(block) ? block.map(block => block.block_id) : []

     const inOtherBlock = Array.isArray(otherBlock) ? otherBlock.map(block => block.block_id) : []

   const parseBio = (bio) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return bio?.replace(urlRegex, (url) => {
          return `<a href="${url}" target="_blank" style="color: blue;">${url}</a>`;
        });
      };


   
return(
        <div className="profile">

        <div className="profile_first_section">

        <div className="profile_banner_container">

        <img src={users?.banner_img} 
        alt={users?.banner_img} 
        className="profile_banner_img"/>

       

        </div>

        </div>

        <div className="profile_second_section">
     

        <div className="profile_info_first">
        <div className="profile_img_container">

        <img src={users?.profile_img}  className={`${mainUser?.dark_mode ? 'profile_img_white_border' : 'profile_img_dark_border'} profile_img`}/>

        </div>
        
        <div className="profile_names_container">
            <h3 className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`} >{users?.profile_name}</h3>
            <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>@{users?.username}</div>

        </div>

        <div className="profile_bio_container">
      <p className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}
        dangerouslySetInnerHTML={{
          __html: users ? parseBio(users.bio) : '',
        }}
      />
    </div>

        <div className="profile_followers_container">

            <Link to={`/${users?.id}/following`}>
            <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>{following.length} Following</div>
            </Link>

            <Link to={`/${users?.id}/follower`}>
            <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>{follower.length} Followers</div>
            </Link>
            

        </div>

        

        </div>

        <div className="profile_btns_container">
        {inOtherBlock.includes(user?.id) || inBlock.includes(users?.id) ? (
    <button onClick={handleDeleteFollow} className="follow_btn disabled_btn" disabled>
        Block
    </button>
) : (
    user && inFav.includes(users?.id) ? (
        <button onClick={handleDeleteFollow} className="follow_btn">
            Remove
        </button>
    ) : (
        <button onClick={handleFollow} className="follow_btn">
            Follow
        </button>
    )
)}
          {user && inBlock.includes(users?.id) ?
          <button onClick={removeBlock} className="block_btn"><CgUnblock size={30}/></button> : 
          <button onClick={addBlock} className="block_btn"> <BiBlock size={30}/></button>
          }
          </div>
        

        </div>


        <div className="profile_third_section">

        <div className="profile_selected_options">

        <div className="three_options_container">
        {options.map((opt , index) => {
            return(
                <button onClick={() => setOption(index)} className={`${index === option ? `active options` : 'options'} ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`} key={index}>{opt}</button>
            )
        })}

        </div>
        {inBlock.includes(users?.id) || inOtherBlock.includes(user?.id) ? 
        <h1>@{users.username} is blocked</h1> :
        <div>
          {optionContent(option)}

        </div>
        }

        </div>
        </div>


       

        </div>
    
)

}

export default OtherProfile


