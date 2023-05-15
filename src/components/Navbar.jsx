import React, { useContext,useState } from 'react'
import { globalStateContext } from '../contexts/globalStateContext'
import { HashLink } from 'react-router-hash-link';
import RegisterDropdown from '../components/Dropdowns/RegisterDropdown'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { motion } from 'framer-motion'

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
    <motion.div className='bg-white h-[7vh] min-w-full p-2 border-b-2 border-gray-200 flex justify-between items-center shadow-b-2xl sticky top-0 z-50'
      initial={{y:-48}} animate={{y:0}} transition={{delay: 0.1}}>
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

      <div>
        {isUserLoggedIn ?
          (
            <div className='hidden md:flex'>
              <p className='border-2 border-gray-200 rounded-xl px-3'><HashLink smoot to='/user-panel'>{userName}</HashLink></p>
              <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={handleLogout}>Logout</button>
            </div>
          )
          : null}
      </div>

      {/* Responsive */}
      
      <div className="md:hidden flex w-9/12 justify-end right-0" onClick={navHandler}>
           {open ? <HiXMark size={25}/> : <HiBars3 size={25}/>}
      </div>
      <div className={open ? " border-2 broder-slate-300 absolute w-1/2 right-0 top-0 bg-white px-4 m-2 flex flex-col duration-1000 -z-10 rounded-md" : "absolute hidden"}>
        {isUserLoggedIn ?( <p className='w-auto my-2 mr-4 border-2 border-gray-200 rounded-xl px-3'><HashLink smoot to='/user-panel'>{userName}</HashLink></p>):null}
        <ul>
          <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600 hover:text-white rounded-md" onClick={navHandler}><HashLink smooth to='/enquiry'>Enquire</HashLink></li>
          <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white  rounded-md" onClick={navHandler}><HashLink smooth to='/#services'>Services</HashLink></li>
          <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md" onClick={navHandler}><HashLink smooth to='/#contact'>Contact us</HashLink></li>
          <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md" ><RegisterDropdown screen={'sm'}/></li>
          {isUserLoggedIn ?(  <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md" onClick={() => {handleLogout();navHandler();}}>Logout</li>):null}
        {
          !isUserLoggedIn ?
            (<HashLink smooth to='/login'><li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md" onClick={navHandler}>Login</li></HashLink>) : null
        }
        </ul>
      </div>

    </motion.div>

  )
}

export default Navbar;


