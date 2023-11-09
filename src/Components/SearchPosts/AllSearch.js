
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import {SlBubble} from "react-icons/sl"
import ReplyForm from "../ReplyForm/ReplyForm"
import { useEffect , useState } from "react";
import {PiArrowsClockwise} from "react-icons/pi"

import axios from "axios";

const API = process.env.REACT_APP_API_URL;



function AllSearch({tag, mainUser, plan}){

    const [reaction , setReaction] = useState({})

    const [reactionR, setReactionR] = useState({})

    const [show , setShow] = useState(false)

    let [block , setBlock] = useState([])

    let [otherBlock , setOtherBlock] = useState([])

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const [showGifPicker, setShowGifPicker] = useState(false)

    let [likes] = useState({
        reaction: "like",
        creator_id: tag.creator.id
    })
    
    let [dislike] = useState({
        reaction: "dislike",
        creator_id: tag.creator.id
    })

    let [favs] = useState({
        creator_id: tag.creator.id
    })

    
    let [favorites, setFavorites] = useState([])


    useEffect(() => {
        axios.get(`${API}/favorites/${mainUser?.id}/all`)
        .then((res) => {
            setFavorites(res.data)
        })
    }, [mainUser?.id])

    useEffect(() => {
        axios.get(`${API}/block/${mainUser?.id}`)
        .then((res) => {
          setBlock(res.data)
        })
        axios.get(`${API}/block/${tag.creator.id}`)
        .then((res) => {
          setOtherBlock(res.data)
        })
      
      }, [mainUser?.id])

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
        axios.get(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reactions`)
        .then((res) => {
          setReaction(res.data);
        });
        axios.get(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reply/${tag.reply_id}/reactionsR`)
        .then((res) => {
          setReactionR(res.data);
        });

      }, [tag.post_id, tag.reply_id]);


      function handleLike(e){
        e.preventDefault()
        axios.post(`${API}/users/${tag.creator.username}/posts/${mainUser.id}/react/${tag.posts_id}`, likes)
        .then(() => {
            axios.get(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            });
        })
    }
    
    function handleDislike(e){
        e.preventDefault()
        axios.post(`${API}/users/${tag.creator.username}/posts/${mainUser.id}/react/${tag.posts_id}`, dislike)
        .then(() => {
            axios.get(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reactions`)
            .then((res) => {
              setReaction(res.data);
            });
        })
    }
    


      function handleLikeR(e){
        e.preventDefault()
        axios.post(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reply/${mainUser.id}/reactR/${tag.reply_id}`, likes)
        .then(() => {
            axios.get(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reply/${tag.reply_id}/reactionsR`)
        .then((res) => {
          setReactionR(res.data);
        });
        })
    }
    
    function handleDislikeR(e){
        e.preventDefault()
        axios.post(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reply/${mainUser.id}/reactR/${tag.reply_id}`, dislike)
        .then(() => {
            axios.get(`${API}/users/${tag.creator.username}/posts/${tag.posts_id}/reply/${tag.reply_id}/reactionsR`)
        .then((res) => {
          setReactionR(res.data);
        });
        })
    }




    function handleAddFav(e){
        e.preventDefault()
        axios.post(`${API}/favorites/${mainUser?.id}/fav/${tag.posts_id}`, favs)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser?.id}/all`)
        .then((res) => {
            setFavorites(res.data)
        })
        })
    }



    
    function handleDeleteFav(e){
        e.preventDefault()
        axios.delete(`${API}/favorites/${mainUser.id}/delete/${tag.posts_id}`)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser?.id}/all`)
        .then((res) => {
            setFavorites(res.data)
        })
        })
        
    }
    

    function handleAddFavR(e){
        e.preventDefault()
        axios.post(`${API}/favorites/${mainUser?.id}/favR/${tag.reply_id}`, favs)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser?.id}/all`)
        .then((res) => {
            setFavorites(res.data)
        })
        })
    }

    function handleDeleteFavR(e){
        e.preventDefault()
        axios.delete(`${API}/favorites/${mainUser.id}/deleteR/${tag.reply_id}`)
        .then(() => {
            axios.get(`${API}/favorites/${mainUser?.id}/all`)
            .then((res) => {
            setFavorites(res.data)
        })
        })
        
    }


    function createRepost (e){
        e.preventDefault()
        axios.post(`${API}/users/${mainUser.username}/posts/${mainUser.username}/repost/${tag.posts_id}`, {user_id: tag.creator.id})
        .then(() => {
            axios.put(`${API}/users/${tag.creator.username}/posts/${tag.id}`, {repost_counter: tag.repost_counter += 1})
        })
    }

    const inFavP = Array.isArray(favorites) ? favorites.map((fav) => fav?.posts_id) : [];
    const inFavR = Array.isArray(favorites) ? favorites.map((fav) => fav?.reply_id) : [];

    const inBlock = Array.isArray(block) ? block.map(block => block.block_id) : []

    const inOtherBlock = Array.isArray(otherBlock) ? otherBlock.map(block => block.block_id) : []
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

        
        
    {inBlock.includes(tag.creator.id) || inOtherBlock.includes(mainUser.id) ? (
        <h2 className={`${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`} >@{tag.creator.username} Blocked</h2> 
    ): 
    <div className="posts_content_text_container">

        <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

           {highlightMentions(tag.content)}
        </div>
         <div className="posts_img_container">
        {!tag.posts_details?.image ? null : (

            <img src={tag.posts_img} alt={tag.posts_img} className="posts_img"/>
        )}

        </div> 
    
     </div>
    
    }


     </div>

        </div>

        {inBlock.includes(tag.creator.id) || inOtherBlock.includes(mainUser.id) ? null : 
        !tag.reply_id ? (
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
onClick={createRepost}><PiArrowsClockwise size={20}/> 
<span className="hidden-text">Repost</span>
</button>
</div>


    <div className="favorite_posts_container">
       {mainUser && inFavP.includes(tag?.posts_id) ? 
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

   <ReplyForm open={show} onClose={() => {setShow(false); setShowEmojiPicker(false);  setShowGifPicker(false)}} showGifPicker={showGifPicker} setShowGifPicker={setShowGifPicker} setShowEmojiPicker={setShowEmojiPicker} showEmojiPicker={showEmojiPicker} users={mainUser} posts={tag} plan={plan} mainUser={mainUser}/>
</div>


) : (

    <div className="posts-options-container">


    <div className="favorite_posts_container">
       {mainUser && inFavR.includes(tag?.reply_id) ? 
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
   <button className={`${reactionR?.dislikeId?.includes(mainUser?.id) ? 'red_option_btn' : 
   `${mainUser.dark_mode ? "light_outline" : "dark_outline"}`} no_br react_btn`}
    onClick={handleDislikeR}><AiOutlineDislike size={20}/> {reactionR.dislikes}
   <span className="hidden-text">Dislike</span>
   </button>
   </div> 

</div>


)
        
        }


     </div>
    )
}

export default AllSearch