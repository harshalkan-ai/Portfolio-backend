import express from 'express';
import {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill,
} from '../controllers/skillController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route: Fetch all skills
router.get('/', getSkills);

// Protected routes: Admin mutations
router.post('/', protect, createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

export default router;
