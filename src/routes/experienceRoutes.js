import express from 'express';
import {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
} from '../controllers/experienceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getExperiences);

// Protected routes
router.post('/', protect, createExperience);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

export default router;
