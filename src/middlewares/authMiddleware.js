import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @desc    Register initial Admin (One-time setup)
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerAdmin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if all required fields were sent
        if (!name || !email || !password) {
            res.status(400);
            throw new Error('Please provide name, email, and password');
        }

        // 2. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('An account with this email already exists');
        }

        // 3. Create user (password is automatically hashed by userModel.js)
        const user = await User.create({
            name,
            email,
            password,
            role: 'admin',
        });

        // 4. Return user info and shiny new token
        res.status(201).json({
            success: true,
            message: 'Admin account created successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            },
        });
    } catch (error) {
        next(error); // Sends error directly to our errorHandler.js
    }
};

/**
 * @desc    Authenticate Admin & get token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Validation check
        if (!email || !password) {
            res.status(400);
            throw new Error('Please provide both email and password');
        }

        // 2. Find user by email (we explicitly select the password because we set select:false in userModel)
        const user = await User.findOne({ email }).select('+password');

        // 3. Check if user exists AND password matches
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                success: true,
                message: 'Logged in successfully',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id),
                },
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};