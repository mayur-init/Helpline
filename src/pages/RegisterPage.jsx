import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function RegisterPage() {
  return (
    <div className='bg-gray-200 flex flex-col justify-evenly'>
        <Navbar/>
        <div className='min-h-[90vh] p-4'>
            <p className='text-3xl font-medium text-gray-500 flex justify-center'>Register your service</p>
        </div>
        <Footer/>
    </div>
  )
}

export default RegisterPage