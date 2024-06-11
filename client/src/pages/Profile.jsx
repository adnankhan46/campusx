import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import BottomBar from '../components/Bottombar';
import Navbar from '../components/Navbar';

import { useGetPostsQuery } from '../redux/posts/postApi';


const EditProfile = () => {
  const [password, setPassword] = useState('');

  const {currentUser} = useSelector((state)=> state.user);
  const { data: posts, error, isLoading } = useGetPostsQuery();

  console.log(currentUser._id);

  const userPosts = posts ? posts.filter(post => post.user === currentUser._id) : null;
  

  const handleUpdate = async () => {
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white mb-[120px]">
    <Navbar/>
    <div className='flex flex-col w-full items-center'>
    <img src={currentUser.profilePicture} className='h-50 w-48' />
    <h1 className="text-2xl md:text-4xl font-bold mb-4">{currentUser.admissionNumber}</h1>
    <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl bg-[#eeeeee] focus:outline-none" type="text" placeholder="Username" value={currentUser.username} onChange={(e) => setUsername(e.target.value)} />
    <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl bg-[#eeeeee] focus:outline-none" type="email" placeholder="Email" value={currentUser.email} onChange={(e) => setEmail(e.target.value)} />
    <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl bg-[#eeeeee] focus:outline-none" type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <p className='text-xs text-start'>NOTE: Passwords are hashed and then stored, You can change it here</p>
    <div className='flex gap-6'>
    {/** PUT: API to Change User User */}
      <button className="mt-4 p-3 bg-[#ffffff] border-2 border-[#D9D9D9] font-bold text-[#6a7cff] rounded-xl" onClick={handleUpdate}>Change Password</button>
      {/** POST: API to LogOut */}
      <button className="mt-4 p-3 bg-[#ffffff] border-2 border-[#D9D9D9] text-[#6a7cff] font-bold rounded-xl"  aria-pressed="true">Logout</button>
      </div>
      <div className="mt-4 flex flex-col w-full md:w-1/2 items-center">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">My Posts</h1>

      {userPosts && userPosts.length > 0 ? (
        userPosts.map((post, index) => (
          <PostCard
          key={index}
          text={post.text}
          section={post.section}
          gender={post.gender}
          profilePicture={post.profilePicture}
          postImage={post.postImage}
          time={new Date(post.createdAt).toLocaleString()}
          postId={post.postId}
          postUser={post.user}
          />
        ))
      ) : (
        <div>You have No Posts Yet</div>
      )}
      </div>
      </div>
      <BottomBar/>
      </div>
  );
};

export default EditProfile;   