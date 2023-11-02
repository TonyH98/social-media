import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import { useEffect , useState } from "react";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"

import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Notification({users , notes, mainUser}){

    let [favorites , setFavorites] = useState([])

    let [fav] = useState({
        creator_id: notes.sender_id
    })

    let [likes] = useState({
        reaction: "like"
    })
    
    let [dislike] = useState({
        reaction: "dislike"
    })
    
    const [reaction , setReaction] = useState({})

    useEffect(() => {
        axios.get(`${API}/users/${notes.post_content.username}/posts/${notes.posts_id}/reactions`)
        .then((res) => {
          setReaction(res.data);
        });
      }, [notes.posts_id]);

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
        axios.post(`${API}/users/${notes.post_content.username}/posts/${mainUser.id}/react/${notes.posts_id}`, likes)
        .then(() => {
            axios.get(`${API}/users/${notes.post_content.username}/posts/${notes.posts_id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            });
        })
    }
    
    function handleDislike(e){
        e.preventDefault()
        axios.post(`${API}/users/${notes.post_content.username}/posts/${mainUser.id}/react/${notes.posts_id}`, dislike)
        .then(() => {
            axios.get(`${API}/users/${notes.post_content.username}/posts/${notes.posts_id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            
            });
        })
    }
    
    function handleAddFav(e){
        e.preventDefault()
        axios
        .post(`${API}/favorites/${mainUser?.id}/fav/${notes.posts_id}`, fav)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser.id}`)
            .then((res) => {
              setFavorites(res.data);
            });
        })
    }
    
    function handleDeleteFav(e){
        e.preventDefault()
        axios.delete(`${API}/favorites/${mainUser.id}/delete/${notes.posts_id}`)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser.id}`)
            .then((res) => {
              setFavorites(res.data);
            });
        })
    }

    const inFav = Array.isArray(favorites) ? favorites.map((fav) => fav?.posts_id) : [];
    return(
        <div className="posts_content">

        <div className="posts_extra_container">

        <div className="post_user_profile_container">
        <img
        src={notes.post_content.profile_img}
        alt={notes.post_content.profile_img}
        className="post_user_profile"
        />
        </div>

    <div className="post_user_info_date_container">

    <div  className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`}>

    {notes.post_content.profile_name} | @{notes.post_content.username} | {formatDate(notes.post_content.date_created)}

    </div>

        
    <div className="posts_content_text_container">

        <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

           {highlightMentions(notes.post_content.content)}
        </div>
         <div className="posts_img_container">
        {notes.post_content.post_img === "null" ? null : (

            <img src={notes.post_content.post_img} alt={notes.post_content.post_img} className="posts_img"/>
        )}

        </div> 
    
     </div>

     
     </div>

        </div>
        <div className="posts-options-container">





    <div className="favorite_posts_container">
       {mainUser && inFav.includes(notes?.posts_id) ? 
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

  
</div>
     </div>

    )
}

export default Notification