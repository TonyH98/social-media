import {SlBubble} from "react-icons/sl"
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import { useEffect , useState } from "react";
import {PiArrowsClockwise} from "react-icons/pi"
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"
import {Link} from "react-router-dom"
import ReplyForm from "../ReplyForm/ReplyForm";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Favorites({fav , mainUser, users, plan}){

    const [reaction , setReaction] = useState({})

    const [reactionR, setReactionR] = useState({})

    const [show , setShow] = useState(false)

    let [repliesCount , setRepliesCount] = useState([])

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [showGifPicker, setShowGifPicker] = useState(false)

    let [likes] = useState({
        reaction: "like",
        creator_id: fav.creator.id
    })
    
    let [dislike] = useState({
        reaction: "dislike",
        creator_id: fav.creator.id
    })

    let [favs] = useState({
        creator_id: fav.creator.id
    })

    
    let [favorites, setFavorites] = useState([])

    useEffect(() => {
        axios.get(`${API}/favorites/${mainUser?.id}/all`)
        .then((res) => {
            setFavorites(res.data)
        })
    }, [mainUser?.id])


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
    

    useEffect(() => {
        axios.get(`${API}/users/${fav.creator.username}/posts/${fav.posts_id}/reactions`)
        .then((res) => {
          setReaction(res.data);
        });
        axios.get(`${API}/users/${fav.creator.username}/posts/${fav.posts_id}/reply/${fav.reply_id}/reactionsR`)
        .then((res) => {
          setReactionR(res.data);
        });

      }, [fav.posts_id, fav.reply_id]);

      useEffect(() => {
        axios.get(`${API}/users/${fav.creator.username}/posts/${fav.posts_id}/reply`)
        .then((res) => {
            setRepliesCount(res.data)
        })
      }, [fav.creator.username])

    function handleLike(e){
        e.preventDefault()
        axios.post(`${API}/users/${fav.creator.username}/posts/${mainUser.id}/react/${fav.posts_id}`, likes)
        .then(() => {
            axios.get(`${API}/users/${fav.creator.username}/posts/${fav.posts_id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            });
        })
    }
    
    function handleDislike(e){
        e.preventDefault()
        axios.post(`${API}/users/${fav.creator.username}/posts/${mainUser.id}/react/${fav.posts_id}`, dislike)
        .then(() => {
            axios.get(`${API}/users/${fav.creator.username}/posts/${fav.posts_id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            });
        })
    }
    

    function handleLikeR(e){
        e.preventDefault()
        axios.post(`${API}/users/${fav.creator.username}/posts/${fav.origin_id}/reply/${mainUser.id}/reactR/${fav.reply_id}`, likes)
        .then(() => {
            axios.get(`${API}/users/${fav.creator.username}/posts/${fav.posts_id}/reply/${fav.reply_id}/reactionsR`)
        .then((res) => {
          setReactionR(res.data);
        });
        })
    }
    
    function handleDislikeR(e){
        e.preventDefault()
        axios.post(`${API}/users/${fav.creator.username}/posts/${fav.origin_id}/reply/${mainUser.id}/reactR/${fav.reply_id}`, dislike)
        .then(() => {
            axios.get(`${API}/users/${fav.creator.username}/posts/${fav.posts_id}/reply/${fav.reply_id}/reactionsR`)
        .then((res) => {
          setReactionR(res.data);
        });
        })
    }




    function handleAddFav(e){
        e.preventDefault()
        axios.post(`${API}/favorites/${mainUser?.id}/fav/${fav.posts_id}`, favs)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser?.id}/all`)
        .then((res) => {
            setFavorites(res.data)
        })
        })
    }



    
    function handleDeleteFav(e){
        e.preventDefault()
        axios.delete(`${API}/favorites/${mainUser.id}/delete/${fav.posts_id}`)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser?.id}/all`)
        .then((res) => {
            setFavorites(res.data)
        })
        })
        
    }
    

    function handleAddFavR(e){
        e.preventDefault()
        axios.post(`${API}/favorites/${mainUser?.id}/favR/${fav.reply_id}`, favs)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser?.id}/all`)
        .then((res) => {
            setFavorites(res.data)
        })
        })
    }

    function handleDeleteFavR(e){
        e.preventDefault()
        axios.delete(`${API}/favorites/${mainUser.id}/deleteR/${fav.reply_id}`)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser?.id}/all`)
            .then((res) => {
            setFavorites(res.data)
        })
        })
        
    }


    function createRepost (e){
        e.preventDefault()
        axios.post(`${API}/users/${mainUser.username}/posts/${mainUser.username}/repost/${fav.id}`, {user_id: fav.creator.id})
        .then(() => {
            axios.put(`${API}/users/${fav.creator.username}/posts/${fav.id}`, {repost_counter: fav.repost_counter += 1})
        })
    }


    const inFavP = Array.isArray(favorites) ? favorites.map((fav) => fav?.posts_id) : [];
    const inFavR = Array.isArray(favorites) ? favorites.map((fav) => fav?.reply_id) : [];

    console.log("replies", inFavR)
    console.log("posts", inFavP)

return(
    <div className="posts_content">

    <div className="posts_extra_container">

    <div className="post_user_profile_container">
    <img
    src={fav.creator.profile_img}
    alt={fav.creator.profile_img}
    className="post_user_profile"
    />
    </div>

<div className="post_user_info_date_container">

<div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`} >

{fav.creator.profile_name} | @{fav.creator.username} | {formatDate(fav.time)}

</div>

    <Link to={`/posts/${fav.creator.username}/${fav?.id}`} className="link-style">
<div className="posts_content_text_container">

    <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

       {highlightMentions(fav.content)}
    </div>
    {!fav.url ? null : (
            <div className={`embedded_link_container ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`}>
            <a href={fav.url} target="_blank">
                <img src={fav.url_img} className="post_article_img" alt={`${fav.url_title}`} />
            </a>
             <span className="url_title">{fav.url_title}</span>
            </div>
                
            )}

    <div className="posts_img_container">
    {fav.posts_img === "null" ? null : (

        <img src={fav.posts_img} alt={fav.posts_img} className="posts_img"/>
    )}
 {fav.gif ? <img src={fav.gif} alt={fav.gif} className="gif_img"/> : null}
    </div>


 
 </div>
</Link>
 
 </div>

    </div>

{fav.posts_id ? (
    <div className="posts-options-container">

<div className="posts-reply-button">
<button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br reply_btn`}
onClick={() => setShow(!show)}
>
<SlBubble size={20} /> {repliesCount.length} 
<span className="hidden-text">Reply</span>
</button>
</div>

<div className="repost-button">
<button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} 
onClick={createRepost}><PiArrowsClockwise size={20}/> {fav.repost_counter}
<span className="hidden-text">Repost</span>
</button>
</div>


    <div className="favorite_posts_container">
       {users && inFavP.includes(fav?.posts_id) ? 
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

   <ReplyForm open={show} onClose={() => {setShow(false); setShowEmojiPicker(false);  setShowGifPicker(false)}} showGifPicker={showGifPicker} setShowGifPicker={setShowGifPicker} setShowEmojiPicker={setShowEmojiPicker} showEmojiPicker={showEmojiPicker} users={users} posts={fav} plan={plan} mainUser={mainUser}/>
</div>


) : (

    <div className="posts-options-container">


    <div className="favorite_posts_container">
       {users && inFavR.includes(fav?.reply_id) ? 
       <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleDeleteFavR}><AiFillHeart size={20} color="red"/>
       <span className="hidden-text">Disike</span>
       </button>

       : <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleAddFavR}><AiOutlineHeart size={20}/>
       <span className="hidden-text">Like</span>
       </button>}

   </div> 

   
   <div className="like-container">
   <button className={`${reactionR?.dislikeId?.includes(mainUser?.id) ? 'green_option_btn' : `${mainUser.dark_mode ? "light_outline" : "dark_outline"}`} no_br react_btn`} onClick={handleLikeR}><AiOutlineLike size={20} /> {reactionR.likes}
   <span className="hidden-text">Like</span>
   </button>
  
   </div>
   
   

   <div className="dislike-container">
   <button className={`${reactionR?.dislikeId?.includes(mainUser?.id) ? 'red_option_btn' : `${mainUser.dark_mode ? "light_outline" : "dark_outline"}`} no_br react_btn`} onClick={handleDislikeR}><AiOutlineDislike size={20}/> {reactionR.dislikes}
   <span className="hidden-text">Dislike</span>
   </button>
   </div> 

</div>


)}

 
 </div>

)

}

export default Favorites

