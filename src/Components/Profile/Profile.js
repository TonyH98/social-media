import { useState, useEffect} from "react";
import "./Profile.css"
import {BsPencilSquare} from "react-icons/bs"
import Favorites from "../Favorites/Favorites"
import PostForm from "../PostForm/PostForm";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import Posts from "../Posts/Posts";
import { useDispatch , useSelector } from "react-redux";
import { fetchUsers, fetchPosts, getTags, getFavorites ,  fetchUser, getFollowing, getFollower} from "../../Store/userActions";
import { Link } from "react-router-dom";


function Profile({user}){


    let [option , setOption] = useState(0)
    const [modal , setModal] = useState(false)
    const [search, setSearch] = useState("");
    const [modal2 , setModal2] = useState(false)

    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const getPosts = useSelector((state) => state.posts_get.posts)
    const getAllTags = useSelector((state) => state.get_tags.tags)
    const favorites = useSelector((state) => state.favorites.fav)
    let allUsers = useSelector((state) => state.users.users)
    let following = useSelector((state) => state.follow.fol)
    let follower = useSelector((state) => state.follower.fol)


    const [filter , setFilter] = useState([])
    useEffect(() => {
       dispatch(fetchUsers(user?.id))
       dispatch(getTags())
       dispatch(fetchUser())
       dispatch(getFollowing(user?.id))
       dispatch(getFollower(user?.id))
    }, [dispatch])
    



    useEffect(() => {
        if(users && users?.id){
            dispatch(fetchPosts(users?.username))
            dispatch(getFavorites(users?.id))
        }

    }, [dispatch , users])
    



    let options = ["Posts", "Replies", "Favorites"]

    function optionContent(selected) {
        if (selected === 0) {
          return (
            <div className="option-content-holder">
              {getPosts.map((posts) => {
                return (
                  <div key={posts.id} className="posts-border-container">
                    <Posts posts={posts} users={users} favorites={favorites} />
                  </div>
                );
              })}
            </div>
          );
        }
        if (selected === 2) {
          return ( 
            <div className="option-content-holder">
              {favorites.map((fav) => {
                return (
                  <div key={fav.id} className="posts-border-container">
                    <Favorites fav={fav} users={users} />
                  </div>
                );
              })}
            </div>
          );
        }
 
      }
      




function handleFilter(event) {
    let searchResult = event.target.value;
        setSearch(searchResult);

        const filterTag = getAllTags.filter((tags) => {
            return tags.tag_names.toLowerCase().includes(searchResult.toLowerCase());
        });

        const filterUsers = allUsers.filter((user) => {
            return user.username.toLowerCase().includes(searchResult.toLowerCase());
        });

        // Combine filterTag and filterUsers into a single array
        const combinedFilter = [...filterTag, ...filterUsers];

        if (searchResult === "") {
            setFilter([]);
        } else {
            setFilter(combinedFilter);
        }
    }




 
   allUsers = allUsers.filter((user) => user.id !== users.id)

    return(
        <div className="profile">

        <div className="profile_first_half">

        <div className="profile_banner_container">

        <img src={users?.banner_img} 
        alt={users?.banner_img} 
        className="profile_banner_img"/>

        <div className="profile_btns_container">

        <button className="create_post_btns" 
        onClick={() => setModal(true)}
        >Post</button>

        <button className="profile-edit-btns"  onClick={() => setModal2(true)}>
        <BsPencilSquare size={20}/></button>
        </div>

        </div>

        <ProfileEdit open2={modal2} fetchUsers={fetchUsers} onClose={() => setModal2(false)} users={users}/>

        <PostForm open={modal} onClose={() => setModal(false)} users={users}/>


        <div className="profile_info_container">

        <div className="profile_img_container">

        <img src={users?.profile_img} className="profile_img"/>

        </div>
        
        <div className="profile_names_container">
            <h3>{users?.profile_name}</h3>
            <div>@{users?.username}</div>

        </div>

        <div className="profile_bio_container">

            <p>{users?.bio}</p>

        </div>


        <div className="profile_followers_container">

            <Link to={`/${user?.id}/following`}>
            <div>{following.length} Following</div>
            </Link>

            <Link ti={`/${user?.id}/follower`}>
            <div>{follower.length} Followers</div>
            </Link>
            

        </div>

        </div>

        <div className="profile_selected_options">

        <div className="three_options_container">
        {options.map((option , index) => {
            return(
                <button onClick={() => setOption(index)} className="options" key={index}>{option}</button>
            )
        })}

        </div>

{optionContent(option)}
        </div>


        </div>


       

        <div className="profile_search_input_container">

        <input type="text" className="profile_search_bar" placeholder="Search" value={search} onChange={handleFilter}/>
        {filter.length !== 0 && (
                    <div className="dataResult">
                        {filter.slice(0, 10).map((result, index) => {
                            if (result.tag_names) {
                                // Display tags
                                return (
                                    <div className="search-link" key={index}>
                                        <Link to={`/posts/${result.tag_names.slice(1)}`}>
                                            <p className="dropdown-link">{result.tag_names}</p>
                                        </Link>
                                    </div>
                                );
                            } else if (result.username) {
                                // Display users
                                return (
                                    <div className="search-link" key={index}>
                                        <Link to={`/profiles/${result.id}`}>
                                            <p className="dropdown-link">@{result.username}</p>
                                        </Link>
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}


        </div>

        </div>


    )
}

export default Profile