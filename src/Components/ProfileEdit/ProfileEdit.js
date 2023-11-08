import "./ProfileEdit.css"

import { useState , useEffect, useRef} from 'react';
import { editProfile} from "../../Store/userActions";
import { useDispatch } from "react-redux";
import {BsEmojiSmile} from "react-icons/bs"
import EmojiPicker from "emoji-picker-react";
const API = process.env.REACT_APP_API_URL;
function ProfileEdit({onClose , users, open2, fetchUsers, setShowEmojiPicker, showEmojiPicker }){

    const [currentPage , setCurrentPage] = useState(1)

    const textareaRef = useRef(null);

    const dispatch = useDispatch();

    let [edit , setEdit] = useState({
        profile_name: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        bio: "",
        profile_img: "",
        banner_img: "",
        dark_mode: "",
        notifications: ""
    })
    

useEffect(() => {
    if(users){
        setEdit(users)
    }
}, [users])

const handleTextChange = (event) => {
    if(event.target.id === "profile_img"){
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = () => {
            setEdit({...edit, profile_img: reader.result})
        }
        reader.readAsDataURL(file)
    }
    else if(event.target.id === "banner_img"){
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = () => {
            setEdit({...edit, banner_img: reader.result})
        }
        reader.readAsDataURL(file)
    }
    
    else if(event.target.id === "bio"){
        const {value} = event.target
        if(value.length <=250){
          setEdit((prevEdit) => ({
            ...prevEdit,
            bio: value,
          }));
        } 
        else{
          event.target.value = value.substr(0,250)
        }
    }
    else{
        setEdit({...edit, [event.target.id]: event.target.value})
    }
};

const handleCheck = (event) => {
        setEdit({ ...edit, dark_mode: !edit.dark_mode });
};

const handelNofite = () => {
    setEdit({...edit, notifications: !edit.notifications})
}

const nextPage = (event) => {
    event.preventDefault();
    setCurrentPage(currentPage + 1);
  };

  const prevPage = (event) => {
    event.preventDefault();
    setCurrentPage(currentPage - 1);
  };


  const handleEmojiClick = (emoji) => {
    const emojiUnicode = emoji.emoji;
    const startPos = textareaRef.current.selectionStart;
    const endPos = textareaRef.current.selectionEnd;
    const text = edit.profile_name;
    const updatedText = text.substring(0, startPos) + emojiUnicode + text.substring(endPos);
    setEdit((prevEdit) => ({ ...prevEdit, profile_name: updatedText }));
  };


const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile_name", edit?.profile_name);
    formData.append("username", edit?.username);
    formData.append("firstname", edit?.firstname);
    formData.append("lastname", edit?.lastname);
    formData.append("email", edit?.email);
    formData.append("bio", edit.bio);
    formData.append("dark_mode", edit.dark_mode);
    formData.append("notifications", edit.notifications);
    if (edit?.profile_img) {
        formData.append("profile_img", edit?.profile_img);
    }
    if (edit?.banner_img) {
        formData.append("banner_img", edit?.banner_img);
    }

     dispatch(editProfile(users , formData))
     .then(() => {
        dispatch(fetchUsers(users?.id))
        onClose()
        setCurrentPage(1)
     })
};

console.log(edit.notifications)



    if(!open2) return null

    return(
        <div className="overlay">
           <div className={`modal-container ${users?.dark_mode ? 'modal_backgrond_dark' : 'modal_backgrond_white'}`}>
            <div className="modalLeft">
            <p className="closeBtn" onClick={() => { onClose(); setCurrentPage(1); }}>X</p>

            </div>
           <div className="content">
            
            <form onSubmit={handleSubmit}className="signup-form">

            <div className='input-container'>
            {currentPage === 1 && (
                <div className="profile_page_one_form">
            <label htmlFor="profile_name" className={`label-signup ${users?.dark_mode ? 'white_text' : 'dark_text'}`}>Profile Name:
            <div className="profile_edit_input_container">
            <input
                id="profile_name"
                className={`input_profile_name ${users.dark_mode ? "input_dark" : "input_white"}`}
                required
                value={edit.profile_name}
                onChange={handleTextChange}
            />
            <div className='media_button'>
             <BsEmojiSmile size={20} className='emoji_btn' color="blue" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                <span className='hidden-text'>Emoji</span>
             </div>

            </div>
            
            </label>

             {showEmojiPicker && (
             <EmojiPicker onEmojiClick={(emoji) => handleEmojiClick(emoji)}/>
            )}
            
            <label className={`label-signup ${users?.dark_mode ? 'white_text' : 'dark_text'}`} htmlFor="bio">
                    Bio:
                    <textarea
                        required
                        id="bio"
                        className={`input_bio ${users.dark_mode ? "input_dark" : "input_white"}`}
                        value={edit.bio}
                        placeholder="About You?!"
                        onChange={handleTextChange}
                        ref={textareaRef}
                        onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                    />
                    <p className={`${edit?.bio.length >= 250 ? 'text-red-700' : null}`}>
                        {edit?.bio.length}/250 characters
                    </p>
                    </label>

                <button className="page_count_button" onClick={nextPage}> Next </button>
                </div>
            )}
  


                {currentPage === 2 && (
                    <div className="profile_page_two_form">
                    <label
            htmlFor="profile_img"
            className={`label-signup ${
                users?.dark_mode ? "white_text" : "dark_text"
            }`}
            >
            Profile Image
            <div className="custom-input-container">
             <img src={edit.profile_img} className="edit_profile_image"/>
                <input
                id="profile_img"
                name="profile_img"
                type="file"
                className="file-input"
                accept=".png, .jpg, .jpeg"
                onChange={handleTextChange}
                />
            </div>
            </label>



                    <label htmlFor="banner_img"className={`label-signup ${users?.dark_mode ? 'white_text' : 'dark_text'}`}>
                    Banner Image
                    <div>
                    <img src={edit.banner_img} className="edit_banner_image"/>
                    <input
                        id="banner_img"
                        name="banner_img"
                        type="file"
                        className="file-input"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleTextChange}
                        
                    />

                    </div>
                    </label>

                    <div className="page_count_btn_container">

                    <button className="page_count_button" type="button" onClick={prevPage}>Previous</button>

                    <button className="page_count_button" onClick={nextPage}>Next</button>
                    </div>
                    </div>
                )}



                {currentPage === 3 && (
                    <div className="page_three_container">
                    
                    <div className="check_slider_container">
                    <label htmlFor="dark_mode" className={`label-signup ${users?.dark_mode ? 'white_text' : 'dark_text'}`}>
                        Background Color
                        <label className="switch">
                        <input
                        type="checkbox"
                        id="dark_mode"
                        value={edit.dark_mode}
                        checked={edit.dark_mode}
                        onChange={handleCheck}
                    />
                            <span className="slider round"></span>
                        </label>
                        <span>{edit.dark_mode ? "Dark Mode" : "Light Mode"}</span>
                        </label>

                        <label htmlFor="Notifications" className={`label-signup ${users?.dark_mode ? 'white_text' : 'dark_text'}`}>
                        Notifications
                        <label className="switch">
                        <input
                        type="checkbox"
                        id="notifications"
                        value={edit.notifications}
                        checked={edit.notifications}
                        onChange={handelNofite}
                    />
                            <span className="slider round"></span>
                        </label>
                        <span>{edit.notifications ? "Receive notifications when users mention you or blocks you" : "Will not receive any notifications when users mention you or blocks you"}</span>
                        </label>

                    </div>
                
               <div className="page_count_btn_container">

                <button className="page_count_button" type="button" onClick={prevPage}>
                Previous
              </button>

              <button className="edit_submit" type='submit'>Edit</button>
               </div>
                    </div>
                )}

</div>



            </form>


           </div>

           </div>
        </div>
    )


}


export default ProfileEdit