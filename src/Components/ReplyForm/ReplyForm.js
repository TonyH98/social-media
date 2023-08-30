import { useState} from 'react';
import { useDispatch } from 'react-redux';
import {createRplies}  from "../../Store/userActions";

function ReplyForm({open , onClose, users, posts }){

  const dispatch = useDispatch()

  let [replies, setReplies] = useState({
    content: "",
    user_id: users?.id,
    posts_id: posts.id, 
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


    const handleTextChange = (event) => {
        setReplies({...replies, [event.target.id]: event.target.value})
    };


    const handleSubmit = (event) => {
      event.preventDefault()
      dispatch(createRplies(users?.username, posts.id, replies))
      .then((res) => {
        onClose()
        setReplies({
          content: "",
          user_id: users?.id,
          posts_id: posts.id, 
        })
      })
    }

    const handleTextareaClick = (event) => {
      event.preventDefault()
  };


  
if(!open) return null

    return(
        <div className="overlay">
           <div className="modal-container">
            <div className="modalLeft">
            <button className="onClose" onClick={ onClose}>X</button>
            </div>
           <div className="content">
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

<div className="posts_content_text_container">

<div className="post_text">

   {highlightMentions(posts.content)}
</div>
<div className="posts_img_container">
{posts.posts_img === "null" ? null : (

    <img src={posts.posts_img} alt={posts.posts_img} className="posts_img"/>
)}

</div>



</div>

</div>

</div>


<form  className="signup-form" onSubmit={handleSubmit}>

<h2>Reply Back:</h2>

<div className='input-container'>
  
  <label htmlFor="content" className='label-signup'>Post:
  <textarea
    id="content"
    required
    value={replies.content}
    onChange={handleTextChange}
    onClick={handleTextareaClick}
  />
  
  </label>



</div>


  <button type='submit'>Post</button>

</form>


           </div>

           </div>
        </div>
    )


}


export default ReplyForm