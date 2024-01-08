import { useState , useEffect, useRef} from 'react';
import {GoFileMedia} from "react-icons/go"
import {BsEmojiSmile} from "react-icons/bs"
import {MdOutlineGifBox} from "react-icons/md"

import EmojiPicker from "emoji-picker-react";
import ReactGiphySearchbox from 'react-giphy-searchbox'
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const GIF = process.env.REACT_APP_API_GIF;
function ReplyPollForm({open , onClose, plan, poll, mainUser  }){
    const textareaRef = useRef(null);
    let [tags , setTags] = useState([])
    let[filterTags , setFilterTags] = useState([])
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [showGifPicker, setShowGifPicker] = useState(false)
    let [block , setBlock] = useState([])
    let [mentionUsers , setMentionUsers] = useState([])

    const [usersBlock , setUsersBlock] = useState([])
    let [otherUsers , setOtherUsers] = useState([])

    let [replies, setReplies] = useState({
        content: "",
        posts_img: "",
        user_id: mainUser?.id,
        poll_id: poll.id, 
        gif: ""
        })

     useEffect(() => {
        if (mainUser?.id && poll?.id) {
         setReplies((prevReplies) => ({
            ...prevReplies,
            user_id: mainUser?.id,
            poll_id: poll?.id
         }));
         }
     }, [mainUser?.id, poll?.id]);



     useEffect(() => {
        axios.get(`${API}/users`)
        .then((res) => {
          setOtherUsers(res.data)
        })
  
        axios.get(`${API}/tags`)
        .then((res) => {
          setTags(res.data)
        })
        axios.get(`${API}/block/${mainUser?.id?.id}`)
        .then((res) => {
          setBlock(res.data)
        })
  
        axios.get(`${API}/block/${mainUser?.id?.id}/block`)
        .then((res) => {
          setUsersBlock(res.data)
        })
        
      }, [API, mainUser?.id?.id])
    

      otherUsers = otherUsers.filter((ou) => {
        return !block.some((bu) => ou.id === bu.block_id) && !usersBlock.some((ub) => ou.id === ub.user_id);
      });


      const handleTextChange = (event) => {
        if(event.target.id === "posts_img"){
          const file = event.target.files[0];
          const reader = new FileReader();
          
          reader.onload = () => {
              setReplies({...replies, posts_img: reader.result})
          }
          reader.readAsDataURL(file)
      }
        else if(plan?.images){
          const {value} = event.target
          if(value.length <=400){
            setReplies((prevEvent) => ({
              ...prevEvent,
              content: value,
            }));
          } 
          else{
            event.target.value = value.substr(0,400)
          }
          const mentionMatches = value.match(/@(\w+)/g);
  
          if (mentionMatches) {
            const mentions = mentionMatches.map((mention) => mention.substring(1));
            const filteredUsers = otherUsers.filter((user) =>
              mentions.some((mention) => user.username.toLowerCase().includes(mention.toLowerCase()))

              
            );
            setMentionUsers(filteredUsers);

            const hasExactMatch = mentions.every((mention) =>
            otherUsers.some((user) => user.username.toLowerCase() === mention.toLowerCase())
          );

          if (hasExactMatch) {
            setMentionUsers([]);
          } else {
            setMentionUsers(filteredUsers);
          }
          } else {
            setMentionUsers([]);
          }
  
          const hashtags = value.match(/#(\w+)/g);
          if (hashtags) {
            const searchTags = hashtags.map((tags) => tags.substring(1));
            const filteredTags = tags.filter((tag) =>
              searchTags.some((hash) => tag.tag_names.toLowerCase().includes(hash.toLowerCase()))
            );
            setFilterTags(filteredTags);

            const hasExactMatch = searchTags.every((hash) =>
            tags.some((tag) => tag.tag_names.toLowerCase().substring(1) === hash.toLowerCase())
          );

          if (hasExactMatch) {
            setFilterTags([]);
          } else {
            setFilterTags(filteredTags);
          }
          } else {
            setFilterTags([]);
          }
  
        }
        else{
          const {value} = event.target
          if(value.length <=250){
            setReplies((prevEvent) => ({
              ...prevEvent,
              content: value,
            }));
          } 
          else{
            event.target.value = value.substr(0,250)
          }
  
          const mentionMatches = value.match(/@(\w+)/g);
  
          if (mentionMatches) {
            const mentions = mentionMatches.map((mention) => mention.substring(1));
            const filteredUsers = otherUsers.filter((user) =>
              mentions.some((mention) => user.username.toLowerCase().includes(mention.toLowerCase()))
            );
            setMentionUsers(filteredUsers);

            const hasExactMatch = mentions.every((mention) =>
            otherUsers.some((user) => user.username.toLowerCase() === mention.toLowerCase())
          );

          if (hasExactMatch) {
            setMentionUsers([]);
          } else {
            setMentionUsers(filteredUsers);
          }


          } else {
            setMentionUsers([]);
          }
  
          const hashtags = value.match(/#(\w+)/g);
          if (hashtags) {
            const searchTags = hashtags.map((tags) => tags.substring(1));
            const filteredTags = tags.filter((tag) =>
              searchTags.some((hash) => tag.tag_names.toLowerCase().includes(hash.toLowerCase()))
            );
            setFilterTags(filteredTags);

            const hasExactMatch = searchTags.every((hash) =>
            tags.some((tag) => tag.tag_names.toLowerCase().substring(1) === hash.toLowerCase())
          );

          if (hasExactMatch) {
            setFilterTags([]);
          } else {
            setFilterTags(filteredTags);
          }
          } else {
            setFilterTags([]);
          }
  
  
        }
      };


      const handleMention = (user) => {
        const newContent = `@${user.username}`;
      
        setReplies((prev) => ({
          ...prev,
          content: prev.content.replace(/@[^\s]+/, newContent),
        }));
      
        setMentionUsers([]);
      };
  
      const handleTags = (tag) => {
     
        const newContent = `${tag.tag_names}`;
      
        setReplies((prev) => ({
          ...prev,
          content: prev.content.replace(/#[^\s]+/, newContent),
        }));
      
        setFilterTags([]);
      };


      const handleEmojiClick = (emoji) => {
        const emojiUnicode = emoji.emoji;
        const startPos = textareaRef.current.selectionStart;
        const endPos = textareaRef.current.selectionEnd;
        const text = replies.content;
        const updatedText = text.substring(0, startPos) + emojiUnicode + text.substring(endPos);
        setReplies((prevPost) => ({ ...prevPost, content: updatedText }));
      };

      const handleGifText = (gif) => {
        const gifUrl = gif.images.original.url;
        setReplies((prevPost) => ({ ...prevPost, gif: gifUrl }));
        setShowGifPicker(false);
      }


      const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();
          formData.append("content", replies?.content);
          formData.append("posts_img", replies.posts_img === "" ? null : replies.posts_img);
          formData.append("user_id", mainUser?.id);
          formData.append("poll_id", poll.id)
          formData.append("gif", replies.gif)
          axios.post(`${API}/poll/${poll.id}/reply`, formData)
        .then((res) => {
          setReplies({
            content: ""
          })
        })
      }
      if(!open) return null

console.log(replies)

return(
    <div className="overlay">
    <div className={`modal-container ${mainUser?.dark_mode ? 'modal_backgrond_dark' : 'modal_backgrond_white'}`}>
     <div className="modalLeft">
     <button className="closeBtn" onClick={onClose}>X</button>
     </div>
    <div className="content reply_content">



<form  className="signup-form" onSubmit={handleSubmit}>

<div className='input-container'>

<label htmlFor="content" className={`label-signup ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>
<textarea
id="content"
className={`post_modal_text reply_modal_text ${mainUser?.dark_mode ? "text_background_dark" : "text_background_light"}`}
placeholder="What is happening?!"
value={replies.content}
onChange={handleTextChange}
ref={textareaRef} 
onInput={(e) => {
e.target.style.height = 'auto';
e.target.style.height = e.target.scrollHeight + 'px';
}}
/>
<div className="gif_form">
{replies.gif ?  <img src={replies.gif} alt="posts.gif" className="gif_preview"/> : null }
{replies.gif ? <button onClick={() => setReplies({...replies, gif: ""})} className="remove_gif_btn">X</button> : null}
</div>
<div className="gif_form">
{replies.posts_img ?  <img src={replies.posts_img} alt="posts.images" className="image_preview"/> : null }
{replies.posts_img ? <button onClick={() => setReplies({...replies, posts_img: ""})} className="remove_gif_btn">X</button> : null}
</div>
<p className={`${plan?.images ? 
(replies?.content.length >= 400 ? 'text-red-700' : null) 
: (replies?.content.length >= 250 ? 'text-red-700' : null)}`}>
{replies?.content.length} / {plan?.images ? 400 : 250} characters
</p>

{mentionUsers.length > 0 && (
<div className={`textera_list`}>
{mentionUsers.slice(0 , 10).map((user) => (
 <div className={`textera_display light_text`} key={user.id} onClick={() => handleMention(user)}>
   @{user.username}
 </div>
))}
</div>
)}

{filterTags.length > 0 && (
<div className={`textera_list`}>
{filterTags.map((tag) => (
 <div className={`textera_display light_text`} key={tag.id} onClick={() => handleTags(tag)}>
   {tag.tag_names}
 </div>
))}
</div>
)}
</label>

<div className="post_modal_second_section">
<div className="posts_icons_container">
<label htmlFor="posts_img" className={`label-signup ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>
   <div className="media_button">
   <GoFileMedia size={22} color="blue"/>
   <input
     key={poll.imageKey}
     id="posts_img"
     name="posts_img"
     type="file"
     className="file-input"
     accept=".png, .jpg, .jpeg"
     onChange={handleTextChange}
   />
<span className="hidden-text">Photos</span>
   </div>
 </label>

 <div>
<BsEmojiSmile size={22} className='emoji_btn' color="blue" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />

</div>

<div>
<label htmlFor="gif" className={`label-signup ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>
   <div className="media_button">
   <MdOutlineGifBox size={22} color="blue" onClick={() => setShowGifPicker(!showGifPicker)}/>
   <input
     name="gif"
     type="input"
     className="gif_button"
     value={replies.gif}
     onChange={handleTextChange}
   />

   </div>
 </label>
</div>
</div>

{replies.content.length === 0 && replies.posts_img.length === 0 && replies.gif.length === 0?
<button className="post_submit_button gray_button" disabled>Post</button> :

<button className="post_submit_button" type='submit'>Post</button>
}
</div>

</div>




{showEmojiPicker && (
<div>

<EmojiPicker onEmojiClick={(emoji) => handleEmojiClick(emoji)}/>
</div>
)}

{showGifPicker && (
<ReactGiphySearchbox
  apiKey={GIF}
  onSelect={handleGifText}
   />

)}
</form>

    </div>

    </div>
 </div>
)


}

export default ReplyPollForm