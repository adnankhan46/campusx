import React from 'react'
import BottomBar from '../components/Bottombar';
import { useSelector } from 'react-redux';
// import { persistor } from '../redux/store';

function Home() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div>
    <h1>welcome to BITD </h1>
      {currentUser && "You can SEEEEE it"}
      {console.log(currentUser)}

     <img src={currentUser.profilePicture} className=' h-50 w-48' />
     <h2>Your Addmision Number : {currentUser.admissionNumber} </h2>
     <h2>Your Section : {currentUser.section} </h2>
      <h2>Your Gender: {currentUser.gender}</h2>

      <BottomBar/>
    </div>
  )
}

export default Home
