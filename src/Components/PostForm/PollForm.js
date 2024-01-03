
import axios from "axios";
import { useState , useEffect, useRef} from 'react';
import { FaTrash } from "react-icons/fa";
import "./PollForm.css"

const API = process.env.REACT_APP_API_URL;

function PollForm({user, onClose}){

    const initalOption = {text: "", count: 0}

    let [poll, setPoll] = useState({
        question: "",
        options: [initalOption],
        user_id: user.id
    });
    
    useEffect(() => {
        if (user?.id) {
            setPoll((prevPoll) => ({
                ...prevPoll,
                user_id: user?.id
            }));
        }
    }, [user?.id]);
    
    const handleTextChange = (event) => {
        setPoll({ ...poll, [event.target.id]: event.target.value });
      };

      const handleOptionChange = (index, event) => {
          event.preventDefault()
        const newOptions = [...poll.options];
        newOptions[index] = { ...newOptions[index], text: event.target.value };
        setPoll({ ...poll, options: newOptions });
      };

      const addOption = (event) => {
          event.preventDefault()
          if(poll.options.length < 3){

            setPoll({
                ...poll,
                options: [...poll.options, {text: "", count:0}]
            })
          }
      }
    
      const removeOption = (option) => {

        const filter = poll.options.filter((val, index) => index !== option)
        setPoll({...poll, options: filter})
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
      
        // Validate input
        if (!poll.question.trim() || poll.options.some((option) => !option.text.trim())) {
          // Handle invalid input (e.g., show an error message)
          return;
        }
      
        const optionsArray = poll.options.map((option) => ({ text: option.text, count: option.count }));
      
        axios.post(`${API}/poll`, {
          question: poll.question,
          options: optionsArray,
          user_id: poll.user_id
        })
        .then(() => {
          onClose();
          setPoll({
            question: "",
            options: [initalOption],
            user_id: user.id
          });
        })
        .catch((error) => {
          // Handle error (e.g., show an error message)
          console.error(error);
        });
      };
      

console.log(poll)
return(
    <div>
       <form onSubmit={handleSubmit} className="pollForm">
        <label htmlFor="question" className="poll_label">
            Question:
            <textarea
            id="question"
            value={poll.question}
            onChange={handleTextChange}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
        </label>

        {poll.options.map((option , index) => {
            return(
            <div key={index}>
           

           <label htmlFor={`option-${index}`} className="poll_label">
  
          Option {index + 1}

        <div >
          <input
            id={`option`}
            type="text"
            onChange={(event) => handleOptionChange(index, event)}
            value={option.text}
          />
          <button className="remove_option" onClick={() => removeOption(index)}><FaTrash size={16}/></button>
        </div>
      </label>


            </div>

            )
        })}

        <div>
        {poll.options.length === 3 ? null : 
        
        <button className="addOption" onClick={addOption}>+</button>
        }

        <button type="submit">Submit</button>
        </div>

       </form>
    </div>
)

}


export default PollForm