import { NavLink,useLocation } from "react-router-dom";
import { useModalContext } from "../../context/ModalContext"
import useAuth from '../../hooks/useAuth';



function Modal() {
    const {setIsOpen} = useModalContext();
    const {userData} = useAuth();
    const location = useLocation();
    function pathMatchRoute(route){
        if(route==location.pathname) return true;
      }
    
  return (
    <aside className="bg-black/60 w-full z-[50] flex justify-end h-full fixed" >
        <div className="w-[45%] bg-[papayawhip]  p-3 ">
           <ul className='flex flex-col space-y-5 items-center py-10 h-full '>
                <li className={`text-gray-400 border-b-[3px] border-b-transparent py-3 font-semibold ${pathMatchRoute('/') && 'text-black !border-b-secondary' }`}><NavLink to='/' className={`cursor-pointer flex items-center `}><i className="lg:text-[1.3rem] text-secondary ri-home-2-line"></i>Home</NavLink></li>
                <li className={`text-gray-400 border-b-[3px] border-b-transparent py-3 ${pathMatchRoute('/offers') && 'text-black !border-b-secondary' } font-semibold`}><NavLink to='/offers' className={`flex items-center cursor-pointer`}><i className="lg:text-[1.3rem] text-secondary ri-hand-coin-line"></i>Offers</NavLink></li>
                {
                !userData ?
                <li className={`text-gray-400 border-b-[3px] border-b-transparent py-3 ${pathMatchRoute('/sign-in') && 'text-black !border-b-secondary' } font-semibold`}><NavLink to='/sign-in' className={`flex items-center cursor-pointer`}><i className="lg:text-[1.3rem] text-secondary ri-login-box-line"></i>Sign In</NavLink></li>
                :<li className={`text-gray-400 border-b-[3px] border-b-transparent py-3 ${pathMatchRoute('/profile') && 'text-black !border-b-secondary' } font-semibold`}><NavLink to='/profile' className={`flex items-center cursor-pointer`}><i className="lg:text-[1.3rem] text-secondary ri-login-box-line"></i>Profile</NavLink></li>
                }
             </ul>
        </div>
    </aside>
  )
}

export default Modal