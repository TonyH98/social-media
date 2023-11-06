import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import { useEffect , useState } from "react";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"
import {PiArrowsClockwise} from "react-icons/pi"
import {SlBubble} from "react-icons/sl"
import ReplyForm from "../ReplyForm/ReplyForm";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Notification({users , notes, mainUser, plan}){

    let [favorites , setFavorites] = useState([])

    let [fav] = useState({
        creator_id: notes.users_id
    })

    let [likes] = useState({
        reaction: "like"
    })
    
    let [dislike] = useState({
        reaction: "dislike"
    })
    
    let [show , setShow] = useState(false)

    const [reaction , setReaction] = useState({})
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
const [showGifPicker, setShowGifPicker] = useState(false)

    useEffect(() => {
        axios.get(`${API}/users/${notes.creator.username}/posts/${notes.id}/reactions`)
        .then((res) => {
          setReaction(res.data);
        });
      }, [notes.id]);

      useEffect(() => {
        axios.get(`${API}/favorites/${mainUser.id}`)
        .then((res) => {
          setFavorites(res.data);
        });
      }, [mainUser.id]);

    function highlightMentions(content) {
        const mentionPattern = /@(\w+)/g;
        const hashtagPattern = /#(\w+)(?=\W|$)/g;
        
        const highlightedContent = content
        .replace(mentionPattern, '<span class="mention">$&</span>')
        .replace(hashtagPattern, `<span class="hashtag" style="color: blue;">$&</span>`)
        return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
    }

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

    function handleLike(e){
        e.preventDefault()
        axios.post(`${API}/users/${notes.creator.username}/posts/${mainUser.id}/react/${notes.id}`, likes)
        .then(() => {
            axios.get(`${API}/users/${notes.creator.username}/posts/${notes.id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            });
        })
    }
    
    function handleDislike(e){
        e.preventDefault()
        axios.post(`${API}/users/${notes.creator.username}/posts/${mainUser.id}/react/${notes.id}`, dislike)
        .then(() => {
            axios.get(`${API}/users/${notes.creator.username}/posts/${notes.id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            
            });
        })
    }
    
    function handleAddFav(e){
        e.preventDefault()
        axios
        .post(`${API}/favorites/${mainUser?.id}/fav/${notes.id}`, fav)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser.id}`)
            .then((res) => {
              setFavorites(res.data);
            });
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    function handleDeleteFav(e){
        e.preventDefault()
        axios.delete(`${API}/favorites/${mainUser.id}/delete/${notes.id}`)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser.id}`)
            .then((res) => {
              setFavorites(res.data);
            });
        })
        .catch((err) => {
            console.log(err)
        })
    }


    function createRepost (e){
        e.preventDefault()
        axios.post(`${API}/users/${mainUser.username}/posts/${mainUser.username}/repost/${notes?.id}`, {user_id: notes?.users_id})
        .then(() => {
            axios.put(`${API}/users/${notes.creator.username}/posts/${notes?.id}`, {repost_counter: notes.creator.repost_counter += 1})
        })
    }

    const inFav = Array.isArray(favorites) ? favorites.map((fav) => fav?.id) : [];
    return(
        <div className="posts_content">

        <div className="posts_extra_container">

        <div className="post_user_profile_container">
        <img
        src={notes.creator.profile_img}
        alt={notes.creator.profile_img}
        className="post_user_profile"
        />
        </div>

    <div className="post_user_info_date_container">

    <div  className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`}>

    {notes.creator.profile_name} | @{notes.creator.username} | {formatDate(notes.time)}

    </div>

        
    <div className="posts_content_text_container">

        <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

           {highlightMentions(notes.content)}
        </div>
         <div className="posts_img_container">
        {notes.creator.posts_img === "null" ? null : (

            <img src={notes.creator.posts_img} alt={notes.creator.posts_img} className="posts_img"/>
        )}

        </div> 
    
     </div>

     
     </div>

        </div>
        <div className="posts-options-container">


        <div className="posts-reply-button">
  <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br reply_btn`}  onClick={(e) => { e.preventDefault(); setShow(true); }}>
    <SlBubble size={20} /> 
    <span className="hidden-text">Reply</span>
  </button>
</div>


    <div className="favorite_posts_container">
       {mainUser && inFav.includes(notes?.id) ? 
       <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleDeleteFav}><AiFillHeart size={20} color="red"/>
       <span className="hidden-text">Disike</span>
       </button>

       : <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleAddFav}><AiOutlineHeart size={20}/>
       <span className="hidden-text">Like</span>
       </button>}

   </div> 

        
   <div className="repost-button">
<button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} 
onClick={createRepost}><PiArrowsClockwise size={20}/> {notes.creator.repost_counter}
 <span className="hidden-text">Repost</span>
 </button>
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

   <ReplyForm open={show} onClose={() => {setShow(false); setShowEmojiPicker(false);  setShowGifPicker(false)}} users={users} showGifPicker={showGifPicker} setShowGifPicker={setShowGifPicker} setShowEmojiPicker={setShowEmojiPicker} showEmojiPicker={showEmojiPicker}  posts={notes} plan={plan} mainUser={mainUser}/>
</div>
     </div>

    )
}

export default Notification