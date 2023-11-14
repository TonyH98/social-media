import "./PostsDetails.css"
import { useParams } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { useEffect , useState} from "react";
import { getPostDetails } from "../../Store/userActions";
import {fetchReplies} from "../../Store/userActions";
import ReplyForm from "../ReplyForm/ReplyForm"
import Replies from "../Replies/Replies";
import {SlBubble} from "react-icons/sl"
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"
import { addReaction} from "../../Store/userActions";
import SamePageReplyForm from "./SamePageReplyForm";
import {PiArrowsClockwise} from "react-icons/pi"

import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function PostsDetails({user , plan, mainUser}){

const {username , id} = useParams()

let [show , setShow] = useState(false)



let [likes] = useState({
    reaction: "like",
    creator_id: id
})


let [dislike] = useState({
    reaction: "dislike",
    creator_id: id
})

let [favorite , setFavorite] = useState({})

const [showEmojiPicker, setShowEmojiPicker] = useState(false)
const [showGifPicker, setShowGifPicker] = useState(false)
const dispatch = useDispatch()

const posts = useSelector((state) => state.postsDetail.postDetail);

const getReplies = useSelector((state) => state.replies.replies)

const [reaction , setReaction] = useState({})

console.log(mainUser)


useEffect(() => {
    if(id && mainUser){
        axios.get(`${API}/favorites/${mainUser?.id}/post/${id}`)
        .then((res) => {
            console.log(res.data)
            setFavorite(res.data)
        })
    }
}, [id, mainUser?.id])


useEffect(() => {
    if(username && id){
        dispatch(getPostDetails(username , id))
        dispatch(fetchReplies(username, id))
    }
}, [dispatch . username , id, posts?.id, user?.id])

useEffect(() => {
    axios.get(`${API}/users/${username}/posts/${id}/reactions`)
    .then((res) => {
      setReaction(res.data);
    });
  }, [username, id]);

function formatDate() {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Check if posts and posts.time exist before attempting to split
    if (posts && posts?.time) {
        const splitDate = posts.time.split("/");

        // Make sure splitDate has at least 3 elements before destructuring
        if (splitDate.length >= 3) {
            const [month, day, year] = splitDate.map(Number);
            
            let formatMonth = months[month - 1]
            const formattedYear = year.toString()

            return `${formatMonth} ${day}, ${formattedYear}`

        } 
    } 
}


function highlightMentions() {
    const mentionPattern = /@(\w+)/g;
    const hashtagPattern = /#(\w+)(?=\W|$)/g;

    // Check if posts and posts.content exist before manipulating
    if (posts && posts?.content) {
        const highlightedContent = posts?.content
            .replace(mentionPattern, '<span class="mention">$&</span>')
            .replace(hashtagPattern, '<span class="hashtag" style="color: blue;">$&</span>');
        
        return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
    } else {
        return null; // Return something meaningful, or just return null if content is missing
    }
}

function handleLike(e){
    e.preventDefault()
    axios.post(`${API}/users/${username}/posts/${mainUser.id}/react/${id}`, likes)
    .then(() => {
        axios.get(`${API}/users/${username}/posts/${id}/reactions`)
        .then((res) => {
          setReaction(res.data);
        });
    })
}

function handleDislike(e){
    e.preventDefault()
    axios.post(`${API}/users/${username}/posts/${mainUser.id}/react/${id}`, dislike)
    .then(() => {
        axios.get(`${API}/users/${posts.creator.username}/posts/${posts.id}/reactions`)
        .then((res) => {
          setReaction(res.data);
        });
    })
}

console.log(posts?.creator?.id)

let [fav] = useState({
    creator_id: posts?.creator?.id
})


function handleAddFav(e){
    axios.post(`${API}/favorites/${mainUser?.id}/fav/${id}`, {creator_id: posts?.creator?.id})
    .then(() => {
        axios.get(`${API}/favorites/${mainUser?.id}/post/${id}`)
        .then((res) => {
            setFavorite(res.data)
        })
    })
}

function handleDeleteFav(e){

axios.delete(`${API}/favorites/${mainUser.id}/delete/${id}`)
.then(() => {
    axios.get(`${API}/favorites/${mainUser?.id}/post/${id}`)
    .then((res) => {
        setFavorite(res.data)
    })
})
}

function createRepost (e){
    e.preventDefault()
    axios.post(`${API}/users/${mainUser.username}/posts/${mainUser.username}/repost/${id}`, {user_id: posts.user_id})
    .then(() => {
        axios.put(`${API}/users/${username}/posts/${id}`, {repost_counter: posts.repost_counter += 1})
    })
}


console.log(posts)
return(

    <div className="posts_content">

<div className="posts_main_container">
    <div className="posts_extra_container">

    <div className="post_user_profile_container">
    <img
    src={posts.creator?.profile_img}
    alt={posts.creator?.profile_img}
    className="post_user_profile"
    />
    </div>

<div className="post_user_info_date_container">

<div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`}>

{posts.creator?.profile_name} | @{posts.creator?.username} | {formatDate(posts.time)}

</div>

  
<div className="posts_content_text_container">

    <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

       {highlightMentions(posts.content)}
    </div>
    {!posts.url ? null : (
            <div className={`embedded_link_container ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`}>
            <a href={posts.url} target="_blank">
                <img src={posts.url_img} className="post_article_img" alt={`${posts.url_title}`} />
            </a>
             <span className="url_title">{posts.url_title}</span>
            </div>
                
            )}
    <div className="posts_img_container">
    {posts.posts_img === "null" ? null : (

        <img src={posts.posts_img} alt={posts.posts_img} className="posts_img"/>
    )}

{posts.gif ? <img src={posts.gif} alt={posts.gif} className="gif_img"/> : null}

    </div>

 </div>

    </div>

</div>
 <div className="posts-options-container post_details_btns">

<div className="posts-reply-button">
<button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br reply_btn`}  onClick={(e) => { e.preventDefault(); setShow(true); }}>
<SlBubble size={20} /> {getReplies.length}
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
       {favorite?.favorites ?
       <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleDeleteFav} ><AiFillHeart size={20} color="red"/>
       <span className="hidden-text">Disike</span>
       </button>

       : <button onClick={handleAddFav} className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`}><AiOutlineHeart size={20}/>
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
   
   <ReplyForm open={show} onClose={() => {setShow(false); setShowEmojiPicker(false); setShowGifPicker(false)}}  setShowGifPicker={setShowGifPicker} showGifPicker={showGifPicker} setShowEmojiPicker={setShowEmojiPicker} showEmojiPicker={showEmojiPicker} users={user}  posts={posts} plan={plan} mainUser={mainUser} />
</div>
 
 </div>
<div className={`reply_form_container ${mainUser.dark_mode ? "border_dark" : "border_light"}`}>
<SamePageReplyForm users={user} mainUser={mainUser} plan={plan} posts={posts}/>
</div>
<div className="replies_container">
    {getReplies.map((reply) => {
        return(
            <Replies reply={reply} user={user} username={username} posts={posts} mainUser={mainUser}/>
        )
    })}
</div>
 
 </div>


)

}



export default PostsDetails