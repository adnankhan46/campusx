import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import BottomBar from '../components/Bottombar';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useGetPostsQuery } from '../redux/posts/postApi';
import { useUpdatePasswordMutation, useLogoutMutation } from '../redux/apiSlice';
import { setCurrentUser, setLoading, setError } from '../redux/user/userSlice';

const Profile = () => {
  const [logout, { isLoading: isLoggingOut, error: logoutError }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [updatePassword, { isLoading: isUpdating, error: updateError }] = useUpdatePasswordMutation();

  const { currentUser } = useSelector((state) => state.user);
  const { data: posts, error, isLoading } = useGetPostsQuery();

  const userPosts = posts ? posts.filter(post => post.user === currentUser._id) : null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!password) {
      alert('Please enter a new password');
      return;
    }

    try {
      const result = await updatePassword(password).unwrap(); // Correctly passing password
      alert('Password updated successfully:', result);
      alert('Password updated successfully!');
    } catch (error) {
      alert('Failed to update password:', error);
      alert('Failed to update password. Please try again.');
    }
  };

  const handleLogout = async (e) => {
   // to do
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white mb-[120px]">
      <Navbar />
      <div className='flex flex-col w-full items-center'>
        <img src={currentUser.profilePicture} className='h-50 w-48' alt="Profile" />
        <h1 className="text-2xl md:text-4xl font-bold mb-4">{currentUser.admissionNumber}</h1>
        <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl bg-[#eeeeee] focus:outline-none" type="text" placeholder="Username" value={currentUser.username} readOnly />
        <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl bg-[#eeeeee] focus:outline-none" type="email" placeholder="Email" value={currentUser.email} readOnly />
        <input className="w-full md:w-1/2 p-2 mb-2 border rounded-xl bg-[#eeeeee] focus:outline-none" type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <p className='text-xs text-start'>NOTE: Passwords are hashed and then stored, You can change it here</p>
        <div className='flex gap-6'>
          <button className="mt-4 p-3 bg-[#ffffff] border-2 border-[#D9D9D9] font-bold text-[#6a7cff] rounded-xl" onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Change Password'}
          </button>
          {/** LogOut */}
          <button className="mt-4 p-3 bg-[#ffffff] border-2 border-[#D9D9D9] text-[#6a7cff] font-bold rounded-xl" aria-pressed="true"
          onClick={handleLogout}>Logout</button>
        </div>
        {updateError && <div className="text-red-500">Error: {updateError.data?.message || 'Failed to update password.'}</div>}
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
      <BottomBar />
    </div>
  );
};

export default Profile;
