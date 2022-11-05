import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-gray-200 h-[8vh] p-4 border-b-2 border-gray-300 flex justify-between items-center shadow-md'>
      <Link to='/'><h1 className='text-4xl font-semibold text-violet-500 hover:text-violet-600'>Helpline</h1></Link>
      <Link to='/register'><button className='btn'>Register your services</button></Link>
    </div>
  )
}

export default Navbar