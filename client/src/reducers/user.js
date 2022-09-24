
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { isLoading: true, user: {}, error:null }, action) {
  switch (action.type) {
    case "FETCH_USER":
      return {
        ...state,
        error:null,
        user: action.payload,
      };
    case "UPDATE_USER":
    case "FOLLOW_USER":
      return {
        ...state,
        error: null,
        user: state.user._id === action.payload._id ? action.payload : state,
      };
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
}
