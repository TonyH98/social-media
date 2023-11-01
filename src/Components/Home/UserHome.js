import "./UserHome.css"
import HomePosts from "./HomePosts";
import { useState , useEffect, useRef} from 'react';
import PostForm from "../PostForm/PostForm";
import axios from "axios";
import {BsFillPenFill} from "react-icons/bs"
import {GoFileMedia} from "react-icons/go"
import EmojiPicker from "emoji-picker-react";
import {BsEmojiSmile} from "react-icons/bs"
import {MdOutlineGifBox} from "react-icons/md"

const API = process.env.REACT_APP_API_URL;

function UserHome({mainUser, plan, following}){

    let [favorites , setFavorites] = useState([])

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    let [posts, setPosts] = useState({
        user_name: "",
        content: "",
        user_id: "",
        posts_img: null
    });

    let [otherUsers , setOtherUsers] = useState([])

    let [tags , setTags] = useState([])

    let[filterTags , setFilterTags] = useState([])

    let [mentionUsers , setMentionUsers] = useState([])

    let [followingPosts , setFollowingPosts] = useState([])

    const [modal , setModal] = useState(false)

    const textareaRef = useRef(null);

    
    useEffect(() => {
        if (mainUser?.id) {
            setPosts((prevPost) => ({
                ...prevPost,
                user_id: mainUser?.id,
                user_name: mainUser?.username
            }));
        }
    }, [mainUser?.id]);

    
    
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
    
    
    useEffect(() => {
      axios.get(`${API}/favorites/${mainUser.id}`)
      .then((res) => {
        setFavorites(res.data)
      })
    }, [mainUser.id])
    
    
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
    
    const handleEmojiClick = (emoji) => {
      const emojiUnicode = emoji.emoji;
      const startPos = textareaRef.current.selectionStart;
      const endPos = textareaRef.current.selectionEnd;
      const text = posts.content;
      const updatedText = text.substring(0, startPos) + emojiUnicode + text.substring(endPos);
      setPosts((prevPost) => ({ ...prevPost, content: updatedText }));
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("content", posts?.content);
      formData.append("posts_img", posts.posts_img === "" ? null : posts.posts_img);
      formData.append("user_id", mainUser?.id);
      formData.append("user_name", mainUser?.username)
      axios.post(`${API}/users/${mainUser?.username}/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setPosts({
          content: ""
        })
      })
      .catch((c) => console.warn("catch", c)); 
    };
    
   
    const inFol = Array.isArray(following) ? following.map((fol) => fol?.username) : [];
    
    
    
  
    const fetchPosts = async () => {
      try {
          const promises = inFol.map((username) => axios.get(`${API}/users/${username}/posts`));
          const responses = await Promise.all(promises);
          const posts = responses.flatMap((res) => res.data);
          setFollowingPosts(posts);
      } catch (error) {
          console.error("Error Fetching following posts:", error);
      }
  };
  
  useEffect(() => {
      if (inFol.length > 0 && API) {
          fetchPosts();
      }
  }, [ API, inFol]);
  
      

    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() -7)

    console.log(oneWeekAgo)

    followingPosts = followingPosts.filter((post) => {
      const postTime = new Date(post.time)
      return postTime > oneWeekAgo
    })

  

    return(
        <div className="users_home_page">
            <div className="Home_Post_input_container">
                <div className="Home_users_image_container">
                    <img src={mainUser.profile_img} className="Home_user_image"/>
                </div>
                <div className="post_textera_container">
                <form onSubmit={handleSubmit}>
                            <textarea
                            ref={textareaRef} 
                            id="content"
                            className={`home_textera ${mainUser.dark_mode ? "text_background_dark" : "text_background_light"}`}
                            value={posts.content}
                            onChange={handleTextChange}
                            placeholder="What is happening?!"
                            onInput={(e) => {
                              e.target.style.height = 'auto';
                              e.target.style.height = e.target.scrollHeight + 'px';
                            }}
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
 <div className="post_modal_second_section">
  <div className="posts_icons_container">
  <label htmlFor="posts_img" className={`label-signup ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>
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
  <BsEmojiSmile size={22} color="blue" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
  
</div>
      
      <div>
        <MdOutlineGifBox size={22} color="blue"/>
      </div>
  </div>

  <button className="post_submit_button" type='submit'>Post</button>
</div>

                </form>
                {showEmojiPicker && (
    <EmojiPicker onEmojiClick={(emoji) => handleEmojiClick(emoji)}/>
  )}
                </div>
            </div>
            <br/>
            <hr/>

        <div className="users_following_posts_container">
        <div className="option-content-holder">
              {followingPosts.map((posts) => {
                return (
                  <div key={posts.id} className="posts-border-container">
                    <HomePosts favorites={favorites} posts={posts}  mainUser={mainUser} plan={plan} setFavorites={setFavorites}/>
                  </div>
                );
              })}
            </div>
        </div>
         <button className="home-post-button" 
          onClick={() => setModal(true)}
          ><BsFillPenFill size={20}/></button>
           <PostForm open={modal} onClose={() => {setModal(false); setShowEmojiPicker(false);}}  showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} users={mainUser} plan={plan}/>
        </div>
    )

}

export default UserHome