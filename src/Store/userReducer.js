import { FETCH_USERS_ERROR , FETCH_USERS_SUCCESS } from "./userActions";
import { SIGNUP_SUCCESS , SIGNUP_FAILURE } from "./userActions";


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