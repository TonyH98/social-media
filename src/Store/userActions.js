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

export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API}/users`);
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_ERROR, payload: error.message });
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

export const loginUser = (login, newLogin) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/users/login`, login);
    dispatch({ type: LOGIN_SUCCESS });
    newLogin();
    window.localStorage.setItem(
      'user',
      JSON.stringify({ email: res.data.email, id: res.data.id })
    );

    const redirectUrl = `/profile/${res.data.id}`;
    return Promise.resolve(redirectUrl);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, error: error.message });
    return Promise.reject(error);
  }
};




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



export const GET_FAVORITE = "GET_FAVORITES"
export const GET_FAVORITE_FAIL = "GET_FAVORITE_FAIL"

export const getFavorite = (user , post) => async(dispatch) => {

  try {
    const response = await axios.get(`${API}/favorites/${user}/post/${post}`);
    dispatch({ type: GET_FAVORITES, payload: response.data })
    
  } catch (error) {
    dispatch({ type: GET_FAVORITES_FAIL, payload: error.message });
  }

} 



export const ADD_FAV = "ADD_FAV"
export const ADD_FAV_FAIL = "ADD_FAV_FAIL"

export const addFav = (user, postId, fav) => async (dispatch) => {

  axios
  .post(`${API}/favorites/${user?.id}/fav/${postId}`, fav)
  .then(() => {
    dispatch({type: ADD_FAV})
  })
  .catch((error) => {
    dispatch({ type: ADD_FAV_FAIL, error: error.message });
    console.log(error); 
  })
}



export const DELETE_FAV = "DELETE_FAV"
export const DELETE_FAV_FAIL = "DELETE_FAV_FAIL"

export const deleteFav = (user, postId) => async (dispatch) => {

  axios
  .delete(`${API}/favorites/${user.id}/delete/${postId}`)
  .then(() => {
    dispatch({type: DELETE_FAV})
    dispatch(getFavorites(user.username))
  })
  .catch((error) => {
    dispatch({ type: DELETE_FAV_FAIL, error: error.message });
    console.log(error); 
  })
}


export const GET_Following = "GET_Following"
export const GET_Following_FAIL = "GET_Following_FAIL"

export const getFollowing = (user) => async(dispatch) => {

  try {
    const response = await axios.get(`${API}/follow/${user}`);
    dispatch({ type: GET_Following, payload: response.data })
    
  } catch (error) {
    dispatch({ type: GET_Following_FAIL, payload: error.message });
  }

} 


export const GET_FOLLOWER = "GET_FOLLOWER"
export const GET_FOLLOWER_FAIL = "GET_FOLLOWER_FAIL"

export const getFollower = (user) => async(dispatch) => {

  try {
    const response = await axios.get(`${API}/follow/${user}/followers`);
    dispatch({ type: GET_FOLLOWER, payload: response.data })
    
  } catch (error) {
    dispatch({ type: GET_FOLLOWER_FAIL, payload: error.message });
  }

}



export const ADD_Following = "ADD_FAV"
export const ADD_Following_FAIL = "ADD_FAV_FAIL"

export const addFollowing = (user, followId) => async (dispatch) => {

  axios
  .post(`${API}/follow/${user}/follow/${followId}`)
  .then(() => {
    dispatch({type: ADD_Following})
  })
  .catch((error) => {
    dispatch({ type: ADD_Following_FAIL, error: error.message });
    console.log(error); 
  })
}


export const DELETE_FOLLOWING = "DELETE_FOL"
export const DELETE_FOLLOWING_FAIL = "DELETE_FOL_FAIL"

export const deleteFol = (user, followingId) => async (dispatch) => {

  axios
  .delete(`${API}/follow/${user}/delete/${followingId}`)
  .then(() => {
    dispatch({type: DELETE_FOLLOWING})
    dispatch(getFollowing(user))
  })
  .catch((error) => {
    dispatch({ type: DELETE_FOLLOWING_FAIL, error: error.message });
    console.log(error); 
  })
}



export const FETCH_NOTIFICATIONS = "NOTIFICATIONS"
export const FETCH_NOTIFICATIONS_FAIL = "NOTIFICATIONS_FAIL"

export const getNotifications = (user) => async(dispatch) => {

  try {
    const response = await axios.get(`${API}/notifications/${user}/posts`);
    dispatch({ type: FETCH_NOTIFICATIONS, payload: response.data })
    
  } catch (error) {
    dispatch({ type: FETCH_NOTIFICATIONS_FAIL, payload: error.message });
  }

}

export const FETCH_NOTIFICATIONS2 = "NOTIFICATIONS2"
export const FETCH_NOTIFICATIONS_FAIL2 = "NOTIFICATIONS_FAIL2"

export const getNotificationsReplies = (user) => async(dispatch) => {

  try {
    const response = await axios.get(`${API}/notifications/${user}/reply`);
    dispatch({ type: FETCH_NOTIFICATIONS2, payload: response.data })
    
  } catch (error) {
    dispatch({ type: FETCH_NOTIFICATIONS_FAIL2, payload: error.message });
  }

}


export const FETCH_POSTS_REACTIONS = "REACTIONS"
export const FETCH_POSTS_REACTIONS_FAIL = "REACTIONS_FAIL"

export const getReactions = (user, id) => async(dispatch) => {

  try {
    const response = await axios.get(`${API}/users/${user}/posts/${id}/reactions`);
    dispatch({ type: FETCH_POSTS_REACTIONS, payload: response.data })
    
  } catch (error) {
    dispatch({ type: FETCH_POSTS_REACTIONS_FAIL , payload: error.message });
  }

}



export const ADD_POSTS_REACTIONS = "POSTS_REACTIONS"
export const ADD_POSTS_REACTIONS_FAIL = "POSTS_REACTIONS_FAIL"

export const addReaction = (creatorName , userId , postId, reactions) => async (dispatch) => {

  axios
  .post(`${API}/users/${creatorName}/posts/${userId}/react/${postId}`, reactions)
  .then(() => {
    dispatch({type: ADD_POSTS_REACTIONS})
  })
  .catch((error) => {
    dispatch({ type: ADD_POSTS_REACTIONS_FAIL, error: error.message });
    console.log(error); 
  })
}


export const FETCH_SEARCH_REPLIES = "SEARCH_REPLIES_SUCCESS"
export const FETCH_SEARCH_REPLIES_FAIL= "SEARCH_REPLIES_FAIL"

export const getSearchReplies = (tag) => async(dispatch) => {

  try {
    const response = await axios.get(`${API}/search/replies/${tag}`);
    dispatch({ type: FETCH_SEARCH_REPLIES, payload: response.data })
  } catch (error) {
    dispatch({ type: FETCH_SEARCH_REPLIES_FAIL , payload: error.message });
  }

}


export const FETCH_FAVORITE_REPLIES = "FAVORITE_REPLIES"
export const FETCH_FAVORITE_REPLIES_FAIL= "FAVORITE_REPLIES_FAIL"

export const getFavoriteReplies = (userId) => async(dispatch) => {

  try {
    const response = await axios.get(`${API}/favorites/${userId}/replies`);
    dispatch({ type: FETCH_FAVORITE_REPLIES, payload: response.data })
  } catch (error) {
    dispatch({ type: FETCH_FAVORITE_REPLIES_FAIL , payload: error.message });
  }

}


export const DELETE_FAV_REPLIES = "DELETE_FAV_REPLIES"
export const DELETE_FAV_REPLIES_FAIL = "DELETE_FAV_REPLIES_FAIL"

export const deleteFavReplies = (user, replyId) => async (dispatch) => {

  axios
  .delete(`${API}/favorites/${user.id}/deleteR/${replyId}`)
  .then(() => {
    dispatch({type: DELETE_FAV_REPLIES})
  })
  .catch((error) => {
    dispatch({ type: DELETE_FAV_REPLIES_FAIL, error: error.message });
    console.log(error); 
  })
}


export const ADD_FAVR = "ADD_FAVR_SUCCESS"
export const ADD_FAVR_FAIL = "ADD_FAVR_FAIL"

export const addFavR = (user, replyId, fav) => async (dispatch) => {

  axios
  .post(`${API}/favorites/${user?.id}/favR/${replyId}`, fav)
  .then(() => {
    dispatch({type: ADD_FAVR})
  })
  .catch((error) => {
    dispatch({ type: ADD_FAVR_FAIL, error: error.message });
    console.log(error); 
  })
}