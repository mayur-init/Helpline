import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className='bg-gray-200 flex flex-col justify-evenly'>
        <Navbar/>
        <div className='min-h-[90vh] flex justify-center'>
          <div className='mt-[10vh]'>
            <h1 className='text-4xl font-semibold text-gray-600 m-4'>Find your location</h1>
            <p className='flex justify-center'><button className='btn'>My location</button></p>
          </div>
          {/* <p className='text-3xl font-medium text-gray-500'>landing page content</p> */}
        </div>
        <Footer/>
    </div>
  )
}

export default LandingPage