import express from "express";
import { handleSignUp, handleSignIn, logout, updatePassword } from "../controller/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.post("/updatepassword", updatePassword);
router.get("/logout", isAuthenticated, logout);

export default router;