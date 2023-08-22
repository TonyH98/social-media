import { FETCH_USERS_ERROR , FETCH_USERS_SUCCESS } from "./userActions";
import { SIGNUP_SUCCESS , SIGNUP_FAILURE } from "./userActions";
import { LOGIN_FAILURE , LOGIN_SUCCESS } from "./userActions";
import { POST_FAIL, POST_SUCCESS } from "./userActions";
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