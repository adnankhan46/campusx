import React from 'react'
import BottomBar from '../components/Bottombar';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
// import { persistor } from '../redux/store';

function Home() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
    <Navbar/>
      <div className="mt-4 flex flex-col w-full md:w-1/2 items-center">
      {/*<h1 className="text-2xl md:text-4xl font-bold mb-4">Home</h1>*/}
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      </div>

      <BottomBar/>
    </div>
  )
}

export default Home
