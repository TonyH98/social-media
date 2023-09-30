import { useParams , Link } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { fetchUsers, fetchPosts, getFavorites, addFollowing, getFollowing, deleteFol , getFollower } from "../../Store/userActions";
import { useState, useEffect} from "react";


function OtherProfile({user}){

    let options = ["Posts", "Replies", "Favorites"]
    let [option , setOption] = useState(0)

    const {id} = useParams()
    const dispatch = useDispatch();

    const users = useSelector((state) => state.user.users);
    let usersFollowing = useSelector((state) => state.follow.fol)
    let follower = useSelector((state) => state.follower.fol)

    useEffect(() => {
        dispatch(fetchUsers(id))
        dispatch(getFollowing(user?.id))
        dispatch(getFollower(id))
     }, [dispatch, user])


 
    function handleFollow(e){
        e.preventDefault()
        dispatch(addFollowing(user?.id, users?.id))
    }


    function handleDeleteFollow(e){
        e.preventDefault()
        dispatch(deleteFol(user?.id, users?.id))
    }
     const inFav = Array.isArray(usersFollowing) ? usersFollowing.map(fol => fol?.following_id) : [];

   const parseBio = (bio) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return bio?.replace(urlRegex, (url) => {
          return `<a href="${url}" target="_blank" style="color: blue;">${url}</a>`;
        });
      };

return(
        <div className="profile">

        <div className="profile_first_half">

        <div className="profile_banner_container">

        <img src={users?.banner_img} 
        alt={users?.banner_img} 
        className="profile_banner_img"/>

        <div className="profile_btns_container">
            {user && inFav.includes(users?.id) ? 
            <button onClick={handleDeleteFollow}>Unfollow</button>
            : <button onClick={handleFollow}>Follow</button>}
        </div>

        </div>

        


        <div className="profile_info_container">

        <div className="profile_img_container">

        <img src={users?.profile_img} className="profile_img"/>

        </div>
        
        <div className="profile_names_container">
            <h3>{users?.profile_name}</h3>
            <div>@{users?.username}</div>

        </div>

        <div className="profile_bio_container">
      <p
        dangerouslySetInnerHTML={{
          __html: users ? parseBio(users.bio) : '',
        }}
      />
    </div>


        <div className="profile_followers_container">

            <Link to={`/${users?.id}/following`}>
            <div>0 Following</div>
            </Link>

            <Link to={`/${users?.id}/follower`}>
            <div>0 Followers</div>
            </Link>
            

        </div>

        </div>

        <div className="profile_selected_options">

        <div className="three_options_container">
        {options.map((opt , index) => {
            return(
                <button onClick={() => setOption(index)} className={index === option ? `active options` : 'options'} key={index}>{opt}</button>
            )
        })}

        </div>


        </div>


        </div>

        </div>
)

}

export default OtherProfile
        