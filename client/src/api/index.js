import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000'
})

API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
    const user = JSON.parse(localStorage.getItem("profile"));
    req.headers.authorization =  `Bearer ${user.token}`
  }

  return req
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likes`)

export const login = (formData) => API.post('/user/login', formData)
export const register = (formData) => API.post('/user/register', formData);