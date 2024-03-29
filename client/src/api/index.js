import axios from "axios";

const API = axios.create({
  baseURL: "https://memories-api.azurewebsites.net/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const user = JSON.parse(localStorage.getItem("profile"));
    req.headers.authorization = `Bearer ${user.token}`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatePost) =>
  API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likes`);
export const commentPost = (id, value) =>
  API.post(`/posts/${id}/comment`, value);

export const login = (formData) => API.post("/user/login", formData);
export const register = (formData) => API.post("/user/register", formData)

export const getUser = (id) => API.get(`/user/profile/${id}`);
export const updatedUser = (id, updateUser) =>
  API.put(`/user/profile/${id}`, updateUser);
export const followUser = (id) => API.patch(`/user/profile/${id}/follow`);
