import express from 'express'
import {
  getMemories,
  getMemory,
  createMemory,
  likeMemory,
  updateMemory,
  deleteMemory,
  getMemoriesBySearch,
  commentMemory,
} from "../controllers/memory.js";
import auth from '../middlewares/auth.js';
import { isOwner } from '../middlewares/owner.js';

const router = express.Router();

router.get("/search", getMemoriesBySearch);
router.get("/", getMemories);
router.get('/:id', getMemory)

router.post('/', auth, createMemory )
router.patch("/:id", auth, isOwner, updateMemory);
router.delete("/:id", auth, isOwner, deleteMemory);
router.patch('/:id/likes', auth, likeMemory)
router.post("/:id/comment", auth, commentMemory);

export default router