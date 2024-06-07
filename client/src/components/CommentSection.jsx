import React, { useState } from 'react';


const CommentSection = () => {
  const [comments, setComments] = useState([
    { id: 1, username: 'User1', text: 'This is a comment.', timestamp: '2 hours ago', votes: 0, replies: [] },
    { id: 2, username: 'User2', text: 'This is another comment.', timestamp: '3 hour ago', votes: 0, replies: [] },
    { id: 3, username: 'User3', text: 'This is a third comment.', timestamp: '4 hours ago', votes: 0, replies: [] },
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const addComment = (text) => {
    const newComment = {
      id: comments.length + 1,
      username: 'User2',
      text,
      timestamp: new Date().toLocaleTimeString(),
      votes: 0,
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  const addReply = (commentId, text) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const newReply = {
          id: comment.replies.length + 1,
          username: 'User2',
          text,
          timestamp: new Date().toLocaleTimeString(),
          votes: 0,
        };
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleVote = (commentId, voteType) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedComment = {
          ...comment,
          votes: voteType === 'up' ? comment.votes + 1 : comment.votes - 1,
        };
        return updatedComment;
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleCommentSubmit = () => {
    const text = newCommentText.trim();
    if (text) {
      addComment(text);
      setNewCommentText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-4 w-full">
      <div className="mb-4 w-full">
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Write a new comment..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white place-items-center rounded hover:bg-blue-600"
          onClick={handleCommentSubmit}
        >
          Add Comment
        </button>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReply={addReply} onVote={handleVote} />
      ))}
    </div>
  );
};

export default CommentSection;
