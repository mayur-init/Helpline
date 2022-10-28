import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className='bg-gray-200 flex flex-col justify-evenly'>
        <Navbar/>
        <div className='min-h-[90vh] p-4 grid place-content-center'>
          <p className='text-3xl font-medium text-gray-500'>landing page content</p>
        </div>
        <Footer/>
    </div>
  )
}

export default LandingPage