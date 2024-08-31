import express from "express";
import { addPost, allPost, checkHi, deletePost, getSinglePost } from "../controller/post.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/checkhi", isAuthenticated, checkHi);
router.get("/allpost", isAuthenticated, allPost);
router.get("/:postId", isAuthenticated, getSinglePost); // doing

router.post("/addpost", isAuthenticated, addPost);
router.post("/delete/:postId", isAuthenticated, deletePost);




export default router;