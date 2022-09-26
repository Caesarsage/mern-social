import express from 'express'
import { deleteUser, followUser, getUser, login, register, updateUser } from '../controllers/user.js';
import { isAdmin } from '../middlewares/admin.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login)
router.post('/register', register)

router.get("/profile/:id", getUser);
router.put("/profile/:id", auth, updateUser);
router.patch("/profile/:id/follow", auth, followUser);

router.delete("/profile/:id", auth, isAdmin, deleteUser);

export default router