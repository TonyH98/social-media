import { useDispatch , useSelector } from "react-redux";
import { getSearchPost , getSearchReplies } from "../../Store/userActions";
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import TagPosts from "./tagPosts";
import TagReplies from "./tagReplies";
import AllSearch from "./AllSearch";
import "./SearchPosts.css"

function SearchPosts({mainUser}){

const {tag_name} = useParams()

let [option , setOption] = useState(0)
let options = ["Posts", "Replies", "All"]
let [allSearch , setAllSearch] = useState([])
const dispatch = useDispatch();

const getPosts = useSelector((state) => state.get_search.searchPost);
const getReplies = useSelector((state) => state.search2.search)


useEffect(() => {
dispatch(getSearchPost(tag_name))
dispatch(getSearchReplies(tag_name))
setAllSearch([...getPosts , ...getReplies])
}, [dispatch, tag_name])



function optionContent(selected) {
    if (selected === 0) {
      return (
        <div className="search_post_container">
          {getPosts.map((tag) => {
            return (
              <div  className="posts-border-container">
                <TagPosts tag={tag} mainUser={mainUser}/>
              </div>
            );
          })}
        </div>
      );
    }
    if(selected === 1){
      return (
        <div className="search_post_container">
          {getReplies.map((tag) => {
            return (
              <div  className="posts-border-container">
                <TagReplies tag={tag} mainUser={mainUser}/>
              </div>
            );
          })}
        </div>
      );
    }
  if(selected === 2){
    return (
      <div className="search_post_container">
        {allSearch.map((tag) => {
          return (
            <div  className="posts-border-container">
              <AllSearch tag={tag} mainUser={mainUser}/>
            </div>
          );
        })}
      </div>
    );
  }
    
  }


console.log(getPosts)


    return(
      <div className="search_post_page">
        <div className="search_post_first_section">
            <div className="tag_name_container">
                <h1 className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>{allSearch[0]?.tag_names}</h1>
            </div>
            <div className="search_option_button">
            {options.map((opt , index) => {
                        return(
                    <button onClick={() => setOption(index)} className={`${index === option ? `active options` : 'options'} ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`} key={index}>{opt}</button>
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