import { Link, NavLink,useLocation } from 'react-router-dom';
import Logo1 from '../../assets/icon1.png';
import { auth } from '../../firebase.config';


function Header() {
  const location = useLocation();
  // console.log(location);
  function pathMatchRoute(route){
    if(route==location.pathname) return true;
  }

  return (
    <div className=' bg-[white] border-b shadow-sm sticky top-0 z-[99]'>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
          <Link to='/' className="flex items-center">
            <img src={Logo1} alt="logo" className='w-[55px] h-[55px] lg:h-[75px] lg:w-[75px] cursor-pointer'/>
            <span className='font-extrabold text-secondary text-[17px] -ml-[20px]'>Chiki Homes</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className='flex space-x-5 lg:space-x-10'>
            <li className={`text-gray-400 border-b-[3px] border-b-transparent py-3 font-semibold ${pathMatchRoute('/') && 'text-black !border-b-secondary' }`}><NavLink to='/' className={`cursor-pointer flex items-center `}><i className="lg:text-[1.3rem] text-secondary ri-home-2-line"></i>Home</NavLink></li>
            <li className={`text-gray-400 border-b-[3px] border-b-transparent py-3 ${pathMatchRoute('/offers') && 'text-black !border-b-secondary' } font-semibold`}><NavLink to='/offers' className={`flex items-center cursor-pointer`}><i className="lg:text-[1.3rem] text-secondary ri-hand-coin-line"></i>Offers</NavLink></li>
            {
              !auth?.currentUser ?
            <li className={`text-gray-400 border-b-[3px] border-b-transparent py-3 ${pathMatchRoute('/sign-in') && 'text-black !border-b-secondary' } font-semibold`}><NavLink to='/sign-in' className={`flex items-center cursor-pointer`}><i className="lg:text-[1.3rem] text-secondary ri-login-box-line"></i>Sign In</NavLink></li>
            :<li className={`text-gray-400 border-b-[3px] border-b-transparent py-3 ${pathMatchRoute('/profile') && 'text-black !border-b-secondary' } font-semibold`}><NavLink to='/profile' className={`flex items-center cursor-pointer`}><i className="lg:text-[1.3rem] text-secondary ri-login-box-line"></i>Profile</NavLink></li>
            }
          </ul>
        </div>
        <div className="md:hidden">
          <p className='cursor-pointer'><i className="ri-menu-4-line text-[1.7rem]"></i></p>
        </div>
      </header>
    </div>
  )
}

export default Header