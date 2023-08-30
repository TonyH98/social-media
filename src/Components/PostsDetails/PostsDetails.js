import "./PostsDetails.css"
import { useParams } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { useEffect , useState} from "react";
import { getPostDetails } from "../../Store/userActions";

function PostsDetails(){

const {username , id} = useParams()

const dispatch = useDispatch()

const getPostsDetail = useSelector((state) => state.postsDetail.postDetail);


useEffect(() => {
dispatch(getPostDetails(username , id))
}, [dispatch])


console.log(getPostsDetail)

return(
    <div>
        
    </div>
)

}


export default PostsDetails