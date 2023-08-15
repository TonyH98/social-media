import "./Post.css"

import { useState , useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const API = process.env.REACT_APP_API_URL;
function Post ({open, onClose, profile}){

    
    let [posts, setPosts] = useState({
        user_name: "",
        content: "",
        user_id: "",
        posts_img: null
    });
    
    useEffect(() => {
        if (profile?.id) {
            setPosts((prevPost) => ({
                ...prevPost,
                user_id: profile?.id,
                user_name: profile?.username
            }));
        }
    }, [profile?.id]);
    
    
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
        }
    };
    
    const handleClearImage = () => {
        const newKey = Date.now(); // Generate a new key to trigger a re-render
        setPosts({ ...posts, posts_img: null, imageKey: newKey });
      };
    

      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("content", posts?.content);
        formData.append("posts_img", posts.posts_img === "" ? null : posts.posts_img);
        formData.append("user_id", profile?.id);
        formData.append("user_name", profile?.username)
        axios
          .post(`${API}/users/${profile?.username}/posts`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
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


console.log(posts)


    
    if(!open) return null
    
    
    return(
        <div className="overlay">
           <div className="modal-container">
            <div className="modalLeft">
                <p className="closeBtn" onClick={onClose}>X</p>
            </div>
           <div className="content">
            <h2 className="posts_header">Create Post</h2>
            
            <form onSubmit={handleSubmit} className="signup-form">


<div className='input-container'>
  
  <label htmlFor="content" className='label-signup'>Post:
  <textarea
    id="content"
    required
    value={posts.content}
    onChange={handleTextChange}
  />
  
  <p className={`${posts?.content.length >= 250 ? 'text-red-700' : null}`}>
                        {posts?.content.length}/250 characters
 </p>
  </label>

  <label htmlFor="posts_img" className='label-signup'>
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

</div>


  <button type='submit'>Post</button>

</form>


           </div>

           </div>
        </div>
    )

}

export default Post