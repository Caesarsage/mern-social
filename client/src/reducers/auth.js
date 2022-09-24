
function timer(error) {
  setTimeout(() => {
    error = null
  }, 3000)
}

const authReducer = (state = { authData: null, error: null }, action) => {
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
    default:
      return state;
  }
};

export default authReducer;
