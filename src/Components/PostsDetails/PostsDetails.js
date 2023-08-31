import "./PostsDetails.css"
import { useParams } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { useEffect , useState} from "react";
import { getPostDetails } from "../../Store/userActions";
import {fetchReplies} from "../../Store/userActions";
import YouTube from "react-youtube";
import Replies from "../Replies/Replies";


function PostsDetails(){

const {username , id} = useParams()

const dispatch = useDispatch()

const posts = useSelector((state) => state.postsDetail.postDetail);

const getReplies = useSelector((state) => state.replies.replies)

useEffect(() => {

    dispatch(getPostDetails(username , id))
    dispatch(fetchReplies(username, id))
}, [dispatch])

function formatDate() {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Check if posts and posts.time exist before attempting to split
    if (posts && posts?.time) {
        const splitDate = posts.time.split("/");

        // Make sure splitDate has at least 3 elements before destructuring
        if (splitDate.length >= 3) {
            const [month, day, year] = splitDate.map(Number);
            
            let formatMonth = months[month - 1]
            const formattedYear = year.toString().slice(-2)

            return `${formatMonth} ${day}, ${formattedYear}`

        } 
    } 
}


function highlightMentions() {
    const mentionPattern = /@(\w+)/g;
    const hashtagPattern = /#(\w+)(?=\W|$)/g;

    // Check if posts and posts.content exist before manipulating
    if (posts && posts?.content) {
        const highlightedContent = posts?.content
            .replace(mentionPattern, '<span class="mention">$&</span>')
            .replace(hashtagPattern, '<span class="hashtag" style="color: blue;">$&</span>');
        
        return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
    } else {
        return null; // Return something meaningful, or just return null if content is missing
    }
}

const youtubeLinkPattern = /https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/g;


const matches = posts?.content?.match(youtubeLinkPattern);

console.log(getReplies)

return(
    <div className="posts_content posts_details_content">

    <div className="post_user_profile_container">
    <img
    src={posts?.creator?.profile_img}
    alt={posts?.creator?.profile_img}
    className="post_user_profile"
    />
    </div>
    
<div className="post_user_info_date_container">

<div className="post_user_profile">

{posts?.creator?.profile_name} | @{posts?.creator?.username} | {formatDate()}

</div>

  
<div className="posts_content_text_container">

    <div className="post_text">

       {highlightMentions(posts?.content)}
    </div>
    <div className="posts_img_container">
    {posts.posts_img === "null" ? null : (

        <img src={posts?.posts_img} alt={posts?.posts_img} className="posts_img"/>
    )}

    </div>

    {matches ? (
            matches.map((video) => {
                console.log(video.split('=')[1])
                return(
                    <YouTube
                    videoId={video.split('=')[1]}
                    className={"youtube-video"}
                    sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
                    />

                )
            })
        
         ): null}
 
 </div>

 
 </div>
 
<div className="replies_container">
    {getReplies.map((reply) => {
        return(

        <div className="replies_border" key={reply.id}>
            <Replies reply={reply}/>
        </div>
        )
    })}
</div>
 
 </div>

)

}



export default PostsDetails