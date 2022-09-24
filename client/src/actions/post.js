import * as api from "../api/index";
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

// ACTION CREATORS
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_ONE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};

export const commentPost = (id, value) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(id, value);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    dispatch({ type: "ERROR", error: error.response.data.message });
  }
};
