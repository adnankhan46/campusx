import React from 'react'
import BottomBar from '../components/Bottombar';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
// import { persistor } from '../redux/store';

function Home() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
    {/** Isko hatana hai */}
    <h1>welcome to BITD </h1>
      {currentUser && "You can SEEEEE it"}
      {console.log(currentUser)}

     <img src={currentUser.profilePicture} className=' h-50 w-48' />
     <h2>Your Addmision Number : {currentUser.admissionNumber} </h2>
     <h2>Your Section : {currentUser.section} </h2>
      <h2>Your Gender: {currentUser.gender}</h2>
{/** Isko hatana hai, yahaan tak */}


      <div className="mt-4 border border-green-600 flex flex-col w-full md:w-1/2 items-center">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Home</h1>
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
