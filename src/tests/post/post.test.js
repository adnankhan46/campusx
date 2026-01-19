import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';

// static ObjectId for the mock user so we can reference it in the hoisted mock
const mockUserId = new mongoose.Types.ObjectId();

// Mock the isAuthenticated middleware BEFORE importing the app
vi.mock('../../../api/middlewares/isAuthenticated.js', () => ({
  isAuthenticated: (req, res, next) => {
    // Inject the mock user into the request
    req.user = { id: mockUserId.toString() };
    next();
  },
}));

import { app } from '../../../api/index.js';
// old model path, needed to change, --refactor needed
import Post from '../../../api/model/post.model.js';
import User from '../../../api/model/user.model.js';

beforeEach(async () => {
  await User.create({
    _id: mockUserId,
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    admissionNumber: '123456',
    section: 'A',
    gender: 'Male',
    isAuthenticated: true
  });
});

describe('Post Controller Test', () => {
  
  describe('GET /api/post/checkhi', () => {
    it('should return the welcome message', async () => {
      const res = await request(app).get('/api/post/checkhi');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Cookie hai" });
    });
  });

  describe('POST /api/post/addpost', () => {
    it('should create a new post', async () => {
      const postData = {
        text: 'This is a test post',
        postImage: 'http://example.com/image.jpg'
      };

      const res = await request(app)
        .post('/api/post/addpost')
        .send(postData);

      expect(res.status).toBe(201);
      expect(res.body.text).toBe(postData.text);
      expect(res.body.postImage).toBe(postData.postImage);
      expect(res.body.user).toBe(mockUserId.toString());

      // Verify in DB, extra step
      const post = await Post.findById(res.body._id);
      expect(post).toBeTruthy();
      expect(post.text).toBe(postData.text);
    });

    it('should return 400 if text is empty', async () => {
        const res = await request(app)
          .post('/api/post/addpost')
          .send({ postImage: 'http://example.com/img.jpg' }); // No text
  
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("text can't be empty");
      });
  });

  describe('GET /api/post/allpost', () => {
    it('should get all posts with pagination', async () => {
      // Create some posts
      await Post.create([
        { text: 'Post 1', user: mockUserId },
        { text: 'Post 2', user: mockUserId },
        { text: 'Post 3', user: mockUserId }
      ]);

      const res = await request(app).get('/api/post/allpost?page=1&limit=2');

      expect(res.status).toBe(200);
      expect(res.body.posts).toHaveLength(2); // Limit is 2
      expect(res.body.currentPage).toBe(1);
      expect(res.body.totalPages).toBe(2); // 3 posts, limit 2 = 2 pages
      expect(res.body.hasMore).toBe(true);

      // Verify structure of formatted post
      const firstPost = res.body.posts[0];
      expect(firstPost).toHaveProperty('text');
      expect(firstPost).toHaveProperty('user');
      expect(firstPost).toHaveProperty('postId');
      // User details populated, extra step
      expect(firstPost).toHaveProperty('gender', 'Male');
      expect(firstPost).toHaveProperty('section', 'A');
    });
  });

  describe('GET /api/post/allpostbyuser', () => {
    it('should get posts only for the specified user', async () => {
        // Create another user
        const otherUserId = new mongoose.Types.ObjectId();
        await User.create({
            _id: otherUserId,
            username: 'other',
            email: 'other@test.com',
            password: 'pass',
            admissionNumber: '999',
            section: 'B',
            gender: 'Female'
        });

      await Post.create([
        { text: 'My Post 1', user: mockUserId },
        { text: 'Other Post 1', user: otherUserId }
      ]);

      const res = await request(app)
        .get(`/api/post/allpostbyuser?userId=${mockUserId.toString()}`);

      expect(res.status).toBe(200);
      expect(res.body.posts).toHaveLength(1);
      expect(res.body.posts[0].text).toBe('My Post 1');
    });
  });

  describe('GET /api/post/:postId', () => {
    it('should get a single post by ID', async () => {
      const post = await Post.create({ text: 'Single Post', user: mockUserId });

      const res = await request(app).get(`/api/post/${post._id}`);

      expect(res.status).toBe(200);
      expect(res.body.post.text).toBe('Single Post');
      expect(res.body.post.postId).toBe(post._id.toString());
    });

    it('should return 404 if post not found', async () => {
      const validId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/post/${validId}`);
      expect(res.status).toBe(404);
    });
    
    it('should return 400 if post ID is invalid', async () => {
        const res = await request(app).get(`/api/post/invalid-id`);
        expect(res.status).toBe(400);
    });
  });

  describe('POST /api/post/delete/:postId', () => {
    it('should delete a post if owner', async () => {
      const post = await Post.create({ text: 'To Delete', user: mockUserId });
      
      const res = await request(app).post(`/api/post/delete/${post._id}`);
      
      expect(res.status).toBe(200);
      expect(res.body.message).toContain('deleted successfully');
      
      const checkParams = await Post.findById(post._id);
      expect(checkParams).toBeNull();
    });

    it('should not delete if not owner', async () => {
       // Create post with different user
       const otherUserId = new mongoose.Types.ObjectId();
       const post = await Post.create({ text: 'Not Mine', user: otherUserId });

       // Request as mockUser (simulated by middleware mock)
       const res = await request(app).post(`/api/post/delete/${post._id}`);
       
       expect(res.status).toBe(401); // Unauthorized
       
       const checkPost = await Post.findById(post._id);
       expect(checkPost).not.toBeNull();
    });
  });

});
