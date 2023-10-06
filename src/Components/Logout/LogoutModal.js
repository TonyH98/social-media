import { useNavigate} from "react-router-dom";

import "./LogoutModal.css"

function LogoutModal({open , onClose}){

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
    
        fetch("/logout", {
          method: "POST",
          credentials: "include",
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
          });
      };


if(!open) return null

    return(
       <div className="overlay">
           <div className="modal-container">
            
           <div className="content">
            <h1>Are you sure you want to logout </h1>
            <div className="logout_buttons_container">
              <button className="logout_button lg_btn" onClick={handleLogout}>Logout</button>
              <button className="logout_cancel_button lg_btn" onClick={onClose}>Cancel</button>
            </div>
           </div>

           </div>
        </div>
    )
}

export default LogoutModal