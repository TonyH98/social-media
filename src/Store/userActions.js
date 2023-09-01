import axios from "axios";



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



export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS"
export const EDIT_PROFILE_FAIL = "EDIT_PROFILE_FAIL"


export const editProfile = (profile, edit) => async (dispatch) => {
  
  axios
  .put(`${API}/users/${profile?.id}`, edit, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then(() => {
    dispatch({type: EDIT_PROFILE_SUCCESS})
    dispatch(fetchUsers(profile?.id))
  })
  .catch((error) => {
    dispatch({ type: EDIT_PROFILE_FAIL, error: error.message });
    console.log(error); 
  })
  
}



export const POST_GET_SUCCESS = "POST_GET_SUCCESS"
export const POST_GET_FAIL = "POST_GET_FAIL"

export const fetchPosts = (user) => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/users/${user}/posts`);
    dispatch({ type: POST_GET_SUCCESS, payload: response.data })
    
  } catch (error) {
    dispatch({ type: POST_GET_FAIL, payload: error.message });
  }
};

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
    dispatch(fetchPosts(profile?.username))
  })
  .catch((error) => {
    dispatch({ type: POST_FAIL, error: error.message });
    console.log(error); 
  })
}


export const GET_TAG_SUCCESS = "GET_TAG_SUCCESS"
export const GET_TAG_FAIL = "GET_TAG_FAIL"

export const getTags = () => async(dispatch) => {
  try {
    const response = await axios.get(`${API}/tags`);
    dispatch({ type: GET_TAG_SUCCESS, payload: response.data })
    
  } catch (error) {
    dispatch({ type: GET_TAG_FAIL, payload: error.message });
  }
}


export const GET_SEARCH_POST_SUCCESS = "GET_SEARCH_SUCCESS"
export const GET_SEARCH_POST_FAIL = "GET_SEACH_FAIL"

export const getSearchPost = (tagName) => async(dispatch) => {
  try {
    const response = await axios.get(`${API}/search/post/${tagName}`);
    dispatch({ type: GET_SEARCH_POST_SUCCESS, payload: response.data })
    
  } catch (error) {
    dispatch({ type: GET_SEARCH_POST_FAIL, payload: error.message });
  }
}

export const GET_VERIFICATION_INFO = "GET_VERIFICATION_INFO"
export const GET_VERIFICATION_INFO_FAIL = "GET_VERIFICATION_INFO"

export const getVerify = () => async(dispatch) => {
  try {
    const response = await axios.get(`${API}/plans/1`);
    dispatch({ type: GET_VERIFICATION_INFO, payload: response.data })
    
  } catch (error) {
    dispatch({ type: GET_VERIFICATION_INFO_FAIL, payload: error.message });
  }
}


export const GET_POSTS_DETAILS = "GET_POSTS_DETAILS"
export const GET_POSTS_DETAILS_FAIL = "GET_POSTS_DETAILS_FAIL"

export const getPostDetails = (username , id) => async(dispatch) => {

try{
  const res = await axios.get(`${API}/users/${username}/posts/${id}`)
  dispatch({ type: GET_POSTS_DETAILS, payload: res.data })
}
catch(error){
  dispatch({ type: GET_POSTS_DETAILS_FAIL, payload: error.message });
}

}

export const REPLY_GET_SUCCESS = "REPLY_GET_SUCCESS"
export const REPLY_GET_FAIL = "REPLY_GET_FAIL"

export const fetchReplies = (username, id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/users/${username}/posts/${id}/reply`);
    dispatch({ type: REPLY_GET_SUCCESS, payload: response.data })
    
  } catch (error) {
    dispatch({ type: REPLY_GET_FAIL, payload: error.message });
  }
};




export const CREATE_REPLIES_SUCCESS = "CREATE_REPLIES_SUCCESS"
export const CREATE_REPLIES_FAIL = "CREATE_REPLIES_FAIL"

export const createRplies = (username, id, post) => async (dispatch) => {

  axios
  .post(`${API}/users/${username}/posts/${id}/reply`, post)
  .then(() => {
    dispatch({type: CREATE_REPLIES_SUCCESS})
    dispatch(fetchReplies(username, id))
  })
  .catch((error) => {
    dispatch({ type: CREATE_REPLIES_FAIL, error: error.message });
    console.log(error); 
  })
}



export const GET_FAVORITES = "GET_FAVORITES"
export const GET_FAVORITES_FAIL = "GET_FAVORITE_FAIL"

export const getFavorites = (user) => async(dispatch) => {

  try {
    const response = await axios.get(`${API}/favorites/${user}`);
    dispatch({ type: GET_FAVORITES, payload: response.data })
    
  } catch (error) {
    dispatch({ type: GET_FAVORITES_FAIL, payload: error.message });
  }

} 


export const ADD_FAV = "ADD_FAV"
export const ADD_FAV_FAIL = "ADD_FAV_FAIL"

export const addFav = (user, postId, fav) => async (dispatch) => {

  axios
  .post(`${API}/favorites/${user}/fav/${postId}`, fav)
  .then(() => {
    dispatch({type: ADD_FAV})
    dispatch(getFavorites(user))
  })
  .catch((error) => {
    dispatch({ type: ADD_FAV_FAIL, error: error.message });
    console.log(error); 
  })
}
