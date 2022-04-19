import express from 'express'
import { getPost, createPost, likePost, updatePost, deletePost,getPostsBySearch } from '../controllers/posts.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearch)
router.get('/', getPost)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likes', auth, likePost)

export default router