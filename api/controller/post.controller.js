import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import mongoose from "mongoose";

export const checkHi = async (req, res) => {
    res.json({message: "Cookie hai"});
  }

export const allPost = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('user', 'gender section profilePicture');

        const formattedPosts = posts.map(post => ({
            text: post.text,
            user: post.user._id,
            postId: post._id,
            postImage: post.postImage,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            profilePicture: post.user.profilePicture,
            gender: post.user.gender,
            section: post.user.section
          }));
      
          res.status(200).json(formattedPosts);
        } catch (error) {
          next(error);
        }
  }

export const addPost = async (req, res) => {
    try {
        const { text, postImage } = req.body;
        const newPost = new Post({
          text,
          user: req.user.id,
          postImage,
        });
    
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    };

    // Single POST
export const getSinglePost = async (req, res) => {
    try {
      const { postId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const post = await Post.findById(postId).populate('user', 'gender section profilePicture');
      if(!post) {
      return res.status(404).json({ message: "Post not found" });
      };
      const formattedPost = {
        text: post.text,
        user: post.user._id,
        postId: post._id,
        postImage: post.postImage,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        profilePicture: post.user.profilePicture,
        gender: post.user.gender,
        section: post.user.section
      };
      res.status(200).json({post: formattedPost});
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
    };

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
  
    if (!post) {
      return res.status(404).json({message: "Post Not Found"})
    }
  
    if (post.user.toString() !== req.user.id) {
       return res.status(401).json({ message: "Unauthorized" });
    }
  // deleting
     await Post.findByIdAndDelete(postId);
  
     res.status(200).json({ message: "Post deleted successfully" });
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}