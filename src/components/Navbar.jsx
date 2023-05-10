import React, { useContext,useState } from 'react'
import { globalStateContext } from '../contexts/globalStateContext'
import { HashLink } from 'react-router-hash-link';
import RegisterDropdown from '../components/Dropdowns/RegisterDropdown'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HiBars3, HiXMark } from 'react-icons/hi2'

function Navbar() {
  const { userName, setUserName, userId, isUserLoggedIn, setUserLoggedIn } = useContext(globalStateContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const navHandler = () => {
    setOpen(!open)
  }
  const handleLogout = () => {
    setUserName('');

    if (isUserLoggedIn) {
      localStorage.removeItem('helpline_access_token');
      setUserLoggedIn(false);
      navigate('/#hero', { replace: true });
      toast.success('Logged out Successfully');
    } else {
      toast.error('You are not logged in, log in first')
    }
  }

  return (
    <div className='bg-white h-[7vh] min-w-full p-2 border-b-2 border-gray-200 flex justify-between items-center shadow-b-2xl sticky top-0 z-50'>
      <HashLink smooth to='/'><h1 className='text-2xl font-bold text-gray-500 hover:text-violet-600'>Helpline</h1></HashLink>
      <div className='hidden md:flex'>
        <HashLink smooth to='/enquiry'><button className='mx-2 font-semibold underline hover:text-violet-600'>Enquire</button></HashLink>
        <HashLink smooth to='/#services'><button className='mx-2 font-semibold underline hover:text-violet-600'>Services</button></HashLink>
        <HashLink smooth to='/#contact'><button className='mx-2 font-semibold underline hover:text-violet-600'>Contact us</button></HashLink>
        <button className='mx-2 font-semibold underline hover:text-violet-600'><RegisterDropdown /></button>
        {
          !isUserLoggedIn ?
            (<HashLink smooth to='/login'><button className='mx-2 font-semibold underline hover:text-violet-600'>Login</button></HashLink>) : null
        }

      </div>
      {/* Responsive */}
      
      <div className="md:hidden flex w-9/12 justify-end right-0" onClick={navHandler}>
           {open ? <HiXMark size={25}/> : <HiBars3 size={25}/>}
      </div>
      <div className={open ? "absolute w-1/3 right-0 top-10 bg-white px-4 flex flex-col duration-500 z-50" : "absolute hidden"}>
        <ul >
          <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600 hover:text-white rounded-md"><HashLink smooth to='/enquiry'>Enquire</HashLink></li>
          <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white  rounded-md"><HashLink smooth to='/#services'>Services</HashLink></li>
          <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md"><HashLink smooth to='/#contact'>Contact us</HashLink></li>
          <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md"><RegisterDropdown /></li>
        {
          !isUserLoggedIn ?
            (<HashLink smooth to='/login'><li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md">Login</li></HashLink>) : null
        }
        </ul>
      </div>

      <div className='flex justify-center'>
        {isUserLoggedIn ?
          (
            <div className='flex'>
              <p className='border-2 border-gray-200 rounded-xl px-3'><HashLink smoot to='/user-panel'>{userName}</HashLink></p>
              <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={handleLogout}>Logout</button>
            </div>
          )
          : null}
      </div>
    </div>

  )
}

export default Navbar;


