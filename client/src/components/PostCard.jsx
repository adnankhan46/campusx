import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ text, gender, section, profilePicture, postImage, time, postId, postUser }) => {
  const navigate = useNavigate(); 
  const {currentUser} = useSelector((state)=> state.user);

  return (
    <div className="overflow-x-hidden bg-white border border-[#D9D9D9] p-4 rounded-lg mb-2 w-full
    " onClick={()=>navigate(`/post/${postId}`)}>
      <div className="mb-4">
        <p className='text-md'>{text}</p>
        {postImage && <img className='rounded-lg border border-[#D9D9D9]' src={postImage} alt="postImg" onError={(e) => e.target.style.display = 'none'} />}
      </div>
      <div className="flex gap-1 items-end relative">
        <img src={profilePicture} className="h-6 w-6" alt="profilePicture" />
        <p className="mt-6 text-black"><b>{gender}</b> From Section <b>{section}</b></p>
        <p className='absolute right-0   text-base cursor-pointer'
           >{time}</p>
      </div>
      
      <div className="flex items-center justify-between mt-4">
   
      {(currentUser._id === postUser) &&
      <p className="text-base text-red-500 cursor-pointer" onClick={(e)=>{
        e.stopPropagation();alert("Delete Clicked")}}>Delete</p>
        }
    
        <p className="text-base text-[#4b6cfcec]">14 Comments</p>
        
      </div>
    </div>
  );
};

export default PostCard;
