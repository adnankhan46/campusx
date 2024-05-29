import React from 'react';

const Post = ({ author, section, content }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <div className="mb-2">
        <p className="font-semibold">{author} From {section}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Post;
