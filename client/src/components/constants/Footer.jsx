import {Github, Linkedin} from 'lucide-react'

const Footer = () => (
  <footer className="bg-white text-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
      <div className="flex flex-col md:flex-row w-full justify-between md:px-24 gap-14">
        <div className="booleanai">
          <div className="onlyElement">
          <h2 className='text-4xl font-extrabold font-outfit hover:text-[#243CB6]'>BeCampusX</h2>
            <p className='my-2 text-gray-600'>Build. Share. Collaborate</p>
            <div className="social-list flex gap-4">
            <a href="https://www.linkedin.com/company/becampusx" target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} className='cursor-pointer'/>
            </a>
            <a href="https://github.com/adnankhan46/campusx" target="_blank" rel="noopener noreferrer">
            <Github size={20} className='cursor-pointer'/>
            </a>
            </div>

            <div className="campusx-branding border-t border-gray-300 flex gap-4 mt-4 pt-2">
            <p className='text-gray-500'>Also Try</p>
            <a href="https://booleanai.vercel.app/" className="text-gray-400 hover:text-[#243CB6]">BooleanAI</a>
            <a href="https://post90.vercel.app/" className="text-gray-400 hover:text-[#243CB6]">Post90</a>
           </div>
           
          </div>
        </div>
      <div className='flex flex-col md:flex-row gap-8 md:gap-12'>
        <div className='1st element'>
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li><a href="https://github.com/adnankhan46/campusx" className="text-gray-600  hover:text-[#243CB6]">Open Source</a></li>
            <li><a href="https://www.linkedin.com/company/becampusx" className="text-gray-600  hover:text-[#243CB6]">About Us</a></li>
          </ul>
        </div>
        <div className='2nd element'>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="https://github.com/adnankhan46/campusx" className="text-gray-600 hover:text-[#243CB6]">Documentation</a></li>
            <li><a href="https://github.com/adnankhan46/campusx/issues" className="text-gray-600 hover:text-[#243CB6]">Help Center</a></li>
          </ul>
        </div>
      </div>
      </div>
      <div className="mt-4 pt-6 text-center text-gray-400">
        <p>&copy; 2026 BeCampusX. All rights reserved.</p>
        <p className='text-xs mt-4'>Created in 2023 by
          </p>
          <p className='flex gap-1 justify-center mt-1'>
          <a href="https://www.linkedin.com/in/adnankhan93" className='text-[#243CB6] cursor-pointer text-xs' target="_blank" rel="noopener noreferrer">
            Adnan Khan <span className='text-gray-400'>&</span>
          </a>
          <a href="https://www.linkedin.com/in/garv-thakre" className='text-[#243CB6] cursor-pointer text-xs' target="_blank" rel="noopener noreferrer">
            Garv Thakre
          </a>
          </p>
      </div>
    </div>
  </footer>
)

export default Footer