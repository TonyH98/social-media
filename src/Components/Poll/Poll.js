import { useEffect, useState } from "react";
import axios from "axios";
import "./Poll.css";

const API = process.env.REACT_APP_API_URL;

function Poll({ poll, mainUser, setPoll }) {
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
  const [totalVotes , setTotalVotes] = useState({})

  useEffect(() => {
    axios.get(`${API}/poll/${poll.id}/votes`)
    .then((res) => {
      setTotalVotes(res.data.votes)
    })
  }, [poll.id])

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

          <div>
            {poll.question}
          </div>


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
        backgroundColor: selectedOption !== "" && totalVotes !== 0 ? `rgba(29, 161, 242, ${(op.count / totalVotes)})` : 'transparent',
        padding: '4px',
        borderRadius: '4px',
        marginRight: '8px',
        width: '100%'
      }}>
        {op.text} 
      </span>
      {selectedOption !== "" && totalVotes !== 0 && (
        <span>
          ({((op.count / totalVotes) * 100).toFixed(2)}%)
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
<button onClick={handleAnswer}>Show Answer</button>
: null
}

        </div>
      </div>
    </div>
  );
}

export default Poll;
