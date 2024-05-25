import User from "../model/user.model.js"
import {errorHandler} from "../middlewares/error.js";
import { allowedAdmissionNumbers } from "./allowedAdmissionNum.js";
import bcryptjs from "bcryptjs"
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

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    admissionNumber,
    email,
    password: hashedPassword,
    section,
    gender,
    username
  });

  try {
    const savedUser = await newUser.save();

    const {password: hashedPassword, ...rest} = savedUser._doc;

// ############## JWT
    const token = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin},
      process.env.JWT_SECRET
    );
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3*24*60*60*1000 });

    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
}

export const handleSignIn = async (req, res, next)=>{
  const { admissionNumber, password } = req.body;

  if (!admissionNumber ||
      !password ||
      admissionNumber === '' ||
      password === '') {
    return next(errorHandler(400, "Admission Number and Password are required"));
  }

  try {
    const user = await User.findOne({ admissionNumber });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Admission Number or Password' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Admission Number or Password' });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    res.cookie("jwt", token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

    const {password: hashedPassword, ...rest} = user._doc;

    res.status(200).json(rest);

  }
  catch(error) {
    next(error);
  }
}