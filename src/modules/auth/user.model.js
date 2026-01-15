import mongoose from "mongoose";

/**
 * USER MODEL, since no typescript
 * Fields:
 * - admissionNumber: Student admission number is now start year of graduation (4 digits)
 * - username: Auto-generated (email + admissionNumber)
 * - email: User email (unique)
 * - password: Hashed password
 * - section: Student section
 * - gender: Male/Female
 * - year: Admission year (extracted from admission number)
 * - profilePicture: User avatar
 * - isAdmin: Admin flag
 * - isFreeze: Account freeze status
 * - isAuthenticated: Authentication verification status
 * - isEmailVerified: Email verification status
 * - token: Auth token storage
 */

const userSchema = new mongoose.Schema({
  admissionNumber: {
    type: String,
    required: true,
    unique: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  year: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isFreeze: {
    type: Boolean,
    default: false,
  },
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: null,
  },
}, { timestamps: true });

// Check if model already exists before creating, since other unchanged modules still use old path
// This prevents "Cannot overwrite model" error when other modules still use old path
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;