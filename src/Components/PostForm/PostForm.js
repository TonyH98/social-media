import "./Post.css"
import {GoFileMedia} from "react-icons/go"
import {BsEmojiSmile} from "react-icons/bs"
import { useState , useEffect, useRef} from 'react';
import {MdOutlineGifBox} from "react-icons/md"
import { useDispatch } from 'react-redux';
import { createPost } from "../../Store/userActions";
import ReactGiphySearchbox from 'react-giphy-searchbox'
import EmojiPicker from "emoji-picker-react";


import axios from "axios";
const API = process.env.REACT_APP_API_URL;
const GIF = process.env.REACT_APP_API_GIF;
function PostForm ({open, onClose, users, plan, showEmojiPicker, setShowEmojiPicker, setShowGifPicker, showGifPicker}){

  const dispatch = useDispatch();

    let [otherUsers , setOtherUsers] = useState([])

    let [mentionUsers , setMentionUsers] = useState([])

    let [tags , setTags] = useState([])

    let[filterTags , setFilterTags] = useState([])

    let [block , setBlock] = useState([])

    const [usersBlock , setUsersBlock] = useState([])

    const textareaRef = useRef(null);
    


    let [posts, setPosts] = useState({
        user_name: "",
        content: "",
        user_id: "",
        posts_img: "",
        gif: ""
    });
    
    useEffect(() => {
        if (users?.id) {
            setPosts((prevPost) => ({
                ...prevPost,
                user_id: users?.id,
                user_name: users?.username
            }));
        }
    }, [users?.id]);
    
    useEffect(() => {
      axios.get(`${API}/users`)
      .then((res) => {
        setOtherUsers(res.data)
      })

      axios.get(`${API}/tags`)
      .then((res) => {
        setTags(res.data)
      })
      axios.get(`${API}/block/${users?.id}`)
      .then((res) => {
        setBlock(res.data)
      })

      axios.get(`${API}/block/${users?.id}/block`)
      .then((res) => {
        setUsersBlock(res.data)
      })
      
    }, [API, users?.id])
  


    otherUsers = otherUsers.filter((ou) => {
      return !block.some((bu) => ou.id === bu.block_id) && !usersBlock.some((ub) => ou.id === ub.user_id);
    });

    
    const handleTextChange = (event) => {
        if(event.target.id === "posts_img"){
            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onload = () => {
                setPosts({...posts, posts_img: reader.result})
            }
            reader.readAsDataURL(file)
        }
        
        else if(event.target.id === "content"){
          if(plan?.images){
            const {value} = event.target
            if(value.length <=400){
              setPosts((prevEvent) => ({
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
              tags.some((tag) => tag.tag_names.toLowerCase() === hash.toLowerCase())
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
              setPosts((prevEvent) => ({
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
              tags.some((tag) => tag.tag_names.toLowerCase() === hash.toLowerCase())
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
        }
    };
    
   
    const handleMention = (user) => {
   
      const newContent = `@${user.username}`
    
      setPosts((prev) => ({...prev, content: prev.content + newContent}))
    
      setMentionUsers([]);
    };

    const handleTags = (tag) => {
   
      const newContent = `${tag.tag_names}`
    
      setPosts((prev) => ({...prev, content: prev.content + newContent}))
    
      setFilterTags([]);
    };


    const handleEmojiClick = (emoji) => {
      const emojiUnicode = emoji.emoji;
      const startPos = textareaRef.current.selectionStart;
      const endPos = textareaRef.current.selectionEnd;
      const text = posts.content;
      const updatedText = text.substring(0, startPos) + emojiUnicode + text.substring(endPos);
      setPosts((prevPost) => ({ ...prevPost, content: updatedText }));
    };
    

    const handleGifText = (gif) => {
      console.log(gif)
      const gifUrl = gif.images.original.url;
      setPosts((prevPost) => ({ ...prevPost, gif: gifUrl }));
      setShowGifPicker(false);
    }
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("content", posts?.content);
        formData.append("posts_img", posts.posts_img === "" ? null : posts.posts_img);
        formData.append("user_id", users?.id);
        formData.append("user_name", users?.username)
        formData.append("gif", posts.gif)
        dispatch(createPost(users, formData))
          .then(
            (response) => {
              onClose()
              setPosts({
                user_name: "",
                content: "",
                user_id: "",
                posts_img: null
              })
            },
            (error) => console.error(error)
          )
          .catch((c) => console.warn("catch", c)); 
    };


    if(!open) return null
  
  
    return(
        <div className={`overlay post_form`}>
           <div className={`modal-container ${users?.dark_mode ? 'modal_backgrond_dark' : 'modal_backgrond_white'}`}>
            <div className="modalLeft">
                <p className="closeBtn" onClick={onClose}>X</p>
            </div>
           <div className="content">
            
            
            <form onSubmit={handleSubmit} className="signup-form">


<div className='input-container'>
  
  <label htmlFor="content" className={`label-signup ${users?.dark_mode ? 'white_text' : 'dark_text'}`}>
  <textarea
  id="content"
  value={posts.content}
  className={`post_modal_text ${users.dark_mode ? "text_background_dark" : "text_background_light"}`}
  onChange={handleTextChange}
  placeholder="What is happening?!"
  ref={textareaRef} 
  onInput={(e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }}
/>
<div className="gif_form">
 {posts.gif ?  <img src={posts.gif} alt="posts.gif" className="gif_preview"/> : null }
  {posts.gif ? <button onClick={() => setPosts({...posts, gif: ""})} className="remove_gif_btn">X</button> : null}
</div>
<div className="gif_form">
 {posts.posts_img ?  <img src={posts.posts_img} alt="posts.images" className="image_preview"/> : null }
  {posts.posts_img ? <button onClick={() => setPosts({...posts, posts_img: ""})} className="remove_gif_btn">X</button> : null}
</div>
  <p className={`${plan?.images ? 
    (posts?.content.length >= 400 ? 'text-red-700' : null) 
    : (posts?.content.length >= 250 ? 'text-red-700' : null)}`}>
  {posts?.content.length} / {plan?.images ? 400 : 250} characters
</p>

{mentionUsers.length > 0 && (
    <div>
      {mentionUsers.slice(0 , 10).map((user) => (
        <div className="search-link dropdown-link" key={user.id} onClick={() => handleMention(user)}>
          @{user.username}
        </div>
      ))}
    </div>
  )}

{filterTags.length > 0 && (
    <div >
      {filterTags.slice(0 , 10).map((tag) => (
        <div className="search-link dropdown-link" key={tag.id} onClick={() => handleTags(tag)}>
          {tag.tag_names}
        </div>
      ))}
    </div>
  )}
  </label>

<div className="post_modal_second_section">
  <div className="posts_icons_container">
  <label htmlFor="posts_img" className={`label-signup ${users?.dark_mode ? 'white_text' : 'dark_text'}`}>
          <div className="media_button">
          <GoFileMedia size={22} color="blue"/>
          <input
            key={posts.imageKey}
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
      
        <div className='media_button'>
  <BsEmojiSmile size={22} className='emoji_btn' color="blue" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
          <span className='hidden-text'>Emoji</span>
    </div>
      
<div>
      <label htmlFor="gif" className={`label-signup ${users?.dark_mode ? 'white_text' : 'dark_text'}`}>
          <div className="media_button">
          <MdOutlineGifBox size={22} color="blue" onClick={() => setShowGifPicker(!showGifPicker)}/>
          <input
            name="gif"
            type="input"
            className="gif_button"
            value={posts.gif}
            onChange={handleTextChange}
          />
        <span className="hidden-text">Gif</span>
          </div>
        </label>
      </div>
  </div>
  {posts.content.length === 0 && posts.posts_img.length === 0 && posts.gif.length === 0?
    <button className="post_submit_button gray_button" disabled>Post</button> :

  <button className="post_submit_button" type='submit'>Post</button>
  }
</div>



</div>

</form>
{showEmojiPicker && (
    <EmojiPicker onEmojiClick={(emoji) => handleEmojiClick(emoji)}/>
  )}

{showGifPicker && (
<ReactGiphySearchbox
         apiKey={GIF}
         onSelect={handleGifText}
          />

)}

           </div>

           </div>
        </div>
    )

}

export default PostForm