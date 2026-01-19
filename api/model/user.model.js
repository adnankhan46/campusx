/* USER MODEL
_id
Addmission No.
username
email
password
Section
Gender
Role
isAuthenticated,
profilePicture
*/
import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
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
        type: String, // Year based on admission number, e.g., "24XXXXX" -> 2024
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
}, {timestamps: true});

// This prevents "Cannot overwrite model" error when other modules still use old path
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
