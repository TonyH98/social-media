import {SlBubble} from "react-icons/sl"
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import { useEffect , useState } from "react";
import {PiArrowsClockwise} from "react-icons/pi"
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"
import {Link} from "react-router-dom"
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Favorites({fav , mainUser}){

    const [reaction , setReaction] = useState({})


    let [likes] = useState({
        reaction: "like"
    })
    
    let [dislike] = useState({
        reaction: "dislike"
    })
    
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
        axios.get(`${API}/users/${fav.post_creator.username}/posts/${fav.posts_id}/reactions`)
        .then((res) => {
          setReaction(res.data);
        });
      }, [fav.posts_id]);


    function handleLike(e){
        e.preventDefault()
        axios.post(`${API}/users/${fav.post_creator.username}/posts/${mainUser.id}/react/${fav.posts_id}`, likes)
        .then(() => {
            axios.get(`${API}/users/${fav.post_creator.username}/posts/${fav.posts_id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            });
        })
    }
    
    function handleDislike(e){
        e.preventDefault()
        axios.post(`${API}/users/${fav.post_creator.username}/posts/${mainUser.id}/react/${fav.posts_id}`, dislike)
        .then(() => {
            axios.get(`${API}/users/${fav.post_creator.username}/posts/${fav.posts_id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            });
        })
    }
    
    
    
    function createRepost (e){
        e.preventDefault()
        axios.post(`${API}/users/${mainUser.username}/posts/${mainUser.username}/repost/${fav.posts_id}`, {user_id: fav.post_creator.creator_id})
        .then(() => {
            axios.put(`${API}/users/${fav.post_creator.username}/posts/${fav.posts_id}`, {repost_counter: fav.repost_counter.repost_counter += 1})
        })
    }

return(
    <div className="posts_content">

    <div className="posts_extra_container">

    <div className="post_user_profile_container">
    <img
    src={fav.post_creator.profile_img}
    alt={fav.post_creator.profile_img}
    className="post_user_profile"
    />
    </div>

<div className="post_user_info_date_container">

<div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`} >

{fav.post_creator.profile_name} | @{fav.post_creator.username} | {formatDate(fav.post_creator.date_created)}

</div>

    <Link to={`/posts/${fav.post_creator.username}/${fav?.posts_id}`} className="link-style">
<div className="posts_content_text_container">

    <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

       {highlightMentions(fav.post_creator.content)}
    </div>
    <div className="posts_img_container">
    {fav.post_creator.image === "null" ? null : (

        <img src={fav.post_creator.image} alt={fav.post_creator.image} className="posts_img"/>
    )}

    </div>


 
 </div>
</Link>
 
 </div>

    </div>
    <div className="posts-options-container">

<div className="posts-reply-button">
<button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br reply_btn`}>
<SlBubble size={20} /> 
<span className="hidden-text">Reply</span>
</button>
</div>

<div className="repost-button">
<button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} 
onClick={createRepost}><PiArrowsClockwise size={20}/> {fav.post_creator.repost_counter}
<span className="hidden-text">Repost</span>
</button>
</div>


    {/* <div className="favorite_posts_container">
       {users && inFav.includes(posts?.id) ? 
       <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleDeleteFav}><AiFillHeart size={20} color="red"/>
       <span className="hidden-text">Disike</span>
       </button>

       : <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleAddFav}><AiOutlineHeart size={20}/>
       <span className="hidden-text">Like</span>
       </button>}

   </div>  */}

   
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

   {/* <ReplyForm open={show} onClose={() => {setShow(false); setShowEmojiPicker(false);  setShowGifPicker(false)}} showGifPicker={showGifPicker} setShowGifPicker={setShowGifPicker} setShowEmojiPicker={setShowEmojiPicker} showEmojiPicker={showEmojiPicker} users={users} posts={posts} plan={plan} mainUser={mainUser}/> */}
</div>
 
 </div>

)

}

export default Favorites