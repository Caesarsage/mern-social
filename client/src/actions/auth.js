import * as api from "../api/index";

export const login = (formData, history) => async (dispatch) => {
  try {
    // login the user
    const { data } = await api.login(formData);
    dispatch({ type: "AUTH", data });
    // navigate to home
    history.push("/");
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const register = (formData, history) => async (dispatch) => {
  try {
    // register the user
    const { data } = await api.register(formData);
    dispatch({ type: "AUTH", data });
    // navigate to home
    history.push("/");
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};
