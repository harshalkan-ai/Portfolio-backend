import jwt from 'jsonwebtoken';

/**
 * Generates a signed JSON Web Token (JWT)
 * @param {string} userId - The unique database ID of the user
 * @returns {string} - The signed JWT token string
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d', // The wristband stays valid for 30 days
    });
};

export default generateToken;