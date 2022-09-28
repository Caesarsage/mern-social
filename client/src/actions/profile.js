import * as api from "../api/index";
import { END_LOADING, START_LOADING } from "../constants/constants.ActionTypes";

// ACTION CREATORS
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.getUser(id);
    dispatch({ type: "FETCH_USER", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updatedUser(id, user);
    dispatch({ type: "UPDATE_USER", payload: data });
    // window.location.reload();
    dispatch({ type: END_LOADING });    
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.updatedUser(id);
    dispatch({ type: "DELETE_USER", payload: id });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const followUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.followUser(id);
    dispatch({ type: "FOLLOW_USER", payload: data });
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};
