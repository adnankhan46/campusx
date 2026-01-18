import express from "express";
import { addPost, allPost, allPostByUser, checkHi, deletePost, getSinglePost } from "../post/post.controller.js";

// Import old middleware temporarily (will be migrated later)
import { isAuthenticated } from "../../../api/middlewares/isAuthenticated.js";
import { postLimiter } from "../../../api/middlewares/rate-limiter.js";

const router = express.Router();

router.get("/checkhi", isAuthenticated, checkHi);
router.get("/allpost", isAuthenticated, allPost);
router.get("/allpostbyuser", isAuthenticated, allPostByUser);
router.get("/:postId", isAuthenticated, getSinglePost); // doing

router.post("/addpost", postLimiter, isAuthenticated, addPost);
router.post("/delete/:postId", isAuthenticated, deletePost);




export default router;