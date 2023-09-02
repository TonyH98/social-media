import { useParams } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { fetchUsers, fetchPosts, getFavorites, addFollowing, getFollowing, deleteFol  } from "../../Store/userActions";
import { useState, useEffect} from "react";


function OtherProfile({user}){

    const {id} = useParams()
    const dispatch = useDispatch();

    const users = useSelector((state) => state.user.users);
    const following = useSelector((state) => state.follow.fol)

    useEffect(() => {
        dispatch(fetchUsers(id))
        dispatch(getFollowing(user?.id))
     }, [dispatch, user])


 
    function handleFollow(e){
        e.preventDefault()
        dispatch(addFollowing(user?.id, users?.id))
    }


    function handleDeleteFollow(e){
        e.preventDefault()
        dispatch(deleteFol(user?.id, users?.id))
    }
     const inFav = Array.isArray(following) ? following.map(fol => fol?.following_id) : [];

return(
    <div>
        {user && inFav.includes(users?.id) ? 
         <button onClick={handleDeleteFollow}>Unfollow</button>
        : <button onClick={handleFollow}>Follow</button>}
    </div>
)

}

export default OtherProfile