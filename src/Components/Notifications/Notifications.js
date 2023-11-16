import { useParams } from "react-router-dom";
import {getNotifications , fetchUsers, getNotificationsReplies} from "../../Store/userActions";
import { useDispatch , useSelector } from "react-redux";
import { useState, useEffect} from "react";
import Notification from "./Notification";
import RepliesNote from "./RepliesNote";
import AllNote from "./AllNote";
import "./Notifications.css"
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Notifications({mainUser, plan}){

const [searchFilter, setSearchFilter] = useState('');
const [filterNote, setFilterNote] = useState([]);
const [filterNote2 , setFilterNote2] = useState([])
const [filterNote3 , setFilterNote3] = useState([])

const [allNote , setAllNote] = useState([])
let [option , setOption] = useState(0)
let options = ["Posts", "Replies", "All"]

const {id} = useParams()

const dispatch = useDispatch();

const [note , setNote] = useState([])
const [noteR, setNoteR] = useState([])
const users = useSelector((state) => state.user.users);

useEffect(() => {
  if(id){
    dispatch(fetchUsers(id))

  }
  
}, [dispatch, id])


useEffect(() => {
  axios.get(`${API}/notifications/${id}`)
  .then((res) => {
    setAllNote(res.data)
  })
  axios.get(`${API}/notifications/${id}/posts`)
  .then((res) => {
    setNote(res.data)
  })

  axios.get(`${API}/notifications/${id}/reply`)
  .then((res) => {
    setNoteR(res.data)
  })
}, [id])



const applyFilters = () => {

  if(option === 0){
    let filteredNote = note;
    if (searchFilter) {
      const filterText = searchFilter.toLowerCase();
      filteredNote = filteredNote.filter(
        (notes) =>
          notes.creator.username.toLowerCase().includes(filterText) || notes.creator.profile_name.toLowerCase().includes(filterText)
         
      );
    }
    setFilterNote(filteredNote)
  }
  if(option === 1){
    let filteredNote = noteR;
    if (searchFilter) {
      const filterText = searchFilter.toLowerCase();
      filteredNote = filteredNote.filter(
        (notes) =>
          notes.post_content.username.toLowerCase().includes(filterText) || notes.post_content.profile_name.toLowerCase().includes(filterText)
         
      );
    }
    setFilterNote2(filteredNote)
  }
  if(option === 2){
    let filteredNote = allNote;
    if (searchFilter) {
      const filterText = searchFilter.toLowerCase();
      filteredNote = filteredNote.filter(
        (notes) =>
          notes.creator.username.toLowerCase().includes(filterText) || notes.creator.profile_name.toLowerCase().includes(filterText)
         
      );
    }
    setFilterNote3(filteredNote)
  }

  };

console.log(noteR)


  useEffect(() => {
    applyFilters();
  }, [searchFilter, note, noteR, allNote, id, options]);

  function optionContent(selected) {
    if (selected === 0) {
      return (
        <div className={`option-content-holder ${mainUser.dark_mode ? "light_border_post" : "dark_border_post"}`}>
          {filterNote.map((notes) => {
            return (
              <div  className="posts-border-container">
                <Notification users={users} notes={notes} mainUser={mainUser} plan={plan}/>
              </div>
            );
          })}
        </div>
      );
    }
    if (selected === 1) {
      return (
        <div className={`option-content-holder ${mainUser.dark_mode ? "light_border_post" : "dark_border_post"}`}>
          {filterNote2.map((notes) => {
            return (
              <div  className="posts-border-container">
                <RepliesNote users={users} notes={notes} mainUser={mainUser}/>
              </div>
            );
          })}
        </div>
      );

    }
    if (selected === 2) {
      return (
        <div className={`option-content-holder ${mainUser.dark_mode ? "light_border_post" : "dark_border_post"}`}>
          {filterNote3.map((notes) => {
            return (
              <div  className="posts-border-container">
                <AllNote users={users} notes={notes} mainUser={mainUser} plan={plan}/>
              </div>
            );
          })}
        </div>
      );
    }
    
  }
  

let is_read = allNote.filter(note => !note.is_read)

    return(
        <div className="note_page">
            <div className="note_first_section">
                <div className="user_name_section">
                    <h1 className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>{users.profile_name}</h1>
                </div>
                <div className="notifications_number_container">
                    <h3 className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`}>Notifications: {is_read.length}</h3>
                </div>
                <div className="note_input_bar_container">
                    <label htmlFor="note_input"className={`${mainUser?.dark_mode ? 'white_text' : 'dark_text'} label-note`}>
                    Search User:
                    <input
                    id="note_input"
                    type="text"
                    className="note_input"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    />
                    </label>
                </div>

                <div className="note_options_button">
                {options.map((opt , index) => {
                     return(
                <button onClick={() => setOption(index)} className={`${index === option ? `active options` : 'options'} ${mainUser?.dark_mode ? 'white_text' : 'dark_text'}`} key={index}>{opt}</button>
                    )
                   })}
                </div>
            </div>

            <div className="note_second_section">
                {note.length === 0 ? 
                <h1 className={`${users?.dark_mode ? 'white_text' : 'dark_text'}`}>No Notifications</h1> : (
                    <div>
                        {optionContent(option)}
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Notifications