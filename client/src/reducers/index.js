import { combineReducers } from "redux";

import posts from './post'
import auth from './auth'
import user from './user'

export default combineReducers({ 
  posts,
  auth,
  user
})