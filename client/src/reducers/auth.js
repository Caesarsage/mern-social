
const authReducer = (
  state = { isLoading: false, authData: null, error: null },
  action
) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authDate: action?.data, error: null };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, authData: null, error: null };
    case "ERROR":
      localStorage.clear();
      return { ...state, authData: null, error: action.error };
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default authReducer;
