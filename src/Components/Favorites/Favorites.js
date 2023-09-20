
import {Link} from "react-router-dom"

function Favorites({fav}){

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
    

    
    


console.log(fav.post_creator.date_created)


return(
    <div className="posts_content">

    <div className="posts_extra_container">

    <div className="post_user_profile_container">
    <img
    src={fav.post_creator.profile_img}
    alt={fav.post_creator.profile_img}
    className="post_user_profile"
    />
    </div>

<div className="post_user_info_date_container">

<div className="post_user_profile">

{fav.post_creator.profile_name} | @{fav.post_creator.username} | {formatDate(fav.post_creator.date_created)}

</div>

    <Link to={`/posts/${fav.post_creator.username}/${fav?.posts_id}`} className="link-style">
<div className="posts_content_text_container">

    <div className="post_text">

       {highlightMentions(fav.post_creator.content)}
    </div>
    <div className="posts_img_container">
    {fav.post_creator.image === "null" ? null : (

        <img src={fav.post_creator.image} alt={fav.post_creator.image} className="posts_img"/>
    )}

    </div>


 
 </div>
</Link>
 
 </div>

    </div>
    
 
 </div>

)

}

export default Favorites