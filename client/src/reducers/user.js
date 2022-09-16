
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { isLoading: true, user: {} }, action) {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'UPDATE_USER':
    case 'FOLLOW USER':
      return {
        ...state,
        user: state.user.map((u) =>
          u._id === action.payload._id ? action.payload : u
        ),
      };
    default:
      return state;
  }
}
