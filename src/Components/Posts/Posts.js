import "./Posts.css"
import YouTube from "react-youtube";
function Posts ({posts}){


function formatDate(inputDate){
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

    const [month, day, year] = inputDate.split("/").map(Number);
    const formattedMonth = months[month - 1]
    const formattedYear = year.toString().slice(-2)

    return `${formattedMonth} ${day}, ${formattedYear}`
}


function highlightMentions(content) {
    const mentionPattern = /@(\w+)/g;
    const hashtagPattern = /#(\w+)(?=\W|$)/g;
    
    const highlightedContent = content
    .replace(mentionPattern, '<span class="mention">$&</span>')
    .replace(hashtagPattern, `<span class="hashtag" style="color: blue;">$&</span>`)
    return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
}

const youtubeLinkPattern = /https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/g;


const matches = posts.content.match(youtubeLinkPattern);


  
    return(
        <div className="posts_content">

            <div className="post_user_profile_container">
            <img
            src={posts.creator.profile_img}
            alt={posts.creator.profile_img}
            className="post_user_profile"
            />
            </div>
            
        <div className="post_user_info_date_container">

        <div className="post_user_profile">

        {posts.creator.profile_name} | @{posts.creator.username} | {formatDate(posts.time)}

        </div>

        <div className="posts_content_text_container">

            <div className="post_text">

               {highlightMentions(posts.content)}
            </div>
            <div className="posts_img_container">
            {posts.posts_img === "null" ? null : (

                <img src={posts.posts_img} alt={posts.posts_img} className="posts_img"/>
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
         
         
         </div>
         )
        }
        
        
        export default Posts