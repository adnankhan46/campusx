import React from 'react';

const PostCard = ({ text, gender, section, profilePicture, postImage, time }) => {
  return (
    <div className="overflow-x-hidden bg-white border border-[#D9D9D9] p-4 rounded-lg mb-2 w-full md:w-1/2">
      <div className="mb-4">
      <p>{text}</p>
     {postImage && <img src={postImage} alt="postImg" onError={(e) => e.target.style.display = 'none'} />}
      </div>
        <div className='flex gap-1 items-end'>
        <img src={profilePicture} className='h-6 w-6' alt="profilePicture"/>
        <p className="mt-6 text-black"><b>{gender}</b> From Section: <b>{section}</b></p>
        </div>
      <p>{time}</p>
    </div>
  );
};

export default PostCard;
