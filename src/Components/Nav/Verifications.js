
import "./Verifications.css"
import { useDispatch , useSelector } from "react-redux";
import { getVerify } from "../../Store/userActions";
import { useEffect } from "react";

function Verifications({open , onClose, user}){

const dispatch = useDispatch();
const getPlans = useSelector((state) => state.plan.plans)

useEffect(() => {
dispatch(getVerify())
}, [ dispatch])

console.log(getPlans)

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

                <h4>{getPlans.product_name}</h4>
                <p>{getPlans.description}</p>
                <p>${getPlans.price.toFixed(2)}</p>
            </div>
            
            <button className="purchase_verfication">Purchase</button>

            </div>

            </div>
           </div>
        </div>
)

}

export default Verifications