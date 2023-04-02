import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='bg-white h-[7vh] p-2 border-b-2 border-gray-200 flex justify-between items-center shadow-b-2xl'>
      <Link to='/'><h1 className='text-3xl font-semibold text-gray-500 hover:text-violet-600'>Helpline</h1></Link>
      <div className='flex'>
      <Link to='/blood-bank-services'><button className='btn'>Services</button></Link>
      <Link to='/register'><button className='btn'>Register</button></Link>
      <Link to='/login'><button className='btn'>login</button></Link>
      </div>
    </div>

  )
}

export default Navbar;