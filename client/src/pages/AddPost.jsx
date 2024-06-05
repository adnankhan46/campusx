import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import BottomBar from '../components/Bottombar';
import Navbar from '../components/Navbar';

const AddPost = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('content', postContent);
    if (image) {
      formData.append('image', image);
    }
    
    try {
      // POST: API Calling...
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
    <div className="flex flex-col items-center min-h-screen bg-[#EFEFF4] pb-[120px]">
    <Navbar/>
      <h1 className="text-2xl md:text-4xl font-bold my-4">Add a Post</h1>
      <textarea
        className="w-full md:w-1/2 p-2 h-20 rounded-xl mb-4 border focus:outline-none"
        placeholder="Type something..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        ref={inputRef}
      ></textarea>

      <div className="w-full md:w-1/2 mb-4">
      <p>{`(Optional)`}</p>
        <label className="flex items-center justify-start p-4 cursor-pointer hover:bg-gray-200  border-2 border-gray-300 rounded-xl">
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
           <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="mt-2 max-w-full max-h-36 rounded"
            />
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
      <button className="p-2 w-full md:w-1/2 h-14 bg-[#6a7cff] text-white rounded" onClick={handlePost}>Post</button>
      <BottomBar/>
    </div>
  );
};

export default AddPost;
