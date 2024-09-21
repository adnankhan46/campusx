import React from 'react'
import Navbar from '../components/Navbar'
import BottomBar from '../components/Bottombar'

function Notification() {
  return (
    <div className='overflow-x-hidden flex flex-col items-center min-h-screen font-inter bg-white mb-[120px]'>
    <Navbar/>
    <p className="text-2xl md:text-4xl font-bold mt-2">All Notifications</p>
    <div className='mt-4 flex flex-col w-full md:w-1/2 items-center h-screen px-2'>
    <div className='border border-gray-300 rounded-lg w-full h-fit p-2 text-center'>
    You have No Notifications yet
    {/** API Need to be Done */}
    </div>
    
    </div>
    <BottomBar/>
    </div>
  )
}

export default Notification
