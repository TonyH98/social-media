import axios from "axios";
import { useNavigate } from "react-router-dom";


const API = process.env.REACT_APP_API_URL;


export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

export const fetchUsers = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/users/${userId}`);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USERS_ERROR, payload: error.message });
  }
};




export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';


export const createUser = (user) => async (dispatch) => {

  axios.post(`${API}/users/signup`, user)
  .then((res) => {
    dispatch({type: SIGNUP_SUCCESS})
  })
  .catch((error) => {
    dispatch({type: SIGNUP_FAILURE, error: error.message})
  })
}


export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"


export const loginUser = (login , newLogin) => async (dispatch) => {



axios.post(`${API}/users/login`, login)
.then((res) => {
  dispatch({type: LOGIN_SUCCESS})
  newLogin()
  window.localStorage.setItem(
    'user',
    JSON.stringify({ email: res.data.email, id: res.data.id })
  );

  return `/profile/${res.data.id}`;
})
.catch((error) => {
  dispatch({ type: LOGIN_FAILURE, error: error.message });
    console.log(error); // You can still log the error here if needed
})


}



export const POST_SUCCESS = "POST_SUCCESS"
export const POST_FAIL = "POST_FAIL"

export const createPost = (profile, post) => async (dispatch) => {

  axios
  .post(`${API}/users/${profile?.username}/posts`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then(() => {
    dispatch({type: POST_SUCCESS})
  })
  .catch((error) => {
    dispatch({ type: POST_FAIL, error: error.message });
    console.log(error); 
  })
} 