import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';

const PostPage = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('content', postContent);
    if (image) {
      formData.append('image', image);
    }
    
    try {
      await axios.post('http://localhost:5000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPostContent('');
      setImage(null);
    } catch (error) {
      console.error('Error posting content:', error);
    }
  };

  const handleCancelImage = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Add a Post</h1>
      <textarea
        className="w-full md:w-1/2 p-2 border rounded mb-4"
        placeholder="Type something..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>
      <div className="w-full md:w-1/2 mb-4">
        <label className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded p-4 cursor-pointer hover:bg-gray-200 outline-dashed outline-2 outline-offset-2 ">
          <FontAwesomeIcon icon={faUpload} className="text-gray-600 mr-2" />
          <span className="text-gray-600">Upload an image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        {image && (
          <div className="mt-2 flex flex-col items-center">
            <p className="text-center text-gray-600">
              Selected file: {image.name}
            </p>
            <button
              className="mt-2 p-2 bg-gray-500 text-white hover:text-black rounded"
              onClick={handleCancelImage}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>
      <button className="p-2 bg-blue-500 text-white rounded" onClick={handlePost}>Add Post</button>
    </div>
  );
};

export default PostPage;
