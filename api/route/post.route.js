import express from "express";
import { addPost, allPost, checkHi, getSinglePost } from "../controller/post.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/checkhi", isAuthenticated, checkHi);
router.get("/allpost", isAuthenticated, allPost);
router.get("/:postId", isAuthenticated, getSinglePost); // doing

router.post("/addpost", isAuthenticated, addPost);




export default router;