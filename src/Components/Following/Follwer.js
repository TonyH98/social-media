import { useEffect, useState } from "react"

function Follower({fol}){

    let [bio, setBio] = useState(fol.bio)


    useEffect(() => {
      if (bio.length >= 250) {
        setBio(bio.slice(0, 20) + "...")
      }
    }, [fol.bio , bio]) 
  
  



return(

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



  </div>

)

}

export default Follower