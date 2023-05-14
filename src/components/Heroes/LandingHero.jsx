import React, { useState, useEffect } from 'react'

const LandingHero = () => {

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white' id='hero'>
      <div className='grid md:grid-cols-2 w-[70vw] text-center m-8'>
        <div className='flex flex-col justify-center md:items-start w-full mt-0 md:mt-[18vh] mb-4'>
          <h1 className='p-2 text-4xl md:text-6xl text-gray-400 font-bold'>Book Your</h1>
          <h1 className='px-4 text-6xl md:text-8xl font-bold hover:text-violet-600'>Services</h1>
        </div>
        <div className='flex justify-center'>
          <img className='w-[50vh] md:w-[100vh] h-[35vh] md:h-[50vh] rounded-md' src={'assets/img1.jpg'} alt="/" />
        </div>
      </div>
    </div>
  )
}

export default LandingHero;