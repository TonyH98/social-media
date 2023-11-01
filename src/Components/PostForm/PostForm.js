import "./Post.css"
import {GoFileMedia} from "react-icons/go"
import {BsEmojiSmile} from "react-icons/bs"
import { useState , useEffect, useRef} from 'react';
import {MdOutlineGifBox} from "react-icons/md"
import { useDispatch } from 'react-redux';
import { createPost } from "../../Store/userActions";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function PostForm ({open, onClose, users, plan}){

  const dispatch = useDispatch();

    let [otherUsers , setOtherUsers] = useState([])

    let [mentionUsers , setMentionUsers] = useState([])

    let [tags , setTags] = useState([])

    let[filterTags , setFilterTags] = useState([])

    const textareaRef = useRef(null);


    let [posts, setPosts] = useState({
        user_name: "",
        content: "",
        user_id: "",
        posts_img: null
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
    }, [API])
  console.log(tags)

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
            } else {
              setFilterTags([]);
            }

          }
        }
    };
    
   
    const handleMention = (user) => {
   
      const newContent = `@${user.username}`
    
      setPosts({ ...posts, content: newContent });
    
      setMentionUsers([]); // Clear mention suggestions
    };

    const handleTags = (tag) => {
   
      const newContent = `${tag.tag_names}`
    
      setPosts({ ...posts, content: newContent });
    
      setFilterTags([]); // Clear mention suggestions
    };

      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("content", posts?.content);
        formData.append("posts_img", posts.posts_img === "" ? null : posts.posts_img);
        formData.append("user_id", users?.id);
        formData.append("user_name", users?.username)
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
  required
  value={posts.content}
  className={`post_modal_text ${users.dark_mode ? "text_background_dark" : "text_background_light"}`}
  onChange={handleTextChange}
  placeholder="What is happening?!"
  ref={textareaRef} 
/>
  
  <p className={`${plan?.images ? 
    (posts?.content.length >= 400 ? 'text-red-700' : null) 
    : (posts?.content.length >= 250 ? 'text-red-700' : null)}`}>
  {posts?.content.length} / {plan?.images ? 400 : 250} characters
</p>

{mentionUsers.length > 0 && (
    <div className="dataResult">
      {mentionUsers.slice(0 , 10).map((user) => (
        <div className="search-link dropdown-link" key={user.id} onClick={() => handleMention(user)}>
          @{user.username}
        </div>
      ))}
    </div>
  )}

{filterTags.length > 0 && (
    <div className="dataResult">
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
      
      <div>
        <BsEmojiSmile size={22} color="blue"/>
      </div>
      
      <div>
        <MdOutlineGifBox size={22} color="blue"/>
      </div>
  </div>

  <button className="post_submit_button" type='submit'>Post</button>
</div>



</div>

</form>


           </div>

           </div>
        </div>
    )

}

export default PostForm