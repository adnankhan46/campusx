import React from 'react';
import { useSelector } from 'react-redux';

const PostCard = ({ text, gender, section, profilePicture, postImage, time, postId, postUser }) => {

  const {currentUser} = useSelector((state)=> state.user);

  return (
    <div className="overflow-x-hidden bg-white border border-[#D9D9D9] p-4 rounded-lg mb-2 w-full">
      <div className="mb-4">
        <p className='text-sm'>{text}</p>
        {postImage && <img className='rounded-lg border border-[#D9D9D9]' src={postImage} alt="postImg" onError={(e) => e.target.style.display = 'none'} />}
      </div>
      <div className="flex gap-1 items-end relative">
        <img src={profilePicture} className="h-6 w-6" alt="profilePicture" />
        <p className="mt-6 text-black"><b>{gender}</b> From Section <b>{section}</b></p>
        <p className='absolute right-0 text-[#4b6cfcec] text-base'>View Full</p>
      </div>
      
      <div className="flex items-center justify-between mt-4">
  
      {(currentUser._id === postUser) ? 
      <p className="text-base text-red-500">Delete Post</p>
      :<p>{time}</p>
        }
        <p className="text-base">14 Comments</p>
        
      </div>
    </div>
  );
};

export default PostCard;
