import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads folder exists
const uploadDirectory = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Unique filename: timestamp-random-originalNameWithoutSpecialChars.ext
        const ext = path.extname(file.originalname).toLowerCase();
        const baseName = path
            .basename(file.originalname, ext)
            .replace(/[^a-zA-Z0-9_-]/g, '_');
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    },
});

// File Filter: only allow images
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/svg+xml',
    ];

    const allowedExtensions = /jpeg|jpg|png|webp|svg/;
    const extname = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedMimeTypes.includes(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(
            new Error(
                'Invalid file type. Only JPEG, JPG, PNG, WEBP, and SVG images are allowed.'
            ),
            false
        );
    }
};

// Multer Upload Instance with 5MB Limit
export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 Megabytes
    },
    fileFilter,
});

export default upload;
