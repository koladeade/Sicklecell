// utils/generateToken.ts
import jwt from 'jsonwebtoken';

/**
 * Generates a JWT and sets it as an HTTP-only cookie.
 * @param {object} res - Express response object.
 * @param {string} userId - The user's ID to encode in the token.
 */
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
};

export default generateToken;
