import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';
import BottomBar from '../components/Bottombar';


const PostPage = () => {
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-300 mb-[120px]">
    <Navbar/>
    POST PAGE WITH COMMENTS
    <PostCard/>
    <h1 className="text-xl md:text-4xl font-bold my-4">Comments</h1>
    <BottomBar/>
    </div>
    
  )  
};

  

export default PostPage;

