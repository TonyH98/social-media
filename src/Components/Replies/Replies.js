import "./Replies.css"
import { useState , useEffect } from "react"
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import {PiArrowsClockwise} from "react-icons/pi"
import { useDispatch , useSelector } from "react-redux";
import {getFavoriteReplies , 
    deleteFavReplies,
     addFavR, addReactionR
    } from "../../Store/userActions";
import axios from "axios"


const API = process.env.REACT_APP_API_URL;
function Replies({reply , user , username, posts, mainUser}){
 
    let [fav] = useState({
        creator_id: reply.creator.id
    })

    let [likes] = useState({
        reaction: "like",
        creator_id: reply.creator.id
    })
    
    let [dislike] = useState({
        reaction: "dislike",
        creator_id: reply.creator.id
    })

    let [block , setBlock] = useState([])

    let [otherBlock , setOtherBlock] = useState([])

    useEffect(() => {
        axios.get(`${API}/block/${mainUser?.id}`)
        .then((res) => {
          setBlock(res.data)
        })

        axios.get(`${API}/block/${reply.creator.id}`)
        .then((res) => {
          setOtherBlock(res.data)
        })
      
      }, [mainUser?.id , reply.creator.id])

    let dispatch = useDispatch()

    const favoriteR = useSelector((state) => state.favR.fav)

    const [reaction, setReaction] = useState({})

    useEffect(() => {
        dispatch(getFavoriteReplies(user.id)) 
        }, [dispatch , username])

useEffect(() => {
    axios.get(`${API}/users/${username}/posts/${posts.id}/reply/${reply.id}/reactionsR`)
    .then((res) => {
        setReaction(res.data)
    })
}, [username, posts])


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

const inFav = Array.isArray(favoriteR) ? favoriteR.map(fav => fav?.reply_id) : [];

const inBlock = Array.isArray(block) ? block.map(block => block.block_id) : []

const inOtherBlock = Array.isArray(otherBlock) ? otherBlock.map(block => block.block_id) : []

function handleFavorite(e){
    e.preventDefault()
    dispatch(addFavR(user?.id , reply.id, fav))
}

function handleDeleteFavorite(e){
    e.preventDefault()
    dispatch(deleteFavReplies(user?.id , reply.id))
}


function handleLike(e){
    e.preventDefault()
    axios.post(`${API}/users/${username}/posts/${posts.id}/reply/${user.id}/reactR/${reply.id}`, likes)
    .then(() => {
        axios.get(`${API}/users/${username}/posts/${posts.id}/reply/${reply.id}/reactionsR`)
        .then((res) => {
            setReaction(res.data)
        })
    })
}

function handleDislike(e){
    e.preventDefault()
    axios.post(`${API}/users/${username}/posts/${posts.id}/reply/${user.id}/reactR/${reply.id}`, dislike)
    .then(() => {
        axios.get(`${API}/users/${username}/posts/${posts.id}/reply/${reply.id}/reactionsR`)
        .then((res) => {
            setReaction(res.data)
        })
    })
}

console.log(reaction)

return(

<div className="posts_content">

<div className="replies">
    <div className="post_user_profile_container">
    <img
    src={reply?.creator?.profile_img}
    alt={reply?.creator?.profile_img}
    className="post_user_profile"
    />
    </div>
<div className="post_user_info_date_container">

<div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`}>

{reply?.creator?.profile_name} | @{reply?.creator?.username} | {formatDate(reply.time)}

</div>


{inBlock.includes(reply.creator.id) || inOtherBlock.includes(mainUser.id)? 
<h2 className={`${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`} >@{reply.creator.username} Blocked</h2> :
<div>
<div className="posts_content_text_container">

<div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

   {highlightMentions(reply.content)}
</div>

{!reply.url ? null : (
            <div className="embedded_link_container">
            <a href={reply.url} target="_blank">
                <img src={reply.url_img} className="post_article_img" alt={`${reply.url_title}`} />
            </a>
             <span className="url_title">{reply.url_title}</span>
            </div>
                
            )}
<div className="posts_img_container">
            {reply.posts_img === null || reply.posts_img === "null" ? null : (

                <img src={reply.posts_img} alt={reply.posts_img} className="posts_img"/>
            )}
        {reply.gif ? <img src={reply.gif} alt={reply.gif} className="gif_img"/> : null}

            </div>

</div>



</div>

}


</div>

</div>
{inBlock.includes(reply.creator.id) || inOtherBlock.includes(mainUser.id)? null : 
<div className="posts-options-container">


<div className="repost_btn_container">
    <button className="no_br"><PiArrowsClockwise size={20}/></button>
</div>


<div className="favorite_posts_container">
                {user && inFav.includes(reply?.id) ? 
                <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleDeleteFavorite} ><AiFillHeart size={20} color="red"/>
                <span className="hidden-text">Disike</span>
                </button>

                : <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleFavorite}><AiOutlineHeart size={20}/>
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
</div>

}

  


</div>

)

}


export default Replies