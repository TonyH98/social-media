import "./Replies.css"
function Replies({reply}){

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

console.log(reply)
return(

<div className="posts_content replies">

<div className="post_user_profile_container">
<img
src={reply?.creator?.profile_img}
alt={reply?.creator?.profile_img}
className="post_user_profile"
/>
</div>

<div className="post_user_info_date_container">

<div className="post_user_profile">

{reply?.creator?.profile_name} | @{reply?.creator?.username} | {formatDate(reply.time)}

</div>


<div className="posts_content_text_container">

<div className="post_text">

   {reply.content}
</div>


</div>


</div>



</div>

)

}


export default Replies