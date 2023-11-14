
import {useEffect , useState, useRef} from "react"
import {BsFillPinFill} from "react-icons/bs"
import {PiStarFour} from "react-icons/pi"
import {GrNotes} from "react-icons/gr"
import {SlBubble} from "react-icons/sl"
import axios from "axios";
import {AiOutlineBarChart} from "react-icons/ai"
import {RiUserFollowFill, RiUserUnfollowLine} from "react-icons/ri"
import {BsFillVolumeMuteFill} from "react-icons/bs"
import {CgUnblock} from "react-icons/cg"
import {BiBlock} from "react-icons/bi"


const API = process.env.REACT_APP_API_URL;
function PostOptionModal({onClose, open, posts, mainUser}){

    const modalRef = useRef()

    let [follow , setFollow] = useState([])

    let [block , setBlock] = useState([])

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
          }
        };
    
        if (open) {
          document.addEventListener('mousedown', handleOutsideClick);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, [onClose, open]);

      const pin = {pin:  true , username: mainUser?.username}

      const unPin = {pin: false , username: mainUser?.username}

      function pinPost(){
        axios.put(`${API}/users/${mainUser.username}/posts/${posts.id}` , pin)
      }

      function removePost(){
        axios.put(`${API}/users/${mainUser.username}/posts/${posts.id}` , unPin)
      }

   
useEffect(() => {
    axios.get(`${API}/follow/${mainUser.id}`)
    .then((res) => {
        setFollow(res.data)
    })
}, [mainUser])

useEffect(() => {
axios.get(`${API}/block/${mainUser.id}`)
.then((res) => {
    setBlock(res.data)
})
}, [mainUser.id])


function handleFollow(e){
    e.preventDefault();
    axios.post(`${API}/follow/${mainUser.id}/follow/${posts.creator.id}`)
    .then(() => {
      axios.get(`${API}/follow/${mainUser.id}`)
      .then((res) => {
        setFollow(res.data)
      })
    })
  }
  
  
  function handleDeleteFollow(e){
    e.preventDefault();
    axios.delete(`${API}/follow/${mainUser.id}/delete/${posts.creator.id}`)
    .then(() => {
      axios.get(`${API}/follow/${mainUser.id}`)
      .then((res) => {
        setFollow(res.data)
      })
    })
  }



  function addBlock(e){
    e.preventDefault()
    axios.post(`${API}/block/${mainUser?.id}/block/${posts.creator.id}`)
    .then(() => {
      axios.get(`${API}/block/${mainUser?.id}`)
    .then((res) => {
      setBlock(res.data)
    })
    })
  }
  
  function removeBlock(e){
    e.preventDefault()
    axios.delete(`${API}/block/${mainUser?.id}/deleteBlock/${posts.creator.id}`)
    .then(() =>{
      axios.get(`${API}/block/${mainUser?.id}`)
      .then((res) => {
        setBlock(res.data)
      })
    })
  }



if(!open) return null


const inFol = Array.isArray(follow) ? follow.map(fol => fol?.following_id) : [];

const inBlock = Array.isArray(block) ? block.map(block => block.block_id) : []


return(
    <div className="option-overlay">
    <div ref={modalRef} className={`option-container ${mainUser?.dark_mode ? 'modal_backgrond_dark' : 'modal_backgrond_white'}`}> 
    <div className="option_modal_content">

    {!posts.repost && posts.creator.username !== mainUser.username ? (
    inFol.includes(posts.creator.id) ? (
        <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`} onClick={handleDeleteFollow}>
        <RiUserUnfollowLine size={20} /> <span className="button_text">Unfollow</span>
        </button>
    ) : (
        <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`}  onClick={handleFollow}>
        <RiUserFollowFill size={20} /> <span className="button_text">Follow</span>
        </button>
    )
    ) : null}

    {!posts.repost && posts.creator.username === mainUser.username ? (
    posts.pin ? (
        <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`} onClick={removePost}>
        <BsFillPinFill size={20} /> <span className="button_text">Unpin Post</span>
        </button>
    ) : (
        <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`} onClick={pinPost}>
        <BsFillPinFill size={20} /> <span className="button_text">Pin Post</span>
        </button>
    )
    ) : null}




    {!posts.repost && posts.creator.username === mainUser.username ? (
          <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`} >
          <PiStarFour size={20} /> 
          <span className="button_text">Highlight on your profile</span>
          </button>
    ): null}    

        <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`} >
          <GrNotes size={20} /> 
          <span className="button_text">{`Add/remove @${posts.creator.username}`}</span>
          </button>

          {posts.creator.username !== mainUser.username ? (
              <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`} >
              <BsFillVolumeMuteFill size={20} /> <span className="button_text">{`Mute @${posts.creator.username}`}</span>
              </button>
          ): null}



        {!posts.repost && posts.creator.username !== mainUser.username ? (
        inBlock.includes(posts.creator.id) ? (
            <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`}  onClick={removeBlock}>
            <CgUnblock size={20} /> <span className="button_text">{`Unblock @${posts.creator.username}`}</span>
            </button>
        ) : (
            <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`}  onClick={addBlock}>
            <BiBlock size={20} /> <span className="button_text">{`Block @${posts.creator.username}`}</span>
            </button>
        )
        ) : null}





          {!posts.repost && posts.creator.username === mainUser.username ? (
          <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`}>
          <SlBubble size={20} /> <span className="button_text">Change who can reply</span>
          </button>
        ): null}    

            <button className={`option_modal_btn ${mainUser?.dark_mode ? 'light_text' : 'dark_text'}`}>
          <AiOutlineBarChart size={20} /> <span className="button_text">View posts engagements</span>
          </button>

        </div>    

    </div>
 </div>  
)

}


export default PostOptionModal




           