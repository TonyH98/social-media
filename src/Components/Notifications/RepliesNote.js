
function RepliesNote({notes , users, mainUser}){

    function highlightMentions(content) {
        const mentionPattern = /@(\w+)/g;
        const hashtagPattern = /#(\w+)(?=\W|$)/g;
        
        const highlightedContent = content
        .replace(mentionPattern, '<span class="mention">$&</span>')
        .replace(hashtagPattern, `<span class="hashtag" style="color: blue;">$&</span>`)
        return <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />;
    }

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

    

    
    return(

        <div className="posts_content">

        <div className="posts_extra_container">

        <div className="post_user_profile_container">
        <img
        src={notes.post_content.profile_img}
        alt={notes.post_content.profile_img}
        className="post_user_profile"
        />
        </div>

    <div className="post_user_info_date_container">

    <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`}>

    {notes.post_content.profile_name} | @{notes.post_content.username} | {formatDate(notes.post_content.date_created)}

    </div>

        
    <div className="posts_content_text_container">

        <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_text`}>

           {highlightMentions(notes.post_content.content)}
        </div>
         <div className="posts_img_container">
        {notes.post_content.post_img === "null" ? null : (

            <img src={notes.post_content.post_img} alt={notes.post_content.post_img} className="posts_img"/>
        )}

        </div> 
    
     </div>

     
     </div>

        </div>
        
     </div>

    )
}


export default RepliesNote