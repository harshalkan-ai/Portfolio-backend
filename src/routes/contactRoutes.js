import express from 'express';
import {
    sendMessage,
    getMessages,
    markMessageRead,
    deleteMessage,
} from '../controllers/contactController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public: Submit a contact message
router.post('/', sendMessage);

// Protected: Admin viewing and managing inquiries
router.get('/', protect, getMessages);
router.put('/:id/read', protect, markMessageRead);
router.delete('/:id', protect, deleteMessage);

export default router;
