import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyCode } from '../../Store/userActions';

function Verification(){

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const [code, setCode] = useState({
        email: "",
        verificationCode: ""
       });

       const handleTextChange = (event) => {
        setCode({ ...code, [event.target.id]: event.target.value });
      };

       const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(verifyCode(code))
        navigate('/')
      };


return(
<div className="signup-section">
    
            
    <form onSubmit={handleSubmit} className="signup-form">

    <h1>Verify Code:</h1>

    <div className='input-container'>
   
       <label htmlFor="email" className='label-signup'>Email:
       
      <input
        id="email"
        type="email"
        className='signup-input'
        required
        value={code.email}
        onChange={handleTextChange}

      />
       {/* {emailError && <p style={{color:"red"}}>{emailError}</p>}
       {emailError2 && <p style={{color:"red"}}>{emailError2}</p>} */}
       </label>
 
  

      <label htmlFor="verificationCode" className='label-signup'>Verification Code:

      <input
        id="verificationCode"
        className='signup-input'
        required
        value={code.verificationCode}
        placeholder="******"
        onChange={handleTextChange}
        />
      </label>
        

    </div>
    
      <button type='submit' className='login-submit'>Signup</button>

    </form>
  </div>
)
    
}


export default Verification