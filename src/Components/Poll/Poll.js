import { useEffect, useState } from "react";
import {SlBubble} from "react-icons/sl"
import { Link } from "react-router-dom";
import {AiFillHeart} from "react-icons/ai"
import {AiOutlineHeart} from "react-icons/ai"
import ReplyPollForm from "./ReplyPollForm";
import axios from "axios";
import "./Poll.css";

const API = process.env.REACT_APP_API_URL;

function Poll({ poll, mainUser, setPoll, plan }) {
  function formatDate(inputDate) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const [month, day, year] = inputDate.split("/").map(Number);
    const formattedMonth = months[month - 1];
    const formattedYear = year.toString().slice(-2);

    return `${formattedMonth} ${day}, ${formattedYear}`;
  }

  const [selectedOption, setSelectedOption] = useState("");
  const [voteInfo, setVoteInfo] = useState({});
  const [hidden , setHidden] = useState(false)

  let [show , setShow] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
const [showGifPicker, setShowGifPicker] = useState(false)
const [favoriteP , setFavoriteP] = useState([])
let [block , setBlock] = useState([])
const [fav] = useState({
  creator_id: poll.creator.user_id
})

  useEffect(() => {
   

    axios.get(`${API}/favorites/${mainUser.id}/polls`)
    .then((res) => {
      setFavoriteP(res.data)
    })

  }, [mainUser.id])


  useEffect(() => {
    axios.get(`${API}/block/${mainUser?.id}`)
    .then((res) => {
      setBlock(res.data)
    })
  }, [mainUser?.id])


  useEffect(() => {
    axios.get(`${API}/poll/${mainUser.id}/votes/${poll.id}`)
      .then((res) => {
        setVoteInfo(res.data);
        setSelectedOption(res.data.selected_option || "");
      })
      .catch((error) => {
        console.error("Error fetching vote info:", error);
      });
  }, [mainUser.id, poll.id]);

  useEffect(() => {
    if (selectedOption !== "") {
      handleVote();
    }
  }, [selectedOption]);

  function handleVote() {
    axios.put(`${API}/poll/${poll.id}/check/${mainUser.id}`, {
      selected_option: selectedOption,
    })
    .then(() => {
        axios.get(`${API}/poll/${poll.creator.user_id}`)
        .then((res) => {
            setPoll(res.data)
        })
    })
  }

  function handleAnswer(){
    setHidden(!hidden)
  }

  function handleAddFavPoll(){
    axios.post(`${API}/favorites/${mainUser.id}/favP/${poll.id}`, fav)
    .then(() => {
      axios.get(`${API}/poll/${poll.creator.user_id}`)
      .then((res) => {
          setPoll(res.data)
      })
  })
    .catch((error) => {
      console.log(error); 
    })
  }

  function handleRemoveFavPoll(){
    axios.delete(`${API}/favorites/${mainUser.id}/deleteP/${poll.id}`)
    .then(() => {
      axios.get(`${API}/poll/${poll.creator.user_id}`)
      .then((res) => {
          setPoll(res.data)
      })
  })
  .catch((error) => {
    console.log(error); 
  })
  }

  const inFav = Array.isArray(favoriteP) ? favoriteP.map((fav) => fav?.poll_id) : [];

  const inBlock = Array.isArray(block) ? block.map(block => block.block_id) : []
  return (
    <div className="posts_content">
      <div className="posts_extra_container">
        <div className="post_user_profile_container">
          <img
            src={poll.creator.profile_img}
            alt={poll.creator.profile_img}
            className="post_user_profile"
          />
        </div>

        <div className="post_user_info_date_container">
          <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} post_user_profile`}>

            {poll.creator.profile_name} | @{poll.creator.username} | {formatDate(poll.time)}

          </div>

          {inBlock.includes(poll.creator.id) ? 
          <h2 className={`${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`}>@{poll.creator.username} Blocked</h2> :
          <>
          <Link to={`/poll/${poll?.id}`} className="link-style">
          <div>
            {poll.question}
          </div>
            </Link>
          <div>
  {poll.options.map((op) => (
    <div key={op.text} style={{ display: "flex", alignItems: "center" }}>
      <input
        type="radio"
        value={op.text}
        className="poll_check"
        onChange={() => {
          setSelectedOption(op.text);
        }}
        checked={op.text === selectedOption}
      />
      <span style={{
        backgroundColor: selectedOption !== "" && poll.totalVotes !== 0 ? `rgba(29, 161, 242, ${(op.count / poll.totalVotes)})` : 'transparent',
        padding: '4px',
        borderRadius: '4px',
        marginRight: '8px',
        width: '100%'
      }}>
        {op.text} 
      </span>
      {selectedOption !== "" && poll.totalVotes !== 0 && (
        <span>
          ({((op.count / poll.totalVotes) * 100).toFixed(2)}%)
        </span>
      )}
    </div>
  ))}
</div>

<div>
{poll.answer.length === 0 ? null : (
  selectedOption !== "" ? (
    hidden ? null : (
      <>
      <p>{poll.answer}</p>
      </>
    ) 
    ): null
    )}

</div>
{poll.answer.length !== 0 && selectedOption !== ""? 
<button onClick={handleAnswer} className="answer_btn">Show Answer</button>
: null
}

          </>

          }
    



        </div>
      </div>

      {inBlock.includes(poll.creator.id) ? null :
      <div className="posts-options-container">

<div className="posts-reply-button">
<button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br reply_btn`}  onClick={(e) => { e.preventDefault(); setShow(true); }}>
<SlBubble size={20} /> 
<span className="hidden-text">Reply</span>
</button>
</div>

{/* <div className="repost-button">
<button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} 
onClick={createRepost}><PiArrowsClockwise size={20}/> {posts.repost_counter}
<span className="hidden-text">Repost</span>
</button>
</div> */}


    <div className="favorite_posts_container">
       {mainUser && inFav.includes(poll?.id) ? 
       <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleRemoveFavPoll}><AiFillHeart size={20} color="red"/>
       <span className="hidden-text">Disike</span>
       </button>

       : <button className={`${mainUser?.dark_mode ? 'white_option_btn' : 'dark_option_btn'} no_br fav_btn`} onClick={handleAddFavPoll}><AiOutlineHeart size={20}/>
       <span className="hidden-text">Like</span>
       </button>}

   </div> 

   
   {/* <div className="like-container">
   <button className={`${reaction?.dislikeId?.includes(mainUser?.id) ? 'green_option_btn' : `${mainUser.dark_mode ? "light_outline" : "dark_outline"}`} no_br react_btn`} onClick={handleLike}><AiOutlineLike size={20} /> {reaction.likes}
   <span className="hidden-text">Like</span>
   </button>
  
   </div> */}
   
   

   {/* <div className="dislike-container">
   <button className={`${reaction?.dislikeId?.includes(mainUser?.id) ? 'red_option_btn' : `${mainUser.dark_mode ? "light_outline" : "dark_outline"}`} no_br react_btn`} onClick={handleDislike}><AiOutlineDislike size={20}/> {reaction.dislikes}
   <span className="hidden-text">Dislike</span>
   </button>
   </div>   */}

   <ReplyPollForm
    open={show} 
    onClose={() => {setShow(false); setShowEmojiPicker(false);  setShowGifPicker(false)}}
     showGifPicker={showGifPicker}
      setShowGifPicker={setShowGifPicker} 
      setShowEmojiPicker={setShowEmojiPicker}
       showEmojiPicker={showEmojiPicker}
        poll={poll}
        plan={plan}
         mainUser={mainUser}/>
</div>
      
      }
    </div>
  );
}

export default Poll;