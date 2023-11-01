import "./ProfileEdit.css"

import { useState , useEffect} from 'react';
import { editProfile} from "../../Store/userActions";
import { useDispatch } from "react-redux";


const API = process.env.REACT_APP_API_URL;
function ProfileEdit({onClose , users, open2, fetchUsers }){

    const [currentPage , setCurrentPage] = useState(1)

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
                <p className="closeBtn" onClick={onClose}>X</p>
            </div>
           <div className="content">
            <h2 className={`posts_header ${users?.dark_mode ? 'white_text' : 'dark_text'}`}>Edit Profile</h2>
            
            <form onSubmit={handleSubmit}className="signup-form">

            <div className='input-container'>
            {currentPage === 1 && (
                <div>
            <label htmlFor="profile_name" className={`label-signup ${users?.dark_mode ? 'white_text' : 'dark_text'}`}>Profile Name:
            <input
                id="profile_name"
                className={`input_profile_name ${users.dark_mode ? "input_dark" : "input_white"}`}
                required
                value={edit.profile_name}
                onChange={handleTextChange}
            />
            
            </label>

            <label className={`label-signup ${users?.dark_mode ? 'white_text' : 'dark_text'}`} htmlFor="bio">
                    Bio:
                    <textarea
                        required
                        id="bio"
                        className={`input_bio ${users.dark_mode ? "input_dark" : "input_white"}`}
                        value={edit.bio}
                        placeholder="About You?!"
                        onChange={handleTextChange}
                    />
                    <p className={`${edit?.bio.length >= 250 ? 'text-red-700' : null}`}>
                        {edit?.bio.length}/250 characters
                    </p>
                    </label>

                <button className="page_count_button" onClick={nextPage}> Next </button>
                </div>
            )}
  


                {currentPage === 2 && (
                    <div>
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
                    
                    <div>
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
                        </label>

                    </div>
                
               <div className="page_count_btn_container">

                <button className="page_count_button" type="button" onClick={prevPage}>
                Previous
              </button>

              <button type='submit'>Edit</button>
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