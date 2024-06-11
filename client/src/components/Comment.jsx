import React, { useState } from 'react';

const Comment = ({ comment }) => {
  const [replyText, setReplyText] = useState('');

  // Comment out the handleReplySubmit function and reply textarea
  // const handleReplySubmit = () => {
  //   const text = replyText.trim();
  //   if (text) {
  //     onReply(comment.id, text);
  //     setReplyText('');
  //   }
  // };

  return (
    <div className="border p-4 mb-4 rounded-lg bg-blue-100">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-blue-400">{comment.username}</p>
        <p className="text-gray-500 text-sm">{comment.timestamp}</p>
      </div>
      <p className="mt-2 ">{comment.text}</p>
      {/* Commenting out the reply section */}
      {/* <div className="mt-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleReplySubmit}
        >
          Reply
        </button>
      </div>
      {comment.replies.length > 0 && (
        <div className="mt-4 ml-4 border-l pl-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="border p-2 mb-2 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{reply.username}</p>
                <p className="text-gray-500 text-sm">{reply.timestamp}</p>
              </div>
              <p className="mt-2">{reply.text}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Comment;
