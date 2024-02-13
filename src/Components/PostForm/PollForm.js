
import axios from "axios";
import { useState , useEffect, useRef} from 'react';
import { FaTrash } from "react-icons/fa";
import "./PollForm.css"

const API = process.env.REACT_APP_API_URL;

function PollForm({user, onClose}){

    const initalOption = {text: "", count: 0}

    let [tags , setTags] = useState([])

    let[filterTags , setFilterTags] = useState([])

    let [poll, setPoll] = useState({
        question: "",
        options: [initalOption, initalOption],
        answer: "",
        user_id: user.id,
        user_name: user.username,

    });
    
    const [errors, setErrors] = useState({
      question: '',
      optionLength: '',
      option: '',
      optionAnswer: ''
    });
    
    useEffect(() => {
        if (user?.id) {
            setPoll((prevPoll) => ({
                ...prevPoll,
                user_id: user?.id,
                user_name: user.username
            }));
        }

        axios.get(`${API}/tags`)
        .then((res) => {
          setTags(res.data)
        })
    }, [user?.id]);

    let optionsText = poll.options.map((val) => val.text)

    let setOptionsUnique = new Set(optionsText)

    function checkOptionAnswer(){
      if(setOptionsUnique.size === poll.options.length){
        return true
      }
      else{
        return false
      }
    }


    
    const handleTextChange = (event) => {
       if(event.target.id === "question"){
          const {value} = event.target
          if(value.length <= 100){
            setPoll((prevPoll) => ({
              ...prevPoll,
              question: value,
            }));
          }
          else{
            event.target.value = value.substr(0,100)
          }
          const hashtags = value.match(/#(\w+)/g);

          if (hashtags) {
            const searchTags = hashtags.map((tags) => tags.substring(1));
            const filteredTags = tags.filter((tag) =>
              searchTags.some((hash) => tag.tag_names.toLowerCase().includes(hash.toLowerCase()))
            );
            setFilterTags(filteredTags);

            const hasExactMatch = searchTags.every((hash) =>
            tags.some((tag) => tag.tag_names.toLowerCase().substring(1) === hash.toLowerCase())
          );

          if (hasExactMatch) {
            setFilterTags([]);
          } else {
            setFilterTags(filteredTags);
          }

          } else {
            setFilterTags([]);
          }

       }
       if(event.target.id === "answer"){
        const {value} = event.target
        if(value.length <= 300){
          setPoll((prevPoll) => ({
            ...prevPoll,
            answer: value,
          }));
        }
        else{
          event.target.value = value.substr(0,300)
        }
       }
      };



      const handleTags = (tag) => {
   
        const newContent = `${tag.tag_names}`;
      
        setPoll((prev) => ({
          ...prev,
          question: prev.question.replace(/#[^\s]+/, newContent),
        }));
      
        setFilterTags([]);
      };

      const handleOptionChange = (index, event) => {
        event.preventDefault();
        const newOptions = [...poll.options];
        if (event.target.value.length <= 30) {
          newOptions[index] = { ...newOptions[index], text: event.target.value };
          setPoll((prevPoll) => ({
            ...prevPoll,
            options: newOptions,
          }));
        } else {
          event.target.value = event.target.value.substr(0, 30);
        }
      };
      

      const addOption = (event) => {
          event.preventDefault()
          if(poll.options.length < 4){

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
    

      function validQuestion(){
        if(poll.question.length > 0){
          return true
        }
        else{
          return false
        }
      }

      function validOption(){
        let checkOption = poll.options.every((val) => val.text.length >= 1)

        if(checkOption){
          return true
        }
        else{
          return false
        }
      }

      function checkOptionLength(){
        if(poll.options.length >=2){
          return true
        }
        else{
          return false
        }
      }

      const handleSubmit = (event) => {
        event.preventDefault();

        const questionError = !validQuestion() ? 'Question can\'t be empty' : '';
        const optionLengthError = !checkOptionLength() ? 'Must have at least two options' : '';
        const optionError = !validOption() ? 'All options must be filled' : '';
        const optionUniqueError = !checkOptionAnswer() ? "All the options must be unqiue" : ""
        setErrors({
          question: questionError,
          optionLength: optionLengthError,
          option: optionError,
          optionAnswer: optionUniqueError
        });

        let valid = true
        // Validate input
        if (!poll.question.trim() || poll.options.some((option) => !option.text.trim())) {
          // Handle invalid input (e.g., show an error message)
          return;
        }
        
        
     
        if (questionError || optionLengthError || optionError || optionUniqueError) {
          valid = false; 
        }

        if(valid){
      
            axios.post(`${API}/poll`, {
              question: poll.question,
              options: poll.options,
              answer: poll.answer,
              user_id: poll.user_id,
              user_name: poll.user_name,
   
            })
            .then(() => {
              onClose();
              setPoll({
                question: "",
                options: [initalOption],
                answer: "",
                user_id: user.id,
                user_name: user.username
              });
            })
            .catch((error) => {
              console.error(error);
            });

        }
        else{
          throw new Error("Poll must have at least 2 or more options")
        }
      };
      
console.log(poll)
return(
    <div>
       <form onSubmit={handleSubmit} className="pollForm">
       {errors.optionLength && <p style={{color:"red"}}>{errors.optionLength}</p>}
       {errors.optionAnswer && <p style={{color:"red"}}>{errors.optionAnswer}</p>}
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
          {filterTags.length > 0 && (
    <div className="textera_list">
      {filterTags.slice(0 , 10).map((tag) => (
        <div className={`textera_display light_text`} key={tag.id} onClick={() => handleTags(tag)}>
          {tag.tag_names}
        </div>
      ))}
    </div>
  )}
           {errors.question && <p style={{color:"red"}}>{errors.question}</p>}
        </label>
        <p className={poll.question.length >= 100 ? "text-red-700" : null}>
            {poll.question.length } / 100 Characters
        </p>

        <label htmlFor="answer" className="poll_label">
            {`Answer (Optional)`}:
            <textarea
            id="answer"
            value={poll.answer}
            onChange={handleTextChange}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
        </label>
        <p className={poll.answer.length >= 300 ? "text-red-700" : null}>
            {poll.answer.length } / 300 Characters
        </p>
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

          {poll.options.length === 2 ? null : 
          
          <button className="remove_option"
           onClick={() => removeOption(index)}>
            <FaTrash size={16} color={user.dark_mode ? "white" : "black"}/>
            </button>
          }
        </div>
        {errors.option && <p style={{color:"red"}}>{errors.option}</p>}
      </label>

      <p className={option.text.length >= 30 ? "text-red-700" : null}>
            {option.text.length } / 30 Characters
        </p>
            </div>

            )
        })}

        <div>
        {poll.options.length === 4 ? null : 
        
        <button className="addOption" onClick={addOption}>+</button>
        }

        {poll.options.every((val) => val.text.length === 0) && poll.question.length === 0 && poll.options.length < 2 ? 
          <button className="post_submit_button gray_button" disabled>Post</button> :
          <button type="submit">Submit</button>
        }


        </div>

       </form>
    </div>
)

}


export default PollForm