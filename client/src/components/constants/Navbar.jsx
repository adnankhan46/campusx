import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandSparkles, faBell} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate()

  const handleOppsClick = () => {
    if (location.pathname === '/') {
      document.getElementById('Opps')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('Opps')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };
  return (
    <>
    <div className='flex items-center w-full h-16 bg-custom-gradient justify-between'>
    {/* Main Left */}
    <div>
    <Link to='/home'>
    <div className='flex items-center h-16'>
    <h1 className="text-2xl md:text-4xl font-bold font-outfit text-white ml-2 md:ml-4 md:px-12">
    {(location.pathname === `/campusai`) ? "CampusAI" : "BeCampusX"}
    </h1>
    {(location.pathname === `/campusai`) &&
    <FontAwesomeIcon icon={faWandSparkles} className='md:h-8 h-6 mx-2 text-white' />
    }
    
    
    <span className='text-sm text-white font-bold'>
    {(location.pathname === `/campusai`) && "By CampusX"}
    </span>
    </div>
    </Link>
    </div>

{/* Secondary Right */}
    <div className='flex md:gap-16 gap-3 items-center'>

    <Link to="#Opps">
     <div  onClick={handleOppsClick} className='font-inter text-xs mr-2 sm:mr-0 md:text-base rotate-3 sm:rotate-0 text-white cursor-pointer'>
        {(location.pathname == `/`) &&
        <h1>Opportunities</h1>
        }
       </div></Link>
    <Link className='hidden sm:block' to="/explore">
     <div className='font-inter md:mr-80 mr-2 text-xs md:text-base text-white cursor-pointer'>
        {(location.pathname == `/`) &&
        <h1>For Companies</h1>
        }
       </div>
       </Link>
    </div>

        {(location.pathname !== `/`) &&
    <div>
    <Link to='/notification'>
      <div className='md:mr-80 mr-6 text-white'>
        <FontAwesomeIcon icon={faBell} className={`md:h-8 h-6`} />
       </div>
    </Link>
    </div>
        }
    </div>
    </>
  )
}

export default Navbar;
