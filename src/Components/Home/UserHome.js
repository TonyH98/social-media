import "./UserHome.css"

import { useState , useEffect} from 'react';
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function UserHome({mainUser, plan}){



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

    return(
        <div>
            <div className="Home_Post_input_container">
                <div className="Home_users_image_container">
                    <img src={mainUser.profile_img} className="Home_user_image"/>
                </div>
                <div className="post_textera_container">
                <form onSubmit={handleSubmit}>
                            <textarea
                            id="content"
                            className="home_textera"
                            value={posts.content}
                            onChange={handleTextChange}
                            placeholder="What is happening?!"
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
              <label htmlFor="posts_img" className={`label-signup ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>
          Post Image
          <input
            key={posts.imageKey}
            id="posts_img"
            name="posts_img"
            type="file"
            className="file-input"
            accept=".png, .jpg, .jpeg"
            onChange={handleTextChange}
          />
        </label>
            <button type='submit'>Post</button>
                </form>
                </div>
            </div>
            <br/>
            <hr/>
        </div>
    )


}

export default UserHome