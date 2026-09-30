import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @desc    Upload single image
 * @route   POST /api/upload
 * @access  Private (Admin)
 */
router.post('/', protect, upload.single('image'), (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error('Please upload an image file');
        }

        const relativePath = `/uploads/${req.file.filename}`;

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            imageUrl: relativePath,
            data: {
                imageUrl: relativePath,
                filename: req.file.filename,
                mimetype: req.file.mimetype,
                size: req.file.size,
            },
        });
    } catch (error) {
        next(error);
    }
});

export default router;
