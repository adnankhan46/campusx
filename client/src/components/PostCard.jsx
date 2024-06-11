import React, { useState, useEffect } from 'react';


const PostCard = ({ text, gender, section, profilePicture, postImage, time, postId }) => {
  const [votes, setVotes] = useState(0);
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem('userVotes')) || {};
    if (savedVotes[postId]) {
      setUserVote(savedVotes[postId]);
    }
  }, [postId]);

  useEffect(() => {
    if (userVote) {
      const savedVotes = JSON.parse(localStorage.getItem('userVotes')) || {};
      savedVotes[postId] = userVote;
      localStorage.setItem('userVotes', JSON.stringify(savedVotes));
    }
  }, [userVote, postId]);

  const handleUpvote = () => {
    if (userVote === 'up') {
      setVotes(votes - 1);
      setUserVote(null);
    } else if (userVote === 'down') {
      setVotes(votes + 2);
      setUserVote('up');
    } else {
      setVotes(votes + 1);
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setVotes(votes + 1);
      setUserVote(null);
    } else if (userVote === 'up') {
      setVotes(votes - 2);
      setUserVote('down');
    } else {
      setVotes(votes - 1);
      setUserVote('down');
    }
  };

  return (
    <div className="overflow-x-hidden bg-white border border-[#D9D9D9] p-4 rounded-lg mb-2 w-full md:w-1/2">
      <div className="mb-4">
        <p>{text}</p>
        {postImage && <img src={postImage} alt="postImg" onError={(e) => e.target.style.display = 'none'} />}
      </div>
      <div className="flex gap-1 items-end">
        <img src={profilePicture} className="h-6 w-6" alt="profilePicture" />
        <p className="mt-6 text-black"><b>{gender}</b> From Section: <b>{section}</b></p>
      </div>
      <p>{time}</p>
      <div className="flex items-center mt-4">
        <button
          className={`px-2 py-1 rounded mr-2 ${userVote === 'up' ? 'bg-blue-600' : 'bg-blue-500'} text-white hover:bg-blue-600`}
          onClick={handleUpvote}
        >
          Upvote
        </button>
        <button
          className={`px-2 py-1 rounded ${userVote === 'down' ? 'bg-red-600' : 'bg-red-500'} text-white hover:bg-red-600`}
          onClick={handleDownvote}
        >
          Downvote
        </button>
        <p className="ml-4">{votes} votes</p>
      </div>
    </div>
  );
};

export default PostCard;
