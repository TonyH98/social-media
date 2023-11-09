import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import {SlBubble} from "react-icons/sl"
import { useEffect , useState } from "react";


import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function TagReplies({tag, mainUser, plan}){

    const [reaction , setReaction] = useState({})

    let [favorites, setFavorites] = useState([])

    let [likes] = useState({
        reaction: "like",
        creator_id: tag.creator.id
    })
    
    let [dislike] = useState({
        reaction: "dislike",
        creator_id: tag.creator.id
    })

    let [fav] = useState({
        creator_id: tag.creator.id
    })

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


    useEffect(() => {
        axios.get(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reply/${tag.id}/reactionsR`)
        .then((res) => {
          setReaction(res.data);
        });
      }, [tag.id]);

      useEffect(() => {
        axios.get(`${API}/favorites/${mainUser.id}/replies`)
        .then((res) => {
            setFavorites(res.data)
        })
      }, [mainUser.id])


      function handleLike(e){
        e.preventDefault()
        axios.post(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reply/${mainUser.id}/reactR/${tag.id}`, likes)
        .then(() => {
            axios.get(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reply/${tag.id}/reactionsR`)
        .then((res) => {
          setReaction(res.data);
        });
        })
    }
    
    function handleDislike(e){
        e.preventDefault()
        axios.post(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reply/${mainUser.id}/reactR/${tag.id}`, dislike)
        .then(() => {
            axios.get(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reply/${tag.id}/reactionsR`)
        .then((res) => {
          setReaction(res.data);
        });
        })
    }

    function handleAddFav(e){
        e.preventDefault()
        axios.post(`${API}/favorites/${mainUser.id}/favR/${tag.id}`, fav)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser.id}/replies`)
            .then((res) => {
            setFavorites(res.data)
        })
        })
    }
    
    function handleDeleteFav(e){
        e.preventDefault()
        axios.delete(`${API}/favorites/${mainUser.id}/deleteR/${tag.id}`)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser.id}/replies`)
            .then((res) => {
            setFavorites(res.data)
        })
        })
    }

    const inFav = Array.isArray(favorites) ? favorites.map((fav) => fav?.reply_id) : [];

    return(
        <div className="posts_content">

        <div className="posts_extra_container">

        <div className="post_user_profile_container">
        <img
        src={tag.creator.profile_img}
        alt={tag.creator.profile_img}
        className="post_user_profile"
        />
        </div>

    <div className="post_user_info_date_container">

    <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`}>

    {tag.creator.profile_name} | @{tag.creator.username} | {formatDate(tag.time)}

    </div>

        
    <div className="posts_content_text_container">

        <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

           {highlightMentions(tag.content)}
        </div>
         <div className="posts_img_container">
        {tag.posts_img === "null" ? null : (

            <img src={tag.posts_img} alt={tag.posts_img} className="posts_img"/>
        )}
         {tag.gif ? <img src={tag.gif} alt={tag.gif} className="gif_img"/> : null}

        </div> 
    
     </div>

     
     </div>

        </div>
        
        <div className="posts-options-container">





<div className="favorite_posts_container">
   {mainUser && inFav.includes(tag?.id) ? 
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

export default TagReplies