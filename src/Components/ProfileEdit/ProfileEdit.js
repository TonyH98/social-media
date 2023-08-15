import "./ProfileEdit.css"


function ProfileEdit({onClose , profile, open2}){


    if(!open2) return null

    return(
        <div className="overlay">
           <div className="modal-container">
            <div className="modalLeft">
                <p className="closeBtn" onClick={onClose}>X</p>
            </div>
           <div className="content">
            <h2 className="posts_header">Edit Profile</h2>
            
            <form className="signup-form">

            </form>


           </div>

           </div>
        </div>
    )


}


export default ProfileEdit