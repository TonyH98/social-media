
function Replies({reply}){

return(

<div className="posts_content posts_details_content">

<div className="post_user_profile_container">
<img
src={reply?.creator?.profile_img}
alt={reply?.creator?.profile_img}
className="post_user_profile"
/>
</div>

<div className="post_user_info_date_container">

<div className="post_user_profile">

{reply?.creator?.profile_name} | @{reply?.creator?.username} | {}

</div>


<div className="posts_content_text_container">

<div className="post_text">

   {reply.content}
</div>
{/* <div className="posts_img_container">
{reply.posts_img === "null" ? null : (

    <img src={reply?.posts_img} alt={posts?.posts_img} className="posts_img"/>
)}

</div> */}



</div>


</div>



</div>

)

}


export default Replies