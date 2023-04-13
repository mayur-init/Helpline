import React from 'react'
import { useNavigate } from 'react-router-dom'

function AmbulaceServiceLogin() {

  const navigate = useNavigate();
  // state management for ambulance service provider


  const handleClick = () =>{
    // check if user is logged in or not
    navigate('/ambulance-service-provider-panel', {replace: true});
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='w-auto h-[50vh] mb-[8vh] p-4 text-center bg-white rounded-xl'>
        <p className='text-3xl font-bold text-gray-600 my-[4vh] flex justify-center hover:text-violet-600'>Ambulance Service Login</p>
        <div className='flex flex-col w-[50vh] h-auto mt-[8vh] mb-[4vh]'>
          <input type='text'  placeholder='Service Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
          <input type='text'  placeholder='Regd Id' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
          <input type='text'  placeholder='Password' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
          <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleClick}>Submit</button></p>
        </div>
      </div>
    </div>
  )
}

export default AmbulaceServiceLogin