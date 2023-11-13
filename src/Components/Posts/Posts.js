import "./Posts.css"

import {Link} from "react-router-dom"
import {SlBubble} from "react-icons/sl"
import ReplyForm from "../ReplyForm/ReplyForm";
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import { useEffect , useState } from "react";
import { useDispatch} from "react-redux";
import {BsFillPinFill} from "react-icons/bs"
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"
import axios from "axios";
import {PiArrowsClockwise} from "react-icons/pi"
import {AiOutlineEllipsis} from "react-icons/ai"
import PostOptionModal from "./PostOptionModal";
const API = process.env.REACT_APP_API_URL;
function Posts ({posts, users, favorites, plan, mainUser, setPostFavorite}){



let [show , setShow] = useState(false)

let [show2 , setShow2] = useState(false)

const [showEmojiPicker, setShowEmojiPicker] = useState(false)
const [showGifPicker, setShowGifPicker] = useState(false)
let [fav] = useState({
    creator_id: posts.creator.id
})

let [likes] = useState({
    reaction: "like",
    creator_id: posts.creator.id
})

let [dislike] = useState({
    reaction: "dislike",
    creator_id: posts.creator.id
})

let [replies , setReplies] = useState([])

useEffect(() => {
    axios.get(`${API}/users/${posts.creator.username}/posts/${posts.id}/reply`)
    .then((res) => {
        setReplies(res.data)
    })
})

const [reaction , setReaction] = useState({})

let [block , setBlock] = useState([])



let dispatch = useDispatch()

useEffect(() => {
    axios.get(`${API}/users/${posts.creator.username}/posts/${posts.id}/reactions`)
    .then((res) => {
      setReaction(res.data);
    });
  }, [posts.id, users.username]);

  useEffect(() => {
    axios.get(`${API}/block/${mainUser?.id}`)
    .then((res) => {
      setBlock(res.data)
    })


  }, [mainUser?.id])


function formatDate(inputDate){
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

    const [month, day, year] = inputDate.split("/").map(Number);
    const formattedMonth = months[month - 1]
    const formattedYear = year.toString()

    return `${formattedMonth} ${day}, ${formattedYear}`
}


function highlightMentions(content) {
    const mentionPattern = /@(\w+)/g;
    const hashtagPattern = /#(\w+)(?=\W|$)/g;
    
    const highlightedContent = content
    .replace(mentionPattern, '<span class="mention">$&</span>')
    .replace(hashtagPattern, `<span class="hashtag" style="color: blue;">$&</span>`)
    return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
}





function handleAddFav(e){
    e.preventDefault()
    axios.post(`${API}/favorites/${mainUser?.id}/fav/${posts.id}`, fav)
    .then(() => {
        axios.get(`${API}/favorites/${mainUser?.id}`)
        .then((res) => {
          setPostFavorite(res.data)
        })
    })
}

function handleDeleteFav(e){
    e.preventDefault()
    axios.delete(`${API}/favorites/${mainUser?.id}/delete/${posts.id}`)
    .then(() => {
        axios.get(`${API}/favorites/${mainUser?.id}`)
        .then((res) => {
          setPostFavorite(res.data)
        })
    })
}


function handleLike(e){
    e.preventDefault()
    axios.post(`${API}/users/${posts.creator.username}/posts/${users.id}/react/${posts.id}`, likes)
    .then(() => {
        axios.get(`${API}/users/${posts.creator.username}/posts/${posts.id}/reactions`)
        .then((res) => {
          setReaction(res.data);
        });
    })
}

function handleDislike(e){
    e.preventDefault()
    axios.post(`${API}/users/${posts.creator.username}/posts/${users.id}/react/${posts.id}`, dislike)
    .then(() => {
        axios.get(`${API}/users/${posts.creator.username}/posts/${posts.id}/reactions`)
        .then((res) => {
          setReaction(res.data);
        });
    })
}



function createRepost (e){
    e.preventDefault()
    axios.post(`${API}/users/${mainUser.username}/posts/${mainUser.username}/repost/${posts.id}`, {user_id: posts.user_id})
    .then(() => {
        axios.put(`${API}/users/${posts.creator.username}/posts/${posts.id}`, {repost_counter: posts.repost_counter += 1})
    })
}




const inFav = Array.isArray(favorites) ? favorites.map((fav) => fav?.id) : [];

const inBlock = Array.isArray(block) ? block.map(block => block.block_id) : []

    return(
        <div className="posts_content">

                {posts.repost ? <span className="repost_style"><PiArrowsClockwise size={15} color="gray"/> {posts.user_name} reposted</span> : null}
                {posts.pin ? <span className="repost_style"><BsFillPinFill size={15} color="gray"/> Pinned </span> : null}
            <div className="posts_extra_container">

            <div className="post_user_profile_container">
            <img
            src={posts.creator.profile_img}
            alt={posts.creator.profile_img}
            className="post_user_profile"
            />
            </div>
        <div className="post_options_extra">
        <div className="post_user_info_date_container">

        <div  className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`} >

        {posts.creator.profile_name} | @{posts.creator.username} | {formatDate(posts.time)}

        </div>

        {inBlock.includes(posts.creator.id) ? 
        <h2 className={`${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`}>@{posts.creator.username} Blocked</h2> :
        <>
            <Link to={`/posts/${posts.creator.username}/${posts?.id}`} className="link-style">

        

        <div className="posts_content_text_container">

            <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

               {highlightMentions(posts.content)}
            </div>
            <div className="posts_img_container">
            {posts.posts_img === "null" ? null : (

                <img src={posts.posts_img} alt={posts.posts_img} className="posts_img"/>
            )}

            {posts.gif ? <img src={posts.gif} alt={posts.gif} className="gif_img"/> : null}

            </div>
        
         </div>
        </Link>
        
        </>
        
    }
         
         </div>




        </div>

        <div className="epllispy_container">

        {show2 ? (null) : 
         <button className="ellipsis_btn">
        <AiOutlineEllipsis  className="ellipsis" size={20} onClick={() => setShow2(!show2)}/>
        </button>   
        
        }

        {show2 ? (
            <PostOptionModal posts={posts} mainUser={mainUser}  onClose={() => {setShow2(false);}} open={show2}/>
        ) : null}
        </div>
            </div>
            
        {inBlock.includes(posts.creator.id) ?
        null: 
        <>
         <div className="posts-options-container">

         <div className="posts-reply-button">
  <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br reply_btn`}  onClick={(e) => { e.preventDefault(); setShow(true); }}>
    <SlBubble size={20} /> {replies.length}
    <span className="hidden-text">Reply</span>
  </button>
</div>

<div className="repost-button">
<button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} 
onClick={createRepost}><PiArrowsClockwise size={20}/> {posts.repost_counter}
 <span className="hidden-text">Repost</span>
 </button>
</div>


             <div className="favorite_posts_container">
                {users && inFav.includes(posts?.id) ? 
                <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleDeleteFav}><AiFillHeart size={20} color="red"/>
                <span className="hidden-text">Disike</span>
                </button>

                : <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleAddFav}><AiOutlineHeart size={20}/>
                <span className="hidden-text">Like</span>
                </button>}

            </div> 

            
            <div className="like-container">
            <button className={`${reaction?.dislikeId?.includes(mainUser?.id) ? 'green_option_btn' : `${mainUser.dark_mode ? "light_outline" : "dark_outline"}`} no_br react_btn`} onClick={handleLike}><AiOutlineLike size={20} /> {reaction.likes}
            <span className="hidden-text">Like</span>
            </button>
           
            </div>
            
            
      
            <div className="dislike-container">
            <button className={`${reaction?.dislikeId?.includes(mainUser?.id) ? 'red_option_btn' : `${mainUser.dark_mode ? "light_outline" : "dark_outline"}`} no_br react_btn`} onClick={handleDislike}><AiOutlineDislike size={20}/> {reaction.dislikes}
            <span className="hidden-text">Dislike</span>
            </button>
            </div> 

            <ReplyForm open={show} onClose={() => {setShow(false); setShowEmojiPicker(false);  setShowGifPicker(false)}} showGifPicker={showGifPicker} setShowGifPicker={setShowGifPicker} setShowEmojiPicker={setShowEmojiPicker} showEmojiPicker={showEmojiPicker} users={users} posts={posts} plan={plan} mainUser={mainUser}/>
         </div>
        
        </>

        }
         
         </div>

         )
        }
        
        
        export default Posts