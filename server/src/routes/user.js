import express from 'express'
import { followUser, getUser, login, register, updateUser } from '../controllers/user.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login)
router.post('/register', register)

router.get("/profile/:id", getUser);
router.put("/profile/:id", auth, updateUser);
router.patch("/profile/:id/follow", auth, followUser);

export default router