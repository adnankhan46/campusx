import Post from "../model/post.model.js";
import User from "../model/user.model.js";
import mongoose from "mongoose";

export const checkHi = async (req, res) => {
    res.json({message: "Cookie hai"});
  }

// Get all posts with pagination
export const allPost = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Pagination params
    try {
        // Ensure limit and page are integers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit,10);

        // Find all posts, populate user data, apply pagination
        const posts = await Post.find()
            .populate('user', 'gender section profilePicture')
            .sort({createdAt: -1})
            
            .limit(limitNumber) // Limit the number of results per page
            .skip((pageNumber - 1) * limitNumber); // Skip to the next page

        // Format posts for the response
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

        // Get total count of documents
        const totalPosts = await Post.countDocuments();

        // Send formatted posts and pagination data
        res.status(200).json({
            posts: formattedPosts,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalPosts / limitNumber),
            hasMore: (pageNumber * limitNumber) < totalPosts // Pagination check
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const addPost = async (req, res) => {
    try {
        const { text, postImage } = req.body;
        if(!text)
        {
          return res.status(400).json({message: "text can't be empty"})
        };
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