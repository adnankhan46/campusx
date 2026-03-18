import express from "express";
import { addPost, allPost, allPostByUser, checkHi, deletePost, getSinglePost } from "../post/post.controller.js";

import { isAuthenticated, postLimiter } from "../../shared/middleware/index.js";

const router = express.Router();

router.get("/checkhi", isAuthenticated, checkHi);
router.get("/allpost", isAuthenticated, allPost);
router.get("/allpostbyuser", isAuthenticated, allPostByUser);
router.get("/:postId", isAuthenticated, getSinglePost); // doing

router.post("/addpost", postLimiter, isAuthenticated, addPost);
router.post("/delete/:postId", isAuthenticated, deletePost);




export default router;