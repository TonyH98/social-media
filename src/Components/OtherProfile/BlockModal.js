import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { deleteFol} from "../../Store/userActions";
import axios from "axios";
import "./BlockModal.css"
const API = process.env.REACT_APP_API_URL;

function BlockModal({mainUser , users, open, setOtherBlock, onClose, inBlock, inOtherBlock, block, setBlock}){

    let dispatch = useDispatch()


    function addBlock(e){
        e.preventDefault()
        axios.post(`${API}/block/${mainUser?.id}/block/${users?.id}`)
        .then(() => {
          axios.get(`${API}/block/${mainUser?.id}`)
        .then((res) => {
          setBlock(res.data)
        })
        .then(() => {
            onClose()
          dispatch(deleteFol(mainUser?.id, users?.id))
          dispatch(deleteFol(users?.id, mainUser?.id))
        })
        })
      }
      
      function removeBlock(e){
        e.preventDefault()
        axios.delete(`${API}/block/${mainUser?.id}/deleteBlock/${users?.id}`)
        .then(() =>{
         onClose()
          axios.get(`${API}/block/${mainUser?.id}`)
          .then((res) => {
            setBlock(res.data)
          })
        })
      }



   if(!open) return null

return(
    <div className="overlay">
    <div className={`block_modal ${mainUser?.dark_mode ? 'block_background_dark' : 'block_background_white'}`}>
        <div className="logout_content">
            {inBlock.includes(users.id) ? (
                <>
                    <div className={`${mainUser?.dark_mode ? 'light_text' : 'dark_text'} warning_message_container`}>
                        <h2>Unblock @{users?.username}</h2>
                        <p className="warning_message">{`${users?.username} would be able to follow you back and view your posts.`}</p>
                    </div>
                    <div className="block_buttons_container">
                        <button className="logout_button lg_btn" onClick={removeBlock}>Unblock</button>
                        <button className="logout_cancel_button lg_btn" onClick={onClose}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={`${mainUser?.dark_mode ? 'light_text' : 'dark_text'} warning_message_container`}>
                        <h2>Block @{users?.username}</h2>
                        <p className="warning_message">{`They will not be able to follow you or view your posts, and you will not see posts or notifications from ${users?.username}.`}</p>
                    </div>
                    <div className="block_buttons_container">
                        <button className="logout_button lg_btn" onClick={addBlock}>Block</button>
                        <button className="logout_cancel_button lg_btn" onClick={onClose}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    </div>
</div>

)

}

export default BlockModal