import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/**
 * Middleware to protect private routes
 * Verifies JWT token sent in the Authorization header
 */
export const protect = async (req, res, next) => {
    let token;

    // 1. Check if token exists in the Authorization header (Format: Bearer <token>)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 2. Extract token from header string ("Bearer eyaabb...")
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify token signature using our secret master key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Find the user associated with this token (excluding password)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401);
                throw new Error('User not found. Authorization denied.');
            }

            // 5. Everything is valid -> Let them through to the next function!
            next();
        } catch (error) {
            res.status(401);
            next(new Error('Not authorized: Invalid or expired token'));
        }
    }

    // If no token was provided in the header
    if (!token) {
        res.status(401);
        next(new Error('Not authorized: No token provided'));
    }
};