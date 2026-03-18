import express from "express";
import { addComment, deleteComment, getAllCommentByPost } from "../comment/comment.controller.js";

import { isAuthenticated } from "../../shared/middleware/index.js";

const router = express.Router();

router.get("/all/:postId", getAllCommentByPost);
router.post("/add/:postId", isAuthenticated, addComment);
router.post("/delete/:commentId", isAuthenticated, deleteComment);



export default router;