import { useEffect, useState } from "react"
import { useDispatch , useSelector } from "react-redux";
import { deleteFol } from "../../Store/userActions"
function Following({fol, users}) {

  let [bio, setBio] = useState(fol.bio)

  const dispatch = useDispatch();

  useEffect(() => {
    if (bio.length >= 250) {
      setBio(bio.slice(0, 20) + "...")
    }
  }, [fol.bio , bio]) 


function handleDeleteFollow(e){
    e.preventDefault()
    dispatch(deleteFol(users?.id, fol?.following_id))
}


  return (
    <div className="following_border">
      <div className="following_content_first">
        <div className="following_img_container">
          <img
            src={fol?.profile_img}
            alt={fol?.username}
            className="following_img"
          />
        </div>
        <div className="following_names_container">
          <div className="profile_name">{fol.profile_name}</div>
          <div className="fol_username">@{fol.username}</div>
        </div>
      </div>
      <div className="following_content_second">
        <div className="following_bio_container">
          <p className="following_bio">{bio}</p>
        </div>
      </div>

    <div className="following_content_third">
        <div className="following_button_container">
            <button onClick={handleDeleteFollow} className="follow_button">Remove</button>
        </div>
    </div>

    </div>
  )
}

export default Following
