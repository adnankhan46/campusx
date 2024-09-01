import React from 'react'
import Navbar from '../components/Navbar';
import BottomBar from '../components/Bottombar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandSparkles } from '@fortawesome/free-solid-svg-icons';


function CampusAi() {
  return (
    <div className='overflow-x-hidden flex flex-col border-3 border-red-500 items-center bg-white mb-[120px]'>
    <Navbar/>
    
    <p className="text-2xl md:text-4xl font-bold my-2">
    <FontAwesomeIcon icon={ faWandSparkles} className='md:h-8 h-6 mx-2 text-[#6a7cff]' />
    CampusAI</p>
   
    <div className=' flex flex-col border-2 border-blue-500 w-full md:w-1/2 items-center h-screen p-6'>
    <div className='border border-green-300 w-full h-12'>
    Edit
    </div>
    <div className='border border-green-300 w-full mt-2 h-12'>
    Edit
    </div>
    
    </div>
    <BottomBar/>
    </div>
  )
}

export default CampusAi
