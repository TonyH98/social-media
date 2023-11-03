import { useState , useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from "../../Store/userActions";

function RePostForm({mainUser, onClose, open, post}){




    const dispatch = useDispatch()
    let [posts, setPosts] = useState({
        user_name: post?.creator?.username,
        content: post.content,
        user_id: post?.creator?.id,
        posts_img: post.posts_img,
        gif: post.gif
    });

    useEffect(() => {
        if (post?.creator?.id) {
            setPosts((prevPost) => ({
                ...prevPost,
                user_name: post?.creator?.username,
                content: post.content,
                user_id: post?.creator?.id,
                posts_img: post.posts_img,
                gif: post.gif,
                original_user_id: ""

            }));
        }
    }, [post?.creator?.id]);



    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("content", post?.content);
        formData.append("posts_img", post.posts_img === "" ? null : post.posts_img);
        formData.append("user_id", mainUser.id);
        formData.append("user_name", mainUser.username)
        formData.append("gif", post.gif)
        formData.append("original_user_id", post?.creator?.id)
        dispatch(createPost(mainUser, formData))
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

return (
    <div className={`overlay post_form`}>
    <div className={`modal-container ${mainUser?.dark_mode ? 'modal_backgrond_dark' : 'modal_backgrond_white'}`}>
     <div className="modalLeft">
         <p className="closeBtn" onClick={onClose}>X</p>
     </div>
    <div className="content">
     
     
     <form className="signup-form" onSubmit={handleSubmit}>

        <textarea
        value={post.content}
        />

        <input
        type='text'
        value={posts.posts_img}
        />

        <input
        type='text'
        value={post.gif}
        />
     <div className="gif_form">
{posts.gif ?  <img src={posts.gif} alt="posts.gif" className="gif_preview"/> : null }

</div>
<div className="gif_form">
{posts.posts_img ?  <img src={posts.posts_img} alt="posts.images" className="image_preview"/> : null }
</div>


<button className="post_submit_button" type='submit'>Post</button>




</form>

    </div>

    </div>
 </div>
)

}


export default RePostForm