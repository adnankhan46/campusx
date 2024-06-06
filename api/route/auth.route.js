import express from "express";
import { handleSignUp, handleSignIn } from "../controller/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);

export default router;