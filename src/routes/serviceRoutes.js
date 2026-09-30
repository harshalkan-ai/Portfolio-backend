import express from 'express';
import {
    getServices,
    createService,
    updateService,
    deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getServices);

// Protected routes
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

export default router;
