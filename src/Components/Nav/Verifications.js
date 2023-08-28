
import "./Verifications.css"

function Verifications({open , onClose, user}){

if(!open) return null

return(
    <div className="overlay2">
           <div className="modal-container2">
            <div className="modalLeft2">
                <p className="closeBtn2" onClick={onClose}>X</p>
            </div>
           <div className="content2">
            <div className="verified-header">
                <h1>Get Verified</h1>
                <p>For Exclusive Perks</p>
            </div>

            <div className="verified-option-container">

            <div className="verified-option">

                <h4>Standard Option</h4>
                <p>Receive verification badge, and have an increase of posts length.</p>
                <p>$1.00</p>
            </div>

            </div>

            </div>
           </div>
        </div>
)

}

export default Verifications