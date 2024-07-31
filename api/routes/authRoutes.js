
import express from 'express'

import { registerUser, loginUser,  logout } from '../controllers/authController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);

export default router;
