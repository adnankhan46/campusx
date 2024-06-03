import React from 'react';

const PostCard = ({ gender, section, content }) => {
  return (
    <div className="bg-white border border-[#D9D9D9] p-4 shadow-md rounded-lg mb-2">
      <div className="mb-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sed ipsum ab harum molestiae!
        <p className="mt-6"><span className='font-bold'>Male</span> From <span className='font-bold'>Section-H</span></p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default PostCard;
