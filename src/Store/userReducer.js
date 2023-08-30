import { FETCH_USERS_ERROR , FETCH_USERS_SUCCESS } from "./userActions";
import { SIGNUP_SUCCESS , SIGNUP_FAILURE } from "./userActions";
import { LOGIN_FAILURE , LOGIN_SUCCESS } from "./userActions";
import { POST_FAIL, POST_SUCCESS } from "./userActions";
import { EDIT_PROFILE_FAIL, EDIT_PROFILE_SUCCESS } from "./userActions";
import { POST_GET_FAIL, POST_GET_SUCCESS } from "./userActions";
import { GET_TAG_SUCCESS, GET_TAG_FAIL } from "./userActions";
import { GET_SEARCH_POST_SUCCESS, GET_SEARCH_POST_FAIL } from "./userActions";
import { GET_VERIFICATION_INFO, GET_VERIFICATION_INFO_FAIL } from "./userActions";
import { GET_POSTS_DETAILS , GET_POSTS_DETAILS_FAIL } from "./userActions";

const initialState = {

    users: [],
    error: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type){
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                error:null
            };
        case FETCH_USERS_ERROR:
            return {
                ...state,
                users: [],
                error: action.payload
            }
        default:
            return state
    }
}


const initialGetPosts = {
  posts: [],
  error: null
} 

export const userGetPost = (state = initialGetPosts, action) => {
  switch (action.type){
      case POST_GET_SUCCESS:
          return {
              ...state,
              posts: action.payload,
              error:null
          };
      case POST_GET_FAIL:
          return {
              ...state,
              posts: [],
              error: action.payload
          }
      default:
          return state
  }
}

const initialUser = {
    signupSuccess: false,
    signupError: null,
  };
  

 export const userSignup = (state = initialUser, action) => {
    switch (action.type) {
      case SIGNUP_SUCCESS:
        return {
          ...state,
          signupSuccess: true,
          signupError: null,
        };
      case SIGNUP_FAILURE:
        return {
          ...state,
          signupSuccess: false,
          signupError: action.error,
        };
      default:
        return state;
    }
  };


const initialLogin = {

loginSuccess:  false,
loginFailure: null

}


export const userLogin = (state = initialLogin, action) => {

switch(action.type){
  case LOGIN_SUCCESS:
    return{
      ...state,
      loginSuccess: true,
      loginFailure: null
    }
  case LOGIN_FAILURE:
    return {
      ...state,
      loginSuccess: false,
      loginFailure: action.error
    }

  default: 
  return state 
}

}


const initialPost = {
  postSuccess : false,
  postFail : null
}

export const userPost = (state = initialPost, action) => {

switch(action.type){
  case POST_SUCCESS:
    return{
      ...state,
      postSuccess: true,
      postFail: null
    }
  case POST_FAIL:
    return{
      ...state,
      postSuccess: false,
      postFail: action.error
    }
  default:
    return state
}

}



const initialEDIT = {
  editSuccess : false,
  editFail : null
}


export const userEdit = (state = initialEDIT, action) => {

  switch(action.type){
    case EDIT_PROFILE_SUCCESS:
      return{
        ...state,
        editSuccess: true,
        editFail: null
      }
    case EDIT_PROFILE_FAIL:
      return{
        ...state,
        editSuccess: false,
        editFail: action.error
      }
    default:
      return state
  }
  
  }


  const initialGetTag = {

    tags: [],
    error: null
}

export const getAllTags = (state = initialGetTag, action) => {
  switch (action.type){
      case GET_TAG_SUCCESS:
          return {
              ...state,
              tags: action.payload,
              error:null
          };
      case GET_TAG_FAIL:
          return {
              ...state,
              tags: [],
              error: action.payload
          }
      default:
          return state
  }
}


const initialGetSearchPost = {

  searchPost: [],
  error: null
}

export const getSearchPost = (state = initialGetSearchPost, action) => {
switch (action.type){
    case GET_SEARCH_POST_SUCCESS:
        return {
            ...state,
            searchPost: action.payload,
            error:null
        };
    case GET_SEARCH_POST_FAIL:
        return {
            ...state,
            searchPost: [],
            error: action.payload
        }
    default:
        return state
}
}



const initialPlans = {

  plans: [],
  error: null
}

export const getPlan = (state = initialPlans, action) => {
switch (action.type){
    case GET_VERIFICATION_INFO:
        return {
            ...state,
            plans: action.payload,
            error:null
        };
    case GET_VERIFICATION_INFO_FAIL:
        return {
            ...state,
            plans: [],
            error: action.payload
        }
    default:
        return state
}
}


const initialPostDetails = {

postDetail: [],
error: null

}


export const getPostDetails = (state = initialPostDetails, action) => {
  switch (action.type){
      case GET_POSTS_DETAILS:
          return {
              ...state,
              postDetail: action.payload,
              error:null
          };
      case GET_POSTS_DETAILS_FAIL:
          return {
              ...state,
              postDetail: [],
              error: action.payload
          }
      default:
          return state
  }
  }