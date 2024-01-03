
import axios from "axios";
import { useState , useEffect, useRef} from 'react';


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
          setPoll({
              ...poll,
              options: [...poll.options, {text: "", count:0}]
          })
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
       <form onSubmit={handleSubmit}>
        <label htmlFor="question">
            Question:
            <input
            id="question"
            type="text"
            onChange={handleTextChange}
            value={poll.question}
            />
        </label>

        {poll.options.map((option , index) => {
            return(
            <div key={index}>
            <label htmlFor={`option-${index}`}>
              Option {index + 1}:
              <input
                id={`option-${index}`}
                type="text"
                onChange={(event) => handleOptionChange(index, event)}
                value={option.text}
              />
            </label>
            </div>

            )
        })}


        <button onClick={addOption}>Add Options</button>

        <button type="submit">Submit</button>

        <button onClick={onClose}>Cancel</button>

       </form>
    </div>
)

}


export default PollForm