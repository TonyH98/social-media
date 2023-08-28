import { useDispatch , useSelector } from "react-redux";
import { getSearchPost } from "../../Store/userActions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function SearchPosts(){

const {tag_name} = useParams()


const dispatch = useDispatch();

const getPosts = useSelector((state) => state.get_search.searchPost);


useEffect(() => {
dispatch(getSearchPost(tag_name))
}, [dispatch])


console.log(getPosts)

    return(
        <div>Hello</div>
    )
}

export default SearchPosts