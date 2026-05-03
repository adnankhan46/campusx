import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../../components/PostCard';
import BottomBar from '../../components/constants/Bottombar';
import Navbar from '../../components/constants/Navbar';
import { useNavigate } from 'react-router-dom';
import { useGetPostsByUserQuery } from '../../redux/posts/postApi';
import { useUpdatePasswordMutation, useUpdateFullNameMutation, useUpdateUPIMutation, useLogoutMutation } from '../../redux/apiSlice';
import { useGetMyApplicationQuery } from '../../redux/opportunities/opportunity-api';
import { setCurrentUser } from '../../redux/user/userSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BadgeCheck, Calendar, ChevronRight, Pencil, Check, X } from 'lucide-react';

const Profile = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [upi, setUpi] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  const [updatePassword, { isLoading: isUpdating, error: updateError }] = useUpdatePasswordMutation();
  const [updateFullName, { isLoading: isUpdatingName }] = useUpdateFullNameMutation();
  const [updateUPI, { isLoading: isUpdatingUPI }] = useUpdateUPIMutation();
  const [settingsTab, setSettingsTab] = useState('security');

  // Name editing state
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const { currentUser } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const { data: postsData } = useGetPostsByUserQuery({ page, limit: 6, userId: currentUser._id });
  const { data: myApplications, isLoading: applicationsLoading } = useGetMyApplicationQuery(
    { userId: currentUser?._id },
    { skip: !currentUser }
  );

  const userPosts = postsData ? postsData.posts : [];

  const fetchMorePosts = () => {
    if (postsData && postsData.hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!password) {
      alert('Please enter a new password');
      return;
    }
    try {
      const result = await updatePassword({ password }).unwrap();
      alert('Password updated successfully:', result);
    } catch (error) {
      alert('Failed to update password:', error);
    }
  };

  const handleUpdateUPI = async (e) => {
    e.preventDefault();
    if (!upi) {
      alert('Please enter your UPI ID');
      return;
    }
    try {
      await updateUPI({ upi }).unwrap();
      alert('UPI updated successfully');
    } catch (error) {
      alert('Failed to update UPI:', error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout().unwrap();
      dispatch(setCurrentUser(null));
      localStorage.removeItem('persist:root');
      localStorage.removeItem('nsfwModelLoaded');
      navigate("/login");
      console.log("LogOut Success");
    } catch (error) {
      console.error('Failed to logout:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  const handleNameEdit = () => {
    setNameInput(currentUser.name || '');
    setIsEditingName(true);
  };

  const handleNameSave = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    try {
      await updateFullName(trimmed).unwrap();
      dispatch(setCurrentUser({ ...currentUser, name: trimmed }));
      setIsEditingName(false);
    } catch (error) {
      console.error('Failed to update name:', error);
    }
  };

  const handleNameCancel = () => {
    setIsEditingName(false);
    setNameInput('');
  };

  const tabs = [
    { key: 'posts', label: 'My Posts' },
    { key: 'applied', label: 'Applied Opps' },
    { key: 'transactions', label: 'Transactions' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-white mb-[120px] font-inter">
      <Navbar />
      <div className='flex flex-col w-full md:w-1/2 items-center'>
  {/* ── Header Section ── */}
  <div className="relative flex flex-row items-center gap-5 mt-2 mb-4 w-full p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
    
    {/* Edit Button - Top Right */}
    {!isEditingName && (
      <button
        onClick={handleNameEdit}
        className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-[#6a7cff] text-xs font-bold hover:bg-[#f0f2ff] hover:border-[#6a7cff] transition-all shadow-sm"
      >
        <Pencil className="w-3 h-3" />
        Edit
      </button>
    )}

    {/* Profile Pic */}
    <div className="relative">
      <img 
        src={currentUser.profilePicture} 
        className='h-20 w-20 md:h-24 md:w-24 object-cover rounded-3xl' 
        alt="Profile" 
      />
    </div>

    {/* User Info */}
    <div className="flex flex-col flex-1">
      {isEditingName ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNameSave();
              if (e.key === 'Escape') handleNameCancel();
            }}
            autoFocus
            maxLength={50}
            className="text-lg md:text-xl font-bold border-b-2 border-[#6a7cff] bg-transparent outline-none w-full max-w-[180px]"
          />
          <button
            onClick={handleNameSave}
            disabled={isUpdatingName}
            className="p-1 rounded-full bg-[#6a7cff] text-white hover:bg-[#5a6be0]"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleNameCancel}
            className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 pr-16">
          {currentUser.name || currentUser.admissionNumber}
        </h1>
      )}
      
      <div className='flex gap-2 items-center mt-1'>
        <p className="text-xs font-bold text-[#6a7cff] bg-[#f0f2ff] px-2 py-0.5 rounded-md">
          {currentUser?.year}-{parseInt((currentUser?.year)) + 4}
        </p>
        {(currentUser.isAuthenticated) && <BadgeCheck className='w-4 h-4 text-[#4b6cfc]' />}

      </div>
        {/* Small Logout - Left Aligned under info */}
      <button 
        className="mt-3 w-fit px-3 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded-md border border-red-100 hover:bg-red-100 transition-colors" 
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </div>

  {/* ── Details & Settings Section ── */}
  <div className="space-y-2 w-full">
    {/* Read-Only Info */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-black text-gray-400 ml-1 tracking-wider uppercase">Username</label>
        <input className="w-full p-3 border border-gray-100 rounded-xl bg-gray-100/50 text-gray-500 focus:outline-none cursor-not-allowed text-sm" type="text" value={currentUser.username} readOnly />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-black text-gray-400 ml-1 tracking-wider uppercase">Email</label>
        <input className="w-full p-3 border border-gray-100 rounded-xl bg-gray-100/50 text-gray-500 focus:outline-none cursor-not-allowed text-sm" type="email" value={currentUser.email} readOnly />
      </div>
    </div>


{/* ── Settings Sub-Tabs ── */}
  <div className="w-full bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
    <div className="flex gap-4 mb-4 border-b border-gray-200">
      <button 
        onClick={() => setSettingsTab('security')}
        className={`pb-2 text-xs font-bold transition-all ${settingsTab === 'security' ? 'text-[#6a7cff] border-b-2 border-[#6a7cff]' : 'text-gray-400'}`}
      >
        Security
      </button>
      <button 
        onClick={() => setSettingsTab('payment')}
        className={`pb-2 text-xs font-bold transition-all ${settingsTab === 'payment' ? 'text-[#6a7cff] border-b-2 border-[#6a7cff]' : 'text-gray-400'}`}
      >
        Payment Details
      </button>
    </div>

    {settingsTab === 'security' ? (
      <div className="space-y-2 animate-in fade-in duration-300">
        <p className='text-[10px] text-gray-500 ml-1'>Your passwords are hashed and then stored, we cannot see it.</p>

        <div className="flex gap-2">
          <input 
            className="flex-1 p-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#6a7cff] focus:outline-none text-xs" 
            type="password" 
            placeholder="New password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            className="px-4 py-2.5 bg-[#6a7cff] text-white text-xs font-bold rounded-xl hover:bg-[#5a6be0] transition-colors disabled:opacity-50" 
            onClick={handleUpdate} 
            disabled={isUpdating}
          >
            {isUpdating ? '...' : 'Update'}
          </button>
        </div>
        {updateError && <p className="text-red-500 text-[10px]">Error updating password.</p>}
      </div>
    ) : (
      <div className="space-y-3 animate-in fade-in duration-300">
        <p className='text-[10px] text-gray-500 ml-1'>Enter your UPI ID to receive payments for completed tasks.</p>
        <div className="flex gap-2">
          <input 
            className="flex-1 p-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#6a7cff] focus:outline-none text-xs" 
            type="text" 
            placeholder="username@bank" 
            value={upi} 
            onChange={(e) => setUpi(e.target.value)} 
          />
          <button 
            className="px-4 py-2.5 border border-[#6a7cff] text-[#6a7cff] text-xs font-bold rounded-xl hover:bg-[#6a7cff] hover:text-white transition-all disabled:opacity-50" 
            onClick={handleUpdateUPI} 
            disabled={isUpdatingUPI}
          >
            Save
          </button>
        </div>
      </div>
    )}
  </div>

  </div>


  {/* ── Tabs ── */}
  <div className="flex w-full mt-4 border-b border-gray-100">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key)}
        className={`flex-1 py-3 text-sm font-bold transition-all duration-200 ${
          activeTab === tab.key
            ? 'text-[#6a7cff] border-b-2 border-[#6a7cff]'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>

        {/* ── Tab Content ───────────────────────────────────────────────────── */}
        <div className='flex flex-col w-full mt-4'>

          {/* My Posts Tab */}
          {activeTab === 'posts' && (
          <InfiniteScroll
            dataLength={userPosts.length}
            next={fetchMorePosts}
            hasMore={postsData && postsData.hasMore}
            loader={<div>Loading more posts...</div>}
            endMessage={<div> </div>}
          >
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard
                  key={post.postId}
                  text={post.text}
                  section={post.section}
                  gender={post.gender}
                  profilePicture={post.profilePicture}
                  postImage={post.postImage}
                  time={new Date(post.createdAt).toLocaleString()}
                  postId={post.postId}
                  postUser={post.user}
                  year={post.year}
                />
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">You have no posts yet.</div>
            )}
          </InfiniteScroll>
        )}

          {/* Applied Opps Tab */}
          {activeTab === 'applied' && (
            <div className="flex flex-col gap-3">
              {applicationsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="border-t-4 border-[#6a7cff] rounded-full w-10 h-10 animate-spin"></div>
                </div>
              ) : Array.isArray(myApplications) && myApplications.length > 0 ? (
                myApplications.map((opp) => {
                  const myApp = opp.applicants?.find(
                    (a) => String(a.userId) === String(currentUser?._id)
                  );
                  const statusStyles = {
                    applied: 'bg-blue-100 text-blue-700',
                    shortlisted: 'bg-amber-100 text-amber-700',
                    selected: 'bg-green-100 text-green-700',
                    rejected: 'bg-red-100 text-red-700',
                  };
                  const status = myApp?.status || 'applied';
                  const formattedDeadline = new Date(opp.deadline).toLocaleDateString('en-US', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  });

                  return (
                    <div
                      key={opp._id}
                      onClick={() => navigate(`/opportunities/${opp._id}`)}
                      className="bg-white border border-[#D9D9D9] p-4 rounded-xl cursor-pointer hover:border-[#6a7cff] transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-semibold font-outfit text-gray-800 line-clamp-2 flex-1">
                          {opp.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-md font-medium whitespace-nowrap ${statusStyles[status] || statusStyles.applied}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-600 text-xs font-medium">
                          {opp.type.charAt(0).toUpperCase() + opp.type.slice(1)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formattedDeadline}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-semibold font-outfit text-[#6a7cff]">
                          {opp.amount === 0 ? '1000 AURA' : `₹ ${opp.amount.toLocaleString()}`}
                        </span>
                        <span className="flex items-center text-xs text-[#6a7cff]">
                          View <ChevronRight className="h-3 w-3 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-400 py-8">
                  You have not applied to any opportunities yet.
                </div>
              )}
            </div>
          )}

          {/* Transaction History Tab */}
          {activeTab === 'transactions' && (
            <div className="flex flex-col items-center py-12 gap-2">
              <h2 className="text-xl md:text-2xl font-bold font-outfit text-gray-800">Transaction History</h2>
              <p className="text-gray-400 text-sm font-inter">Coming soon</p>
            </div>
          )}

        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default Profile;