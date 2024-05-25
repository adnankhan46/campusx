import User from "../model/user.model.js"
import {errorHandler} from "../middlewares/error.js";
import { allowedAdmissionNumbers } from "./allowedAdmissionNum.js";
import jwt from "jsonwebtoken";

export const handleSignUp = async (req, res, next)=>{
    const {admissionNumber, email, password, section, gender, username} = req.body;

  if (
    !admissionNumber ||
    !email ||
    !password ||
    admissionNumber === '' ||
    email === '' ||
    password === '' ||
    section === '' ||
    gender === '' ||
    username === ''
  ) {
    next(errorHandler(400, "All field ae Required"));
  }
// ################## Checking for Existing user
  const existingUser = await User.findOne({ $or: [{ email }, { admissionNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Admission number already in use' });
    }

// ################## Checking if the admission number or email is allowed
   if (!allowedAdmissionNumbers.includes(admissionNumber)) {
    return res.status(400).json({ message: 'Admission Number is not allowed' });
  }

  const newUser = new User({
    admissionNumber,
    email,
    password,
    section,
    gender,
    username
  });

  try {
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET
    );
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3*24*60*60*1000 });
    res.status(200).json('Signup successful');
  } catch (error) {
    next(error);
  }
}

export const handleSignIn = (req, res)=>{
    res.json({message:"Working SignIN from auth controller"});
}