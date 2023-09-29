import { useDispatch , useSelector } from "react-redux";
import { getSearchPost } from "../../Store/userActions";
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import TagPosts from "./tagPosts";
import "./SearchPosts.css"

function SearchPosts(){

const {tag_name} = useParams()

let [option , setOption] = useState(0)
let options = ["Posts", "Replies", "All"]

const dispatch = useDispatch();

const getPosts = useSelector((state) => state.get_search.searchPost);


useEffect(() => {
dispatch(getSearchPost(tag_name))
}, [dispatch])


function optionContent(selected) {
    if (selected === 0) {
      return (
        <div>
          {getPosts.map((tag) => {
            return (
              <div  className="posts-border-container">
                <TagPosts tag={tag}/>
              </div>
            );
          })}
        </div>
      );
    }
    
    
  }




    return(
      <div className="search_post_page">
        <div className="search_post_first_section">
            <div className="tag_name_container">
                <h1>{getPosts[0]?.tag_names}</h1>
            </div>
            <div className="search_option_button">
            {options.map((opt , index) => {
                        return(
                    <button onClick={() => setOption(index)} className={index === option ? `active options` : 'options'} key={index}>{opt}</button>
                        )
                    })}
            </div>
        </div>
    <div className="search_post_second_section">
        {optionContent(option)}
    </div>
      </div>
    )
}

export default SearchPosts