import { useState , useEffect } from "react"

import axios from "axios"

const API = process.env.REACT_APP_API_URL;

function PollReplies({reply, mainUser}){


    function formatDate(inputDate){
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];
    
        const [month, day, year] = inputDate.split("/").map(Number);
        const formattedMonth = months[month - 1]
        const formattedYear = year.toString()
    
        return `${formattedMonth} ${day}, ${formattedYear}`
    }

    function highlightMentions(content) {
        const mentionPattern = /@(\w+)/g;
        const hashtagPattern = /#(\w+)(?=\W|$)/g;
        
        const highlightedContent = content
        .replace(mentionPattern, '<span class="mention">$&</span>')
        .replace(hashtagPattern, `<span class="hashtag" style="color: blue;">$&</span>`)
        .replace(/\n/g, '<br>')
        return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
    }

    return(


        <div className="posts_content">

<div className="replies">
    <div className="posts_extra_container">
    <div className="post_user_profile_container">
    <img
    src={reply?.creator?.profile_img}
    alt={reply?.creator?.profile_img}
    className="post_user_profile"
    />
    </div>
    <div className="post_options_extra">
<div className="post_user_info_date_container">

<div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`}>

{reply?.creator?.profile_name} | @{reply?.creator?.username} | {formatDate(reply.time)}

</div>




<div>
<div className="posts_content_text_container">

<div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

   {highlightMentions(reply.content)}
</div>

{!reply.url ? null : (
            <div className={`embedded_link_container ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`}>
            <a href={reply.url} target="_blank">
                <img src={reply.url_img} className="post_article_img" alt={`${reply.url_title}`} />
            </a>
             <span className="url_title">{reply.url_title}</span>
            </div>
                
            )}
<div className="posts_img_container">
            {reply.posts_img === null || reply.posts_img === "null" ? null : (

                <img src={reply.posts_img} alt={reply.posts_img} className="posts_img"/>
            )}
        {reply.gif ? <img src={reply.gif} alt={reply.gif} className="gif_img"/> : null}

            </div>

</div>



</div>


</div>

    </div>


    </div>

</div>

</div>

    )
    
}

export default PollReplies