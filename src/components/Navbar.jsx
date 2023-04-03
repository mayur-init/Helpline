import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
function Navbar() {
  return (
    <div className='bg-white h-[7vh] p-2 border-b-2 border-gray-200 flex justify-between items-center shadow-b-2xl'>
      <HashLink smooth to='/'><h1 className='text-3xl font-semibold text-gray-500 hover:text-violet-600'>Helpline</h1></HashLink>
      <div className='flex'>
        <HashLink smooth to='/enquiry'><button className='btn'>Enquire</button></HashLink>
        <HashLink smooth to='/#services'><button className='btn'>Services</button></HashLink>
        <HashLink smooth to='/#contact'><button className='btn'>Contact us</button></HashLink>
        <HashLink smooth to='/register'><button className='btn'>Register</button></HashLink>
        <HashLink smooth to='/login'><button className='btn'>login</button></HashLink>
      </div>
    </div>

  )
}

export default Navbar;