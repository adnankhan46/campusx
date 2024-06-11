import React from 'react'
import Navbar from '../components/Navbar'
import BottomBar from '../components/Bottombar'

function Notification() {
  return (
    <div className='overflow-x-hidden flex flex-col border-3 border-red-500 items-center min-h-screen bg-white mb-[120px]'>
    <Navbar/>
    <div className='mt-4 flex flex-col border-2 border-blue-500 w-full md:w-1/2 items-center'>
    <div className='border border-green-300'>
    Notifications
    </div>
    <div className='border border-green-300'>
    Notifications
    </div>
    <div className='border border-green-300'>
    Notifications
    </div>
    </div>
    <BottomBar/>
    </div>
  )
}

export default Notification
