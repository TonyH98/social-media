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
import { REPLY_GET_SUCCESS, REPLY_GET_FAIL } from "./userActions";
import { CREATE_REPLIES_SUCCESS, CREATE_REPLIES_FAIL } from "./userActions";
import { GET_FAVORITES, GET_FAVORITES_FAIL } from "./userActions";
import { ADD_FAV, ADD_FAV_FAIL } from "./userActions";
import { DELETE_FAV, DELETE_FAV_FAIL } from "./userActions";
import { FETCH_USER_SUCCESS , FETCH_USER_ERROR } from "./userActions";
import { ADD_Following, ADD_Following_FAIL } from "./userActions";
import { GET_Following , GET_Following_FAIL } from "./userActions";
import { DELETE_FOLLOWING, DELETE_FOLLOWING_FAIL } from "./userActions";
import { GET_FOLLOWER , GET_FOLLOWER_FAIL } from "./userActions";
import { FETCH_NOTIFICATIONS , FETCH_NOTIFICATIONS_FAIL } from "./userActions";
import {FETCH_POSTS_REACTIONS , FETCH_POSTS_REACTIONS_FAIL} from "./userActions";
import { ADD_POSTS_REACTIONS , ADD_POSTS_REACTIONS_FAIL } from "./userActions";
import { GET_FAVORITE , GET_FAVORITE_FAIL } from "./userActions";
import { FETCH_NOTIFICATIONS_FAIL2 , FETCH_NOTIFICATIONS2 } from "./userActions";
import { FETCH_SEARCH_REPLIES , FETCH_SEARCH_REPLIES_FAIL } from "./userActions";
import {FETCH_FAVORITE_REPLIES , FETCH_FAVORITE_REPLIES_FAIL} from "./userActions";
import {DELETE_FAV_REPLIES , DELETE_FAV_REPLIES_FAIL} from "./userActions";
import {ADD_FAVR , ADD_FAVR_FAIL} from "./userActions"
import {FETCH_REPLY_REACTIONS , FETCH_REPLY_REACTIONS_FAIL} from "./userActions"
import {ADD_REPLY_REACTIONS , ADD_REPLY_REACTIONS_FAIL} from "./userActions"
import {FETCH_ALL_USERS_REPLIES , FETCH_ALL_USERS_REPLIES_FAIL} from "./userActions"

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


const initialAllUsers = {

  users: [],
  error: null
}

export const getUsers = (state = initialAllUsers, action) => {
  switch (action.type){
      case FETCH_USER_SUCCESS:
          return {
              ...state,
              users: action.payload,
              error:null
          };
      case FETCH_USER_ERROR:
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


  const initialReplies = {

    replies: [],
    error: null
    
    }
    
    
    export const getReplies = (state = initialReplies, action) => {
      switch (action.type){
          case REPLY_GET_SUCCESS:
              return {
                  ...state,
                  replies: action.payload,
                  error:null
              };
          case REPLY_GET_FAIL:
              return {
                  ...state,
                  replies: [],
                  error: action.payload
              }
          default:
              return state
      }
      }


      const initialReplyPost = {
        replyPost : false,
        replyFail : null
      }
      
      export const userReplies = (state = initialReplyPost, action) => {
      
      switch(action.type){
        case CREATE_REPLIES_SUCCESS:
          return{
            ...state,
            replyPost: true,
            replyFail: null
          }
        case CREATE_REPLIES_FAIL:
          return{
            ...state,
            replyPost: false,
            replyFail: action.error
          }
        default:
          return state
      }
      
      }



      const initialFavorites = {
        fav: [],
        error: null
      } 
      
      export const userFav = (state = initialFavorites, action) => {
        switch (action.type){
            case GET_FAVORITES:
                return {
                    ...state,
                    fav: action.payload,
                    error:null
                };
            case GET_FAVORITES_FAIL:
                return {
                    ...state,
                    fav: [],
                    error: action.payload
                }
            default:
                return state
        }
      }


      const initialAddFav = {
        fav: false,
        error: null,
      };
      
    
     export const addUserFav = (state = initialAddFav, action) => {
        switch (action.type) {
          case ADD_FAV:
            return {
              ...state,
              fav: true,
              error: null,
            };
          case ADD_FAV_FAIL:
            return {
              ...state,
              fav: false,
              error: action.error,
            };
          default:
            return state;
        }
      };
    


      const initialDeleteFav = {
        fav: false,
        error: null,
      };
      
    
     export const deleteUserFav = (state = initialDeleteFav, action) => {
        switch (action.type) {
          case DELETE_FAV:
            return {
              ...state,
              fav: true,
              error: null,
            };
          case DELETE_FAV_FAIL:
            return {
              ...state,
              fav: false,
              error: action.error,
            };
          default:
            return state;
        }
      };



      const initialFollowing = {
        fol: [],
        error: null
      } 
      
      export const userFollowing = (state = initialFollowing, action) => {
        switch (action.type){
            case GET_Following:
                return {
                    ...state,
                    fol: action.payload,
                    error:null
                };
            case GET_Following_FAIL:
                return {
                    ...state,
                    fol: [],
                    error: action.payload
                }
            default:
                return state
        }
      }







      const initialAddFollowing = {
        fol: false,
        error: null,
      };
      
    
     export const addUserFollowing = (state = initialAddFollowing, action) => {
        switch (action.type) {
          case ADD_Following:
            return {
              ...state,
              fol: true,
              error: null,
            };
          case ADD_Following_FAIL:
            return {
              ...state,
              fol: false,
              error: action.error,
            };
          default:
            return state;
        }
      };
    

      const initialDeleteFollowing = {
        fol: false,
        error: null,
      };
      
    
     export const deleteUserFollowing = (state = initialDeleteFollowing, action) => {
        switch (action.type) {
          case DELETE_FOLLOWING:
            return {
              ...state,
              fol: true,
              error: null,
            };
          case DELETE_FOLLOWING_FAIL:
            return {
              ...state,
              fol: false,
              error: action.error,
            };
          default:
            return state;
        }
      };
    

      const initialFollower = {
        fol: [],
        error: null
      } 
      
      export const userFollower = (state = initialFollower, action) => {
        switch (action.type){
            case GET_FOLLOWER:
                return {
                    ...state,
                    fol: action.payload,
                    error:null
                };
            case GET_FOLLOWER_FAIL:
                return {
                    ...state,
                    fol: [],
                    error: action.payload
                }
            default:
                return state
        }
      }
  
      const initialNote = {
        note: [],
        error: null
      } 
      
      export const userNote = (state = initialNote, action) => {
        switch (action.type){
            case FETCH_NOTIFICATIONS:
                return {
                    ...state,
                    note: action.payload,
                    error:null
                };
            case FETCH_NOTIFICATIONS_FAIL:
                return {
                    ...state,
                    note: [],
                    error: action.payload
                }
            default:
                return state
        }
      }

      const initialReaction = {
        react: [],
        error: null
      } 
      
      export const userReact = (state = initialReaction, action) => {
        switch (action.type){
            case FETCH_POSTS_REACTIONS:
                return {
                    ...state,
                    react: action.payload,
                    error:null
                };
            case FETCH_POSTS_REACTIONS_FAIL:
                return {
                    ...state,
                    react: [],
                    error: action.payload
                }
            default:
                return state
        }
      }



      const initialAddReactions = {
        react: false,
        error: null,
      };
      
    
     export const addUserReactions = (state = initialAddReactions, action) => {
        switch (action.type) {
          case ADD_POSTS_REACTIONS:
            return {
              ...state,
              react: true,
              error: null,
            };
          case ADD_POSTS_REACTIONS_FAIL:
            return {
              ...state,
              react: false,
              error: action.error,
            };
          default:
            return state;
        }
      };


      const initialFavorite = {
        fav: [],
        error: null
      } 
      
      export const usersFav = (state = initialFavorite, action) => {
        switch (action.type){
            case GET_FAVORITE:
                return {
                    ...state,
                    fav: action.payload,
                    error:null
                };
            case GET_FAVORITE_FAIL:
                return {
                    ...state,
                    fav: [],
                    error: action.payload
                }
            default:
                return state
        }
      }

      const initialNote2 = {
        note2: [],
        error: null
      } 
      
      export const userNote2 = (state = initialNote2, action) => {
        switch (action.type){
            case FETCH_NOTIFICATIONS2:
                return {
                    ...state,
                    note2: action.payload,
                    error:null
                };
            case FETCH_NOTIFICATIONS_FAIL2:
                return {
                    ...state,
                    note2: [],
                    error: action.payload
                }
            default:
                return state
        }
      }


      const initialSearchReplies = {
        search: [],
        error: null
      } 
      
      export const searchReplies= (state = initialSearchReplies, action) => {
        switch (action.type){
            case FETCH_SEARCH_REPLIES:
                return {
                    ...state,
                    search: action.payload,
                    error: null
                };
            case FETCH_SEARCH_REPLIES_FAIL:
                return {
                    ...state,
                    search: [],
                    error: action.payload
                }
            default:
                return state
        }
      }


      const initialFavoriteR = {

        fav: [],
        error: null
    }
    
    export const userFavoriteR = (state = initialFavoriteR, action) => {
        switch (action.type){
            case FETCH_FAVORITE_REPLIES:
                return {
                    ...state,
                    fav: action.payload,
                    error:null
                };
            case FETCH_FAVORITE_REPLIES_FAIL:
                return {
                    ...state,
                    fav: [],
                    error: action.payload
                }
            default:
                return state
        }
    }
    

    const initialAddFavoritesR = {
      fav: false,
      error: null,
    };
    
  
   export const addFavoritesR = (state = initialAddFavoritesR, action) => {
      switch (action.type) {
        case ADD_FAVR:
          return {
            ...state,
            fav: true,
            error: null,
          };
        case ADD_FAVR_FAIL:
          return {
            ...state,
            fav: false,
            error: action.error,
          };
        default:
          return state;
      }
    };


    const initialDeleteFavR = {
      fav: false,
      error: null,
    };
    
  
   export const deleteFavoriteR = (state = initialDeleteFavR, action) => {
      switch (action.type) {
        case DELETE_FAV_REPLIES:
          return {
            ...state,
            fav: true,
            error: null,
          };
        case DELETE_FAV_REPLIES_FAIL:
          return {
            ...state,
            fav: false,
            error: action.error,
          };
        default:
          return state;
      }
    };



    const initialReactionR = {
      react: [],
      error: null
    } 
    
    export const userReactR = (state = initialReactionR, action) => {
      switch (action.type){
          case FETCH_REPLY_REACTIONS:
              return {
                  ...state,
                  react: action.payload,
                  error:null
              };
          case FETCH_REPLY_REACTIONS_FAIL:
              return {
                  ...state,
                  react: [],
                  error: action.payload
              }
          default:
              return state
      }
    }


    const initialAddReactionsR = {
      react: false,
      error: null,
    };
    
  
   export const addUserReactionsR = (state = initialAddReactionsR, action) => {
      switch (action.type) {
        case ADD_REPLY_REACTIONS:
          return {
            ...state,
            react: true,
            error: null,
          };
        case ADD_REPLY_REACTIONS_FAIL:
          return {
            ...state,
            react: false,
            error: action.error,
          };
        default:
          return state;
      }
    };


    const initialAllUserReplies = {

      replies: [],
      error: null
  }
  
  export const allUserReplies = (state = initialAllUserReplies, action) => {
      switch (action.type){
          case FETCH_ALL_USERS_REPLIES: 
              return {
                  ...state,
                  replies: action.payload,
                  error:null
              };
          case FETCH_ALL_USERS_REPLIES_FAIL:
              return {
                  ...state,
                 replies: [],
                  error: action.payload
              }
          default:
              return state
      }
  }