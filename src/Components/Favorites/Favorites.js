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

    const [show , setShow] = useState(false)

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
        axios.get(`${API}/favorites/${mainUser?.id}`)
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
        axios.get(`${API}/users/${fav.creator.username}/posts/${fav.id}/reactions`)
        .then((res) => {
          setReaction(res.data);
        });
      }, [fav.id]);


    function handleLike(e){
        e.preventDefault()
        axios.post(`${API}/users/${fav.creator.username}/posts/${mainUser.id}/react/${fav.id}`, likes)
        .then(() => {
            axios.get(`${API}/users/${fav.creator.username}/posts/${fav.id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            });
        })
    }
    
    function handleDislike(e){
        e.preventDefault()
        axios.post(`${API}/users/${fav.creator.username}/posts/${mainUser.id}/react/${fav.id}`, dislike)
        .then(() => {
            axios.get(`${API}/users/${fav.creator.username}/posts/${fav.id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            });
        })
    }
    
    function handleAddFav(e){
        e.preventDefault()
        axios.post(`${API}/favorites/${mainUser?.id}/fav/${fav.id}`, favs)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser?.id}`)
        .then((res) => {
            setFavorites(res.data)
        })
        })
    }

    function handleDeleteFav(e){
        e.preventDefault()
        axios.delete(`${API}/favorites/${mainUser.id}/delete/${fav.id}`)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser?.id}`)
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


    const inFav = Array.isArray(favorites) ? favorites.map((fav) => fav?.id) : [];

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
    <div className="posts-options-container">

<div className="posts-reply-button">
<button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br reply_btn`}
onClick={() => setShow(!show)}
>
<SlBubble size={20} /> 
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
       {users && inFav.includes(fav?.id) ? 
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
 
 </div>

)

}

export default Favorites