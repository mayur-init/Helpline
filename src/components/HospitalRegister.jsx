import React, { useState } from 'react'

function HospitalRegister() {

  const [hospitalName, setHospitalName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const util = () =>{
    console.log(hospitalName + ' ' + contactNumber + ' ' + address);

    setHospitalName('');
    setContactNumber('');
    setAddress('');
  }

  return (
    <div className='rounded-xl shadow-xl p-4 m-4 min-h-max'>
      <h1 className='text-gray-500 text-xl font-semibold mt-[4vh] flex justify-center'>Hospitality service</h1>
      <div className='flex flex-col w-[50vh] h-auto mt-[8vh]'>
        <input type='text' onChange={(e) => { setHospitalName(e.target.value) }} value={hospitalName} placeholder='Name' className='bg-gray-200 border-2 border-gray-500 rounded-full px-2 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setContactNumber(e.target.value) }} value={contactNumber} placeholder='Contact' className='bg-gray-200 border-2 border-gray-500 rounded-full px-2 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setAddress(e.target.value) }} value={address} placeholder='Address' className='bg-gray-200 border-2 border-gray-500 rounded-full px-2 py-1 my-2'></input>
        <p className='flex justify-end'><button onClick = {util} className='btn w-[100px] m-2'>Register</button></p>
      </div>
    </div>
  )
}

export default HospitalRegister