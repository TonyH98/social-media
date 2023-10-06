
import "./Verifications.css"
import { useDispatch , useSelector } from "react-redux";
import { getVerify } from "../../Store/userActions";
import { useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function Verifications({open , onClose, user , plan}){

const dispatch = useDispatch();
const getPlans = useSelector((state) => state.plan.plans)

useEffect(() => {
dispatch(getVerify())
}, [ dispatch])



if(!open) return null


const buyNow = async () => {
  
 
    const lineItems = [{
    product_name: getPlans.product_name,
    image: getPlans.images,
     price: getPlans.price,
     quantity: 1
    }]
    
      const response = await fetch(`${API}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: lineItems,
        }),
      });
    
      const data = await response.json();
    
      if (data.url) {
        window.location.assign(data.url);
      }
      if(response.ok){
        await axios.post(`${API}/plans/${user?.id}/plan/${getPlans.id}`)
      }
}



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
            
            {plan?.images ? <span className="check_member">Alraedy a member</span> :
            
            <button className="purchase_verfication" onClick={buyNow}>Purchase</button>
            }

            </div>

            </div>
           </div>
        </div>
)

}

export default Verifications