import React from 'react';

const PostCard = ({ text, gender, section, profilePicture, postImage, time }) => {
  return (
    <div className="overflow-x-hidden bg-white border border-[#D9D9D9] p-4 rounded-lg mb-2 w-full">
      <div className="mb-4">
      <p>{text}</p>
     {postImage && <img src={postImage} alt="postImg" className='max-w-[80%]' onError={(e) => e.target.style.display = 'none'} />}
      </div>
        <div className='flex gap-1 items-end relative'>
        <img src={profilePicture} className='h-6 w-6' alt="profilePicture"/>
        <p className="mt-6 text-black"><b>{gender}</b> From Section <b>{section}</b></p>
        <p className='absolute right-0 text-[#4b6cfcec] text-base'>View Full</p>
        </div>
      <p>{time}</p>
    </div>
  );
};

export default PostCard;
