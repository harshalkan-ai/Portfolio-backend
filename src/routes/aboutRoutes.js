import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public: View profile info
router.get('/', getAbout);

// Protected: Update profile info
router.put('/', protect, updateAbout);

export default router;
