import React from 'react'

function Footer() {
  return (
    <div className='footer f1 bg-white p-12 flex flex-col gap-12'>
       
    <div className='footer flex flex-col md:flex-row justify-center gap-16'>
    {/** Border point */}
    <div className='1st'>
    <p className='font-bold font-outfit text-4xl'>CampusX</p>
    <p className='font-inter mt-4'>Build. Share. Collaborate <br /> For Developers, By Developers</p>
   <button className='bg-[#6a7cff] py-3 px-6 mt-2 rounded-xl text-white font-inter font-medium'>Email Us</button>
    </div>
    {/** Border point */}
    <div className='2nd flex flex-col md:flex-row gap-10'>
    <div className='col-1'>
    <p className='font-bold font-outfit text-2xl'>About</p>
    <p className='font-inter mt-4 cursor-pointer'>/techstack</p>
    <p className='font-inter mt-4 cursor-pointer'>/techstack</p>
    <p className='font-inter mt-4'>/techstack</p>
    </div>
    <div className='col-2'>
    <p className='font-bold font-outfit text-2xl'>Products</p>
    <p className='font-inter mt-4 cursor-pointer'>/techstack</p>
    <p className='font-inter mt-4 cursor-pointer'>/techstack</p>
    <p className='font-inter mt-4'>/techstack</p>
    </div>
    <div className='col-3'>
    <p className='font-bold font-outfit text-2xl'>Contact Us</p>
    <p className='font-inter mt-4 cursor-pointer'>/techstack</p>
    <p className='font-inter mt-4 cursor-pointer'>/techstack</p>
    <p className='font-inter mt-4'>/techstack</p>
    </div>
    </div>
    {/** Border point */}
    <div className='3rd flex flex-col'>
    <p className='font-bold font-outfit text-4xl'>Build By</p>
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
