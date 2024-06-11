import React, { useState } from 'react';
import Comment from './Comment';

const CommentSection = () => {
  const [comments, setComments] = useState([
    { id: 1, username: 'Male from Section H', text: 'Share your thoughts anonymously with No Strings Attached', timestamp: '2 hours ago', replies: [] },
    { id: 2, username: 'Female from Section I', text: 'Comment 22222', timestamp: '3 hours ago', replies: [] },
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const addComment = (text) => {
    const newComment = {
      id: comments.length + 1,
      username: 'Anonymous User',
      text,
      timestamp: new Date().toLocaleTimeString(),
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  // Comment out the addReply function and related functionality
  // const addReply = (commentId, text) => {
  //   const updatedComments = comments.map((comment) => {
  //     if (comment.id === commentId) {
  //       const newReply = {
  //         id: comment.replies.length + 1,
  //         username: 'Anonymous User',
  //         text,
  //         timestamp: new Date().toLocaleTimeString(),
  //         replies: [],
  //       };
  //       return { ...comment, replies: [...comment.replies, newReply] };
  //     }
  //     return {
  //       ...comment,
  //       replies: comment.replies.map((reply) =>
  //         reply.id === commentId ? { ...reply, replies: [...reply.replies, { id: reply.replies.length + 1, username: 'Anonymous User', text, timestamp: new Date().toLocaleTimeString(), replies: [] }] } : reply
  //       ),
  //     };
  //   });
  //   setComments(updatedComments);
  // };

  const handleCommentSubmit = () => {
    const text = newCommentText.trim();
    if (text) {
      addComment(text);
      setNewCommentText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 border-black rounded-lg shadow-md mt-4 w-full">
      <div className="mb-4 w-full flex border-2 border-black-500  bg-slate-400 rounded-lg items-center">
        <textarea
          className="w-full p-2 text-cyan-600  rounded-lg mr-2"
          placeholder="Write a new comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button
          className="px-4 py-2  text-blue-500 text-2xl rounded-lg  place-content-evenly hover:bg-blue-600 text-white-500 " 
          onClick={handleCommentSubmit}
        >
          Add
        </button>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentSection;
