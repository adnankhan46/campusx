import React, { useState } from 'react';
import { useAddCommentToPostMutation } from '../redux/posts/postApi';
import { useSelector } from 'react-redux';
import Comment from './Comment';

const CommentSection = ({ comments = [], commentLoading, commentError, postId, CommentUserId}) => {
  const [newCommentText, setNewCommentText] = useState('');
  const[addCommentToPost, {error: AddCommentError, isLoading: AddCommentLoading}] = useAddCommentToPostMutation();
  const {currentUser} = useSelector((state)=> state.user);
  const PersonAddedComment = CommentUserId;
 
  const handleCommentSubmit = async () => {
    const text = newCommentText.trim();
    if (text) {
      try {
        await addCommentToPost({ postId, commentText: { text, userId: currentUser?._id } }).unwrap();
        setNewCommentText('');
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
      setNewCommentText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 border-black rounded-lg shadow-md w-full">
    <p className="mb-4 text-xl md:text-2xl text-gray-400">{(comments.length > 0) ? `${comments.length} Comments` : "No comments yet" }</p>

      <div className="mb-4 w-full flex border-2 border-black-500 bg-slate-400 rounded-lg items-center">
        <textarea
          className="w-full p-2 text-cyan-600 rounded-lg mr-2"
          placeholder="Write a new comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button
          className="px-4 py-2 text-blue-500 text-2xl rounded-lg hover:bg-blue-600 text-white-500" 
          onClick={handleCommentSubmit}
        >
          Add
        </button>
        {AddCommentError && <div className="text-red-500">Error: {AddCommentError.data.message}</div>}
      </div>

      {commentLoading ? (
        <div>Loading comments...</div>
      ) : commentError ? (
        <div className="text-red-500">Error: {commentError.data.message}</div>
      ) : (
        comments.map((comment) => (
          <Comment
          key={comment._id}
          comment={comment}
          PersonAddedComment={PersonAddedComment}
          />
        ))
      )}
    </div>
  );
};

export default CommentSection;
