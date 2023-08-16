import "./ProfileEdit.css"

import { useState , useEffect} from 'react';
import axios from 'axios';


const API = process.env.REACT_APP_API_URL;
function ProfileEdit({onClose , profile, open2, setProfile}){

    let [edit , setEdit] = useState({
        profile_name: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        bio: "",
        profile_img: "",
        banner_img: ""
    })

useEffect(() => {
    if(profile){
        setEdit(profile)
    }
}, [profile])

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


const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile_name", edit?.profile_name);
    formData.append("username", edit?.username);
    formData.append("firstname", edit?.firstname);
    formData.append("lastname", edit?.lastname);
    formData.append("email", edit?.email);
    formData.append("bio", edit.bio);
    if (edit?.profile_img) {
        formData.append("profile_img", edit?.profile_img);
    }
    if (edit?.banner_img) {
        formData.append("banner_img", edit?.banner_img);
    }

    axios
        .put(`${API}/users/${profile?.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(() => {
            axios.get(`${API}/users/${profile?.id}`)
            .then((res) => {
                setProfile(edit)
                onClose()
            })
        })
        .catch((c) => console.warn("catch", c));
};





    if(!open2) return null

    return(
        <div className="overlay">
           <div className="modal-container">
            <div className="modalLeft">
                <p className="closeBtn" onClick={onClose}>X</p>
            </div>
           <div className="content">
            <h2 className="posts_header">Edit Profile</h2>
            
            <form onSubmit={handleSubmit}className="signup-form">

            <div className='input-container'>
  
            <label htmlFor="profile_name" className='label-signup'>Profile Name:
            <input
                id="profile_name"
                required
                value={edit.profile_name}
                onChange={handleTextChange}
            />
            
            </label>

             <label className='label-signup'  htmlFor="bio">Bio:
                <textarea
                    require
                    id="bio"
                    value={edit.bio}
                    onChange={handleTextChange}
                />
                <p className={`${edit?.bio.length >= 250 ? 'text-red-700' : null}`}>
                        {edit?.bio.length}/250 characters
                </p>
                </label>
            <label htmlFor="profile_img" className='label-signup'>
                    Profile Image
                    <input
                        id="profile_img"
                        name="profile_img"
                        type="file"
                        className="file-input"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleTextChange}
                    />
             </label>



                    <label htmlFor="banner_img" className='label-signup'>
                    Banner Image
                    <input

                        id="banner_img"
                        name="banner_img"
                        type="file"
                        className="file-input"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleTextChange}
                        
                    />
                    </label>

</div>


  <button type='submit'>Edit</button>

            </form>


           </div>

           </div>
        </div>
    )


}


export default ProfileEdit