import express from 'express';
import {
    registerAdmin,
    loginAdmin,
    getMe,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes (anyone can hit these)
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Private / Protected routes (only accessible with a valid Bearer JWT token)
router.get('/me', protect, getMe);

export default router;