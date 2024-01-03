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
import ReactGiphySearchbox from 'react-giphy-searchbox'
import HomeReplies from "./HomeReplies";


const API = process.env.REACT_APP_API_URL;
const GIF = process.env.REACT_APP_API_GIF;
function UserHome({mainUser, plan, following}){

    let [favorites , setFavorites] = useState([])

    let option = ["Following Posts" , "Following Replies"]

    let [options , setOptions] = useState(0)

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    let [posts, setPosts] = useState({
        user_name: "",
        content: "",
        user_id: "",
        posts_img: "",
        gif: ""
    });

    let [otherUsers , setOtherUsers] = useState([])

    let [tags , setTags] = useState([])

    let[filterTags , setFilterTags] = useState([])

    let [mentionUsers , setMentionUsers] = useState([])

    let [followingPosts , setFollowingPosts] = useState([])

    let [followingReplies , setFollowingReplies] = useState([])

    const [modal , setModal] = useState(false)

    const [showGifPicker, setShowGifPicker] = useState(false)

    const textareaRef = useRef(null);

    let [block , setBlock] = useState([])

    const [usersBlock , setUsersBlock] = useState([])
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
      axios.get(`${API}/block/${mainUser?.id}`)
      .then((res) => {
        setBlock(res.data)
      })

      axios.get(`${API}/block/${mainUser?.id}/block`)
      .then((res) => {
        setUsersBlock(res.data)
      })
      axios.get(`${API}/follow/${mainUser?.id}/replies`)
      .then((res) => {
        setFollowingReplies(res.data)
      })
    }, [API, mainUser?.id])
    

    otherUsers = otherUsers.filter((ou) => {
      return !block.some((bu) => ou.id === bu.block_id) && !usersBlock.some((ub) => ou.id === ub.user_id);
    });
    
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
      }
    };
    
    const handleMention = (user) => {
      const newContent = `@${user.username}`;
    
      setPosts((prev) => ({
        ...prev,
        content: prev.content.replace(/@[^\s]+/, newContent),
      }));
    
      setMentionUsers([]);
    };

    const handleTags = (tag) => {
   
      const newContent = `${tag.tag_names}`;
    
      setPosts((prev) => ({
        ...prev,
        content: prev.content.replace(/#[^\s]+/, newContent),
      }));
    
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
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("content", posts?.content);
      formData.append("posts_img", posts.posts_img === "" ? null : posts.posts_img);
      formData.append("user_id", mainUser?.id);
      formData.append("user_name", mainUser?.username)
      formData.append("gif", posts.gif)
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
    
    
    const handleGifText = (gif) => {
      console.log(gif)
      const gifUrl = gif.images.original.url;
  
      setPosts((prevPost) => ({ ...prevPost, gif: gifUrl }));
      setShowGifPicker(false);
    }
  
    useEffect(() => {
      axios.get(`${API}/follow/${mainUser?.id}/posts`)
      .then((res) => {
        setFollowingPosts(res.data)
      })
    }, [mainUser?.id])
  
      
console.log(followingPosts)



function optionContent(selected){
  if(selected === 0){
    return(
      <div className="option-content-holder home_posts">
      {Array.isArray(followingPosts) && followingPosts.map((posts) => {
        return (
          <div key={posts.id} className="posts-border-container">
            <hr/>
            <HomePosts favorites={favorites} posts={posts}  mainUser={mainUser} plan={plan} setFavorites={setFavorites}/>
          </div>
        );
      })}
    </div>
    )
  }

  if(selected === 1){
    return (
      <div className="option-content-holder home_posts">
      {Array.isArray(followingReplies) && followingReplies.map((posts) => {
        return (
          <div key={posts.id} className="posts-border-container">
            <HomeReplies posts={posts}  mainUser={mainUser} plan={plan}/>
          </div>
        );
      })}
    </div>
    )
  }
}
  
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
                                : (posts?.content.length >= 250 ? 'text-red-700' : null)} ${mainUser.dark_mode ? "light_text" : "dark_text"}`}>
                            {posts?.content.length} / {plan?.images ? 400 : 250} characters
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
                {filterTags.slice(0 , 10).map((tag) => (
                    <div className={`textera_display light_text`} key={tag.id} onClick={() => handleTags(tag)}>
                    {tag.tag_names}
                    </div>
                ))}
                </div>
            )}
 <div className="post_modal_second_section">
  <div className="posts_icons_container">
  <label htmlFor="posts_img" className={`label-signup ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>
          <div className="media_button">
          <GoFileMedia size={22} color="blue" />
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
      <label htmlFor="gif" className={`label-signup ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>
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

 
  {posts.content.length === 0  && posts.posts_img.length === 0 && posts.gif.length === 0?
    <button className="post_submit_button gray_button" disabled>Post</button> :

  <button className="post_submit_button" type='submit'>Post</button>
  }
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
            <br/>
            <hr/>
            <div className="three_options_container">
        {option.map((opt , index) => {
            return(
                <button onClick={() => setOptions(index)} className={`${index === options ? `active options` : 'options'} 
                ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`} key={index}>{opt}</button>
            )
        })}

        </div>
        <div className="users_following_posts_container">
        {optionContent(options)}
        </div>
         <button className="home-post-button" 
          onClick={() => setModal(true)}
          ><BsFillPenFill size={20}/></button>
           <PostForm open={modal} onClose={() => {setModal(false); setShowEmojiPicker(false);}}  showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} users={mainUser} plan={plan}/>
        </div>
    )

}

export default UserHome