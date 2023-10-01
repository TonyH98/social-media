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
import { addFav , deleteFav, getReactions, addReaction, getFavorite} from "../../Store/userActions";

function PostsDetails({user , plan}){

const {username , id} = useParams()

let [show , setShow] = useState(false)

let [likes] = useState({
    reaction: "like"
})

let [dislike] = useState({
    reaction: "dislike"
})


const dispatch = useDispatch()

const posts = useSelector((state) => state.postsDetail.postDetail);

const getReplies = useSelector((state) => state.replies.replies)

const reaction = useSelector((state) => state.react.react)

const favorite = useSelector((state) => state.idFav.fav)





useEffect(() => {
    if(username && id){
        dispatch(getPostDetails(username , id))
        dispatch(fetchReplies(username, id))
        dispatch(getReactions(username , posts?.id))
        dispatch(getFavorite(user?.id , id))
    }
}, [dispatch . username , id, posts?.id, user?.id])



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
    dispatch(addReaction(posts.creator.username, user.id, posts.id, likes))
}

function handleDislike(e){
    e.preventDefault()
    dispatch(addReaction(posts.creator.username, user.id, posts.id, dislike))
}

console.log(posts?.creator?.id)

let [fav] = useState({
    creator_id: posts?.creator?.id
})


function handleAddFav(e){
    e.preventDefault()
    dispatch(addFav(user, posts.id, fav))
}

function handleDeleteFav(e){
    e.preventDefault()
    dispatch(deleteFav(user, posts.id))
}



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

<div className="post_user_profile">

{posts.creator?.profile_name} | @{posts.creator?.username} | {formatDate(posts.time)}

</div>

  
<div className="posts_content_text_container">

    <div className="post_text">

       {highlightMentions(posts.content)}
    </div>
    <div className="posts_img_container">
    {posts.posts_img === "null" ? null : (

        <img src={posts.posts_img} alt={posts.posts_img} className="posts_img"/>
    )}

    </div>

 </div>
 <div className="posts-options-container">

<div className="posts-reply-button">
<button className="no_br reply_btn" onClick={(e) => { e.preventDefault(); setShow(true); }}>
<SlBubble size={20} /> {getReplies.length}
<span className="hidden-text">Reply</span>
</button>
</div>



   <div className="favorite_posts_container">
       {favorite && favorite?.favorites ?
       <button className="no_br fav_btn" onClick={handleDeleteFav} ><AiFillHeart size={20} color="red"/>
       <span className="hidden-text">Disike</span>
       </button>

       : <button onClick={handleAddFav} className="no_br fav_btn"><AiOutlineHeart size={20}/>
       <span className="hidden-text">Like</span>
       </button>}

   </div>

   <div className="like-container">

   <button className="no_br react_btn" onClick={handleLike}><AiOutlineLike size={20}/> {reaction.likes}
   <span className="hidden-text">Like</span>
   </button>
  
   </div>
   
   <div className="dislike-container">
   <button  className="no_br react_btn" onClick={handleDislike}><AiOutlineDislike size={20}/> {reaction.dislikes}
   <span className="hidden-text">Dislike</span>
   </button>
   </div>

   <ReplyForm open={show} onClose={() =>  setShow(false)} users={user}  posts={posts} plan={plan}/>
</div>
 
 </div>

    </div>

</div>
    
<div className="replies_container">
    {getReplies.map((reply) => {
        return(
            <Replies reply={reply}/>
        )
    })}
</div>
 
 </div>


)

}



export default PostsDetails