import React, { useContext } from 'react'
import { globalStateContext } from '../contexts/globalStateContext'
import { HashLink } from 'react-router-hash-link';
import RegisterDropdown from '../components/Dropdowns/RegisterDropdown'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { userName, setUserName, userId, isUserLoggedIn, setUserLoggedIn } = useContext(globalStateContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserName('');

    if (isUserLoggedIn) {
      toast.success('Logged out Successfully');
      setUserLoggedIn(false);
      navigate('/#hero', { replace: true });
    } else {
      toast.error('You are not logged in, log in first')
    }
  }

  return (
    <div className='bg-white h-[7vh] p-2 border-b-2 border-gray-200 flex justify-between items-center shadow-b-2xl sticky top-0 z-50'>
      <HashLink smooth to='/'><h1 className='text-2xl font-bold text-gray-500 hover:text-violet-600'>Helpline</h1></HashLink>
      <div className='flex'>
        <HashLink smooth to='/enquiry'><button className='mx-2 font-semibold underline hover:text-violet-600'>Enquire</button></HashLink>
        <HashLink smooth to='/#services'><button className='mx-2 font-semibold underline hover:text-violet-600'>Services</button></HashLink>
        <HashLink smooth to='/#contact'><button className='mx-2 font-semibold underline hover:text-violet-600'>Contact us</button></HashLink>
        <button className='mx-2 font-semibold underline hover:text-violet-600'><RegisterDropdown /></button>
        {
          !isUserLoggedIn ?
            (<HashLink smooth to='/login'><button className='mx-2 font-semibold underline hover:text-violet-600'>Login</button></HashLink>) : null
        }

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