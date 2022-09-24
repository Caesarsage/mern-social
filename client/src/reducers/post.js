import {
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_ONE,
  LIKE,
  START_LOADING,
  UPDATE,
  COMMENT,
} from "../constants/constants.ActionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { isLoading: true, posts: [], error:null }, action) {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        error: null,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberofPages,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        error: null,
        posts: action.payload,
      };
    case FETCH_ONE:
      return {
        ...state,
        error: null,
        post: action.payload,
      };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        error: null,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        error: null,
        posts: state.posts.map((post) => {
          // return all post and change post that got commented
          if (post._id === action.payload._id) return action.payload;
          return post;
        }),
      };
    case DELETE:
      return {
        ...state,
        error: null,
        posts: state?.posts.filter((post) => post._id !== action.payload),
      };
    case CREATE:
      return { ...state, error:null, posts: [...state, action.payload] };
    case "ERROR":
      return { ...state, error: action.error };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
