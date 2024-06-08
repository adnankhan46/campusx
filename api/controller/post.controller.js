import Post from "../model/post.model.js";

export const checkHi = async (req, res) => {
    res.json({message: "Cookie hai"});
  }

export const allPost = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'gender section profilePicture');

        const formattedPosts = posts.map(post => ({
            text: post.text,
            user: post.user._id,
            postImage: post.postImage,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            profilePicture: post.user.profilePicture,
            gender: post.user.gender,
            section: post.user.section
          }));
      
          res.status(200).json(formattedPosts);
        } catch (error) {
          res.status(500).json({ message: "Server error", error: error.message });
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