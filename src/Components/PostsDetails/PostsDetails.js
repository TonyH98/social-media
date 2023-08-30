import "./PostsDetails.css"
import { useParams } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { useEffect , useState} from "react";
import { getPostDetails } from "../../Store/userActions";
import {fetchReplies} from "../../Store/userActions";


function PostsDetails(){

const {username , id} = useParams()

const dispatch = useDispatch()

const getPostsDetail = useSelector((state) => state.postsDetail.postDetail);

const getReplies = useSelector((state) => state.replies.replies)

useEffect(() => {
dispatch(getPostDetails(username , id))
dispatch(fetchReplies(username, id))
}, [dispatch])




return(
    <div>
        
    </div>
)

}


export default PostsDetails