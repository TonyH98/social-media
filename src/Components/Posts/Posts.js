import "./Posts.css"
import YouTube from "react-youtube";
import {Link} from "react-router-dom"
import {SlBubble} from "react-icons/sl"
import ReplyForm from "../ReplyForm/ReplyForm";
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import { useEffect , useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { addFav , deleteFav, getReactions, addReaction} from "../../Store/userActions";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"

function Posts ({posts, users, favorites}){

let [show , setShow] = useState(false)


let [fav] = useState({
    creator_id: posts.creator.id
})

let [likes] = useState({
    reaction: "like"
})

let [dislike] = useState({
    reaction: "dislike"
})

const reaction = useSelector((state) => state.react.react)

let dispatch = useDispatch()

useEffect(() => {
dispatch(getReactions(posts.creator.username , posts?.id))
}, [dispatch])

function formatDate(inputDate){
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

    const [month, day, year] = inputDate.split("/").map(Number);
    const formattedMonth = months[month - 1]
    const formattedYear = year.toString().slice(-2)

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

const youtubeLinkPattern = /https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/g;


const matches = posts.content.match(youtubeLinkPattern);

const inFav = Array.isArray(favorites) ? favorites.map(fav => fav?.posts_id) : [];
  

function handleAddFav(e){
    e.preventDefault()
    dispatch(addFav(users, posts.id, fav))
}

function handleDeleteFav(e){
    e.preventDefault()
    dispatch(deleteFav(users, posts.id))
}


function handleLike(e){
    e.preventDefault()
    dispatch(addReaction(posts.creator.username, users.id, posts.id, likes))
}

function handleDislike(e){
    e.preventDefault()
    dispatch(addReaction(posts.creator.username, users.id, posts.id, dislike))
}


    return(
        <div className="posts_content">

            <div className="post_user_profile_container">
            <img
            src={posts.creator.profile_img}
            alt={posts.creator.profile_img}
            className="post_user_profile"
            />
            </div>
            
        <div className="post_user_info_date_container">

        <div className="post_user_profile">

        {posts.creator.profile_name} | @{posts.creator.username} | {formatDate(posts.time)}

        </div>

            <Link to={`/posts/${posts.creator.username}/${posts?.id}`} className="link-style">
        <div className="posts_content_text_container">

            <div className="post_text">

               {highlightMentions(posts.content)}
            </div>
            <div className="posts_img_container">
            {posts.posts_img === "null" ? null : (

                <img src={posts.posts_img} alt={posts.posts_img} className="posts_img"/>
            )}

            </div>
        
        {matches ? (
            matches.map((video) => {
                console.log(video.split('=')[1])
                return(
                    <YouTube
                    videoId={video.split('=')[1]}
                    className={"youtube-video"}
                    sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
                    />

                )
            })
        
         ): null}
         
         </div>
        </Link>
         
         </div>
         
         <div className="posts-options-container">
            <div className="posts-reply-button">
            <button onClick={(e) => { e.preventDefault(); setShow(true); }}>
             <SlBubble size={20} color="black" />
            </button>
            </div>

            <div className="favorite_posts_container">
                {users && inFav.includes(posts?.id) ? 
                <button onClick={handleDeleteFav}><AiFillHeart size={30}/></button>
                : <button onClick={handleAddFav}><AiOutlineHeart size={30}/></button>}

            </div>

            <div className="like-dislike-container">
            <button onClick={handleLike}><AiOutlineLike size={30}/> {reaction.likes}</button>
            <button onClick={handleDislike}><AiOutlineDislike size={30}/> {reaction.dislikes}</button>
            </div>


            <ReplyForm open={show} onClose={() =>  setShow(false)} users={users} posts={posts}/>
         </div>
         
         </div>

         )
        }
        
        
        export default Posts