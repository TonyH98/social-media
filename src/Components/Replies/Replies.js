import "./Replies.css"
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai"
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"


function Replies({reply}){

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


return(

<div className="posts_content replies">

<div className="post_user_profile_container">
<img
src={reply?.creator?.profile_img}
alt={reply?.creator?.profile_img}
className="post_user_profile"
/>
</div>

<div className="post_user_info_date_container">

<div className="post_user_profile">

{reply?.creator?.profile_name} | @{reply?.creator?.username} | {formatDate(reply.time)}

</div>


<div className="posts_content_text_container">

<div className="post_text">

   {reply.content}
</div>
<div className="posts_img_container">
            {reply.posts_img === null || reply.posts_img === "null" ? null : (

                <img src={reply.posts_img} alt={reply.posts_img} className="posts_img"/>
            )}

            </div>

</div>

<div className="posts-options-container">





   <div className="favorite_posts_container">
       <button className="no_br fav_btn" ><AiOutlineHeart size={20}/>
       <span className="hidden-text">Like</span>
       </button>

   </div>

   
   <div className="like-container">
   <button className="no_br react_btn"><AiOutlineLike size={20}/> 0
   <span className="hidden-text">Like</span>
   </button>
  
   </div>
   
   <div className="dislike-container">
   <button  className="no_br react_btn"><AiOutlineDislike size={20}/> 0
   <span className="hidden-text">Dislike</span>
   </button>
   </div> 
</div>

</div>
  


</div>

)

}


export default Replies