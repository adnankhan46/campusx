import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.model.js';
import { ApiErrors } from '../../shared/utils/index.js';
import config from '../../config/index.js';

/**
 * Auth Service - Business logic layer
 */

export const authService = {
  /**
   * Sign up a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Created user and token
   */
  async signUp(userData) {
    const { admissionNumber, email, password, section, gender } = userData;

    // if user already exists
    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      throw ApiErrors.conflict('Email already in use');
    }

    // Extract year from admission number (first 4 digits)
    const yearDigits = admissionNumber.slice(0, 4);
    const currentYear = parseInt(yearDigits);

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create username (email + admission number)
    const username = email.toString() + admissionNumber.toString();

    // new user
    const newUser = new User({
      admissionNumber,
      email,
      password: hashedPassword,
      section,
      gender,
      year: currentYear,
      username,
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      config.jwtSecret
    );

    const { password: _, ...userWithoutPassword } = savedUser._doc;

    return { user: userWithoutPassword, token };
  },

  /**
   * Sign in existing user
   * @param {Object} credentials - Login credentials
   * @returns {Promise<Object>} User data and token
   */
  async signIn(credentials) {
    const { email, password } = credentials;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiErrors.badRequest('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw ApiErrors.badRequest('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      config.jwtSecret,
      { expiresIn: '30d' }
    );

    const { password: _, ...userWithoutPassword } = user._doc;

    return { user: userWithoutPassword, token };
  },

  /**
   * Update user password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Success message
   */
  async updatePassword(newPassword) {
    // Find first user (this seems like a development function)
    const user = await User.findOne({});
    if (!user) {
      throw ApiErrors.notFound('User not found');
    }

    // Hash new password
    const hashedNewPassword = bcryptjs.hashSync(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return { message: 'Password updated successfully' };
  },

  /**
   * Update user authentication status -- @NotUsed
   * @param {string} userId - User ID
   * @param {boolean} isAuthenticated - Authentication status
   * @returns {Promise<Object>} Updated user
   */
  async updateAuthStatus(userId, isAuthenticated) {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAuthenticated },
      { new: true }
    );

    if (!updatedUser) {
      throw ApiErrors.notFound('User not found');
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser._doc;

    return userWithoutPassword;
  },

  /**
   * Verify JWT token
   * @param {string} token - JWT token
   * @returns {Promise<Object>} Decoded token payload
   */
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      return decoded;
    } catch (error) {
      throw ApiErrors.unauthorized('Invalid token');
    }
  },
};