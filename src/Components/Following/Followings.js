import { useState, useEffect} from "react";
import { fetchUsers } from "../../Store/userActions";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Following from "./Following";
import "./Following.css"
function Followings({user , following}){


    const location = useLocation()

    const isActive = (path) => {
        return location.pathname === path ? 'active3' : ''
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
                <Link to={`/${user?.id}/following`} className={isActive(`/${user?.id}/following`)}>
                <button className="follow_link">Following</button>
                </Link>

                <Link to={`/${user?.id}/follower`} className={isActive(`/${user?.id}/follower`)}>
                <button className="follow_link">Followers</button>
                </Link>
            </div>
        
        </div>

        <div className="following_second_section">
            {following.map((fol) => {
                return(
                    <Following fol={fol}/>
                )
            })}
        </div>

    </div>

)

}

export default Followings