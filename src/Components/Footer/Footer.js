import "./Footer.css"
import Articles from "./Articles"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { fetchUsers, getTags, fetchUser} from "../../Store/userActions";
import {PiMagnifyingGlassLight} from "react-icons/pi"
import {MdClear} from "react-icons/md"
import axios from 'axios';

const newAPI = process.env.REACT_APP_API_NEWS
function Footer({user, mainUser}){

    const dispatch = useDispatch();

    let allUsers = useSelector((state) => state.users.users)
    const getAllTags = useSelector((state) => state.get_tags.tags)
    const users = useSelector((state) => state.user.users);

    const [filter , setFilter] = useState([])
    const [search, setSearch] = useState("");
    const [newArticle , setNewsArticle] = useState([])

    useEffect(() => {
        dispatch(fetchUsers(user?.id))
        dispatch(getTags())
        dispatch(fetchUser())
     }, [dispatch])

     function clear() {
        setFilter([]);
        setSearch("");
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

        useEffect(() => {
            axios
              .get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=8&apiKey=${newAPI}`)
              .then((res) => {
                setNewsArticle(res.data);
              });
          }, [] );
          
          console.log(newArticle)


    return(
        <div className="profile_search_input_container">

<div className={search.length > 0 ? `search_active search_container` : `search_container`}>
<div className="searchIcon">
    {search.length === 0 ? (
      <PiMagnifyingGlassLight size={25} color="black" />
    ) : (
      <MdClear onClick={clear} size={25} color="black" className="clear-bar" />
    )}
  </div>
  <input
    type="text"
    className="profile_search_bar"
    placeholder="Search"
    value={search}
    onChange={handleFilter}
  />
</div>


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
        <br/>
        <div className="new_article_container">
            {newArticle.articles.map((article) => {
                return(
                <div className="article">
                    <Articles article={article}/>
                </div>

                )
            })}
        </div>
        </div>
    )
}

export default Footer