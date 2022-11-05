import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HospitalRegister from '../components/HospitalRegister';
import AmbulanceRegister from '../components/AmbulanceRegister';

function RegisterPage() {
  return (
    <div className='bg-gray-200 flex flex-col justify-evenly'>
        <Navbar/>
        <div className='min-h-[90vh] p-4 flex flex-col items-center'>
            <h1 className='text-3xl font-medium text-gray-600 flex justify-center m-[6vh]'>Register your services</h1>
            <div className='flex my-[5vh]'>
              <HospitalRegister/>
              <AmbulanceRegister/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default RegisterPage