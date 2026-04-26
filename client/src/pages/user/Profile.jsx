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
        <img src={currentUser.profilePicture} className='h-50 w-48' alt="Profile" />

        {/* ── Inline Name Edit ── */}
        {isEditingName ? (
          <div className="flex items-center gap-2 mb-1">
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
              className="text-2xl md:text-4xl font-bold text-center border-b-2 border-[#6a7cff] bg-transparent outline-none w-48 md:w-64"
            />
            <button
              onClick={handleNameSave}
              disabled={isUpdatingName}
              className="p-1.5 rounded-full bg-[#6a7cff] text-white hover:bg-[#5a6be0] transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleNameCancel}
              className="p-1.5 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="relative flex items-center justify-center mb-1 group">
            <h1 className="text-2xl md:text-4xl font-bold">
              {currentUser.name || currentUser.admissionNumber}
            </h1>
            <button
              onClick={handleNameEdit}
              className="absolute left-full ml-1 p-1.5 rounded-full text-gray-400 hover:text-[#6a7cff] hover:bg-[#f0f2ff] transition-colors opacity-0 group-hover:opacity-100"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className='flex gap-1 items-center'>
          <p className="text-base md:text-lg font-bold text-gray-800 bg-[#FAF4FE] p-1 rounded-md">{currentUser?.year}-{parseInt((currentUser?.year)) + 4}</p>
          {(currentUser.isAuthenticated) &&
            <span><BadgeCheck className='w-6 text-[#4b6cfcec]' /></span>}
        </div>

        <input className="w-full p-2 mb-2 border rounded-xl bg-[#eeeeee] focus:outline-none" type="text" placeholder="Username" value={currentUser.username} readOnly />
        <input className="w-full p-2 mb-2 border rounded-xl bg-[#eeeeee] focus:outline-none" type="email" placeholder="Email" value={currentUser.email} readOnly />

        {/* ── Password Section ── */}
        <input className="w-full p-2 mb-2 border rounded-xl bg-[#eeeeee] focus:outline-none" type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <p className='text-xs text-start w-full'>NOTE: Passwords are hashed and then stored. You can change it here.</p>
        <button className="mt-4 mb-6 w-full p-3 bg-[#ffffff] border-2 border-[#D9D9D9] font-bold text-[#6a7cff] rounded-xl" onClick={handleUpdate} disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Change Password'}
        </button>
        {updateError && <div className="text-red-500 mb-4">Error: {updateError.data?.message || 'Failed to update password.'}</div>}

        {/* ── UPI Section ── */}
        <input className="w-full p-2 mb-2 border rounded-xl bg-[#eeeeee] focus:outline-none" type="text" placeholder="UPI ID (e.g. username@bank)" value={upi} onChange={(e) => setUpi(e.target.value)} />
        <p className='text-xs text-start w-full'>Used for receiving payments for completed opportunities.</p>
        <button className="mt-4 mb-6 w-full p-3 bg-[#ffffff] border-2 border-[#D9D9D9] font-bold text-[#6a7cff] rounded-xl" onClick={handleUpdateUPI} disabled={isUpdatingUPI}>
          {isUpdatingUPI ? 'Updating...' : 'Update UPI'}
        </button>

        {/* ── Logout ── */}
        <button className="w-full p-3 bg-[#ffffff] border-2 border-red-200 text-red-400 font-bold rounded-xl" onClick={handleLogout}>Logout</button>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <div className="flex w-full mt-6 border-b border-[#D9D9D9]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm md:text-base font-semibold font-inter transition-colors duration-200 ${
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