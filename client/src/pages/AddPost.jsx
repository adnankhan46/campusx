import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import BottomBar from '../components/Bottombar';
import Navbar from '../components/Navbar';
import app from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import { useAddPostsMutation } from '../redux/posts/postApi';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [addPost, { isLoading, error }] = useAddPostsMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  
  const handlePost = async () => {
    
    

    setLoading(true);

    let imageUrl = null;

    if (image) {
      try {
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/" + image.name);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
        console.log(imageUrl);
        
      } catch (error) {
        console.log(error);
      }
    }

    try {
      console.log("New wala ",imageUrl);
       await addPost({ text: postContent, postImage: imageUrl }).unwrap();
      setPostContent('');
      setImage(null);
      navigate("/home");
    } catch (err) {
      console.error('Error posting content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelImage = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#EFEFF4] pb-[120px]">
      <Navbar />
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
      <button className="p-2 w-full md:w-1/2 h-14 bg-[#6a7cff] text-white rounded" onClick={handlePost} disabled={loading || isLoading}>
        {loading || isLoading ? 'Posting...' : 'Post'}
      </button>
      {error && <div className="text-red-500">Error: {error.data.message}</div>}
      <BottomBar />
    </div>
  );
};

export default AddPost;
