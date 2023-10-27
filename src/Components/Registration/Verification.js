import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyCode } from '../../Store/userActions';

function Verification(){

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const [seconds, setSeconds] = useState(300)

    useEffect(() => {
      const intervalid = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)

      if(seconds <= 0){
        navigate("/signup")
        clearInterval(intervalid)
      }
      return () => clearInterval(intervalid);
    }, [seconds])

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

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds < 10 ? '0': ""}${seconds}`
}





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

       <h2 style={{color: "red"}}><span>Code Expires:</span> {formatTime(seconds)}</h2>
      <button type='submit' className='login-submit'>Signup</button>

    </form>
  </div>
)
    
}


export default Verification