import React, { useContext } from 'react'
import { globalStateContext } from '../contexts/globalStateContext'
import { HashLink } from 'react-router-hash-link';

function Navbar() {

  const { userName } = useContext(globalStateContext);
  return (
    <div className='bg-white h-[7vh] p-2 border-b-2 border-gray-200 flex justify-between items-center shadow-b-2xl sticky top-0 z-50'>
      <HashLink smooth to='/'><h1 className='text-3xl font-semibold text-gray-500 hover:text-violet-600'>Helpline</h1></HashLink>
      <div className='flex'>
        <HashLink smooth to='/enquiry'><button className='mx-2 font-semibold underline hover:text-violet-600'>Enquire</button></HashLink>
        <HashLink smooth to='/#services'><button className='mx-2 font-semibold underline hover:text-violet-600'>Services</button></HashLink>
        <HashLink smooth to='/#contact'><button className='mx-2 font-semibold underline hover:text-violet-600'>Contact us</button></HashLink>
        <HashLink smooth to='/register'><button className='mx-2 font-semibold underline hover:text-violet-600'>Register</button></HashLink>
        <HashLink smooth to='/login'><button className='mx-2 font-semibold underline hover:text-violet-600'>login</button></HashLink>
      </div>
      <div className='border-2 border-gray-200 rounded-xl px-3'>
        {userName}
      </div>
    </div>

  )
}

export default Navbar;