import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function Following({fol , mainUser}) {



  let [bio, setBio] = useState(fol.bio)

  let [following , setFollowing] = useState([])

  useEffect(() => {
    if (bio.length >= 250) {
      setBio(bio.slice(0, 20) + "...")
    }
  }, [fol.bio , bio]) 

useEffect(() => {
  if(mainUser.id){
    axios.get(`${API}/follow/${mainUser.id}`)
    .then((res) => {
      setFollowing(res.data)
    })
  }
}, [mainUser.id])

function handleFollow(e){
  e.preventDefault();
  axios.post(`${API}/follow/${mainUser.id}/follow/${fol.following_id}`)
  .then(() => {
    axios.get(`${API}/follow/${mainUser.id}`)
    .then((res) => {
      setFollowing(res.data)
    })
  })
}


function handleDeleteFollow(e){
  e.preventDefault();
  axios.delete(`${API}/follow/${mainUser.id}/delete/${fol.following_id}`)
  .then(() => {
    axios.get(`${API}/follow/${mainUser.id}`)
    .then((res) => {
      setFollowing(res.data)
    })
  })
}


const inFol = Array.isArray(following) ? following.map(fol => fol?.following_id) : [];

console.log(inFol)

  return (
    <Link to={`/profiles/${fol.following_id}`} onClick={window.scrollTo(0 , 0)}>
    <div className={`${mainUser?.dark_mode ? "fol_white_border" : "fol_dark_border"} following_border`}>
      <div className="following_content_first">
       
          <div className="following_img_container">
            <img
              src={fol?.profile_img}
              alt={fol?.username}
              className="following_img"
            />
          <div className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} following_names_container`}>
            <div className="profile_name">{fol.profile_name}</div>
            <div className="fol_username">@{fol.username}</div>
          </div>

          </div>

      <div className="following_content_third">
          <div className="following_button_container">
          { inFol.includes(fol?.following_id) ? 
              <button onClick={handleDeleteFollow} className="follow_btn">Remove</button>
              : <button onClick={handleFollow} className="follow_btn">Follow</button>}
          </div>
      </div>


        </div>

      <div className="following_content_second">
        <div className="following_bio_container">
          <p className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} following_bio`}>{bio}</p>
        </div>
      </div>


    </div>
    
    </Link>
  )
}

export default Following


// window.scrollTo(0 , 0)