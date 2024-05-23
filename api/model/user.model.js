/* USER MODEL
_id
Addmission No.
username
email
password
Section
Gender
Role
isActive,
profilePicture
*/
import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    admissionNumber: {
        type: String,
        required: true,
        unique: true,
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
        enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    profilePicture: {
        type: String,
        default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    isAdmin: {
        type: Boolean,
        dafault: false,
    },
    isFreeze: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
