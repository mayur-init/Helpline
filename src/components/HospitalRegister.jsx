import React, { useState } from 'react'

function HospitalRegister() {

  const [HospitalName, setHospitalName] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [Address, setAddress] = useState('');
  const [Category, setCategory] = useState('');
  const [Specilization, setSpecialization] = useState('');

  const util = () =>{

    const HospitalData = {
      HospitalName,
      ContactNumber,
      Address,
      Category,
      Specilization,
    }

    console.log(HospitalData);

    setHospitalName('');
    setContactNumber('');
    setAddress('');
    setCategory('');
    setSpecialization('');

  }

  return (
    <div className='shadow-xl p-4 rounded-xl min-h-max'>
      <h1 className='text-gray-600 text-2xl font-semibold mt-[2vh] flex justify-center'>Hospital service</h1>
      <div className='flex flex-col w-[50vh] h-auto mt-[5vh] mb-[4vh]'>
        <input type='text' onChange={(e) => { setHospitalName(e.target.value) }} value={HospitalName} placeholder='Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setContactNumber(e.target.value) }} value={ContactNumber} placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setAddress(e.target.value) }} value={Address} placeholder='Address' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setCategory(e.target.value) }} value={Category} placeholder='Category' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setSpecialization(e.target.value) }} value={Specilization} placeholder='Specialization' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <p className='flex justify-end'><button onClick = {util} className='btn w-[100px] m-2'>Submit</button></p>
      </div>
    </div>
  )
}

export default HospitalRegister;