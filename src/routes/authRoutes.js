import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/authController.js';

const router = express.Router();

// Route: POST /api/auth/register
router.post('/register', registerAdmin);

// Route: POST /api/auth/login
router.post('/login', loginAdmin);

export default router;