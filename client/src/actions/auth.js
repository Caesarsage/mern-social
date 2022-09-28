import * as api from "../api/index";
import { END_LOADING, START_LOADING } from "../constants/constants.ActionTypes";

export const login = (formData, history) => async (dispatch) => {
  try {
    // login the user
    dispatch({ type: START_LOADING });
    const { data } = await api.login(formData);
    dispatch({ type: "AUTH", data });
    
    // navigate to home
    history.push("/");
  } catch (error) {
    dispatch({ type: END_LOADING });
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const register = (formData, history) => async (dispatch) => {
  try {
    // register the user
    dispatch({ type: START_LOADING });
    const { data } = await api.register(formData);
    dispatch({ type: "AUTH", data });
    dispatch({ type: END_LOADING });
    // navigate to home
    history.push("/");
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};
