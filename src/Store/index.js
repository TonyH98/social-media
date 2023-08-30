import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk"; // Import Redux Thunk
import { userReducer } from "./userReducer";
import { userSignup } from "./userReducer";
import { userLogin } from "./userReducer";
import { userPost } from "./userReducer";
import { userEdit } from "./userReducer";
import { userGetPost } from "./userReducer";
import { getAllTags } from "./userReducer";
import { getSearchPost } from "./userReducer";
import { getPlan } from "./userReducer";
import { getPostDetails } from "./userReducer";
import { getReplies } from "./userReducer";
import { userReplies } from "./userReducer";


const rootReducer = combineReducers({
  user: userReducer,
  signup: userSignup,
  login: userLogin,
  post: userPost,
  edit: userEdit,
  posts_get: userGetPost,
  get_tags: getAllTags,
  get_search: getSearchPost,
  plan: getPlan,
  postsDetail: getPostDetails,
  replies: getReplies,
  replyPost: userReplies

});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

