import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_ONE, LIKE, START_LOADING, UPDATE, COMMENT } from "../constants/constants.ActionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {isLoading: true, posts:[]}, action) {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberofPages
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload
      };
    case FETCH_ONE:
      return {
        ...state,
        post: action.payload
      }
    case UPDATE:
    case LIKE:
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
    case COMMENT:
      return {
        ...state, posts: state.posts.map((post) => {
        // return all post and change post that got commented
          if (post._id === action.payload._id) return action.payload
          return post
      })}
    case DELETE:
      return {...state, posts: state?.posts.filter((post)=> post._id !== action.payload)}
    case CREATE:
      return {...state, posts: [...state, action.payload]};
    case START_LOADING:
      return {...state, isLoading: true}
    case END_LOADING:
      return {...state, isLoading: false}
    default:
      return state;
  }
}