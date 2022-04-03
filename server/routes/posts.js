import express from 'express'
import { getPost, createPost, likePost, updatePost, deletePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPost)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likes', likePost)
export default router