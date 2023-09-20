import "./Footer.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { fetchUsers, getTags, fetchUser} from "../../Store/userActions";

function Footer({user}){

    const dispatch = useDispatch();

    let allUsers = useSelector((state) => state.users.users)
    const getAllTags = useSelector((state) => state.get_tags.tags)
    const users = useSelector((state) => state.user.users);

    const [filter , setFilter] = useState([])
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchUsers(user?.id))
        dispatch(getTags())
        dispatch(fetchUser())
     }, [dispatch])



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
    )
}

export default Footer