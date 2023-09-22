import { useState, useEffect} from "react";
import { fetchUsers } from "../../Store/userActions";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Following.css"
function Following({user , following}){


    const location = useLocation()
    const isActive = (path) => {
        return location.pathname === path ? 'active2' : ''
      }

const dispatch = useDispatch();
const users = useSelector((state) => state.user.users);

useEffect(() => {
    dispatch(fetchUsers(user?.id))

 }, [dispatch])



return(

    <div className="users_following_container">
        <div className="following_first_section">

            <div className="user_names_container">
            <h2>{users?.profile_name}</h2>
            <span>@{users?.username}</span>
            </div>

            <div className="followe_links">
                <button>Following</button>
                <button>Followers</button>
            </div>
        
        </div>

    </div>

)

}

export default Following