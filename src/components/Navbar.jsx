import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-white h-[8vh] p-4 border-b-2 border-gray-200 flex justify-between items-center shadow-b-2xl'>
      <Link to='/'><h1 className='text-4xl font-semibold text-gray-500 hover:text-violet-600'>Helpline</h1></Link>
      <Link to='/register'><button className='btn'>Register your services</button></Link>
    </div>

  )
}

export default Navbar;