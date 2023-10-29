import { useEffect , useState} from "react";
import { getFollower } from "../../Store/userActions";
import { useDispatch , useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import Follower from "./Follwer";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Followers({user, mainUser}){

    let {id} = useParams()
    let [users , setUsers] = useState([])
    const location = useLocation()

    const isActive = (path) => {
        return location.pathname === path ? 'active3' : ''
      }

let dispatch = useDispatch()
let follower = useSelector((state) => state.follower.fol)

useEffect(() => {
axios.get(`${API}/users/${id}`)
.then((res) => {
    setUsers(res.data)
})
 }, [id])

 useEffect(() => { 
    if(id){
      dispatch(getFollower(id))
    }
 }, [dispatch, id])

console.log(user)

    return(
        <div className="users_following_container">
        <div className="following_first_section">

            <div className="user_names_container">
            <h2 className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>{users?.profile_name}</h2>
            <span className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>@{users?.username}</span>
            </div>
            <br/>
            <div className="followe_links">
                <Link to={`/${id}/following`} className={isActive(`/${users?.id}/following`)}>
                <button className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} follow_link`}>Following</button>
                </Link>

                <Link to={`/${id}/follower`} className={isActive(`/${users?.id}/follower`)}>
                <button className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} follow_link`}>Followers</button>
                </Link>
            </div>
        
        </div>

        <div className="following_second_section">
            {follower.length === 0 ? <h1>No Followers</h1> :
            
            <div>
                {follower.map((fol) => {
                    return(
                        <Follower fol={fol} user={user} mainUser={mainUser}/>
                    )
                })}

            </div>
                }
        </div>

    </div>
    )
}


export default Followers