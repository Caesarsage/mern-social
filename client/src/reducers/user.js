
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { isLoading: true, user: {} }, action) {
  switch (action.type) {
    case "FETCH_USER":
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USER":
    case "FOLLOW_USER":
      // console.log(action.payload);
      return {
        ...state,
        user: state.user._id === action.payload._id ? action.payload : state
      };
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
