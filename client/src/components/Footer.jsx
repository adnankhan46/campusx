import React from 'react'

function Footer() {
  return (
    <div className='footer f1 bg-white p-12 flex flex-col gap-8'>
       
    <div className='footer flex flex-col md:flex-row justify-center gap-8 md:gap-12'>
    {/** Border point */}
    <div className='1st'>
    <p className='font-bold font-outfit text-4xl'>CampusX</p>
    <p className='font-inter mt-3'>Build. Share. Collaborate <br /> For Developers, By Developers</p>
   <button className='bg-[#6a7cff] py-3 px-6 mt-2 rounded-lg text-white font-inter font-medium'>Email Us</button>
    </div>
    {/** Border point */}
    <div className='2nd flex flex-col md:flex-row gap-8'>
    <div className='col-1'>
    <p className='font-bold font-inter text-2xl'>Product</p>
    <p className='font-inter mt-3 cursor-pointer hover:underline'>CampusX</p>
    <p className='font-inter mt-3 cursor-pointer hover:underline'>CampusAI</p>
    <p className='font-inter mt-3 cursor-pointer hover:underline'>About Us</p>
    </div>
    <div className='col-2'>
    <p className='font-bold font-inter text-2xl'>Support</p>
    <p className='font-inter mt-3 cursor-pointer hover:underline'>Help Center</p>
    <p className='font-inter mt-3 cursor-pointer hover:underline'>Open Source</p>
    <p className='font-inter mt-3 cursor-pointer hover:underline'>Sponsor</p>
    </div>
    
    </div>
    {/** Border point */}
    <div className='3rd flex flex-col'>
    <p className='font-bold font-inter text-2xl'>Built By</p>
    <button className='bg-[#6a7cff] py-3 px-6 mt-4 rounded-xl text-white font-inter font-medium'>Adnan Khan</button>
    <button className='bg-[#6a7cff] py-3 px-6 mt-2 rounded-xl text-white font-inter font-medium'>Garv Thakre</button>
    </div>
    </div>
    <p className='flex flex-col md:flex-row justify-center items-center font-inter mb-4'>
    @2024, All Rights Reserved
    </p>
    </div>
  )
}

export default Footer
